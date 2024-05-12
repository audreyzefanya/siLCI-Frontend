import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Header from '../../../components/header';
import Sidebar from '../../../components/sidebar/stafpabrik';
import { getAllBarangPabrik, getAllBatchProduksi, getAllPermintaanPengiriman } from '../../../service/pabrik/endpoint';
import { mapDispatchToProps, mapStateToProps } from '../../../state/redux';
import { Bar } from 'react-chartjs-2';
import ModalLoading from '../../../components/modal/modalLoading';

const Dashboard = (props) => {
    const [batchProduksiCount, setBatchProduksiCount] = useState([]);
    const [permintaanPengirimanCount, setPermintaanPengirimanCount] = useState([]);
    const [stokBarangPerPabrik, setStokBarangPerPabrik] = useState([]);
//    const [statusBatchProduksiPerPabrik, setStatusBatchProduksiPerPabrik] = useState([]);
    const [isModalOpenLoading, setIsModalOpenLoading] = useState(false); // State untuk modal loading

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setIsModalOpenLoading(true); // Set modal loading menjadi terbuka saat memulai fetch data
            const batchProduksiStatus = await fetchBatchProduksiStatus();
            const permintaanPengirimanStatus = await fetchPermintaanPengirimanStatus();
            const stokBarangPerPabrikData = await fetchStokBarangPerPabrik();
//            const statusBatchProduksiPerPabrikData = await fetchStatusBatchProduksiPerPabrik();
            setBatchProduksiCount(batchProduksiStatus);
            setPermintaanPengirimanCount(permintaanPengirimanStatus);
            setStokBarangPerPabrik(stokBarangPerPabrikData);
//            setStatusBatchProduksiPerPabrik(statusBatchProduksiPerPabrikData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsModalOpenLoading(false); // Set modal loading menjadi tertutup setelah selesai fetch data
        }
    };

    const fetchBatchProduksiStatus = async () => {
        const data = await getAllBatchProduksi();
        let batchData = {
            "Sedang Diproses": 0,
            "Menunggu QC": 0,
            "Selesai dan menunggu dikirim": 0,
            "Terkirim": 0,
            "Gagal": 0,
        };
        // Iterasi melalui setiap batch produksi
        data.forEach(batch => {
            const status = getStatusString(batch.status);
                batchData[status]++;
        });
        // Output objek batchData yang berisi jumlah masing-masing status
        return batchData;
    };

    const fetchPermintaanPengirimanStatus = async () => {
        const data = await getAllPermintaanPengiriman();
        let permintaanData = {
            "Menunggu Konfirmasi": 0,
            "Sedang Diproses": 0,
            "Telah Dikirim": 0,
            "Telah Diterima": 0,
        };
        // Iterasi melalui setiap permintaan pengiriman
        data.forEach(permintaan => {
            const status = getStatusStringPermintaanPengiriman(permintaan.status);
            if (!permintaanData[status]) {
                permintaanData[status] = 1;
            } else {
                permintaanData[status]++;
        }
    });
    // Output objek permintaanData yang berisi jumlah masing-masing status
    return permintaanData;
    }

    const fetchStokBarangPerPabrik = async () => {
        try {
            const data = await getAllBarangPabrik();
            let stokBarangData = {};

            // Iterasi melalui setiap data barang pabrik
            data.forEach(item => {
                const namaPabrik = item.pabrik.nama;
                const namaBarang = item.barang.nama;
                const stok = item.stok;

                if (!stokBarangData[namaPabrik]) {
                    stokBarangData[namaPabrik] = [];
                }

                stokBarangData[namaPabrik].push({ namaBarang, stok });
            });
            return stokBarangData;
        } catch (error) {
            console.error('Error fetching stock data per factory:', error);
            return {};
        }
    };

    const getStatusString = (status) => {
        switch (status) {
            case 1:
                return 'Sedang Diproses';
            case 2:
                return 'Menunggu QC';
            case 3:
                return 'Selesai dan menunggu dikirim';
            case 4:
                return 'Terkirim';
            case 5:
                return 'Gagal';
            default:
                return 'Status Tidak Dikenal';
        }
    };

    const getStatusStringPermintaanPengiriman = (status) => {
        switch (status) {
            case 1:
                return 'Menunggu Konfirmasi';
            case 2:
                return 'Sedang Diproses';
            case 3:
                return 'Telah Dikirim';
            case 4:
                return 'Telah Diterima';
            default:
                return 'Status Tidak Dikenal';
        }
    };

