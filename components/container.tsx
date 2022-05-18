import React, { ReactNode } from "react"
import Navbar from "./navbar"

interface ContainerProps {
  children: ReactNode
}

const Container:React.FC<ContainerProps> = ({children}) => {
  return(
    <>
      <Navbar/>
      <div className="w-11/12 m-auto p-10 flex flex-col">
        {children}
      </div>
    </>
  )
}

export default Container