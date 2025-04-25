import React, { useState } from "react";
import DataCards from "./DataCards";
import {
  FaTemperatureHigh,
  FaWater,
  FaTint,
  FaVial,
  FaBalanceScale,
  FaCloudRain,
  FaTachometerAlt,
  FaBolt,
  FaBiohazard,
  FaFlask,
  FaBurn,
  FaSoap,
  FaFilter,
  FaFire,
  FaArrowsAltV,
} from "react-icons/fa";
import { GiChemicalDrop, GiDustCloud } from "react-icons/gi";
import { RiTestTubeLine } from "react-icons/ri";
import { PiTestTubeDuotone } from "react-icons/pi";

const PARAMETER_RANGES = {
  temperature: { min: 20, max: 35, unit: "°C" },
  tds: { min: 100, max: 500, unit: "mg/L" },
  phLevel: { min: 6.5, max: 8.5, unit: "" },
  turbidity: { min: 0, max: 5, unit: "NTU" },
  waterLevel: { min: 5, max: 15, unit: "m above MSL" },
  dissolvedOxygen: { min: 5, max: 9, unit: "mg/L" },
  BOD: { min: 0, max: 5, unit: "mg/L" },
  nitrate: { min: 0, max: 10, unit: "mg/L" },
  conductivity: { min: 0, max: 1500, unit: "μS/cm" },
  ammonia: { min: 0, max: 1.5, unit: "mg/L" },
  phosphetateLevel: { min: 0, max: 2, unit: "mg/L" },
  sulphurateLevel: { min: 0, max: 1, unit: "mg/L" },
  chloride: { min: 50, max: 300, unit: "mg/L" },
  cod: { min: 0, max: 20, unit: "mg/L" },
};

const PARAMETER_ICONS = {
  temperature: <FaTemperatureHigh />,
  dissolvedOxygen: <FaWater />,
  BOD: <FaTint />,
  phLevel: <RiTestTubeLine />,
  nitrate: <FaVial />,
  turbidity: <PiTestTubeDuotone />,
  tds: <FaTachometerAlt />,
  conductivity: <FaBolt />,
  ammonia: <FaBiohazard />,
  phosphetateLevel: <GiChemicalDrop />,
  sulphurateLevel: <FaBurn />,
  chloride: <FaSoap />,
  cod: <FaFire />,
  waterLevel: <FaArrowsAltV />,
};

const OverviewCards = ({ data }) => {
  const [showAllParameters, setShowAllParameters] = useState(false);
  const latestData = data?.[data.length - 1] || {};

  const displayParams = Object.keys(PARAMETER_RANGES).slice(0, 4);
  const extraParams = Object.keys(PARAMETER_RANGES).slice(4);

  return (
    <div>
      <div className='mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'>
        {displayParams.map((param, index) => (
          <DataCards
            key={param}
            param={param}
            value={latestData[param]}
            range={PARAMETER_RANGES[param]}
            icon={PARAMETER_ICONS[param]}
          />
        ))}
      </div>

      {extraParams.length > 0 && !showAllParameters && (
        <div className='text-center mb-16'>
          <button
            className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center mx-auto cursor-pointer'
            onClick={() => setShowAllParameters(!showAllParameters)}
          >
            Show More Parameters
          </button>
        </div>
      )}

      {showAllParameters && (
        <>
          <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'>
            {extraParams.map((param, index) => (
              <DataCards
                key={param}
                param={param}
                value={latestData[param]}
                range={PARAMETER_RANGES[param]}
                icon={PARAMETER_ICONS[param]}
              />
            ))}
          </div>

          <div className='text-center mb-16'>
            <button
              className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center mx-auto cursor-pointer'
              onClick={() => setShowAllParameters(false)}
            >
              <FaFilter className='mr-2' />
              Show Less
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default OverviewCards;
