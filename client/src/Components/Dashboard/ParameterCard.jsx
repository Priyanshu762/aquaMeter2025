import React from "react";
import { motion } from "framer-motion";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { BsBarChartFill } from "react-icons/bs";
import { FaTemperatureHigh } from "react-icons/fa6";

const ParameterCard = ({ param, value, range, index }) => {
  const isInRange = value >= range.min && value <= range.max;

  return (
    <motion.div
      key={param}
      className={`rounded-xl border p-6 shadow-md transition-colors duration-300
        bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
    >
      <div className='flex items-center justify-between'>
        <div className="flex flex-col justify-start items-start">
          <h3 className='text-sm font-medium text-gray-600 dark:text-gray-400'>
            {param.charAt(0).toUpperCase() + param.slice(1)}
          </h3>
          <p className='mt-1 text-xl font-semibold text-gray-900 dark:text-white'>
            {value ? value?.toFixed(2) : 'N.A.'} {value ? range.unit : ''}
          </p>
        </div>

        <div
          className={`p-3 rounded-full ${
            isInRange ? "bg-green-500/20" : "bg-red-500/20"
          }`}
        >
          <FaTemperatureHigh
            className={`size-6 ${isInRange ? "text-green-500" : "text-red-500"}`}
          />
        </div>
      </div>

      <div className={`mt-4 flex items-center ${isInRange ? "text-green-600" : "text-red-600"}`}>
        {isInRange ? <FaThumbsUp className='w-5 h-5' /> : <FaThumbsDown className='w-5 h-5' />}
        <span className='ml-1 text-sm font-medium'>
          {isInRange ? "Within Range" : "Out of Range"}
        </span>
        <span className='ml-2 text-sm text-gray-500 dark:text-gray-400'>
          {isInRange ? "Looks Good!" : "Looks Bad!"}
        </span>
      </div>
    </motion.div>
  );
};

export default ParameterCard;
