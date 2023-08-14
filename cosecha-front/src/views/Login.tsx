import { FormEvent, createRef, useState } from "react"
import { Alert } from "../components/Alert"
import { useAuth } from "../hooks/useAuth"


export const Login = () => {

    const userRef = createRef<HTMLInputElement>()
    const passwordRef = createRef<HTMLInputElement>()
    const [errores, setErrores] = useState<string[]>([])
    const { login } = useAuth({
        middleware: 'guest',
        url: '/cosecha'
    })

    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const datas = {
            user: userRef.current?.value,
            password: passwordRef.current?.value
        }
        login({ datas, setErrores })

    }

    return (
        <div className="d-flex justify-content-center ">
            <form className="border mt-5 col-3" onSubmit={handleLogin} noValidate>
                {errores ? errores.map((error, i) => <Alert key={i}>{error}</Alert>) : null}
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
