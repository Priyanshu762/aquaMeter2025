import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

const schema = yup.object().shape({
  ngoName: yup.string().required('NGO Name is required'),
  registrationNumber: yup.string().required('Registration Number is required'),
  address: yup.string().required('Address is required'),
  contactName: yup.string().required('Contact Person Name is required'),
  contactEmail: yup.string().email('Invalid email').required('Email is required'),
  contactPhone: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Phone must be exactly 10 digits')
    .required('Phone number is required'),
  website: yup.string().url('Invalid URL').nullable().notRequired(),
  description: yup.string().required('Description is required'),
  document: yup
    .mixed()
    .required('Document is required')
    .test('fileType', 'Unsupported File Format', (value) => {
      return value && ['application/pdf', 'image/jpeg', 'image/png'].includes(value.type);
    }),
});

const NgoApplicationPage = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));
    
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }
    try {
      const userId = localStorage.getItem('userId');
      await axios.post(`/api/ngo/apply/${userId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('✅ Application submitted! Awaiting admin verification.');
    } catch (err) {
      console.error(err);
      setMessage('❌ Submission failed. Please try again.');
    } finally {
      setLoading(true);
    }
  };

  const handleFileChange = (e) => {
    setValue('document', e.target.files[0]);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 mb-10 px-6 py-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900 dark:text-white">
        📝 NGO Verification Form
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {[
          { name: 'ngoName', placeholder: 'NGO Name' },
          { name: 'registrationNumber', placeholder: 'Registration Number' },
          { name: 'address', placeholder: 'Registered Address' },
          { name: 'contactName', placeholder: 'Contact Person Name' },
          { name: 'contactEmail', placeholder: 'Contact Email', type: 'email' },
          { name: 'contactPhone', placeholder: 'Contact Phone', type: 'tel' },
          { name: 'website', placeholder: 'Website (optional)', type: 'url' },
        ].map(({ name, placeholder, type = 'text' }) => (
          <div key={name}>
            <input
              {...register(name)}
              type={type}
              placeholder={placeholder}
              className="w-full px-4 py-3 border rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 dark:placeholder-gray-400"
            />
            {errors[name] && (
              <p className="text-sm text-red-500 mt-1">{errors[name]?.message}</p>
            )}
          </div>
        ))}

        <div>
          <textarea
            {...register('description')}
            placeholder="Describe your NGO's work/mission..."
            className="w-full px-4 py-3 border rounded-lg resize-none h-28 dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 dark:placeholder-gray-400"
          />
          {errors.description && (
            <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Upload Registration Proof (PDF/Image)
          </label>
          <input
            type="file"
            accept="application/pdf,image/*"
            onChange={handleFileChange}
            className="w-full file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 dark:file:bg-indigo-400 file:text-blue-700 hover:file:bg-blue-100 dark:hover:file:bg-blue-500 dark:file:bg-gray-800 dark:file:text-white"
          />
          {errors.document && (
            <p className="text-sm text-red-500 mt-1">{errors.document.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
        >
          {loading ? '📤 Submitting' : '📤 Submit Application'}
        </button>
      </form>

      {message && (
        <p className="mt-6 text-center text-lg font-medium text-green-600 dark:text-green-400">
          {message}
        </p>
      )}
    </div>
  );
};

export default NgoApplicationPage;
