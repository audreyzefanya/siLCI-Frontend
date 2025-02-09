import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../../../components/header';
import Sidebar from '../../../../components/sidebar/stafgudang';
import { GetDetailBarang } from '../../../../service/daftarbarang/endpoint';
import { mapDispatchToProps, mapStateToProps } from '../../../../state/redux';

const BarangDetail = (props) => {
    const { id_barang } = useParams();
    const navigate = useNavigate();
    const [barangDetail, setBarangDetail] = useState(null);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const response = await GetDetailBarang(id_barang);
                setBarangDetail(response);
            } catch (error) {
                console.error('Error fetching detail:', error);
            }
        };
        fetchDetail();
    }, [id_barang]);

    const kembaliButton = () => {
        navigate(-1);
    };

    if (!barangDetail) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div className='flex w-screen h-screen'>
            <Sidebar currentNavigation={2.2} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
            <div className='w-full flex flex-col'>
                <Header title=''/>
                <div className="flex justify-center items-center flex-1">
                    <div className="flex flex-col items-center w-full max-w-2xl">
                    <div className="text-4xl font-bold mb-4 mt-8" style={{ color: '#000000', marginBottom: '20px' }}>Detail Barang</div>
                    <div className="bg-white shadow-lg rounded-lg p-8 m-8 w-full" style={{ borderColor: '#2C358C', borderWidth: '1px' }}>
                        <p className="text-lg mb-4"><strong>ID:</strong> {barangDetail.id}</p>
                        <p className="text-lg mb-4"><strong>Merk:</strong> {barangDetail.merk.nama}</p>
                        <p className="text-lg mb-4"><strong>Nama:</strong> {barangDetail.nama}</p>
                        <p className="text-lg mb-4"><strong>Deskripsi:</strong> {barangDetail.deskripsi}</p>
                        <p className="text-lg mb-4"><strong>Harga:</strong> Rp {barangDetail.harga.toLocaleString()}</p>
                    </div>
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
                        > Kembali </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(BarangDetail);
