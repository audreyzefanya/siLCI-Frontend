import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { FiSearch } from 'react-icons/fi';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/header';
import Sidebar from '../../../components/sidebar/manajer';
import { GetPerusahaan } from '../../../service/perusahaanimpor/endpoint';
import { mapDispatchToProps, mapStateToProps } from '../../../state/redux';

const DaftarPerusahaan = (props) => {
    const [daftarPerusahaan, setPerusahaan] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
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
    
    const handleDetail = (id_perusahaan) => {
        navigateTo(`/manager-operasional/perusahaan/${id_perusahaan}`);
    };

    const handleAddPerusahaan = (event) => {
        event.stopPropagation();
        navigateTo(`/manager-operasional/perusahaan/create`);
      };

    const filteredPerusahaan = daftarPerusahaan.filter(perusahaan =>
        perusahaan.nama.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='flex w-screen h-screen'>
            <Sidebar currentNavigation={3.1} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
            <div className='w-full h-screen flex flex-col'>
                <Header title=''/>
                <div className="flex items-center text-3xl font-bold mb-10 ml-10 mt-8" style={{ color: '#000000' }}>
                    <span style={{ marginRight: '20px' }}>Daftar Perusahaan</span>
                    <Button
                        size="sm"
                        onClick={handleAddPerusahaan}
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
                        + Tambah Perusahaan
                    </Button>
                </div>
                <div className='no-scrollbar flex-1 overflow-y-auto bg-neutral20 py-2 px-8'>
                    <div className="mt-2 flex justify-center items-center">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search Perusahaan..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 pl-10"
                                style={{ width: '300px' }} // Adjust the width as needed
                            />
                            <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2" size={20} color="blue" /> {/* Search icon */}
                        </div>
                    </div>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPerusahaan.map(perusahaan => (
                            <div key={perusahaan.id} className="bg-white rounded-lg p-6 flex flex-col justify-between">
                                <img src={perusahaan.logo} alt={perusahaan.nama} className="h-24 w-24 mx-auto mb-4" />
                                <img src={perusahaan.logo} alt={perusahaan.nama} className="h-24 w-24 mx-auto mb-2" />
                                <div className="mt-4">
                                    <h3 className="text-xl font-semibold mb-2" style={{ color: '#2C358C' }}>{perusahaan.nama}</h3>
                                    <p className="mb-4 text-gray-700">{perusahaan.deskripsi.length > 100 ? perusahaan.deskripsi.substring(0, 100) + '...' : perusahaan.deskripsi}</p>
                                    <Button
                                        onClick={(e) => handleDetail(perusahaan.id)}
                                        style={{
                                        borderRadius: '5px',
                                        backgroundColor: '#2C358C',
                                        borderColor: '#2C358C',
                                        color: 'white',
                                        padding: '7px 10px',
                                        fontSize: '0.875rem',
                                        transition: 'background-color 0.2s',
                                        }}
                                        onMouseOver={(e) => e.target.style.backgroundColor = '#DA3732'}
                                        onMouseOut={(e) => e.target.style.backgroundColor = '#2C358C'}
                                    > View Details </Button>
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
