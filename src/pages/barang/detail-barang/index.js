import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../../components/header';
import Sidebar from '../../../components/sidebar/manajer';
import { GetDetailBarang } from '../../../service/daftarbarang/endpoint';
import { mapDispatchToProps, mapStateToProps } from '../../../state/redux';

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
            <Sidebar currentNavigation={2.1} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
            <div className='w-full flex flex-col'>
                <Header title=''/>
                <div className="flex justify-center items-center flex-1">
                    <div className="flex flex-col items-center w-full max-w-2xl">
                        <div className="text-3xl font-bold mb-10 ml-10 mt-8" style={{ color: '#2C358C' }}>Detail Barang</div>
                        <div className="bg-white shadow-lg rounded-lg p-6 m-8 w-full" style={{ borderColor: '#2C358C', borderWidth: '2px' }}>
                            <p className="mb-2"><span className="font-semibold">ID:</span> {barangDetail.id}</p>
                            <p className="mb-2"><span className="font-semibold">Merk:</span> {barangDetail.merk.nama}</p>
                            <p className="mb-2"><span className="font-semibold">Nama:</span> {barangDetail.nama}</p>
                            <p className="mb-2"><span className="font-semibold">Deskripsi:</span> {barangDetail.deskripsi}</p>
                            <p className="mb-2"><span className="font-semibold">Harga:</span> Rp {barangDetail.harga.toLocaleString()}</p>
                        </div>
                        <Button
                            onClick={kembaliButton}
                            style={{
                                borderRadius: '5px',
                                backgroundColor: '#2C358C', 
                                color: 'white',
                                padding: '7px 8px',
                                border: 'none'
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
