import { useEffect, useState } from "react"
import httpClient from "../config/axios"
import { Area, Client, Service } from "../interfaces/Interfaces"
import Modal from 'react-modal';
import { Create } from "../modals/Create";
import { Update } from "../modals/Update";

const customStyles = {
    content: {
        width: '400px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
    },
};

export const Dashboard = () => {

    const token = localStorage.getItem('AUTH_TOKEN')
    const [clients, setClients] = useState<Client[]>([])
    const [areas, setAreas] = useState<Area[]>([])
    const [services, setServices] = useState<Service[]>([])
    const [modalCreate, setModalCreate] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [clientUpdate, setClientUpdate] = useState<Client | null>(null)
    const [setsharedArea, setSetsharedArea] = useState('')
    const [setSharedService, setSetSharedService] = useState('')

    // Modal Create
    const openModalCreate = () => {
        setModalCreate(true);
    }

    const closeModal = () => {
        setModalCreate(false);
    }

    const handleClientCreation = (newClient: Client) => {
        setTimeout(() => { setClients([...clients, newClient]); }, 2000)
    };
    // End Create

    // Update
    const openModalUpdate = (id: Client) => {
        setClientUpdate(id)
        setModalUpdate(true)
    }
    const closeModalUpdate = () => {
        setModalUpdate(false)
    }
    // End Update

    // Areas
    const getAreas = async () => {
        const { data } = await httpClient.get('/api/areas', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setAreas(data.data)
    }

    // Service
    const getServices = async () => {
        const { data } = await httpClient.get('/api/services', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setServices(data.data)
    }

    // Shared

    const sharedArea = async () => {
        const { data } = await httpClient.get(`/api/areas/shared?area=${setsharedArea}`)
        setClients(data.clients)
    }

    const sharedService = async () => {
        const { data } = await httpClient.get(`/api/services/shared?service=${setSharedService}`)
        setClients(data.clients)
    }

    const copyPhoneNumber = (phoneNumber: string) => {
        const textarea = document.createElement('textarea');
        textarea.value = phoneNumber;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    };

    const deleteClient = async (id: number) => {
        try {
            await httpClient.delete(`/api/client/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setClients(clients.filter(client => client.id !== id));
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        sharedArea()
        sharedService()
        getAreas()
        getServices()
    }, [])

    return (
        <>
            <div className="container-md">
                <div className='d-flex justify-content-between  mt-5'>
                    <div className="d-flex gap-3 ">
                        <div className="d-flex">
                            <select className="form-select" value={setsharedArea} onChange={(e) => setSetsharedArea(e.target.value)}>
                                <option value="">Areas</option>
                                {areas.map(area => (
                                    <option value={area.name} key={area.id}>{area.name}</option>
                                ))}
                            </select>
                            <button className="btn btn-outline-success" type="submit" onClick={sharedArea}>Shared</button>
                        </div>

                        <div className="d-flex">
                            <select className="form-select" value={setSharedService} onChange={(e) => setSetSharedService(e.target.value)}>
                                <option value="">Service</option>
                                {services.map(service => (
                                    <option value={service.name} key={service.id}>{service.name}</option>
                                ))}
                            </select>
                            <button className="btn btn-outline-success" type="submit" onClick={sharedService}>Shared</button>
                        </div>
                    </div>
                    <button className='btn btn-success' onClick={openModalCreate}>
                        Create Client
                    </button>
                </div>
                <div className="table-responsive">
                    <table className="table  mt-5">
                        <thead>
                            <tr>
                                <th scope="col" className='text-center'>Phone</th>
                                <th scope="col" className='text-center'>Name</th>
                                <th scope="col" className='text-center'>Info</th>
                                <th scope="col" className='text-center'>Where</th>
                                <th scope="col" className='text-center'>Email</th>
                                <th scope="col" className='text-center'>Bussiness Name</th>
                                <th scope="col" className='text-center'>Services</th>
                                <th scope="col" className='text-center'>Areas</th>
                                <th scope="col" className='text-center'>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                clients.map((client) => (
                                    <tr key={client.id}>
                                        <td className='text-center text-danger' onClick={() => copyPhoneNumber(client.phone)}>{client.phone}</td>
                                        <td className='text-center'>{client.name}</td>
                                        <td className='text-center'>{client.info}</td>
                                        <td className='text-center'>{client.location_id}</td>
                                        <td className='text-center'>{client.email}</td>
                                        <td className='text-center'>{client.business_name}</td>
                                        <td className='text-center'>{client.service_id}</td>
                                        <td className='text-center'>{client.area_id}</td>
                                        <td className='text-center d-flex justify-content-md-between  '>
                                            <button className='btn btn-danger' onClick={() => deleteClient(client.id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                                </svg>
                                            </button>
                                            <button className='btn btn-info' onClick={() => openModalUpdate(client)}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    fill="currentColor"
                                                    className="bi bi-pencil"
                                                    viewBox="0 0 16 16">
                                                    <path
                                                        d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))

                            }
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create Modal */}
            <Modal
                isOpen={modalCreate}
                onRequestClose={closeModal}
                style={customStyles}
            >

                <Create closeModal={closeModal} onClientCreate={handleClientCreation} />
            </Modal>

            {/* Update Modal */}
            <Modal
                isOpen={modalUpdate}
                onRequestClose={closeModalUpdate}
                style={customStyles}
            >
                {
                    clientUpdate && <Update clientUpdate={clientUpdate} closeModalUpdate={closeModalUpdate} />
                }
            </Modal>
        </>
    )
}
