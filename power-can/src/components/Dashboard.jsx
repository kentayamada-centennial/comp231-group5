// src/components/Dashboard/Dashboard.js
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import React, { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import './Dashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [usersData, setUsersData] = useState([]);
  const [singleChartData, setSingleChartData] = useState({});
  const [chartData, setChartData] = useState({});
  const [showCompare, setShowCompare] = useState(false);
  const [singleNameFilter, setSingleNameFilter] = useState("");
  const [numComparisons, setNumComparisons] = useState(2);
  const [nameFilters, setNameFilters] = useState(["", ""]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://power-canada-group-backend.onrender.com/api/users');
        const data = await response.json();
        setUsersData(data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (singleNameFilter && !showCompare) {
      const user = usersData.find(user => user.name.toLowerCase() === singleNameFilter.trim().toLowerCase());
      if (user) {
        setSingleChartData({
          labels: user.energyData.map(data => data.month),
          datasets: [
            {
              label: `Energy Generated (kWh) for ${user.name}`,
              data: user.energyData.map(data => parseInt(data.kWh)),
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderWidth: 2,
              tension: 0.4
            }
          ],
        });
      } else {
        setSingleChartData({});
      }
    }
  }, [singleNameFilter, usersData, showCompare]);

  useEffect(() => {
    if (showCompare) {
      const datasets = nameFilters.map((filter, index) => {
        const user = usersData.find(user => user.name.toLowerCase() === filter.toLowerCase());
        return user
          ? {
              label: `Energy Generated (kWh) for ${user.name}`,
              data: user.energyData.map(data => parseInt(data.kWh)),
              borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
              backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`,
              borderWidth: 2,
              tension: 0.4
            }
          : null;
      }).filter(dataset => dataset !== null);

      setChartData({
        labels: usersData.length > 0 ? usersData[0].energyData.map(data => data.month) : [],
        datasets: datasets
      });
    }
  }, [nameFilters, usersData, showCompare]);

  const handleNumComparisonsChange = (e) => {
    const num = Math.min(Math.max(parseInt(e.target.value, 10), 2), 5);
    setNumComparisons(num);
    setNameFilters(Array(num).fill(""));
  };

  const handleNameFilterChange = (index, value) => {
    const newNameFilters = [...nameFilters];
    newNameFilters[index] = value;
    setNameFilters(newNameFilters);
  };

  const toggleCompare = () => {
    setShowCompare(!showCompare);
    if (!showCompare) {
      setSingleChartData({});
      setSingleNameFilter("");
      setNameFilters(["", ""]);
    }
    setChartData({});
  };

  return (
    <div className="dashboard-container">
      {!showCompare && (
        <>
          <input
            type="text"
            value={singleNameFilter}
            onChange={e => setSingleNameFilter(e.target.value)}
            placeholder="Enter user name for single view"
            className="dashboard-input"
          />
          <div className='chart-container'>
            {singleChartData.datasets && (
              <Line 
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    title: {
                      display: true,
                      text: `Energy Generation Chart for ${singleNameFilter}`,
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
                data={singleChartData}
              />
            )}
          </div>
        </>
      )}
      <button onClick={toggleCompare} className="compare-button">
        {showCompare ? 'Hide Compare' : 'Compare'}
      </button>
      {showCompare && (
        <>
          <input
            type="number"
            value={numComparisons}
            onChange={handleNumComparisonsChange}
            placeholder="Number of comparisons (2-5)"
            className="dashboard-input"
          />
          <br />
          {nameFilters.map((filter, index) => (
            <input
              key={index}
              type="text"
              value={filter}
              onChange={e => handleNameFilterChange(index, e.target.value)}
              placeholder={`Enter user name ${index + 1}`}
              className="dashboard-input"
            />
          ))}
          <div className='chart-container'>
            {chartData.datasets && (
              <Line 
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    title: {
                      display: true,
                      text: 'Monthly Energy Comparison',
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
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
