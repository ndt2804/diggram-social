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
    return (<> <nav className='leftsidebar'>
        <div className='flex flex-col gap-11'>
            <Link to='/' className='flex gap-3 items-center'>
                <img
                    src='./assets/icons/camera.svg'
                    alt='Logo'
                    width={100}
                    height={36}
                />
                <h3>Diggram</h3>
            </Link>

            <Link to={`/profile/`} className='flex gap-3 items-center'>
                <img
                    src='./assets/icons/camera.svg'
                    alt='profile'
                    className='h-14 w-14 rounded-full'
                />
                <div className='flex flex-col'>
                    <p className='body-bold'></p>
                    <p className='small-regular text-light-3'>@</p>
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
                                    className={`group-hover:invert-white ${isActive && 'invert-white'
                                        }`}
                                />
                                {link.label}
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
    </>);
}
export default LeftSidebar;