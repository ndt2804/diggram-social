import { Outlet } from 'react-router-dom'

import LeftSitebar from '../../components/layouts/LeftSidebar'
import BottomSidebar from '../../components/layouts/BottomSidebar'
import TopSidebar from '../../components/layouts/TopSidebar'

const RootLayout = () => {
    return (
        <div className='w-full md:flex'>
            <TopSidebar />
            <LeftSitebar />

            <section className='flex flex-1 h-full'>
                <Outlet />
            </section>

            <BottomSidebar />
        </div>
    )
}

export default RootLayout