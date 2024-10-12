import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
const TopSidebar = () => {

    const navigate = useNavigate()

    return (
        <section className='topbar'>
            <div className='flex-between py-4 px-5'>
                <Link to='/' className='flex gap-3 items-center'>
                    <img
                        src='./assets/icons/camera.svg'
                        alt='logo'
                        width={130}
                        height={325}
                    />
                </Link>

                <div className='flex gap-4'>
                    <button
                        variant='ghost'
                        className='shad-button_ghost'
                    >
                        <img src='./assets/icons/logout.svg' alt='logout' />
                    </button>
                    <Link to={`/profile/`} className='flex-center gap-3'>
                        <img
                            src='./assets/icons/camera.svg'
                            alt='profile'
                            className='h-8 w-8 rounded-full'
                        />
                    </Link>
                </div>
            </div>
        </section>
    );
};
export default TopSidebar;

