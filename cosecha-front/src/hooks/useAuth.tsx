import { AxiosError } from "axios";
import httpClient from "../config/axios";
import useSWR from "swr";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AuthProps {
    middleware: string;
    url: string;
}

interface DatasProps {
    user: string | undefined;
    password: string | undefined;
}

export const useAuth = ({ middleware, url }: AuthProps) => {

    const token = localStorage.getItem('AUTH_TOKEN')
    const navigate = useNavigate();

    const { data: User, error, mutate } = useSWR('/api/user', () =>
        httpClient('api/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.data)
            .catch(error => {
                throw Error(error?.response?.data?.errors)
            })
    )

    const login = async ({ datas, setErrores }: { datas: DatasProps, setErrores: (errors: string[]) => void }) => {
        try {
            const { data } = await httpClient.post('/api/login', datas);
            localStorage.setItem('AUTH_TOKEN', data.token);
            setErrores([]); // Aquí puedes actualizar los errores si es necesario
            await mutate()
        } catch (error: any | AxiosError) {
            setErrores(Object.values(error.response?.data?.errors || {}));
        }
    };

    const logout = async () => {
        try {
            await httpClient.post('/api/logout', null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            localStorage.removeItem('AUTH_TOKEN')
            await mutate(undefined)
        } catch (error: any | AxiosError) {
            throw Error(error?.response?.data?.errors)
        }
    };

    useEffect(() => {
        if (middleware === 'guest' && url && User) {
            navigate(url)
        }
        if (middleware === 'auth' && error) {
            navigate('/')
        }
    }, [User, error])


    return {
        login,
        logout,
        User,
        error
    };
}
