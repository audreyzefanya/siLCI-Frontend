import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { mapDispatchToProps, mapStateToProps } from '../../../state/redux';
import Sidebar from '../../../components/sidebar/manajer';
import Header from '../../../components/header';
import { getBatchProduksi } from '../../../service/pabrik/endpoint';
import TabPabrik from '../../../components/tabPabrik';
import ModalLoading from '../../../components/modal/modalLoading';

const getStatusString = (status) => {
    switch (status) {
        case 1:
            return 'Sedang Diproses';
        case 2:
            return 'Menunggu QC ';
        case 3:
            return 'Selesai dan menunggu dikirim';
        case 4:
            return 'Terkirim';
        case 5:
            return 'Gagal';
        default:
            return 'Status Tidak Dikenal';
    }
};

const DetailBatch = (props) => {
    const { nama_pabrik, kode_batch } = useParams();
    const [batchProduksi, setBatchProduksi] = useState(null);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchBatchProduksi();
    }, [nama_pabrik, kode_batch]);

    const fetchBatchProduksi = async () => {
        setIsModalOpen(true);
        try {
            const data = await getBatchProduksi(nama_pabrik, kode_batch);
            setBatchProduksi(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsModalOpen(false); // Close modal on data fetch completion
          }
    };

    const renderStatusSlider = () => {
        if (!batchProduksi) return null;

        let sliderPosition;
        switch (batchProduksi.status) {
            case 1:
                sliderPosition = 25;
                break;
            case 2:
                sliderPosition = 50;
                break;
            case 3:
                sliderPosition = 75;
                break;
            case 4:
                sliderPosition = 100;
                break;
            case 5:
                sliderPosition = 0;
                break;
            default:
                sliderPosition = 0;
        }

        const sliderStyle = {
            width: '80%',
            margin: '0 auto',
            position: 'relative',
        };

        const trackStyle = {
            width: '100%',
            height: '10px',
            backgroundColor: '#ddd',
            borderRadius: '5px',
            position: 'relative',
            overflow: 'hidden',
        };

        const thumbStyle = {
            position: 'absolute',
            width: '15px',
            height: '15px',
            borderRadius: '50%',
            backgroundColor: 'red',
            top: '-3px',
            left: `calc(${sliderPosition}% - 7.5px)`,
        };

        const coloredPartStyle = {
            position: 'absolute',
            width: `${sliderPosition}%`,
            height: '100%',
            backgroundColor: 'red',
            top: '0',
            left: '0',
        };

        const statusTextStyle = {
            position: 'absolute',
            top: '20px',
            left: '0',
            width: '100%',
            textAlign: 'center',
            fontSize: '12px',
            color: '#666',
        };

        return (
            <div style={sliderStyle}>
            <div style={trackStyle}>
            <div style={coloredPartStyle}></div> {/* Render the colored part of the track */}
            </div>
            <div style={thumbStyle}></div>
            <div style={statusTextStyle}>
            {batchProduksi.status === 5 && (
            <div style={{ position: 'absolute', left: '0%', transform: 'translateX(-50%)', color: 'red' }}>Gagal</div>
            )}
            <div style={{ position: 'absolute', left: '25%', transform: 'translateX(-50%)' }}>Sedang Diproses</div>
            <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>Menunggu QC</div>
            <div style={{ position: 'absolute', left: '75%', transform: 'translateX(-50%)' }}>Selesai dan Menunggu Dikirim</div>
            <div style={{ position: 'absolute', right: '0', transform: 'translateX(50%)' }}>Terkirim</div>
            </div>
            </div>
            );
        };

    const handleBack = () => {
        navigate(`/manager-operasional/pabrik/detail/${nama_pabrik}/batch`);
    };

    return (
        <div className='flex w-screen h-screen'>
            <Sidebar currentNavigation={2.2} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
            <div className='w-full h-screen flex flex-col'>
                <Header title=''/>
                <div className="flex items-center text-3xl font-bold mb-10 ml-10 mt-8" style={{ color: '#000000' }}>
                    <span style={{ marginRight: '20px' }}>Detail Batch Produksi</span>
                </div>
                <div className="ml-10 mb-4">
                </div>
                <TabPabrik
                    tabAktif={"Batch Produksi"}
                />
                <div className='no-scrollbar flex-1 overflow-y-auto py-6 px-8' style={{ backgroundColor: '#F9FAFB' }}>
                    <div className="text-3xl font-bold mb-6 ml-2 mt-2 text-center"> {kode_batch} </div>
                        {batchProduksi && (
                            <>
                                <div>
                                    <span style={{ marginRight: '20px', fontSize: '1.2rem', fontWeight: 'bold' }}>Kode Produksi:</span>
                                    <br />
                                    <span>{batchProduksi.kode_produksi}</span>
                                    <br />
                                    <span style={{ marginRight: '20px', fontSize: '1.2rem', fontWeight: 'bold' }}>Nama Barang:</span>
                                    <br />
                                    <span>{batchProduksi.barang.nama}</span>
                                    <br />
                                    <span style={{ marginRight: '20px', fontSize: '1.2rem', fontWeight: 'bold' }}>Pabrik:</span>
                                    <br />
                                    <span>{batchProduksi.pabrik.nama}</span>
                                    <br />
                                    <span style={{ marginRight: '20px', fontSize: '1.2rem', fontWeight: 'bold' }}>Jumlah:</span>
                                    <br />
                                    <span>{batchProduksi.jumlah}</span>
                                    <br />
                                    <span style={{ marginRight: '20px', fontSize: '1.2rem', fontWeight: 'bold' }}>Tanggal Produksi:</span>
                                    <br />
                                    <span>{batchProduksi.tanggal_produksi}</span>
                                    <br />
                                    <span style={{ marginRight: '20px', fontSize: '1.2rem', fontWeight: 'bold' }}>Status Produksi:</span>
                                    <br />
                                    <div style={{ marginTop: '10px' }}>{renderStatusSlider()}</div> {/* Added div around the slider */}
                                    <br />
                                </div>
                                <br />
                                <Button
                                    size="sm"
                                    onClick={() => navigate(`/manager-operasional/pabrik/detail/${nama_pabrik}/${batchProduksi.kode_produksi}/update`)}
                                    style={{
                                        borderRadius: '10px',
                                        backgroundColor: '#2C358C',
                                        borderColor: '#2C358C',
                                        color: 'white',
                                        padding: '15px 30px',
                                        fontSize: '1.1rem',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                        transition: 'transform 0.2s ease-in-out',
                                        display: batchProduksi && batchProduksi.status !== 4 && batchProduksi.status !== 5 ? 'block' : 'none', // Hide button when status is 4 or 5
                                    }}
                                    onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                                >
                                    Ubah Status
                                </Button>
                            </>
                        )}
                    </div>
                </div>
                <ModalLoading title="Loading..." subtitle="Please wait a moment" isOpen={isModalOpen} /> {/* Modal Loading component instance */}
            </div>
        );
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailBatch);
