import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useUserContext } from '../../context/auth.context'
import { sidebarLinks } from '../../constants'
import { useSignOutAccount } from '../../libs/react-query/react-query'
const LeftSidebar = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const { user } = useUserContext();
    const { mutateAsync: signOut } = useSignOutAccount();

    const handleSignOut = async () => {
        if (!user) {
            navigate('/sign-in');
        } else {
            await signOut();
            navigate('/sign-in');
        }
    };
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

                <Link to={`/profile/${user?.username}`} className='flex gap-3 items-center'>
                    <img
                        src={user?.image_url || '/default-avatar.png'}
                        alt='profile'
                        className='h-14 w-14 rounded-full'
                    />
                    <div className='flex flex-col'>
                        <p className='body-bold'>    {user ? user.fullname : 'Guest'}!</p>
                        <p className='small-regular text-light-3'> @{user ? user.username : 'Guest'}!</p>
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
                className='shad-button_ghost group'
                onClick={() => handleSignOut()}
            >
                <img src='./assets/icons/logout.svg' width={24}
                    height={24} alt='logout' />
                <p className='group-hover:text-red-500'> {user ? user.username : 'Sign-in'}!</p>
            </button>
        </nav>
    );
}
export default LeftSidebar;
