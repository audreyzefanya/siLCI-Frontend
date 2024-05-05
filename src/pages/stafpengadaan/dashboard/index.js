import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Header from '../../../components/header';
import Sidebar from '../../../components/sidebar/stafpengadaan';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { mapDispatchToProps, mapStateToProps } from '../../../state/redux';
import { GetDashboardStafPengadaan } from '../../../service/dashboard/endpoint';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = (props) => {
  const [dashboardDetail, setDashboardDetail] = useState(null);
  const [chartData, setChartData] = useState(null);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Jumlah Pengadaan Barang Impor 30 Hari Terakhir',
      },
      scales: {
        y: {
            type: 'linear',
        }
    }
    },
  };
  
  const labels = [];
  const dataPengadaan = [];

  const fetchDetails = async () => {
    try {
        const response = await GetDashboardStafPengadaan();
        setDashboardDetail(response);
    } catch (error) {
        console.error('Error fetching dashboard details:', error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  useEffect(() => {
    if (dashboardDetail) {
      const today = new Date();
      for (let i = 29; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          labels.push(date.toISOString().split('T')[0]);
      }

      labels.forEach(label => {
          const dataPoint = dashboardDetail.jumlah_pengadaan_by_date.find(item => item.date === label);
          if (dataPoint) {
              dataPengadaan.push(dataPoint.jumlah);
          } else {
              dataPengadaan.push(0);
          }
      });
      
      setChartData({
        labels,
        datasets: [
          {
            label: 'Jumlah',
            data: dataPengadaan,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      });
    }
}, [dashboardDetail]);

  if (!dashboardDetail) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className='flex w-screen h-screen'>
        <Sidebar currentNavigation={1} isExpand={props.isExpandSidebar} onClick={props.handleSidebarStatus}/>
        <div className='w-full h-screen flex flex-col'>
            <Header title=''/>
            <div className="text-3xl font-bold mb-10 ml-10 mt-8">Dashboard</div>
            <div className="flex justify-between mx-10">
                <div style={{ backgroundColor: '#2C358C', color: 'white', padding: '20px', borderRadius: '10px', textAlign: 'center', width: '30%' }}>
                    <h2>Total Pengadaan Barang Impor</h2>
                    <p style={{ fontSize: '36px', fontWeight: 'bold' }}>{dashboardDetail.jumlah_pengadaan}</p>
                </div>
                <div style={{ backgroundColor: '#2C358C', color: 'white', padding: '20px', borderRadius: '10px', textAlign: 'center', width: '30%' }}>
                    <h2>Jumlah Pengadaan Aktif</h2>
                    <p style={{ fontSize: '36px', fontWeight: 'bold' }}>{dashboardDetail.jumlah_pengadaan_aktif}</p>
                </div>
                <div style={{ backgroundColor: '#2C358C', color: 'white', padding: '20px', borderRadius: '10px', textAlign: 'center', width: '30%' }}>
                    <h2>Sedang Menunggu Pembayaran</h2>
                    <p style={{ fontSize: '36px', fontWeight: 'bold' }}>{dashboardDetail.jumlah_pengadaan_payment}</p>
                </div>
            </div>
            <br></br>
            {chartData && (
              <div className="flex justify-center mx-10" style={{ height: '400px', border: '1px solid #2C358C' }}>
                  <Line options={options} data={chartData} />
              </div>
            )}
        </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);