import { createBrowserRouter } from 'react-router-dom'
import { Login } from './views/Auth/Login';
import { Cosecha } from './layouts/Cosecha';
import { Dashboard } from './views/Dashboard';
import { Areas } from './views/Areas';
import { ProtectedRoute } from './views/ProtectedRoute';

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },

    {
        path: '/',
        element: <ProtectedRoute />,
        children: [
            {
                path: '/cosecha',
                element: <Cosecha />,
                children: [
                    {
                        index: true,
                        element: <Dashboard />
                    },
                    {
                        path: '/cosecha/areas',
                        element: <Areas />
                    }

                ]
            },
        ]
    }
]);

export default router;