const processChartData = (stokBarangData) => {
    let chartData = {
        labels: [],
        datasets: []
    };

    // Iterasi melalui setiap pabrik
    Object.entries(stokBarangData).forEach(([namaPabrik, dataBarang]) => {
        let pabrikDataset = {
            label: namaPabrik,
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(218, 55, 50, 0.4)',
            borderColor: 'rgba(218, 55, 50, 1)',
            borderWidth: 5,
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

        // Tentukan apakah dataBarang adalah array atau objek tunggal
        const barangData = Array.isArray(dataBarang) ? dataBarang : [dataBarang];

        // Iterasi melalui setiap barang di dalam pabrik
        barangData.forEach(barang => {
            pabrikDataset.data.push(barang.stok); // Tambahkan stok barang ke dalam dataset
            chartData.labels.push(barang.namaBarang); // Tambahkan nama barang ke dalam label
        });

        chartData.datasets.push(pabrikDataset); // Tambahkan dataset pabrik ke dalam chart data
    });

    return chartData;
};

    return (
        <div className='flex w-screen h-screen'>
            <Sidebar currentNavigation={1} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
            <div className='w-full h-screen flex flex-col'>
                <Header title=''/>
                <div className="text-3xl font-bold mb-10 ml-10 mt-8">Dashboard Pabrik</div>
                <div className="p-6">
                    <div className="border rounded-lg overflow-hidden shadow-md mb-6 bg-green-200">
                        <div className="p-4">
                            <h2 className="text-2xl font-semibold mb-2 text-center">Jumlah Status Batch Produksi</h2>
                                <div className="flex flex-wrap justify-center items-center">
                                    {Object.keys(batchProduksiCount).length > 0 ? (
                                        Object.keys(batchProduksiCount).map((key, index) => (
                                            <div
                                                key={index}
                                                className="bg-[#0A2463] text-white p-4 m-4 rounded-md shadow-lg text-center"
                                                style={{ width: 'max-content' }}
                                            >
                                                <h2 className="text-xl font-semibold">{key}</h2>
                                                <p className="text-lg">{batchProduksiCount[key]} Items</p>
                                            </div>
                                        ))
                                    ) : (
                                        <div>No data available</div>
                                    )}
                                </div>
                        </div>
                    </div>
                    <div className="border rounded-lg overflow-hidden shadow-md mb-6 bg-green-200">
                    <div className="p-4">
                    <h2 className="text-2xl font-semibold mb-2 text-center">Jumlah Status Permintaan Pengiriman</h2>
                    <div className="flex flex-wrap justify-center items-center">
                    <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status Permintaan Pengiriman
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Count
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {Object.keys(permintaanPengirimanCount).length > 0 ? (
                        Object.keys(permintaanPengirimanCount).map((key, index) => (
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-red-500 font-bold">{key} </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-red-500 font-bold">{permintaanPengirimanCount[key]} Items</div>
                            </td>
                        </tr>
                        ))
                    ) : (
                        <div>No data available</div>
                    )}
                    </tbody>
                </table>
                </div>
                </div>
                </div>
                </div>

               <div className="text-2xl font-semibold mb-2 ml-10 mt-8">Grafik Barang Per Pabrik</div>
                <hr className="ml-10 mr-10 mb-6 border-gray-300"/>
                <div className="flex flex-wrap justify-start p-6">
                {Object.entries(stokBarangPerPabrik).map(([namaPabrik, dataBarang], index) => (
                    <div key={index} className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 p-4">
                        <div className="border rounded-lg overflow-hidden shadow-md">
                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-2">{namaPabrik}</h2>
                                <Bar
                                    data={processChartData(dataBarang)}
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
