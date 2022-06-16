import { Outlet } from 'react-router-dom';
import Footer from "../components/footer/footer";
import NavUser from '../components/navBar/navUser';

function PrivateLayout() {
    return (
        <>
            <NavUser />
            <Outlet />
            <Footer />
        </>
    )
}

export default PrivateLayout;