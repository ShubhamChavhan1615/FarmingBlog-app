import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
interface FormData {
  name: string;
  mobile: string;
  address: string;
  pincode: string;
  newPassword: string;
}

function EditProfile() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const userId = useRef<string>("");
  const [user, setUser] = useState({
    id:'',
    name: '',
    mobile: '',
    address: '',
    pincode: '',
    newPassword: '',
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const token = authToken || "";
        const encodedToken = encodeURIComponent(token);

        const response = await fetch(`http://localhost:4000/user/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${encodedToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const userData = await response.json();
        setUser(userData.user);
        userId.current = userData.user._id
        // console.log(userData.user._id);
        
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
        const authToken = localStorage.getItem("authToken");
        const token = authToken || "";
        const encodedToken = encodeURIComponent(token);

        const response = await fetch(`http://localhost:4000/profile/edit/${userId.current}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${encodedToken}`,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Failed to update profile");
        }

        // Profile updated successfully
        console.log("Profile updated successfully");
        navigate(`/Profile/${user.name}`)
    } catch (error) {
        console.error("Error updating profile:", error);
    }
};


  return (
    <>
      <section className="dark:bg-gray-900 w-[500px] m-auto z-10 relative bottom-3">
        <Link to={`/Profile/${user.name}`}>
          <FaArrowLeft className="relative top-12 left-[-60px] z-30 text-xl mt-6 cursor-pointer" title="back" />
        </Link>
        <div className="flex flex-col items-center justify-center px-3 py-4 mx-auto md:max-h-screen md:py-0 relative">
          <div className="w-full bg-white rounded-lg shadow dark:border dark:border-gray-700">
            <div className="p-4 space-y-3 md:space-y-4 sm:p-6">
              <h1 className="text-lg font-bold leading-tight tracking-tight text-gray-900 md:text-xl dark:text-white">
                Edit Profile
              </h1>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 md:space-y-4">
                <div>
                  <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                  <input type="text" defaultValue={user.name} {...register('name', { required: true, minLength: 10 })} id="name" className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.name ? 'border-red-500' : ''}`} placeholder="Alok Sharma" required />
                  {errors.name && errors.name.types?.minLength && <span className="text-red-500 text-xs">Name must be at least 10 characters long</span>}
                  {errors.name && errors.name.types?.required && <span className="text-red-500 text-xs">Name is required</span>}
                </div>
                <div>
                  <label htmlFor="mobile" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Mobile</label>
                  <input type="tel" defaultValue={user.mobile} {...register('mobile', { required: true, pattern: /^\d{10}$/ })} id="mobile" className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.mobile ? 'border-red-500' : ''}`} placeholder="1234567890" required />
                  {errors.mobile && errors.mobile.types?.required && <span className="text-red-500 text-xs">Mobile is required</span>}
                  {errors.mobile && errors.mobile.types?.pattern && <span className="text-red-500 text-xs">Mobile must be 10 digits long</span>}
                </div>
                <div>
                  <label htmlFor="address" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                  <input type="text" defaultValue={user.address} {...register('address', { required: true, minLength: 15 })} id="address" className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.address ? 'border-red-500' : ''}`} placeholder="Shevgaon" required />
                  {errors.address && errors.address.types?.minLength && <span className="text-red-500 text-xs">Address must be at least 15 characters long</span>}
                  {errors.address && errors.address.types?.required && <span className="text-red-500 text-xs">Address is required</span>}
                </div>
                <div>
                  <label htmlFor="pincode" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Pin Code</label>
                  <input type="text" defaultValue={user.pincode} {...register('pincode', { required: true, pattern: /^\d{6}$/ })} id="pincode" className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.pincode ? 'border-red-500' : ''}`} placeholder="123456" required />
                  {errors.pincode && errors.pincode.types?.required && <span className="text-red-500 text-xs">Pin Code is required</span>}
                  {errors.pincode && errors.pincode.types?.pattern && <span className="text-red-500 text-xs">Pin Code must be 6 digits long</span>}
                </div>
                <div>
                  <label htmlFor="newPassword" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                  <input type="password" {...register('newPassword', { required: true, minLength: 6 })} id="newPassword" className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.newPassword ? 'border-red-500' : ''}`} placeholder="New Password" autoComplete="new-password" required />
                  {errors.newPassword && errors.newPassword.types?.minLength && <span className="text-red-500 text-xs">New Password must be at least 6 characters long</span>}
                  {errors.newPassword && errors.newPassword.types?.required && <span className="text-red-500 text-xs">New Password is required</span>}
                </div>
                <button type="submit" className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Edit Profile</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default EditProfile;
