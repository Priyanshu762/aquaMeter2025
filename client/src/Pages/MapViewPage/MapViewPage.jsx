import React, { useState, useEffect } from 'react';
import { DeviceHeatmap, MapView, ParametersBox } from '../../Components';
import geojsonData from '../../Data/stationData/geojsonData';

const MapViewPage = () => {
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(Math.floor(Math.random() * geojsonData.features.length));
    const [selectedDevice, setSelectedDevice] = useState(geojsonData.features[currentIndex].properties);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const currentDevice = geojsonData.features[currentIndex].properties;
        setSelectedMarker(currentDevice);
        setSelectedDevice(currentDevice); 
        console.log(`Current Device: in map `, currentDevice);
    }, [currentIndex]);

    const handleNext = () => {
        setProgress(0);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % geojsonData.features.length);
    };

    const handlePrevious = () => {
        setProgress(0);
        setCurrentIndex((prevIndex) => (prevIndex - 1 + geojsonData.features.length) % geojsonData.features.length);
    };

    return (
        <div className="flex flex-col gap-6 px-6 md:px-10 mt-10">
            <div className="flex flex-col md:flex-row gap-6 w-full z-10">
                <div className="flex flex-col justify-center items-center gap-4">
                    <div className='z-10'>
                    <MapView onMarkerClick={(device) => {
                        setSelectedMarker(device);
                        setSelectedDevice(device);
                    }} deviceData={selectedDevice}/>
                    </div>
                    <div className='z-20'>
                    <DeviceHeatmap deviceId={selectedDevice?.deviceId} />
                    </div>
                </div>
                <div className="w-full">
                    <ParametersBox 
                        data={selectedMarker}
                        onNext={handleNext} 
                        onPrevious={handlePrevious}
                        progress={progress}
                        setProgress={setProgress}
                    />
                </div>
            </div>
        </div>
    );
};

export default MapViewPage;
