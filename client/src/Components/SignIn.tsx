import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface SignInFormData {
    mobile: string;
    password: string;
}
function SignIn() {
    const navigate = useNavigate()
    const { register: registerSignIn, handleSubmit: handleSubmitSignIn, formState: { errors: signInErrors } } = useForm<SignInFormData>();
    const onSubmitSignIn = (data: SignInFormData) => {
        console.log(data); // You can handle sign-in form submission here
        const jsonData = JSON.stringify(data);

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: jsonData,
            credentials: 'include' as RequestCredentials,
        }

        fetch('http://localhost:4000/signin/home', requestOptions)
            .then(response => {
                if (!response.ok) {
                    toast.error("Mobile or password incorrect", { autoClose: 3000 })
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                localStorage.setItem("authToken", data.token)
                toast.success("Sign in successfully", { autoClose: 1000 })
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            })
            .catch((error) => {
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

    // const notify = () => toast("Sign In Successfully", { autoClose: 5000 });
    return (
        <>
            <ToastContainer autoClose={5000} />
            {/* Sign-in form */}
            <div className={`signModel h-screen w-full absolute top-0 z-[100]`}>
                <div className="blur-background backdrop-filter backdrop-blur-md absolute inset-0 z-[-1]"></div>
                <section className="dark:bg-gray-900 w-[500px] m-auto z-10 relative top-[150px]">
                    <div className="flex flex-col items-center justify-center px-3 py-4 mx-auto md:max-h-screen md:py-0 relative">
                        <Link to={"/Register"} className="absolute top-3 right-4 text-gray-900 dark:text-white focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </Link>
                        <div className="w-full bg-white rounded-lg shadow dark:border dark:border-gray-700">
                            <div className="p-4 space-y-3 md:space-y-4 sm:p-6">
                                <h1 className="text-lg font-bold leading-tight tracking-tight text-gray-900 md:text-xl dark:text-white">
                                    Sign In Now
                                </h1>
                                <form onSubmit={handleSubmitSignIn(onSubmitSignIn)} className="space-y-3 md:space-y-4">
                                    <div>
                                        <label htmlFor="Signmobile" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Mobile</label>
                                        <input type="number" {...registerSignIn('mobile', { required: true })} id="Signmobile" className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${signInErrors.mobile ? 'border-red-500' : ''}`} placeholder="1234567890" required />
                                        {signInErrors.mobile && <span className="text-red-500 text-xs">Mobile is required</span>}
                                    </div>
                                    <div>
                                        <label htmlFor="Signpassword" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                        <input type={(inpPass) ? "text" : "password"} {...registerSignIn('password', { required: true })} id="Signpassword" className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${signInErrors.password ? 'border-red-500' : ''}`} placeholder="Abc1233@#" autoComplete="current-password" required />
                                        {(showPass) ? <AiFillEye onClick={handleShowPassHidePass} className="relative bottom-7 text-[#3e3e3e] text-xl cursor-pointer left-[400px]" /> : <AiFillEyeInvisible onClick={handleShowPassHidePass} className="relative bottom-7 text-[#3e3e3e] text-xl cursor-pointer left-[400px]" />}
                                        {signInErrors.password && <span className="text-red-500 text-xs">Password is required</span>}
                                    </div>

                                    <button  type="submit" className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign In</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default SignIn;
