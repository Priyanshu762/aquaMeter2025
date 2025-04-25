import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import {
  StatCard,
  OverviewCards,
  DeviceDataTable
} from '../../Components';
import {
  FaMicrochip,
  FaWater,
  FaPowerOff,
  FaBolt,
  FaPlay,
  FaPause,
  FaArrowRight,
  FaArrowLeft
} from 'react-icons/fa';
import geojsonData from '../../Data/stationData/geojsonData';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const intervalRef = useRef(null);

  const getStationDetails = (deviceId) =>
    geojsonData.features.find(
      (feature) => feature.properties.deviceId === deviceId
    )?.properties || {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://sih-2024-qyug.onrender.com/api/sensor-data'
        );
        const formatted = response.data.map((item) => {
          const station = getStationDetails(item.deviceId);
          return {
            deviceId: item.deviceId,
            location: station?.name || 'Unknown Station',
            timestamp: new Date(item.timestamp).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }),
            temperature: item.temperature,
            turbidity: item.turbidity,
            phLevel: item.phLevel
          };
        });
        setData(formatted);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const filteredData = data.filter(
    (item) =>
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.deviceId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (isPlaying && filteredData.length > 0) {
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredData.length);
            return 0;
          }
          return prev + 1;
        });
      }, 50);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, filteredData.length]);

  const handlePlayPause = () => setIsPlaying((prev) => !prev);

  const handleNext = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentIndex((prev) => (prev + 1) % filteredData.length);
  };

  const handlePrev = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentIndex((prev) =>
      prev === 0 ? filteredData.length - 1 : prev - 1
    );
  };

  const currentData = filteredData[currentIndex];

  return (
    <div className="max-w-7xl mx-auto py-1 text-gray-900 dark:text-white ">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold">🌊 Water Quality Dashboard</h1>
      </div>

      <div className="flex justify-between gap-12 items-center mb-8">
        <input
          type="text"
          placeholder="Search location or device ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex flex-wrap justify-center items-center gap-4">
          <button
            onClick={handlePrev}
            className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-black dark:text-white px-4 py-2 rounded-full shadow transition"
          >
            <FaArrowLeft />
          </button>

          <button
            onClick={handlePlayPause}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow flex items-center gap-2"
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
            <span className="text-sm font-medium">
              {filteredData.length > 0 && currentIndex < filteredData.length - 1
                ? filteredData[currentIndex + 1]?.location
                : '...'}
            </span>
          </button>

          <button
            onClick={handleNext}
            className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-black dark:text-white px-4 py-2 rounded-full shadow transition"
          >
            <FaArrowRight />
          </button>
        </div>

        <div className="w-full md:w-1/6 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ml-[-220px]">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-150"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {currentData && (
        <div className="mb-6">
          <OverviewCards data={[currentData]} />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-6">
        <StatCard name="Total Devices" icon={FaMicrochip} value="1" color="#3FA2F6" />
        <StatCard name="Water Bodies Covered" icon={FaWater} value="0" color="#83B4FF" />
        <StatCard name="Active Devices" icon={FaBolt} value="1" color="#F6E96B" />
        <StatCard name="Inactive Devices" icon={FaPowerOff} value="0" color="#FF1E00" />
      </div>

      <div className="mt-4">
        <DeviceDataTable data={filteredData} />
      </div>
    </div>
  );
};

export default Dashboard;
