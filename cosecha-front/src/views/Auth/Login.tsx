import { FormEvent, createRef, useState } from "react";
import { AxiosError } from "axios";
import { clientAxios } from "../../helpers/axios";
import { useAuth } from "../../context/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";

interface LoginData {
    userName: string | undefined;
    password: string | undefined;
}

export const Login = () => {

    const userRef = createRef<HTMLInputElement>()
    const passwordRef = createRef<HTMLInputElement>()
    const [errors, setErrors] = useState(false)
    const auth = useAuth()
    const go = useNavigate()

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const login: LoginData = {
            userName: userRef.current?.value,
            password: passwordRef.current?.value
        }
        try {
            const { data } = await clientAxios.post('/login', login);
            console.log(data);
            setErrors(false)
            auth.isAuthenticated = true
            go('/cosecha')
        } catch (error: AxiosError | any) {
            console.log(error.response?.data.msg);
            setErrors(true)
        }
    }

    if (auth.isAuthenticated) {
        return <Navigate to='/cosecha' />
    }

    return (
        <div className="d-flex justify-content-center ">
            <form className="border mt-5 col-3" onSubmit={handleLogin} noValidate>
                {errors ? <p className="text-center text-danger py-3 h4"><strong>Invalid credentials</strong></p> : ''}
                <div className="bg-primary text-white">
                    <p className="h4 text-center py-1">Login</p>
                </div>
                <div className="p-3">
                    <div className="mb-3">
                        <div className="input-group">
                            <span className="input-group-text" id="basic-addon3">User:</span>
                            <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4" ref={userRef} />
                        </div>
                    </div>

                    <div className="mb-3">
                        <div className="input-group">
                            <span className="input-group-text" id="basic-addon3">Password:</span>
                            <input type="password" className="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4" ref={passwordRef} />
                        </div>
                    </div>
                    <div className="d-flex justify-content-center ">
                        <button type="submit" className="btn btn-secondary text-white">Login</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
