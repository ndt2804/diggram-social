import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Register = () => {
    const [fullname, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await AuthService.register(
                {
                    fullname,
                    email,
                    username,
                    password,
                }
            );
            setLoading(false);
            toast.success("User Register Successfully");
            navigate("/sign-in");
        } catch (error) {
            toast.error(error.response.data);
        }
    };
    return (
        <>  <section className="w-3/4 mx-auto flex flex-col gap-10">
            <div className="title items-center text-center">
                <h1 className="text-gray-800 text-4xl font-bold py-4 ">
                    Register
                </h1>
            </div>
            <form >
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <div className="max-w-md mx-auto">
                    <div className="mt-5 inset-y-0 left-0">
                        <label
                            className="font-semibold text-sm text-gray-600 pb-1 block"
                            htmlFor="fullname"
                        >
                            Fullname
                        </label>
                        <input
                            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                            type="text"
                            id="fullname"
                            onChange={(e) => setFullName(e.target.value)}
                        />
                        <label
                            className="font-semibold text-sm text-gray-600 pb-1 block"
                            htmlFor="email"
                        >
                            E-mail
                        </label>
                        <input
                            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                            type="text"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label
                            className="font-semibold text-sm text-gray-600 pb-1 block"
                            htmlFor="username"
                        >
                            Username
                        </label>
                        <input
                            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                            type="text"
                            id="username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label
                            className="font-semibold text-sm text-gray-600 pb-1 block"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mt-5">
                        <button
                            onClick={handleSubmit}
                            className="py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                            type="submit"
                        >
                            {loading ? (
                                <>

                                    <div
                                        role="status"
                                        class="inline-block h-3 w-3 mr-2 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                    >
                                        <span
                                            class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                        >
                                            Loading...
                                        </span>
                                    </div>
                                    Loading
                                </>
                            ) : (
                                "Register"
                            )}
                        </button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                        <a
                            className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
                            href="/sign-in"
                        >
                            or sign in
                        </a>
                        <span className="w-1/5 border-b dark:border-gray-400 md:w-1/4"></span>
                    </div>
                </div>

            </form>
        </section>

        </>
    )
}

export default Register;
