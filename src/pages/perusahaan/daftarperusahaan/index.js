import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { GetPerusahaan } from '../../../service/perusahaanimpor/endpoint';
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../../../state/redux';
import Sidebar from '../../../components/sidebar/manajer';
import Header from '../../../components/header';
<<<<<<< HEAD
import { FiSearch } from 'react-icons/fi';

const DaftarPerusahaan = (props) => {
    const [daftarPerusahaan, setPerusahaan] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
=======
import PrimaryButton from '../../../components/button/primarybutton';

const DaftarPerusahaan = (props) => {
    const [daftarPerusahaan, setPerusahaan] = useState([]);
>>>>>>> 6a45e82d93aa1fafb8c4a155c37d363f117dfe02
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
        navigateTo(`/perusahaan/${id_perusahaan}`);
    };

<<<<<<< HEAD
    const filteredPerusahaan = daftarPerusahaan.filter(perusahaan =>
        perusahaan.nama.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='flex w-screen h-screen'>
            <Sidebar currentNavigation={4.1} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
            <div className='w-full h-screen flex flex-col'>
                <Header title='Daftar Perusahaan Impor'/>
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
=======
    return (
        <div className='flex w-screen h-screen'>
            <Sidebar currentNavigation={1} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
            <div className='w-full h-screen flex flex-col'>
                <Header title='Daftar Perusahaan Impor'/>
                <div className='no-scrollbar flex-1 overflow-y-auto bg-neutral20 py-6 px-8'>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {daftarPerusahaan.map(perusahaan => (
>>>>>>> 6a45e82d93aa1fafb8c4a155c37d363f117dfe02
                            <div key={perusahaan.id} className="bg-white rounded-lg p-6 flex flex-col justify-between">
                                <img src={perusahaan.logo_url} alt={perusahaan.nama} className="h-24 w-24 mx-auto mb-4" />
                                <div className="mt-4">
                                    <h3 className="text-lg font-semibold">{perusahaan.nama}</h3>
                                    <p className="text-sm text-gray-600">{perusahaan.deskripsi}</p>
                                    <button onClick={() => handleDetail(perusahaan.id)} className="block text-center text-blue-500 hover:text-blue-700 mt-2 mx-auto">View Details</button>
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
