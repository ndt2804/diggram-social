import { Link, useLocation } from 'react-router-dom'

const bottombarLinks = [
    {
        imgURL: './assets/icons/home.svg',
        route: '/',
        label: 'Home',
    },
    {
        imgURL: './assets/icons/wallpaper.svg',
        route: '/explore',
        label: 'Explore',
    },
    {
        imgURL: './assets/icons/bookmark.svg',
        route: '/saved',
        label: 'Saved',
    },
    {
        imgURL: './assets/icons/gallery-add.svg',
        route: '/create-post',
        label: 'Create',
    },
]
const BottomSidebar = () => {
    const { pathname } = useLocation()

    return (
        <section className='bottom-bar'>
            {bottombarLinks.map((link) => {
                const isActive = pathname === link.route

                return (
                    <Link
                        to={link.route}
                        key={link.label}
                        className={`${isActive && 'bg-primary-500 rounded-[10px]'
                            } flex-center flex-col gap-1 p-2 transition`}
                    >
                        <img
                            src={link.imgURL}
                            alt={link.label}
                            className={`${isActive && 'invert-white'}`}
                            width={16}
                            height={16}
                        />
                        <p className='tiny-medium text-light-2'>{link.label}</p>
                    </Link>
                )
            })}
        </section>
    )
}
export default BottomSidebar;