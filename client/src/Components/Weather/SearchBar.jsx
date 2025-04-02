import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {InputField} from "../index.js";
import { setLoading } from "../../Store/loaderSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
const schema = yup.object().shape({
  text: yup.string().min(3, "Enter atleast 3 characters to search any city").required("City is required")
});


const SearchBar = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.loader.loading);
  const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });
  
    const onSubmit = async (data) => {
        dispatch(setLoading(true));
        try {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          console.log("Form submitted:", data);
        } catch (error) {
          console.error("Error submitting form:", error);
        } finally {
          dispatch(setLoading(false));
        }
    };

  return (
    <div>    
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex justify-between items-center gap-8 mx-36">

                      <InputField className="w-full" placeholder="Search any city" label='text' type="city" name="text" register={register} errors={errors} />
                      
                      <button 
                          type="submit"
                          disabled={loading}
                          className={`
                            tracking-wide font-semibold w-36 py-4 rounded-xl transition-all duration-300 ease-in-out flex items-center justify-center 
                            focus:shadow-outline focus:outline-none 
                            ${loading ? "bg-gray-400 dark:bg-gray-500 cursor-not-allowed" : 
                            "bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-blue-900 dark:text-gray-100 dark:hover:bg-indigo-700 cursor-pointer"}
                          `}
                        >
                          {loading ? (
                            <>
                              <FaSearch />
                              <span className="ml-3">Searching...</span>
                            </>
                          ) : (
                            <>
                              <FaSearch />
                              <span className="ml-3">Search</span>
                            </>
                          )}
                        </button>

                      </div>
                    </form>

    </div>
  );
};
export default SearchBar;