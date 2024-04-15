import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/header';
import Sidebar from '../../../components/sidebar/manajer';
import { fetchDataGudang } from '../../../service/gudangmanagement/endpoint';
import { mapDispatchToProps, mapStateToProps } from '../../../state/redux';

const DaftarGudang = (props) => {
    const [gudangData, setGudangData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchDataGudang('nama', 'alamat');
                setGudangData(response);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleDetailGudang = (id_gudang) => {
        navigate(`/manager-operasional/daftar-gudang/${id_gudang}`);
    };

    const handleAddGudang = (event) => {
        event.stopPropagation();
        navigate(`/manager-operasional/daftar-gudang/add`);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredGudangData = gudangData.filter(gudang =>
        gudang.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gudang.alamat.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='flex w-screen h-screen'>
            <Sidebar currentNavigation={2.1} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
            <div className='w-full h-screen flex flex-col'>
                <Header title=''/>
                <div className="flex items-center text-3xl font-bold mb-10 ml-10 mt-8" style={{ color: '#000000' }}>
                    <span style={{ marginRight: '20px' }}>Daftar Gudang</span>
                    <Button
                        size="sm"
                        onClick={handleAddGudang}
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
                        + Tambah Gudang
                    </Button>
                </div>
                <div className="ml-10 mb-4">
                    <Form.Group style={{ position: 'relative' }}>
                        <Form.Control
                            type="text"
                            placeholder="Cari gudang..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            style={{ paddingLeft: '40px' }}
                        />
                        <FontAwesomeIcon icon={faSearch} style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', color: '#A0AEC0', fontSize: '18px' }} />
                    </Form.Group>
                </div>
                <div className='no-scrollbar flex-1 overflow-y-auto py-6 px-8'>
                    <table className="w-full table-auto">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2" style={{ backgroundColor: '#DA3732', color: '#fff' }}>Nama</th>
                                <th className="border px-4 py-2" style={{ backgroundColor: '#DA3732', color: '#fff' }}>Alamat</th>
                                <th className="border px-4 py-2" style={{ backgroundColor: '#DA3732', color: '#fff' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredGudangData.map((gudang) => (
                                <tr key={gudang.id}>
                                    <td className="border px-4 py-2">{gudang.nama}</td>
                                    <td className="border px-4 py-2">{gudang.alamat}</td>
                                    <td className="border px-4 py-2">
                                        <Button
                                            onClick={() => handleDetailGudang(gudang.id)}
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
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(DaftarGudang);