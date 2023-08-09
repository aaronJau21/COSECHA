import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export const Cosecha = () => {
    const location = useLocation();

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-2 vh-100 bg-dark text-white ">
                    <Sidebar location={location}/>
                </div>
                <div className="col">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};
