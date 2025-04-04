import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ name, icon: Icon, value }) => {
  return (
    <div
      className="h-36 w-64 rounded-2xl border border-gray-300 dark:border-none 
        bg-gradient-to-br from-[#f5f5f5] to-[#e0e0e0] dark:from-[#5936B4] dark:to-[#362A84] 
        shadow-md hover:shadow-xl transition-all duration-300 
        text-gray-900 dark:text-white px-6 py-4 flex items-center justify-between gap-6 
        backdrop-blur-md hover:scale-105 cursor-pointer"
    >
      <div className="flex flex-col justify-center gap-1">
        <p className="text-md font-medium text-gray-700 dark:text-gray-200">{name}</p>
        <p className="text-4xl font-bold">{value}</p>
      </div>
      <div className="text-5xl text-gray-800 dark:text-gray-200">
        <Icon />
      </div>
    </div>
  );
};

export default StatCard;
