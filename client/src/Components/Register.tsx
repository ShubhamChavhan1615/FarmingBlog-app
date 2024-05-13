import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";

interface RegisterFormData {
    name: string;
    mobile: string;
    address: string;
    pincode: string;
    password: string;
    terms: boolean;
}

function Register() {
    const navigate = useNavigate();
    const { register: registerRegister, handleSubmit: handleSubmitRegister, formState: { errors: registerErrors } } = useForm<RegisterFormData>({
        criteriaMode: "all",
        mode: "onBlur",
    });
    const onSubmitRegister = (data: RegisterFormData) => {
        // Convert data to JSON format
        const jsonData = JSON.stringify(data);

        // Define fetch options
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData
        };

        // Perform POST request to the specified endpoint
        fetch('http://localhost:4000/register/home', requestOptions)
            .then(response => {
                if (!response.ok) {
                    toast.error("Mobile number already exits", { autoClose: 3000 })
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                localStorage.setItem("authToken", data.token)
                toast.success("Account Created Successfully", {autoClose: 1000}) 
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            })
            .catch(error => {
                // Handle errors
                console.error('There was a problem with the request:', error);
            });
    };

    const [inpPass, setInpPass] = useState(false)
    const [showPass, setShowPass] = useState(false)
    const handleShowPassHidePass = () => {
        setInpPass(!inpPass)
        setShowPass(!showPass)
    }
    return (
        <>
            <ToastContainer/>
            <Navbar />
            <div className={`formModel h-screen w-full absolute top-0 z-[100]`}>
                <div className="blur-background backdrop-filter backdrop-blur-md absolute inset-0 z-[-1]"></div>
                <section className="dark:bg-gray-900 w-[500px] m-auto z-10 relative">
                    <div className="flex flex-col items-center justify-center px-3 py-4 mx-auto md:max-h-screen md:py-0 relative">
                    <Link to={"/"} className="absolute top-3 right-4 text-gray-900 dark:text-white focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </Link> 
                        <div className="w-full bg-white rounded-lg shadow dark:border dark:border-gray-700">
                            <div className="p-4 space-y-3 md:space-y-4 sm:p-6">
                                <h1 className="text-lg font-bold leading-tight tracking-tight text-gray-900 md:text-xl dark:text-white">
                                    Create an account
                                </h1>
                                <form onSubmit={handleSubmitRegister(onSubmitRegister)} className="space-y-3 md:space-y-4">
                                    <div>
                                        <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                                        <input type="text" {...registerRegister('name', { required: true, minLength: 10 })} id="name" className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${registerErrors.name ? 'border-red-500' : ''}`} placeholder="Alok Sharma" required />
                                        {registerErrors.name && registerErrors.name.types?.minLength && <span className="text-red-500 text-xs">Name must be at least 10 characters long</span>}
                                        {registerErrors.name && registerErrors.name.types?.required && <span className="text-red-500 text-xs">Name is required</span>}
                                    </div>
                                    <div>
                                        <label htmlFor="mobile" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Mobile</label>
                                        <input type="tel" {...registerRegister('mobile', { required: true, pattern: /^\d{10}$/ })} id="mobile" className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${registerErrors.mobile ? 'border-red-500' : ''}`} placeholder="1234567890" required />
                                        {registerErrors.mobile && registerErrors.mobile.types?.required && <span className="text-red-500 text-xs">Mobile is required</span>}
                                        {registerErrors.mobile && registerErrors.mobile.types?.pattern && <span className="text-red-500 text-xs">Mobile must be 10 digits long</span>}
                                    </div>
                                    <div>
                                        <label htmlFor="address" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                                        <input type="text" {...registerRegister('address', { required: true, minLength: 15 })} id="address" className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${registerErrors.address ? 'border-red-500' : ''}`} placeholder="Shevgaon" required />
                                        {registerErrors.address && registerErrors.address.types?.minLength && <span className="text-red-500 text-xs">Address must be at least 15 characters long</span>}
                                        {registerErrors.address && registerErrors.address.types?.required && <span className="text-red-500 text-xs">Address is required</span>}
                                    </div>
                                    <div>
                                        <label htmlFor="pincode" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Pin Code</label>
                                        <input type="text" {...registerRegister('pincode', { required: true, pattern: /^\d{6}$/ })} id="pincode" className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${registerErrors.pincode ? 'border-red-500' : ''}`} placeholder="123456" required />
                                        {registerErrors.pincode && registerErrors.pincode.types?.required && <span className="text-red-500 text-xs">Pin Code is required</span>}
                                        {registerErrors.pincode && registerErrors.pincode.types?.pattern && <span className="text-red-500 text-xs">Pin Code must be 6 digits long</span>}
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                        <input type={(inpPass) ? "text" : "password"} {...registerRegister('password', { required: true, minLength: 6 })} id="password" className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${registerErrors.password ? 'border-red-500' : ''}`} placeholder="Abc1233@#" autoComplete="current-password" required />
                                        {(showPass) ? <AiFillEye onClick={handleShowPassHidePass} className="relative bottom-7 text-[#3e3e3e] text-xl cursor-pointer left-[400px]" /> : <AiFillEyeInvisible onClick={handleShowPassHidePass} className="relative bottom-7 text-[#3e3e3e] text-xl cursor-pointer left-[400px]" />}
                                        {registerErrors.password && registerErrors.password.types?.minLength && <span className="text-red-500 text-xs">Password must be at least 6 characters long</span>}
                                        {registerErrors.password && registerErrors.password.types?.required && <span className="text-red-500 text-xs">Password is required</span>}
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex items-center h-4">
                                            <input id="terms" aria-describedby="terms" type="checkbox" {...registerRegister('terms', { required: true })} className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                                        </div>
                                        <div className="ml-2 text-xs">
                                            <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="/">Terms and Conditions</a></label>
                                        </div>
                                    </div>
                                    <button type="submit" className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                                    <p className="text-xs font-light text-gray-500 dark:text-gray-400">
                                        Already have an account? <Link to={'/SignIn'} className="font-medium  cursor-pointer text-primary-600 hover:underline dark:text-primary-500">Sign In here</Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Register