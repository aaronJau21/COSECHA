import { createBrowserRouter } from "react-router-dom";
import { Login } from "./views/Login";
import { Cosecha } from "./layouts/Cosecha";
import { Dashboard } from "./views/Dashboard";
import { Areas } from "./views/Areas";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/',
        element: <Cosecha />,
        children: [
            {
                path: '/cosecha',
                element: <Dashboard />
            },
            {
                path: '/cosecha/areas',
                element: <Areas />
            }
        ]
    }
])

export default router