import { useEffect, useContext } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context'
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

const RightSidebar = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const { friends } = useContext(AuthContext);
    if (friends.length === 0) {
        return <p>Không có bạn bè nào để hiển thị.</p>;
    }
    console.log(friends)
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
                    </div>
                </Link>
                {friends.length === 0 ? (
                    <p>Không có bạn bè nào để hiển thị.</p>
                ) : (
                    <ul className='flex flex-col gap-6'>
                        {friends.map((friend) => {

                            return (
                                <li
                                    key={friend.id}
                                    className={`leftsidebar-link group `}

                                >
                                    <NavLink
                                        className='flex gap-4 items-center p-4'
                                    >
                                        <img
                                            src={friend.imgURL}
                                            alt={friend.label}
                                            className={`group-hover:invert-white group-hover:text-white text-light-3`}
                                            width={24}
                                            height={24}
                                        />
                                        <span className='group-hover:text-white'>
                                            {friend.user2.fullname}

                                        </span>
                                    </NavLink>
                                </li>
                            )
                        })}
                    </ul>
                )}
            </div>
        </nav>
    );
}
export default RightSidebar;

