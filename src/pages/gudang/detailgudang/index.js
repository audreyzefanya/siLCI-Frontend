import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchDetailGudang } from '../../../service/gudangmanagement/endpoint';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from '../../../state/redux';
import Sidebar from '../../../components/sidebar/manajer';
import Header from '../../../components/header';
import DataTable from 'react-data-table-component';
import { Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';

const DetailGudang = (props) => {
    const { id_gudang } = useParams();
    const navigateTo = useNavigate();
    const [detailGudang, setDetailGudang] = useState(null);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        fetchDetail();
    }, []);

    const fetchDetail = async () => {
        try {
            const data = await fetchDetailGudang(id_gudang);
            setDetailGudang(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    const columns = [
        {
            name: 'Nama Barang',
            selector: 'nama_barang',
            sortable: true,
        },
        {
            name: 'Stok',
            selector: 'stok',
            sortable: true,
        },
    ];

    const filteredData = detailGudang ? detailGudang.barang.filter((item) =>
        item.nama_barang.toLowerCase().includes(searchText.toLowerCase())
    ) : [];

    return (
        <div className='flex w-screen h-screen'>
            <Sidebar currentNavigation={1} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
            <div className='w-full h-screen flex flex-col'>
                <Header title={detailGudang ? detailGudang.nama_gudang : ''}/>
                <div className='no-scrollbar flex-1 overflow-y-auto bg-neutral20 py-3 px-8'>
                    <div className="alamat-gudang">
                        {detailGudang ? detailGudang.alamat_gudang : ''}
                    </div>
                    <br></br>
                    <DataTable
                        title={
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ marginRight: '1075px', color: '#ffffff' }}>Detail Gudang</span>

                            </div>
                        }
                        columns={columns}
                        data={filteredData}
                        pagination
                        fixedHeader
                        subHeader
                        subHeaderComponent={[
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchText}
                                onChange={handleSearch}
                                style={{ marginRight: '10px', padding: '5px', border: '1px solid #ced4da', borderRadius: '5px' }}
                            />,
                        ]}
                    />
                </div>
            </div>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailGudang);
