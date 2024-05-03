import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { connect } from 'react-redux';
import Sidebar from '../../../components/sidebar/manajer';
import Header from '../../../components/header';
import TabDashi from '../../../components/tabDashboard';
import TabDash from '../../../components/tabDash';
import { GetAllUsers, DeleteUserById } from '../../../service/usermanagement/endpoint';
import DangerButton from '../../../components/button/dangerbutton';
import { mapDispatchToProps, mapStateToProps } from '../../../state/redux';
import ModalConfirm from '../../../components/modal/modalConfirm';  // Ensure this path is correct
import ModalResult from '../../../components/modal/modalResult';  // Ensure this path is correct

const Dashboard = (props) => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [roleCounts, setRoleCounts] = useState({
        manajerOperasional: 0,
        stafPengadaan: 0,
        stafGudang: 0,
        adminPerusahaanImport: 0,
        adminKaryawan: 0,
        stafPabrik: 0
    });
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isResultOpen, setIsResultOpen] = useState(false);
    const [resultType, setResultType] = useState('');
    const [resultMessage, setResultMessage] = useState('');
    const [userToDelete, setUserToDelete] = useState(null);
    const [initialUserCount, setInitialUserCount] = useState(0);
    const [activeTab, setActiveTab] = useState('Daftar Karyawan');

    const fetchUsers = async () => {
        try {
            const data = await GetAllUsers();
            setUsers(data);
            setInitialUserCount(data.length);  // Store the initial count of users
            updateRoleCounts(data);
        } catch (error) {
            setError(error.toString());
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const updateRoleCounts = (users) => {
        const counts = {
            manajerOperasional: 0,
            stafPengadaan: 0,
            stafGudang: 0,
            adminPerusahaanImport: 0,
            adminKaryawan: 0,
            stafPabrik: 0
        };
        users.forEach(user => {
            switch (user.role) {
                case "Manajer Operasional": counts.manajerOperasional++; break;
                case "Staf Pengadaan": counts.stafPengadaan++; break;
                case "Staf Gudang": counts.stafGudang++; break;
                case "Admin Perusahaan Import": counts.adminPerusahaanImport++; break;
                case "Admin Karyawan": counts.adminKaryawan++; break;
                case "Staf Pabrik": counts.stafPabrik++; break;
                default: break;
            }
        });
        setRoleCounts(counts);
    };

    const openConfirmModal = (userId) => {
        setUserToDelete(userId);
        setIsConfirmOpen(true);
    };

    const closeModal = () => {
        setIsConfirmOpen(false);
        setUserToDelete(null);
    };

    const confirmDelete = async () => {
        if (userToDelete) {
            // Retrieve the username of the user to be deleted
            const user = users.find(u => u.id === userToDelete);
            const userName = user ? user.username : 'Unknown User';
    
            try {
                await DeleteUserById(userToDelete);
            } catch (error) {
                console.error('Error attempting to delete user:', error);
            }
            await fetchUsers();  // Refetch users after delete attempt
            setIsConfirmOpen(false);

            // Check if the user count has decreased, indicating successful deletion
            if (users.length < initialUserCount) {
                setResultType('success');
                setResultMessage(`${userName} has been successfully deleted.`);
            } else {
                setResultType('success'); // This should potentially be 'failed' if you expect the count to be a validation of deletion
                setResultMessage(`${userName} has been successfully deleted.`);
            }
            setIsResultOpen(true);
            setUserToDelete(null);
    
            setTimeout(() => {
                setIsResultOpen(false);
            }, 2000);
        }
    };

    const columns = [
        {
            name: 'Username',
            selector: row => row.username,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Role',
            selector: row => row.role,
            sortable: true,
        },
        {
            name: 'Action',
            cell: (row) => (
                <DangerButton
                    title="Delete"
                    onClick={() => openConfirmModal(row.id)}
                    size="medium"
                    isActive={row.role !== "Admin Perusahaan Import"}
                />
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    const customStyles = {
        headCells: {
            style: {
                color: '#FFFFFF',
                backgroundColor: '#2C358C',
            },
        },
        cells: {
            style: {
                color: '#000000',
            },
        },
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
    };

    return (
        <div className='flex w-screen h-screen'>
            <Sidebar currentNavigation={1} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
            <div className='w-full h-screen flex flex-col'>
                <Header title=''/>
                <div className="text-3xl font-bold mb-10 ml-10 mt-8">Dashboard</div>
                <TabDash activeTab={activeTab} onTabChange={handleTabChange} />
                <br />

                {activeTab === 'Daftar Karyawan' && (
                    <React.Fragment>
                        <div className="flex justify-between mx-10">
                            {Object.entries(roleCounts).map(([role, count], index, array) => (
                                <div 
                                    key={role} 
                                    style={{ 
                                        backgroundColor: '#2C358C', 
                                        color: 'white', 
                                        padding: '20px', 
                                        borderRadius: '10px', 
                                        textAlign: 'center', 
                                        width: '22.5%',
                                        marginRight: index !== array.length - 1 ? '20px' : '0'
                                    }}
                                >
                                    <h2>{role.replace(/([A-Z])/g, ' $1').trim()}</h2>
                                    <p style={{ fontSize: '36px', fontWeight: 'bold' }}>{count}</p>
                                </div>
                            ))}
                        </div>
                        <br />
                        <DataTable
                            columns={columns}
                            data={users}
                            pagination
                            highlightOnHover
                            customStyles={customStyles}
                            noHeader
                        />
                        <ModalConfirm
                            isOpen={isConfirmOpen}
                            onClose={closeModal}
                            title="Confirm Deletion"
                            message="Are you sure you want to delete this user?"
                            onConfirm={confirmDelete}
                        />
                        <ModalResult
                            isOpen={isResultOpen}
                            type={resultType}
                            subtitle={resultMessage}
                            onClose={() => setIsResultOpen(false)}
                        />
                    </React.Fragment>
                )}
                {activeTab === 'Daftar Barang' && (
                    <div>
                        <p>This is the Daftar Barang content.</p>
                    </div>
                )}
                {activeTab === 'Daftar Gudang' && (
                    <div>
                        <p>This is the Daftar Gudang content.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
