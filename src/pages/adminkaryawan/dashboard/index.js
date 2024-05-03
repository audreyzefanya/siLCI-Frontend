import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { connect } from 'react-redux';
import Header from '../../../components/header';
import Sidebar from '../../../components/sidebar/adminkaryawan';
import { GetDaftarBarang } from '../../../service/daftarbarang/endpoint';
import { mapDispatchToProps, mapStateToProps } from '../../../state/redux';

const InfoCard = ({ title, count }) => {
  return (
    <div className="bg-[#0A2463] text-white p-4 m-4 rounded-md shadow-lg w-1/4 text-center">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-lg">{count} Items</p>
    </div>
  );
};



const Dashboard = (props) => {
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

  useEffect(() => {
    const fetchAndProcessData = async () => {
        try {
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
        }
    };

    fetchAndProcessData();
  }, []);

  return (
    <div className='flex w-screen h-screen'>
      <Sidebar currentNavigation={1} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
        <div className='flex flex-col w-full'>
            <Header title="" />
            <div className="flex flex-wrap justify-center items-center">
              {chartData.labels.map((label, index) => (
                <InfoCard key={label} title={label} count={chartData.datasets[0].data[index]} />
              ))}
            </div>
            <div className="p-6">
                <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
        </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
