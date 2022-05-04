import Navbar from "./navbar"

const Container = ({children}) => {
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