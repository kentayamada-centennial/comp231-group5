// src/components/UserDashboard/UserDashboard.js
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import React, { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import './UserDashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function UserDashboard() {
  const { name } = useParams(); // Get the user's name from the URL
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`https://power-canada-group-backend.onrender.com/api/users/${name}`);
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }

    fetchData();
  }, [name]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const chartData = {
    labels: userData.energyData.map(data => data.month),
    datasets: [
      {
        label: `Energy Generated (kWh) for ${userData.name}`,
        data: userData.energyData.map(data => parseInt(data.kWh)),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        tension: 0.4
      }
    ],
  };

  return (
    <div className="user-dashboard-container">
      <h1>Welcome, {userData.name}</h1>
      <div className='chart-container'>
        <Line
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: `Energy Generation Chart for ${userData.name}`,
              },
              scales: {
                y: {
                  title: {
                    display: true,
                    text: 'Energy Generated (kWh)'
                  }
                },
                x: {
                  title: {
                    display: true,
                    text: 'Month'
                  }
                }
              }
            },
          }}
          data={chartData}
        />
      </div>
    </div>
  );
}

export default UserDashboard;
