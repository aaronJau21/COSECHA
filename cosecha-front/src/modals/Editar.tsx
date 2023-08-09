import { ChangeEvent, FC, useEffect, useState } from "react"
import { clientAxios } from "../helpers/axios"
import { Area, Client, Location, Service } from "../interfaces/Interfaces"

interface EditFormsProps {
  editingClient: Client
  closeModalShow: () => void
}

export const Editar: FC<EditFormsProps> = ({ editingClient, closeModalShow }) => {
  const [client, setClient] = useState<Client>(editingClient)
  const [locations, setLocations] = useState<Location[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [areas, setAreas] = useState<Area[]>([])


  const handleClientChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.preventDefault()
    const { id, value } = e.target;
    setClient((preClient) => ({
      ...preClient,
      [id]: value,
    }));
  }

  const getLocations = async () => {
    const { data } = await clientAxios.get('/locations');
    setLocations(data.locations)
  }

  const getServices = async () => {
    const { data } = await clientAxios.get('/services');
    setServices(data.services)
  }

  const getAreas = async () => {
    const { data } = await clientAxios.get('/areas');
    setAreas(data.areas)
  }

  const getClient = async () => {
    const { data } = await clientAxios.get(`/client/${editingClient.id}`);
    setClient(data.info)
    console.log(data.info)
  }

  const handleUpdateClient = async (e: any) => {
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
      const { data } = await clientAxios.put(`/client/${editingClient.id}/update`, datas);
      console.log(data);
      closeModalShow()
    } catch (error) {
      console.error("Error updating client:", error);
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
          <textarea className="form-control" id="info" value={client.info} onChange={handleClientChange}>{client.info}</textarea>
        </div>

        {/* row2 */}
        <div className="row">
          <div className="mb-3 col">
            <label htmlFor="locations">Where</label>
            <select className="form-select" aria-label="Default select example" id="locations" onChange={handleClientChange}>
              <option value={client.location_id}>{client.location_name}</option>
              {locations.map((location) => (
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
          <input type="text" className="form-control" id="business_name" value={client.business_name} onChange={handleClientChange} />
        </div>

        {/* row 3 */}
        <div className="row">
          <div className="mb-3 col">
            <label htmlFor="service">Service</label>
            <select className="form-select" aria-label="Default select example" id="service" onChange={handleClientChange}>
              <option value={client.service_id} >{client.service_name}</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>{service.name}</option>
              ))}
            </select>
          </div>

          <div className="mb-3 col">
            <label htmlFor="areas">Areas</label>
            <select className="form-select" aria-label="Default select example" id="areas" onChange={handleClientChange}>
              <option value={client.area_id} >{client.area_name}</option>
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
