import { Outlet } from 'react-router-dom';
import NavHome from '../components/navBar/navHome';
import Index from '../pages/index';

function PublicLayout() {
    return (
        <>
            <NavHome />
            <Index />
            <Outlet />
        </>
    )
}

export default PublicLayout;