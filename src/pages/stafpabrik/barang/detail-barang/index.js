import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../../../components/header';
import Sidebar from '../../../../components/sidebar/stafpabrik';
import { GetDetailBarang } from '../../../../service/daftarbarang/endpoint';
import { mapDispatchToProps, mapStateToProps } from '../../../../state/redux';
import ModalLoading from "../../../../components/modal/modalLoading";

const BarangDetail = (props) => {
    const { id_barang } = useParams();
    const navigate = useNavigate();
    const [barangDetail, setBarangDetail] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchDetail = async () => {
            setIsModalOpen(true);
            try {
                const response = await GetDetailBarang(id_barang);
                setBarangDetail(response);
            } catch (error) {
                console.error('Error fetching detail:', error);
            } finally {
                setIsModalOpen(false); // Close modal on data fetch completion
            }
        };
        fetchDetail();
    }, [id_barang]);

    const kembaliButton = () => {
        navigate(-1);
    };

    if (!barangDetail) {
        return <div className="flex justify-center items-center h-screen">Loading Barang...</div>;
    }

    return (
        <div className='flex w-screen h-screen'>
            <Sidebar currentNavigation={2.1} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
            <div className='w-full flex flex-col'>
                <Header title=''/>
                <div className="flex justify-center items-center flex-1">
                    <div className="flex flex-col items-center w-full max-w-2xl">
                        <div className="text-4xl font-bold mb-4 mt-8" style={{ color: '#000000', marginBottom: '20px' }}>Detail Barang</div>
                        <div className="bg-white shadow-lg rounded-lg p-8 m-8 w-full" style={{ borderColor: '#2C358C', borderWidth: '1px' }}>
                            <div className="flex items-center mb-4">
                                <img src={barangDetail.foto} alt={barangDetail.nama} className="w-32 h-32 mr-4 rounded-lg" />
                                <div>
                                    <p className="text-lg mb-2"><strong>Merk:</strong> {barangDetail.merk.nama}</p>
                                    <p className="text-lg mb-2"><strong>Nama:</strong> {barangDetail.nama}</p>
                                    <p className="text-lg mb-2"><strong>Deskripsi:</strong> {barangDetail.deskripsi}</p>
                                    <p className="text-lg mb-2"><strong>Harga:</strong> Rp {barangDetail.harga.toLocaleString()}</p>
                                </div>
                            </div>
                            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                <Button
                                    onClick={kembaliButton}
                                    style={{
                                        borderRadius: '20px',
                                        backgroundColor: '#2C358C',
                                        color: 'white',
                                        padding: '10px 20px',
                                        fontSize: '16px',
                                        transition: 'all 0.3s ease',
                                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                    }}
                                    onMouseOver={(e) => e.target.style.backgroundColor = '#DA3732'}
                                    onMouseOut={(e) => e.target.style.backgroundColor = '#2C358C'}
                                > Kembali </Button>

                            </div>
                        </div>
                    </div>
                </div>
                <ModalLoading title="Loading..." subtitle="Please wait a moment" isOpen={isModalOpen} /> {/* Modal Loading component instance */}
            </div>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(BarangDetail);
