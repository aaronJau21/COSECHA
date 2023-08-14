import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Sidebar(props: any) {

    const { location } = props
    const { logout } = useAuth({ middleware: 'auth', url: '/cosecha' })

    return (
        <nav className="p-3">
            <strong className="h2 text-info">
                JULIUSBOX <span className="h4">STARTUP</span>
            </strong>
            <p className="my-3">
                User: <span className="text-info"><kbd>Julio Huaroc</kbd></span>
            </p>

            <nav className="pt-3">
                <div>
                    <Link
                        to="/cosecha"
                        className={`text-white d-block ${location.pathname === '/cosecha' ? 'bg-secondary rounded text-center' : ''
                            }`}
                    >
                        DATABASE - COSECHAR
                    </Link>
                </div>
                <div>
                    <Link
                        to="/cosecha/areas"
                        className={`text-white d-block ${location.pathname === '/cosecha/areas' ? 'bg-secondary rounded text-center' : ''
                            }`}
                    >
                        AREAS
                    </Link>
                </div>

                <button className="btn btn-outline-danger text-white mt-3" onClick={logout}>Exit</button>
            </nav>
        </nav>
    )
}