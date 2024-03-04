import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { GetPerusahaan } from '../../../service/barang/perusahaanimpor/endpoint';
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../../../state/redux';
import Sidebar from '../../../components/sidebar/manajer';
import Header from '../../../components/header';

const DaftarPerusahaan = (props) => {
    const [daftarPerusahaan, setPerusahaan] = useState([]);
    const navigateTo = useNavigate()

    useEffect(() => {
        getPerusahaanImpor();
    }, [])

    async function getPerusahaanImpor() {
        try {
            const perusahaanData = await GetPerusahaan(); // Call GetPerusahaan function
            setPerusahaan(perusahaanData)
        } catch (error) {
            console.error('Error fetching perusahaan data:', error);
        }
    }
    
    
  return (
    <div className='flex w-screen h-screen'>
        <Sidebar currentNavigation={1} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
        <div className='w-full h-screen flex flex-col'>
            <Header title='Daftar Perusahaan Impor'/>
            <div className='no-scrollbar flex-1 overflow-y-auto bg-neutral20 py-6 px-8'>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {daftarPerusahaan.map(perusahan => (
                            <div key={perusahan.id} className="bg-white rounded-lg p-6 flex flex-col justify-between">
                                <img src={`http://localhost:8000/${perusahan.logo}`} alt={perusahan.nama} className="h-24 w-24 mx-auto mb-4" />
                                <div className="mt-4">
                                    <h3 className="text-lg font-semibold">{perusahan.nama}</h3>
                                    <p className="text-sm text-gray-600">{perusahan.deskripsi}</p>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            
        </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DaftarPerusahaan);
