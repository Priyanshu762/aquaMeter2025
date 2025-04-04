import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { StatCard, OverviewCards, DeviceDataTable } from '../../Components';
import { FaMicrochip, FaWater, FaPowerOff, FaBolt } from "react-icons/fa";

const Dashboard = () => {

  const [data, setData] = useState([]);
  useEffect(() => {
      async function fetchData() {
          try {
              const response = await axios.get('https://sih-2024-qyug.onrender.com/api/sensor-data');
              const formattedData = response.data.map(item => ({
                  timestamp: new Date(item.timestamp).toLocaleString('en-US', {month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }), // Adjust format as needed
                  temperature: item.temperature,
                  turbidity: item.turbidity,
                  phLevel: item.phLevel,
              }));
              setData(formattedData);
          } catch (error) {
              console.error("Error fetching data:", error);
          }
      }
      fetchData();
  }, []);

  return (
    <div className='text-center'>
      <span className='text-4xl font-medium'>
        Water Quality Dashboard
      </span>
      <div>
        <div className='mt-4'>
          <OverviewCards data={data} />
          {/* <DataCards value={20} param={'temperature'} range={{min: 20, max: 40, unit: '°C'}} icon={<FaTemperatureHigh />} /> */}
        </div>
        <div className='flex justify-center gap-4 mt-8'>
          <StatCard name="Total Devices" icon={FaMicrochip} value="85" color="#3FA2F6" />
          <StatCard name="Total Water Bodies Covered" icon={FaWater} value="7" color="#83B4FF" />
          <StatCard name="Active Devices" icon={FaBolt} value="79" color="#F6E96B" />
          <StatCard name="Inactive Devices" icon={FaPowerOff} value="6" color="#FF1E00" />
        </div>
        <div>
          <DeviceDataTable data={data} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
