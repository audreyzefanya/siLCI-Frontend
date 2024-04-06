import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../../../components/header';
import Sidebar from '../../../../components/sidebar/manajer';
import { mapDispatchToProps, mapStateToProps } from '../../../../state/redux';

import { addStokGudang, fetchDetailGudang } from '../../../../service/gudangmanagement/endpoint';
import { GetDetailBarang } from '../../../../service/daftarbarang/endpoint';
import { GetDetailPengadaan, IncreaseStatusPengadaan } from '../../../../service/perusahaanimpor/endpoint';
import { GetDetailPerusahaan } from '../../../../service/perusahaanimpor/endpoint';
import { uploadPayment } from '../../../../service/fileUpload/endpoint';
import { changePengadaanStatus } from '../../../../service/fileUpload/endpoint';
import ModalLoading from '../../../../components/modal/modalLoading';
import ModalConfirm from '../../../../components/modal/modalConfirm';
import ModalResult from '../../../../components/modal/modalResult';

const PengadaanDetail = (props) => {
    const { pengadaan_id } = useParams();
    const navigate = useNavigate();
    const [pengadaanDetail, setPengadaanDetail] = useState(null);
    const [barangName, setBarangName] = useState('');
    const [gudangName, setGudangName] = useState('');
    const [perusahaanName, setPerusahaanName] = useState('');
    const [isPaymentUploaded, setIsPaymentUploaded] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [isModalLoadingOpen, setModalLoadingOpen] = useState(false);
    const [isModalConfirmOpen, setModalConfirmOpen] = useState(false);
    const [modalResult, setModalResult] = useState({ isOpen: false, type: '', subtitle: '' });
    const [statusInt, setStatusInt] = useState();
    const fetchDetails = async () => {
        try {
            const response = await GetDetailPengadaan(pengadaan_id);
            setPengadaanDetail(response);
            
            if (response.barang) {
                const barangResponse = await GetDetailBarang(response.barang);
                setBarangName(barangResponse.nama);
            }

            if (response.gudangTujuan) {
                const gudangResponse = await fetchDetailGudang(response.gudangTujuan);
                setGudangName(gudangResponse.nama_gudang);
            }

            if (response.perusahaan) {
                const perusahaanResponse = await GetDetailPerusahaan(response.perusahaan);
                setPerusahaanName(perusahaanResponse.nama);
            }

            // Update payment upload status based on the response
            setIsPaymentUploaded(!!response.filePayment);
        } catch (error) {
            console.error('Error fetching pengadaan details:', error);
        }
    };
    const [filePreview, setFilePreview] = useState(null); // For invoice file preview
    const [fileToUpload, setFileToUpload] = useState(null); // File to upload

    useEffect(() => {
        fetchDetails();
    }, [pengadaan_id]);

    useEffect(() => {
        // Get user info from localStorage
        const storedUserInfo = localStorage.getItem('userInfo');
        if (storedUserInfo) {
          setUserInfo(JSON.parse(storedUserInfo));
        }
      }, []);

    useEffect(() => {
      if (pengadaanDetail) {
          const statusMap = new Map([
              ['Permintaan Ditolak', 0],
              ['Penawaran Dikirim', 1],
              ['Menunggu Pembayaran', 2],
              ['Pembayaran Dikirim', 3],
              ['Pembayaran Diverifikasi', 4],
              ['Barang Dalam Perjalanan', 5],
              ['Barang Diterima', 6]
          ]);
  
          const statusInt = statusMap.get(pengadaanDetail.status);
          setStatusInt(statusInt !== undefined ? statusInt : null);
      }
    }, [pengadaanDetail]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFilePreview(URL.createObjectURL(file));
            setFileToUpload(file);
        }
    };

    const handleConfirmUpload = async () => {
        setModalConfirmOpen(true);
    };


    const proceedWithUpload = async () => {
        setModalConfirmOpen(false); // Close the confirmation modal
        setModalLoadingOpen(true); // Show the loading modal
      
        try {
          // Create the form data and append the file to be uploaded
          const formData = new FormData();
          formData.append('filePayment', fileToUpload);
      
          // Call the upload service
          await uploadPayment(pengadaan_id, formData);
          
          // If the upload was successful, update the pengadaan status
          await changePengadaanStatus(pengadaan_id);
      
          // Update the state to reflect that the invoice has been uploaded
          setIsPaymentUploaded(true);
      
          // Re-fetch pengadaan details to reflect the newly uploaded invoice
          await fetchDetails();
      
          // Handle success: close loading modal and show success result modal
          setModalLoadingOpen(false);
          setModalResult({
            isOpen: true,
            type: 'success',
            subtitle: 'Payment uploaded and status updated successfully!',
          });

          setTimeout(() => {
            setModalResult({ isOpen: false, type: 'success', subtitle: 'Payment uploaded and status updated successfully!' });
          }, 1500);
      
          setFilePreview(null);
          setFileToUpload(null);
        } catch (error) {
          console.error('Error during upload or status update:', error);

          setModalLoadingOpen(false);
          setModalResult({
            isOpen: true,
            type: 'failed',
            subtitle: 'Failed to upload payment. Please try again.',
          });

          setTimeout(() => {
            setModalResult({ isOpen: false, type: 'failed', subtitle: 'Failed to upload payment. Please try again.' });
          }, 1500);
        }
      };

    if (!pengadaanDetail) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    const kembaliButton = () => {
        navigate(-1);
    };

    const finishPengadaanButton = async () => {

      const dataTambah = {
          gudang: pengadaanDetail.gudangTujuan,
          barang: pengadaanDetail.barang,
          stok: pengadaanDetail.jumlahBarang,
      };
      await addStokGudang(dataTambah);
      await IncreaseStatusPengadaan(pengadaan_id);
      window.location.reload();
    };

    const invoiceSection = pengadaanDetail.fileInvoice ? (
          <a href={pengadaanDetail.fileInvoice} target="_blank" rel="noopener noreferrer">
            <img src={pengadaanDetail.fileInvoice} alt="Invoice" style={{ maxHeight: '200px', marginBottom: '10px' }} />
          </a>
        ) : (
          <p>No Invoice has been uploaded</p>
    );

    const paymentSection = userInfo && userInfo.role === 'Staf Pengadaan' ? (
      <>
        {!pengadaanDetail.filePayment && (
          <>
            {filePreview ? (
              <div>
                <a href={filePreview} target="_blank" rel="noopener noreferrer">
                  <img src={filePreview} alt="Preview" style={{ maxHeight: '200px', marginBottom: '10px' }} />
                </a>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                  <Button onClick={handleConfirmUpload} style={{
                                      borderRadius: '20px',
                                      backgroundColor: '#2C358C',
                                      color: 'white',
                                      padding: '10px 20px',
                                      fontSize: '16px',
                                      transition: 'all 0.3s ease',
                                      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
                                  }}
                                  onMouseOver={(e) => e.target.style.backgroundColor = '#DA3732'}
                                  onMouseOut={(e) => e.target.style.backgroundColor = '#2C358C'}>Confirm Upload</Button>
                  <Button onClick={() => { setFilePreview(null); setFileToUpload(null); }} style={{
                                      borderRadius: '20px',
                                      backgroundColor: 'red',
                                      color: 'white',
                                      padding: '10px 20px',
                                      fontSize: '16px',
                                      transition: 'all 0.3s ease',
                                      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
                                  }}
                                  >Remove File</Button>
                </div>
              </div>
            ) : (
              <input type="file" id="paymentUpload" accept="image/*,application/pdf" onChange={handleFileChange} />
            )}
          </>
        )}
        {pengadaanDetail.filePayment && (
          <a href={pengadaanDetail.filePayment} target="_blank" rel="noopener noreferrer">
            <img src={pengadaanDetail.filePayment} alt="Payment" style={{ maxHeight: '200px', marginBottom: '10px' }} />
          </a>
        )}
      </>
    ) : (
      pengadaanDetail.filePayment ? (
        <a href={pengadaanDetail.filePayment} target="_blank" rel="noopener noreferrer">
          <img src={pengadaanDetail.filePayment} alt="Payment" style={{ maxHeight: '200px', marginBottom: '10px' }} />
        </a>
      ) : (
        <p>No Payment has been uploaded</p>
      )
    );

    return (
        <div className='flex w-screen h-screen'>
            <Sidebar currentNavigation={2.3} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
            <div className='w-full flex flex-col'>
                <Header title=''/>
                <div className="flex justify-center items-center flex-1">
                    <div className="flex flex-col items-center w-full max-w-2xl">
                        {/* Detail Pengadaan */}
                            {/* Pengadaan details listed here */}
                            <div className="bg-white shadow-lg rounded-lg p-8 m-8 w-full" style={{ borderColor: '#2C358C', borderWidth: '1px' }}>
                            <p className="text-lg mb-4"><strong>ID:</strong> {pengadaanDetail.id}</p>
                            <p className="text-lg mb-4"><strong>Status:</strong> {pengadaanDetail.status}</p>
                            <p className="text-lg mb-4"><strong>Jumlah Barang:</strong> {pengadaanDetail.jumlahBarang}</p>
                            <p className="text-lg mb-4"><strong>Total Harga:</strong> Rp {pengadaanDetail.totalHarga.toLocaleString()}</p>
                            <p className="text-lg mb-4"><strong>Tanggal Permintaan:</strong> {new Date(pengadaanDetail.tanggalPermintaaan).toLocaleDateString()}</p>
                            <p className="text-lg mb-4"><strong>Barang:</strong> {barangName}</p>
                            <p className="text-lg mb-4"><strong>Gudang Tujuan:</strong> {gudangName}</p>
                            <p className="text-lg mb-4"><strong>Perusahaan:</strong> {perusahaanName}</p>
                
                            {statusInt >= 1 && (
                                <div className="invoice-container flex flex-col items-center justify-center p-8 m-8 w-full" style={{ borderColor: '#2C358C', borderWidth: '1px', borderStyle: 'solid', maxWidth: '600px', margin: '0 auto', marginBottom: '20px' }}>
                                  <h3 className="text-xl font-bold mb-3">File Invoice</h3>
                                  {invoiceSection}
                                </div>
                            )}
                            {statusInt >= 2 && (
                                <div className="payment-container flex flex-col items-center justify-center p-8 m-8 w-full" style={{ borderColor: '#2C358C', borderWidth: '1px', borderStyle: 'solid', maxWidth: '600px', margin: '0 auto' }}>
                                  <h3 className="text-xl font-bold mb-3">File Payment</h3>
                                  {paymentSection}
                                </div>
                            )}
                        </div>
                        <div className="button-container" style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
                            <Button
                                onClick={kembaliButton}
                                style={{
                                    borderRadius: '20px',
                                    backgroundColor: '#2C358C', 
                                    color: 'white',
                                    padding: '10px 20px',
                                    fontSize: '16px',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
                                }}
                                onMouseOver={(e) => e.target.style.backgroundColor = '#DA3732'}
                                onMouseOut={(e) => e.target.style.backgroundColor = '#2C358C'}
                            >
                                Kembali
                            </Button>

                            {statusInt === 5 && (
                                <Button
                                    onClick={finishPengadaanButton}
                                    style={{
                                        borderRadius: '20px',
                                        backgroundColor: 'green', 
                                        color: 'white',
                                        padding: '10px 20px',
                                        fontSize: '16px',
                                        transition: 'all 0.3s ease',
                                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
                                    }}
                                    onMouseOver={(e) => e.target.style.backgroundColor = 'green'}
                                    onMouseOut={(e) => e.target.style.backgroundColor = '#2C358C'}
                                >
                                    Barang Diterima
                                </Button>
                            )}

                            {/* Modals */}
                            <ModalLoading isOpen={isModalLoadingOpen} title="Loading..." subtitle="Please wait while the details are being fetched." />
                            <ModalResult isOpen={modalResult.isOpen} type={modalResult.type} subtitle={modalResult.subtitle} />
                            <ModalConfirm
                                isOpen={isModalConfirmOpen}
                                title="Confirm Upload"
                                message="Are you sure you want to upload this payment?"
                                onClose={() => setModalConfirmOpen(false)}
                                onConfirm={proceedWithUpload}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(PengadaanDetail);
