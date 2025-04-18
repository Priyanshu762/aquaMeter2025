import axios from '../utils/axios';



export const createComplaint = async (formData) => {
  try {
    const response = await axios.post('/api/complaints', formData,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    console.log("Error in complaint API",error);
    
    throw error;

  }
};

export const getComplaintById = async (complaintId) => {
  try {
    const response = await axios.get(`/api/complaints/${complaintId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getComplaintsByUser = async (userId) => {
      try {
        const response = await axios.get(`/api/complaints/byUser`);
        console.log("Response from getComplaintsByUser",response);
        
        return response.data;
      } catch (error) {
        throw error;
      }
}