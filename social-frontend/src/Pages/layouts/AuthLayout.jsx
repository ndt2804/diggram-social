import { Outlet, Navigate } from 'react-router-dom'

const AuthLayout = () => {
    const isAuthenticated = false
    return (
        <>
            {isAuthenticated ? (
                <Navigate to='/' />
            ) : (
                <>
                    <section className="min-h-screen flex flex-col items-center justify-center mx-auto">
                        <div className="grid md:grid-cols-2 gap-4 max-w-6xl w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
                            <div className="md:h-full max-md:mt-10 bg-white rounded-xl lg:p-12 p-8 w-full sm:px-6 py-4">
                                <img className="items-center text-center"
                                    src='./assets/images/digg.svg'
                                    alt='bg'
                                />
                                <Outlet />
                            </div>
                            <div className="md:h-full max-md:mt-10 bg-[#000842] rounded-xl lg:p-12 p-8">
                                <img
                                    src="https://readymadeui.com/signin-image.webp"
                                    className="w-full h-full object-contain"
                                    alt="login-image"
                                />
                            </div>
                        </div>
                    </section>
                </>
            )}
        </>
    )
}

export default AuthLayout