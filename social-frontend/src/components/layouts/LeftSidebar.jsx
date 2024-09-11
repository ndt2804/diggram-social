import { useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
const sidebarLinks = [
    {
        imgURL: './assets/images/home.svg',
        route: '/',
        label: 'Home',
    },
    {
        imgURL: './assets/images/search.svg',
        route: '/search',
        label: 'Search',
    },
    {
        imgURL: './assets/images/explore.svg',
        route: '/explore',
        label: 'Explore',
    },
    {
        imgURL: './assets/images/message.svg',
        route: '/message',
        label: 'Message',
    },
    {
        imgURL: './assets/images/saved.svg',
        route: '/saved',
        label: 'Saved',
    },
    {
        imgURL: './assets/images/notification.svg',
        route: '/notification',
        label: 'Notification',
    },
    {
        imgURL: './assets/images/create.svg',
        route: '/create-post',
        label: 'Create Post',
    },
]

const LeftSidebar = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    return (
        <nav className="hidden md:flex px-6 py-10 flex-col justify-between min-w-[270px]  border-r "               >
            <div className='flex flex-col gap-11'>
                <Link to='/' className='flex gap-3 items-center'>
                    <img
                        src='./assets/icons/camera.svg'
                        alt='logo'
                        width={170}
                        height={36}
                    />
                </Link>

                <Link to={`/profile/`} className='flex gap-3 items-center'>
                    <img
                        src='./assets/icons/camera.svg'
                        alt='profile'
                        className='h-14 w-14 rounded-full'
                    />
                    <div className='flex flex-col'>
                        <p className='body-bold'>Tân nè</p>
                        <p className='small-regular text-light-3'>@tannho</p>
                    </div>
                </Link>

                <ul className='flex flex-col gap-6'>
                    {sidebarLinks.map((link) => {
                        const isActive = pathname === link.route

                        return (
                            <li
                                key={link.label}
                                className={`leftsidebar-link group ${isActive && 'bg-primary-500'
                                    }`}

                            >
                                <NavLink
                                    to={link.route}
                                    className='flex gap-4 items-center p-4'
                                >
                                    <img
                                        src={link.imgURL}
                                        alt={link.label}
                                        className={`group-hover:invert-white group-hover:text-white ${isActive && 'invert-white'
                                            }`}
                                        width={24}
                                        height={24}
                                    />
                                    <span className='group-hover:text-white'>
                                        {link.label}

                                    </span>
                                </NavLink>
                            </li>
                        )
                    })}
                </ul>
            </div>



            <button
                variant='ghost'
                className='shad-button_ghost'
                onClick={() => signOut()}
            >
                <img src='./assets/icons/logout.svg' alt='logout' />
                <p className='small-medium lg:base-medium'>Logout</p>
            </button>
        </nav>
    );
}
export default LeftSidebar;

// const LeftSidebar = () => {
//     const navigate = useNavigate()
//     const { pathname } = useLocation()
//     return (

//         // <nav className="hidden md:flex px-6 py-10 flex-col justify-between min-w-[270px] bg-dark-3">
//         //  <div className='flex flex-col gap-11'>
//         //     <Link to='/' className='flex gap-3 items-center'>
//         //         <img
//         //             src='./assets/icons/camera.svg'
//         //             alt='logo'
//         //             width={170}
//         //             height={36}
//         //         />
//         //     </Link>

//         //     <Link to={`/profile/`} className='flex gap-3 items-center'>
//         //          <img
//         //             src='./assets/icons/camera.svg'
//         //             alt='profile'
//         //             className='h-14 w-14 rounded-full'
//         //         />
//         //         <div className='flex flex-col'>
//         //             <p className='body-bold'>Tân nè</p>
//         //             <p className='small-regular text-light-3'>@tannho</p>
//         //         </div>
//         //     </Link>


//         // </div>
//         // </nav>
//         <>
//             <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
//                 <span class="sr-only">Open sidebar</span>
//                 <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                     <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
//                 </svg>
//             </button>

//             <aside id="default-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
//                 <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
//                     <ul className='flex flex-col gap-6 space-y-2 font-medium'>
//                         {sidebarLinks.map((link) => {
//                             const isActive = pathname === link.route

//                             return (
//                                 <li
//                                     key={link.label}
//                                     className={`leftsidebar-link group ${isActive && 'bg-primary-500'
//                                         }`}
//                                 >
//                                     <NavLink
//                                         to={link.route}
//                                         className='flex gap-4 items-center p-4'
//                                     >
//                                         <img
//                                             src={link.imgURL}
//                                             alt={link.label}
//                                             className={`group-hover:invert-white ${isActive && 'invert-white'
//                                                 }`}
//                                             width={24}
//                                             height={24}
//                                         />
//                                         {link.label}
//                                     </NavLink>
//                                 </li>
//                             )
//                         })}
//                     </ul>
//                 </div>
//             </aside>

//             <div class="p-4 sm:ml-64">

//             </div>
//         </>
//     )

// }
// export default LeftSidebar;