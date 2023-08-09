import { useEffect, useState, createRef, FC } from "react"
import { clientAxios } from "../helpers/axios"
import { Area, Client, Location, Service } from "../interfaces/Interfaces"

interface CreateProps {
    closeModal: () => void;
    onClientCreate: (newClient: Client) => void;
}

export const Create: FC<CreateProps> = ({ closeModal,onClientCreate }) => {

    const [locations, setLocations] = useState<Location[]>([])
    const [services, setServices] = useState<Service[]>([])
    const [areas, setAreas] = useState<Area[]>([])

    const phoneRef = createRef<HTMLInputElement>();
    const fullNameRef = createRef<HTMLInputElement>();
    const infoRef = createRef<HTMLTextAreaElement>();
    const locationRef = createRef<HTMLSelectElement>();
    const emailRef = createRef<HTMLInputElement>();
    const businessNameRef = createRef<HTMLInputElement>();
    const serviceRef = createRef<HTMLSelectElement>();
    const areaRef = createRef<HTMLSelectElement>();

    const getLocations = async () => {

        const { data } = await clientAxios.get('/locations')
        setLocations(data.locations)
    }

    const getServices = async () => {
        const { data } = await clientAxios.get('/services')
        setServices(data.services)
    }

    const getAreas = async () => {
        const { data } = await clientAxios.get('/areas')
        setAreas(data.areas)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const datas = {
            phone: phoneRef.current?.value,
            name: fullNameRef.current?.value,
            info: infoRef.current?.value,
            location_id: locationRef.current?.value,
            email: emailRef.current?.value,
            business_name: businessNameRef.current?.value,
            service_id: serviceRef.current?.value,
            area_id: areaRef.current?.value,
        };
        try {
            const { data } = await clientAxios.post('/clients/create', datas)

            closeModal()
            onClientCreate(data.client)
        } catch (error: any) {
            console.log(error)
        }
    }

    useEffect(() => {
        getLocations()
        getServices()
        getAreas()
    }, [])


    return (
        <>
            <h2>Create Client</h2>

            <form onSubmit={handleSubmit}>
                {/* row 1 */}
                <div className="row">
                    <div className="mb-3 col">
                        <label htmlFor="phone" className="form-label">Phone Number</label>
                        <input type="text" className="form-control" id="phone" ref={phoneRef} />
                    </div>

                    <div className="mb-3 col">
                        <label htmlFor="name" className="form-label">Full Name</label>
                        <input type="text" className="form-control" id="name" ref={fullNameRef} />
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
                            {locations.map((location) => (
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
                    <input type="text" className="form-control" id="business_name" ref={businessNameRef} />
                </div>

                {/* row 3 */}
                <div className="row">
                    <div className="mb-3 col">
                        <label htmlFor="service">Service</label>
                        <select className="form-select" aria-label="Default select example" id="service" ref={serviceRef}>
                            <option value="">Select</option>
                            {services.map((service) => (
                                <option key={service.id} value={service.id}>{service.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3 col">
                        <label htmlFor="areas">Areas</label>
                        <select className="form-select" aria-label="Default select example" id="areas" ref={areaRef}>
                            <option value="">Select</option>
                            {areas.map((area) => (
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
