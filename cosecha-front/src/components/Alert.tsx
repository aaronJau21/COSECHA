import { FC, ReactNode } from "react"

interface propsAlert {
    children: ReactNode
}

export const Alert: FC<propsAlert> = ({ children }) => {
    return (
        <div className="text-center my-2 bg-danger text-white  ">
            {children}
        </div>
    )
}
