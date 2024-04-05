import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../../../components/header';
import Sidebar from '../../../../components/sidebar/stafpabrik';
import { getDaftarPengiriman } from '../../../../service/pabrik/endpoint';
import { mapDispatchToProps, mapStateToProps } from '../../../../state/redux';

const DaftarPengiriman = (props) => {
    const { nama_pabrik } = useParams();
    const navigate = useNavigate();
    const [daftarPengiriman, setDaftarPengiriman] = useState(null);

    useEffect(() => {
        fetchDaftarPengiriman();
    }, [nama_pabrik]);

    const fetchDaftarPengiriman = async () => {
        try {
            const data = await getDaftarPengiriman(nama_pabrik);
            setDaftarPengiriman(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className='flex w-screen h-screen'>
            <Sidebar currentNavigation={1} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
            <div className='w-full h-screen flex flex-col'>
                <Header title='Daftar Pengiriman'/>
                <div className='no-scrollbar flex-1 overflow-y-auto bg-neutral20 py-6 px-8'>
                    <div className="text-3xl font-bold mt-2 text-center"> Daftar Pengiriman </div>
                    <table className="w-full table-auto">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2" style={{ backgroundColor: '#DA3732', color: '#fff' }}>Kode Permintaan</th>
                                <th className="border px-4 py-2" style={{ backgroundColor: '#DA3732', color: '#fff' }}>Nama Barang</th>
                                <th className="border px-4 py-2" style={{ backgroundColor: '#DA3732', color: '#fff' }}>Nama Gudang</th>
                                <th className="border px-4 py-2" style={{ backgroundColor: '#DA3732', color: '#fff' }}>Jumlah</th>
                                <th className="border px-4 py-2" style={{ backgroundColor: '#DA3732', color: '#fff' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {daftarPengiriman && daftarPengiriman.map((pengiriman, index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2">{pengiriman.kode_permintaan}</td>
                                    <td className="border px-4 py-2">{pengiriman.barang.nama}</td>
                                    <td className="border px-4 py-2">{pengiriman.gudang.nama}</td>
                                    <td className="border px-4 py-2">{pengiriman.jumlah}</td>
                                    <td className="border px-4 py-2">{pengiriman.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(DaftarPengiriman);
