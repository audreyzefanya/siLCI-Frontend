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
import { GetDaftarBarang } from '../../../service/daftarbarang/endpoint';
import { fetchDataGudang, fetchDetailGudang } from '../../../service/gudangmanagement/endpoint';
import ModalLoading from '../../../components/modal/modalLoading';
import { Line } from 'react-chartjs-2';
import { BarElement, CategoryScale, Chart, LinearScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';


Chart.register(
    CategoryScale,
    LinearScale,
    BarElement
  );
  
  const InfoCard = ({ title, count }) => {
    return (
      <div className="bg-[#0A2463] text-white p-4 m-4 rounded-md shadow-lg w-1/4 text-center">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-lg">{count} Items</p>
      </div>
    );
  };


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
    const [activeTab, setActiveTab] = useState('Karyawan');

    const [gudangData, setGudangData] = useState([]);
    const [lowStockCount, setLowStockCount] = useState(0);
    const [activeStockCount, setActiveStockCount] = useState(0);
    const [isModalOpenLoading, setIsModalOpenLoading] = useState(false); // State untuk modal loading

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: 'Jumlah Barang per Merek',
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
      });

    

    const fetchUsers = async () => {
        try {
            setIsModalOpenLoading(true);
            const data = await GetAllUsers();
            setUsers(data);
            setInitialUserCount(data.length);  // Store the initial count of users
            updateRoleCounts(data);
        } catch (error) {
            setError(error.toString());
        } finally {
            setIsModalOpenLoading(false); // Set modal loading menjadi tertutup setelah selesai fetch data
        }
    };

    const fetchData = async () => {
        try {
            setIsModalOpenLoading(true); // Set modal loading menjadi terbuka saat memulai fetch data
            const data = await fetchDataGudang();
            const detailedData = await Promise.all(data.map(gudang => fetchDetailGudang(gudang.id)));
            console.log('Detailed Gudang Data:', detailedData);
            setGudangData(detailedData);
            // Hitung jumlah low stock dan active stock
            calculateStockStatus(detailedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsModalOpenLoading(false); // Set modal loading menjadi tertutup setelah selesai fetch data
        }
    };

    const fetchAndProcessData = async () => {
        try {
            setIsModalOpenLoading(true);
            const daftarBarang = await GetDaftarBarang();
            const brands = ['STP', 'Turtle Wax', 'Penray', 'Prestone', 'Armor All', 'SIP', 'CHW', 'AutoGard', 'California Scents'];
            const countPerBrand = brands.map(brand => ({
                brand,
                count: daftarBarang.filter(item => item.merk.nama === brand).length
            }));

            setChartData({
                labels: countPerBrand.map(item => item.brand),
                datasets: [{
                    ...chartData.datasets[0],
                    data: countPerBrand.map(item => item.count)
                }]
            });
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setIsModalOpenLoading(false); // Set modal loading menjadi tertutup setelah selesai fetch data
        }
    };

    useEffect(() => {
        switch (activeTab) {
            case 'Karyawan':
                fetchUsers();
                break;
            case 'Barang':
                fetchAndProcessData();
                break;
            case 'Gudang':
                fetchData();
                break;
            default:
                break; // Add a default case if necessary
        }
    }, [activeTab]);

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

    const calculateStockStatus = (data) => {
        let lowStockCount = 0;
        let activeStockCount = 0;
        data.forEach(gudang => {
            gudang.barang.forEach(barang => {
                if (barang.stok < 20) {
                    lowStockCount++;
                } else {
                    activeStockCount++;
                }
            });
        });
        setLowStockCount(lowStockCount);
        setActiveStockCount(activeStockCount);
    };

    const processChartData = (gudang) => {
        let chartData = {
            labels: [],
            datasets: []
        };

        if (gudang.barang) {
            let gudangDataset = {
                label: 'Jumlah Barang',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(218, 55, 50, 0.4)',
                borderColor: 'rgba(218, 55, 50, 1)',
                borderWidth: 10,
                borderCapStyle: 'round',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(218, 55, 50, 1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(218, 55, 50, 1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: []
            };

            gudang.barang.forEach(barang => {
                if (!chartData.labels.includes(barang.nama_barang)) {
                    chartData.labels.push(barang.nama_barang);
                }
                gudangDataset.data.push(barang.stok);
            });

            chartData.datasets.push(gudangDataset);
        }

        return chartData;
    };

    return (
        <div className='flex w-screen h-screen'>
            <Sidebar currentNavigation={1} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
            <div className='w-full h-screen flex flex-col'>
                <Header title=''/>
                <div className="text-3xl font-bold mb-10 ml-10 mt-8">Dashboard</div>
                <TabDash activeTab={activeTab} onTabChange={handleTabChange} />
                <br />

                {activeTab === 'Karyawan' && (
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
                        <ModalLoading title="Loading..." subtitle="Please wait a moment" isOpen={isModalOpenLoading} />
                    </React.Fragment>
                )}


                {activeTab === 'Barang' && (
                    <div className="flex flex-col w-full">
                        <div className="flex flex-wrap justify-center items-center mt-4">
                            {chartData.labels.map((label, index) => (
                                <InfoCard key={label} title={label} count={chartData.datasets[0].data[index]} />
                            ))}
                        </div>
                        <div className="p-6">
                            <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
                        </div>
                        <ModalLoading title="Loading..." subtitle="Please wait a moment" isOpen={isModalOpenLoading} />
                    </div>
)}
                {activeTab === 'Gudang' && (
                    <div className="p-6">
                        <div className="border rounded-lg overflow-hidden shadow-md mb-6 bg-green-200">
                            <div className="p-4">
                                <h2 className="text-2xl font-semibold mb-2">Stock Overview</h2>
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Category
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Count
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-red-500 font-bold">Low Stock Items</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-red-500 font-bold">{lowStockCount}</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-green-500 font-bold">Active Items</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-green-500 font-bold">{activeStockCount}</div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <h2 className="text-2xl font-semibold mb-2 ml-10 mt-8">Grafik Barang</h2>
                        <hr className="ml-10 mr-10 mb-6 border-gray-300"/>
                        <div className="flex flex-wrap justify-start p-6">
                            {gudangData.map((gudang, index) => (
                                <div key={index} className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 p-4">
                                    <div className="border rounded-lg overflow-hidden shadow-md">
                                        <div className="p-4">
                                            <h2 className="text-xl font-semibold mb-2">{gudang.nama_gudang}</h2>
                                            <Line
                                                data={processChartData(gudang)}
                                                options={{
                                                    title: {
                                                        display: false,
                                                    },
                                                    legend: {
                                                        display: false,
                                                    },
                                                    scales: {
                                                        x: {
                                                            title: {
                                                                display: true,
                                                                text: 'Nama Barang',
                                                                font: {
                                                                    weight: 'bold'
                                                                }
                                                            }
                                                        },
                                                        y: {
                                                            title: {
                                                                display: true,
                                                                text: 'Jumlah Barang',
                                                                font: {
                                                                    weight: 'bold'
                                                                }
                                                            },
                                                            ticks: {
                                                                beginAtZero: true
                                                            }
                                                        }
                                                    }
                                                }}
                                                style={{ width: '400px', height: '400px' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <ModalLoading title="Loading..." subtitle="Please wait a moment" isOpen={isModalOpenLoading} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
