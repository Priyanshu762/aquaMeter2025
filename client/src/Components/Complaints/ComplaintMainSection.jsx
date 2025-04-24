import React from 'react';

const ComplaintMainSection = () => {
  return (
    <div className='w-full h-screen max-w-7xl px-6 flex items-center mt-[-76px]'>
      <div className='flex justify-center items-center w-full'>
        <div className='max-w-md ml-64'>
          <p className='font-bold text-5xl'>Online</p>
          <p className='font-bold text-5xl'> 
            <span className='dark:text-orange-500 text-indigo-900'>
            Complaint &nbsp;
            </span>
             Portal</p>
          <p className='mt-4 text-lg font-semibold'>
            The only place where your complaints are precious to us!
            If you have a complaint against any water-related entity, you are at the right place.
          </p>
        </div>

        <div className=''>
          <img src="/Complaint.png" alt="Complaint Illustration" className='w-full max-w-md' />
        </div>
      </div>
    </div>
  );
};

export default ComplaintMainSection;
