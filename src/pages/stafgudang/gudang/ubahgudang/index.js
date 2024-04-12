import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../../../components/header';
import Sidebar from '../../../../components/sidebar/stafgudang';
import { fetchDetailGudang, updateDetailGudang } from '../../../../service/gudangmanagement/endpoint';
import { mapDispatchToProps, mapStateToProps } from '../../../../state/redux';
import { Button } from 'react-bootstrap';
import TabGudang from '../../../../components/tabGudang';

const DetailGudang = (props) => {
    const { id_gudang } = useParams();
    const navigate = useNavigate();
    const [detailGudang, setDetailGudang] = useState(null);
    const [nama, setNama] = useState('');
    const [alamat, setAlamat] = useState('');
    const [kapasitas, setKapasitas] = useState('');

    useEffect(() => {
        fetchDetail();
    }, [id_gudang]);

    const fetchDetail = async () => {
        try {
            const data = await fetchDetailGudang(id_gudang);
            setDetailGudang(data);
            setNama(data.nama_gudang);
            setAlamat(data.alamat_gudang);
            setKapasitas(data.kapasitas_gudang);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSave = async () => {
        try {
            await updateDetailGudang(id_gudang, { nama_gudang: nama, alamat_gudang: alamat, kapasitas_gudang: kapasitas });
            alert('Data berhasil disimpan');
            navigate(-1);
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    return (
        <div className='flex w-screen h-screen'>
            <Sidebar currentNavigation={2.1} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
            <div className='w-full h-screen flex flex-col'>
                <Header title=''/>
                <div className="text-3xl font-bold ml-10 mt-8" style={{ color: '#000000' }}>
                    <span style={{ marginRight: '20px' }}>{detailGudang ? detailGudang.nama_gudang : ''}</span>
                    <Button
                        size="sm"
                        onClick={handleSave}
                        style={{
                            borderRadius: '20px',
                            backgroundColor: '#DA3732',
                            borderColor: '#DA3732',
                            color: 'white',
                            padding: '5px 15px',
                            fontSize: '1rem',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                            transition: 'transform 0.2s ease-in-out',
                        }}
                        onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                    >
                        Simpan
                    </Button>
                </div>
                <div className="alamat-gudang mb-4 ml-10">
                    <input
                        type="text"
                        value={alamat}
                        onChange={(e) => setAlamat(e.target.value)}
                        style={{ backgroundColor: '#fff' }}
                    />
                </div>
                <div className="id-gudang ml-10">{detailGudang ? detailGudang.id_gudang : ''}</div>
                <div className="kapasitas-gudang mb-8 ml-10">
                    <input
                        type="text"
                        value={kapasitas}
                        onChange={(e) => setKapasitas(e.target.value)}
                        style={{ backgroundColor: '#fff' }}
                    />
                </div>
                <TabGudang />
                <div className='no-scrollbar flex-1 overflow-y-auto bg-neutral20 py-6 px-8'>
                    <div className="text-3xl font-bold mt-2 mb-6 text-center"> Daftar Barang </div>
                    <table className="w-full table-auto">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2" style={{ backgroundColor: '#DA3732', color: '#fff' }}>Nama Barang</th>
                                <th className="border px-4 py-2" style={{ backgroundColor: '#DA3732', color: '#fff' }}>Stok</th>
                            </tr>
                        </thead>
                        <tbody>
                            {detailGudang && detailGudang.barang.filter((barang) =>
                                barang.nama_barang.toLowerCase().includes(''.toLowerCase())
                            ).map((barang, index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2">{barang.nama_barang}</td>
                                    <td className="border px-4 py-2">{barang.stok}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailGudang);
