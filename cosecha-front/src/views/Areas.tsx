import { useEffect, useState } from "react"
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

    useEffect(() => {
        getAreas(currentPage)
    }, [currentPage])

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage)
    }

    const handleUpdateStatus = async (id: String, newStatus: number) => {
        try {
            await httpClient.post(`/area/${id}`, { status: newStatus });
            const updatedAreas = areas.map((area) => {
                if (area.id === id) {
                    return { ...area, status: newStatus };
                }
                return area;
            });
            setAreas(updatedAreas);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="container">
            <h1>Areas</h1>
            <div className="border border-primary">
                <ul className="list-group p-3">
                    {areas.map((area) => (
                        <li className="list-group-item list-group-item-success" key={area.id}>
                            {area.name}
                            <button type="submit"
                                onClick={() => handleUpdateStatus(area.id, area.status === 1 ? 0 : 1)}
                                className={`btn btn-sm ${area.status === 1 ? "btn-danger" : "btn-success"} mx-1`}
                            >
                                {area.status === 1 ? "Desactivar" : "Activar"}
                            </button>
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