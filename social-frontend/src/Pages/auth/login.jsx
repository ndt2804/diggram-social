import { Input } from "../../components/ui/input";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import { AuthContext } from "../../context/auth.context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        console.log(email, password);
        try {
            await login(email, password);
            navigate("/");

        } catch (error) {
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <>
            <section className="w-3/4 mx-auto flex flex-col gap-10">
                <div className="title">
                    <h1 className="text-gray-800 text-4xl font-bold py-4 items-center text-center">
                        Sign In
                    </h1>
                </div>
                <form >
                    <div className="container mt-5 text-center">
                        <div className="grid gap-5 md:grid-cols-2">

                        </div>
                    </div>
                    <div className="max-w-md mx-auto">
                        <div className="mt-5">
                            <Input
                                label="Email"
                                type="text"
                                id="Email"
                                placeholder="Type your email..."
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <Input
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"

                                label="Password"
                                type="password"
                                id="password"
                                placeholder="Type your password..."
                                onChange={(e) => setPassword(e.target.value)}

                            />
                        </div>
                        <div className="text-right mb-4">
                            <a
                                className="text-xs font-display font-semibold text-gray-500 hover:text-gray-600 cursor-pointer"
                                href="#"
                            >
                                Forgot Password?
                            </a>
                        </div>
                        <div className="mt-5">
                            <button onClick={handleSubmit}
                                className="py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                                type="submit"
                            >
                                Log in
                            </button>
                        </div>
                        <div className="flex justify-center w-full items-center mt-4">
                            <div>
                                <button
                                    className=" items-center justify-center py-2 p-3 rounded-sm "
                                    onClick={() => {
                                        signIn("google");
                                    }}
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        height="25"
                                        width="25"
                                        y="0px"
                                        x="0px"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M12,5c1.6167603,0,3.1012573,0.5535278,4.2863159,1.4740601l3.637146-3.4699707 C17.8087769,1.1399536,15.0406494,0,12,0C7.392395,0,3.3966675,2.5999146,1.3858032,6.4098511l4.0444336,3.1929321 C6.4099731,6.9193726,8.977478,5,12,5z"
                                            fill="#F44336"
                                        ></path>
                                        <path
                                            d="M23.8960571,13.5018311C23.9585571,13.0101929,24,12.508667,24,12 c0-0.8578491-0.093689-1.6931763-0.2647705-2.5H12v5h6.4862061c-0.5247192,1.3637695-1.4589844,2.5177612-2.6481934,3.319458 l4.0594482,3.204834C22.0493774,19.135437,23.5219727,16.4903564,23.8960571,13.5018311z"
                                            fill="#2196F3"
                                        ></path>
                                        <path
                                            d="M5,12c0-0.8434448,0.1568604-1.6483765,0.4302368-2.3972168L1.3858032,6.4098511 C0.5043335,8.0800171,0,9.9801636,0,12c0,1.9972534,0.4950562,3.8763428,1.3582153,5.532959l4.0495605-3.1970215 C5.1484375,13.6044312,5,12.8204346,5,12z"
                                            fill="#FFC107"
                                        ></path>
                                        <path
                                            d="M12,19c-3.0455322,0-5.6295776-1.9484863-6.5922241-4.6640625L1.3582153,17.532959 C3.3592529,21.3734741,7.369812,24,12,24c3.027771,0,5.7887573-1.1248169,7.8974609-2.975708l-4.0594482-3.204834 C14.7412109,18.5588989,13.4284058,19,12,19z"
                                            fill="#00B060"
                                        ></path>
                                        <path
                                            opacity=".1"
                                            d="M12,23.75c-3.5316772,0-6.7072754-1.4571533-8.9524536-3.7786865C5.2453613,22.4378052,8.4364624,24,12,24 c3.5305786,0,6.6952515-1.5313721,8.8881226-3.9592285C18.6495972,22.324646,15.4981079,23.75,12,23.75z"
                                        ></path>
                                        <polygon
                                            opacity=".1"
                                            points="12,14.25 12,14.5 18.4862061,14.5 18.587492,14.25"
                                        ></polygon>
                                        <path
                                            d="M23.9944458,12.1470337C23.9952393,12.0977783,24,12.0493774,24,12 c0-0.0139771-0.0021973-0.0274658-0.0022583-0.0414429C23.9970703,12.0215454,23.9938965,12.0838013,23.9944458,12.1470337z"
                                            fill="#E6E6E6"
                                        ></path>
                                        <path
                                            opacity=".2"
                                            d="M12,9.5v0.25h11.7855721c-0.0157471-0.0825195-0.0329475-0.1680908-0.0503426-0.25H12z"
                                            fill="#FFF"
                                        ></path>
                                        <linearGradient
                                            gradientUnits="userSpaceOnUse"
                                            y2="12"
                                            y1="12"
                                            x2="24"
                                            x1="0"
                                            id="LxT-gk5MfRc1Gl_4XsNKba_xoyhGXWmHnqX_gr1"
                                        >
                                            <stop stopOpacity=".2" stopColor="#fff" offset="0"></stop>
                                            <stop stopOpacity="0" stopColor="#fff" offset="1"></stop>
                                        </linearGradient>
                                        <path
                                            d="M23.7352295,9.5H12v5h6.4862061C17.4775391,17.121582,14.9771729,19,12,19 c-3.8659668,0-7-3.1340332-7-7c0-3.8660278,3.1340332-7,7-7c1.4018555,0,2.6939087,0.4306641,3.7885132,1.140686 c0.1675415,0.1088867,0.3403931,0.2111206,0.4978027,0.333374l3.637146-3.4699707L19.8414307,2.940979 C17.7369385,1.1170654,15.00354,0,12,0C5.3725586,0,0,5.3725586,0,12c0,6.6273804,5.3725586,12,12,12 c6.1176758,0,11.1554565-4.5812378,11.8960571-10.4981689C23.9585571,13.0101929,24,12.508667,24,12 C24,11.1421509,23.906311,10.3068237,23.7352295,9.5z"
                                            fill="url(#LxT-gk5MfRc1Gl_4XsNKba_xoyhGXWmHnqX_gr1)"
                                        ></path>
                                        <path
                                            opacity=".1"
                                            d="M15.7885132,5.890686C14.6939087,5.1806641,13.4018555,4.75,12,4.75c-3.8659668,0-7,3.1339722-7,7 c0,0.0421753,0.0005674,0.0751343,0.0012999,0.1171875C5.0687437,8.0595093,8.1762085,5,12,5 c1.4018555,0,2.6939087,0.4306641,3.7885132,1.140686c0.1675415,0.1088867,0.3403931,0.2111206,0.4978027,0.333374 l3.637146-3.4699707l-3.637146,3.2199707C16.1289062,6.1018066,15.9560547,5.9995728,15.7885132,5.890686z"
                                        ></path>
                                        <path
                                            opacity=".2"
                                            d="M12,0.25c2.9750366,0,5.6829224,1.0983887,7.7792969,2.8916016l0.144165-0.1375122 l-0.110014-0.0958166C17.7089558,1.0843592,15.00354,0,12,0C5.3725586,0,0,5.3725586,0,12 c0,0.0421753,0.0058594,0.0828857,0.0062866,0.125C0.0740356,5.5558472,5.4147339,0.25,12,0.25z"
                                            fill="#FFF"
                                        ></path>
                                    </svg>
                                </button>
                                <button
                                    onClick={() => {
                                        signIn("github");
                                    }}
                                    aria-label="Log in with GitHub"
                                    className="p-3 rounded-sm"
                                >
                                    <svg
                                        height="25"
                                        width="25"
                                        y="0px"
                                        x="0px"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 32 32"
                                    >
                                        <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">

                        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                        <a
                            className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
                            href="/sign-up"
                        >
                            or sign up
                        </a>
                        <span className="w-1/5 border-b dark:border-gray-400 md:w-1/4"></span>

                        {error && <p>{error}</p>}
                    </div>
                </form>
            </section>
        </>
    )
}
export default Login;