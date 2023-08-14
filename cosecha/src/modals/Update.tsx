import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react"
import { Area, Client, Location, Service } from "../interfaces/Interfaces"
import httpClient from "../config/axios"
import { AxiosError } from "axios"
import { Alert } from "../components/Alert"

interface UpdateProps {
    clientUpdate: Client
    closeModalUpdate: () => void
}

export const Update: FC<UpdateProps> = ({ clientUpdate, closeModalUpdate }) => {

    const token = localStorage.getItem('AUTH_TOKEN')

    const [client, setClient] = useState<Client>(clientUpdate)
    const [locations, setLocations] = useState<Location[]>([])
    const [services, setServices] = useState<Service[]>([])
    const [areas, setAreas] = useState<Area[]>([])
    const [errors, setErrors] = useState([])


    // Locations
    const getLocations = async () => {
        const { data } = await httpClient.get('/api/locations', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setLocations(data.data)
    }

    // Services
    const getServices = async () => {
        const { data } = await httpClient.get('/api/services', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setServices(data.data)
    }

    // Areas
    const getAreas = async () => {
        const { data } = await httpClient.get('/api/areas', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setAreas(data.data)
    }

    // client
    const getClient = async () => {
        const { data } = await httpClient.get(`/api/client/${clientUpdate.id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setClient(data.client)
    }

    // Onchange
    const handleClientChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        e.preventDefault()
        const { id, value } = e.target;
        setClient((preClient) => ({
            ...preClient,
            [id]: value,
        }));
    }

    // Submit
    const handleUpdateClient = async (e: FormEvent) => {
        e.preventDefault()
        const datas = {
            name: client.name,
            phone: client.phone,
            info: client.info,
            location_id: client.location_id,
            email: client.email,
            business_name: client.business_name,
            service_id: client.service_id,
            area_id: client.area_id,
        }

        try {
            const { data } = await httpClient.put(`/api/client/${clientUpdate.id}/update`, datas, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            console.log(data)
            closeModalUpdate()
        } catch (error: AxiosError | any) {
            console.log(error.response.data.errors);
            setErrors(Object.values(error?.response?.data.errors))
        }
    }


    useEffect(() => {
        getClient()
        getLocations()
        getServices()
        getAreas()
    }, [])

    return (
        <>
            <h2>Update Client</h2>

            <form onSubmit={handleUpdateClient}>
                {/* row 1 */}
                {errors ? errors.map((error, i) => <Alert key={i}>{error}</Alert>) : null}
                <div className="row">
                    <div className="mb-3 col">
                        <label htmlFor="phone" className="form-label">Phone Number</label>
                        <input type="text" className="form-control" id="phone" value={client.phone} onChange={handleClientChange} />
                    </div>

                    <div className="mb-3 col">
                        <label htmlFor="name" className="form-label">Full Name</label>
                        <input type="text" className="form-control" id="name" value={client.name} onChange={handleClientChange} />
                    </div>
                </div>
                {/* end row 1 */}

                <div className="mb-3">
                    <label htmlFor="info" className="form-label">Client Information</label>
                    <textarea className="form-control" id="info" value={client.info || ''} onChange={handleClientChange}>{client.info}</textarea>
                </div>

                {/* row2 */}
                <div className="row">
                    <div className="mb-3 col">
                        <label htmlFor="locations">Where</label>
                        <select className="form-select" aria-label="Default select example" id="locations" onChange={handleClientChange} value={client.location_id}>
                            <option value={client.location_id}>{client.location_name}</option>
                            {locations.map(location => (
                                <option key={location.id} value={location.id}>{location.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3 col">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" value={client.email} onChange={handleClientChange} />
                    </div>
                </div>
                {/* end row 2 */}

                <div className="mb-3">
                    <label htmlFor="business_name" className="form-label">Business Name</label>
                    <input type="text" className="form-control" id="business_name" value={client.business_name || ''} onChange={handleClientChange} />
                </div>

                {/* row 3 */}
                <div className="row">
                    <div className="mb-3 col">
                        <label htmlFor="service">Service</label>
                        <select className="form-select" aria-label="Default select example" id="service" onChange={handleClientChange} value={client.service_id}>
                            <option value={client.service_id}>{client.service_name}</option>
                            {services.map(service => (
                                <option key={service.id} value={service.id}>{service.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3 col">
                        <label htmlFor="areas">Areas</label>
                        <select className="form-select" aria-label="Default select example" id="areas" onChange={handleClientChange} value={client.area_id}>
                            <option value={client.area_id}>{client.area_name}</option>
                            {areas.map(area => (
                                <option key={area.id} value={area.id}>{area.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {/* end row 3 */}

                <div className="d-flex justify-content-center ">
                    <button className="btn btn-success ">Send</button>
                </div>
            </form>
        </>
    )
}
