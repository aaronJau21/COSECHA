import { FC, FormEvent, createRef, useEffect, useState } from "react"
import { Area, Client, Location, Service } from "../interfaces/Interfaces"
import httpClient from "../config/axios"
import { AxiosError } from "axios"
import { Alert } from "../components/Alert"

interface CreateProps {
    closeModal: () => void
    onClientCreate: (newClient: Client) => void
}

export const Create: FC<CreateProps> = ({ closeModal, onClientCreate }) => {


    const token = localStorage.getItem('AUTH_TOKEN')

    const [locations, setLocations] = useState<Location[]>([])
    const [services, setServices] = useState<Service[]>([])
    const [areas, setAreas] = useState<Area[]>([])
    const [errors, setErrors] = useState<string[]>([])

    const phoneRef = createRef<HTMLInputElement>();
    const nameRef = createRef<HTMLInputElement>();
    const infoRef = createRef<HTMLTextAreaElement>();
    const locationRef = createRef<HTMLSelectElement>();
    const emailRef = createRef<HTMLInputElement>();
    const businessRef = createRef<HTMLInputElement>();
    const serviceRef = createRef<HTMLSelectElement>();
    const areaRef = createRef<HTMLSelectElement>();

    const getLocations = async () => {
        const { data } = await httpClient.get('/api/locations', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setLocations(data.data)
    }

    const getServices = async () => {
        const { data } = await httpClient.get('/api/services', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setServices(data.data)
    }

    const getAreas = async () => {
        const { data } = await httpClient.get('/api/areas', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setAreas(data.data)
    }

    useEffect(() => {
        getLocations()
        getServices()
        getAreas()
    }, [])

    const handleCreateClient = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const datos = {
            phone: phoneRef.current?.value,
            name: nameRef.current?.value,
            info: infoRef.current?.value,
            location_id: locationRef.current?.value,
            email: emailRef.current?.value,
            business_name: businessRef.current?.value,
            service_id: serviceRef.current?.value,
            area_id: areaRef.current?.value
        }

        try {
            const { data } = await httpClient.post('/api/clients/create', datos, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(data)
            closeModal()
            onClientCreate(data.client)
        } catch (error: AxiosError | any) {
            console.log(error)
            setErrors(Object.values(error?.response.data.errors))
        }
    }

    return (
        <>
            <h2>Create Client</h2>

            <form onSubmit={handleCreateClient}>
                {errors ? errors.map((error, i) => <Alert key={i + 1}>{error}</Alert>) : null}
                {/* row 1 */}
                <div className="row">
                    <div className="mb-3 col">
                        <label htmlFor="phone" className="form-label">Phone Number</label>
                        <input type="text" className="form-control" id="phone" ref={phoneRef} />
                    </div>

                    <div className="mb-3 col">
                        <label htmlFor="name" className="form-label">Full Name</label>
                        <input type="text" className="form-control" id="name" ref={nameRef} />
                    </div>
                </div>
                {/* end row 1 */}

                <div className="mb-3">
                    <label htmlFor="info" className="form-label">Client Information</label>
                    <textarea className="form-control" id="info" ref={infoRef}></textarea>
                </div>

                {/* row2 */}
                <div className="row">
                    <div className="mb-3 col">
                        <label htmlFor="locations">Where</label>
                        <select className="form-select" aria-label="Default select example" id="locations" ref={locationRef}>
                            <option value="">Select</option>
                            {locations.map(location => (
                                <option key={location.id} value={location.id}>{location.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3 col">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" ref={emailRef} />
                    </div>
                </div>
                {/* end row 2 */}

                <div className="mb-3">
                    <label htmlFor="business_name" className="form-label">Business Name</label>
                    <input type="text" className="form-control" id="business_name" ref={businessRef} />
                </div>

                {/* row 3 */}
                <div className="row">
                    <div className="mb-3 col">
                        <label htmlFor="service">Service</label>
                        <select className="form-select" aria-label="Default select example" id="service" ref={serviceRef}>
                            <option value="">Select</option>
                            {services.map(service => (
                                <option key={service.id} value={service.id}>{service.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3 col">
                        <label htmlFor="areas">Areas</label>
                        <select className="form-select" aria-label="Default select example" id="areas" ref={areaRef}>
                            <option value="">Select</option>
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
