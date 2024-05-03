import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Header from '../../../components/header';
import Sidebar from '../../../components/sidebar/stafgudang';
import { fetchDataGudang, fetchDetailGudang } from '../../../service/gudangmanagement/endpoint';
import { mapDispatchToProps, mapStateToProps } from '../../../state/redux';
import { Line } from 'react-chartjs-2';
import ModalLoading from '../../../components/modal/modalLoading';

const Dashboard = (props) => {
    const [gudangData, setGudangData] = useState([]);
    const [lowStockCount, setLowStockCount] = useState(0);
    const [activeStockCount, setActiveStockCount] = useState(0);
    const [isModalOpenLoading, setIsModalOpenLoading] = useState(false); // State untuk modal loading

    useEffect(() => {
        fetchData();
    }, []);

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
                <div className="text-3xl font-bold mb-8 ml-10 mt-8">Dashboard</div>
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
                                            <div className="text-sm font-medium text-red-500 font-bold">Low Stock Items </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-red-500 font-bold">{lowStockCount}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-green-500 font-bold">Active Items </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-green-500 font-bold">{activeStockCount}</div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <h2 className="text-2xl font-semibold mb-2 ml-10 mt-8">Grafik Barang </h2>
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
                <ModalLoading title="Loading..." subtitle="Please wait a moment" isOpen={isModalOpenLoading} /> {/* Menampilkan modal loading */}
            </div>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
