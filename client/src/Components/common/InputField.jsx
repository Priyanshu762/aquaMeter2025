import { FaUser, FaEnvelope, FaLock, FaPhone, FaLocationArrow } from "react-icons/fa";

const InputField = ({ placeholder, label, type, name, register, errors, icon, className }) => {

  const getIcon = () => {
    switch (type) {
      case "email":
        return <FaEnvelope className="w-5 h-5 text-gray-400 dark:text-gray-300" />;
      case "password":
        return <FaLock className="w-5 h-5 text-gray-400 dark:text-gray-300" />;
      case "tel":
        return <FaPhone className="w-5 h-5 text-gray-400 dark:text-gray-300" />;
      case "city":
        return <FaLocationArrow className="w-5 h-5 text-gray-400 dark:text-gray-300" />;
      default:
        return <FaUser className="w-5 h-5 text-gray-400 dark:text-gray-300" />;
    }
  };

    return (
      <div className={`flex flex-col my-3 ${className}`}>
        <label className="hidden text-sm text-gray-700 dark:text-gray-300">{label}</label>
        <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              {getIcon()}
            </div>
        <input
            placeholder={placeholder}
            {...register(name)}
            type={type}
            className="w-full pl-10 pr-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white dark:bg-gray-800 dark:placeholder-gray-300 dark:focus:border-gray-100 dark:focus:bg-gray-900 dark:text-gray-200"
            />
        </div>
        {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]?.message}</p>}
      </div>
    );
  };
  export default InputField;
  