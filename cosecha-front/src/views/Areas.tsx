import { FormEvent, useEffect, useState } from "react"
import { Area } from "../interfaces/Interfaces"
import httpClient from "../config/axios"

export const Areas = () => {
    const [areas, setAreas] = useState<Area[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(1)
    const token = localStorage.getItem('AUTH_TOKEN')

    const getAreas = async (page: number) => {
        const { data } = await httpClient.get(`/api/areas-paginate?page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setAreas(data.areas.data)
        setTotalPages(data.areas.last_page)
    }

    const handlAresStatusChange = async (areaId: string, newStatus: number) => {
        const { data } = await httpClient.put(`/api/area/${areaId}`, { status: newStatus }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(data)
        getAreas(currentPage)
    }

    useEffect(() => {
        getAreas(currentPage)
    }, [currentPage])

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage)
    }

    return (
        <div className="container">
            <h1>Areas</h1>
            <div className="border border-primary">
                <ul className="list-group p-3">
                    {areas.map((area) => (
                        <li className="list-group-item list-group-item-success d-flex" key={area.id}>
                            {area.name}
                            <input type="checkbox" name="" id="" checked={area.status == 1} onChange={() => {
                                const newStatus = area.status == 1 ? 0 : 1;
                                handlAresStatusChange(area.id, newStatus)
                            }} />
                        </li>
                    ))}
                </ul>
            </div>
            <div className="pagination mt-3">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`${currentPage === index + 1 ? "active" : ""} btn btn-primary mx-1`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    )
}