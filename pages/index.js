import Container from "../components/container";
import Link from 'next/link';
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const queryClient = new QueryClient()

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <CarTable/>
    </QueryClientProvider>
  )
}

function CarTable() {

  const fetchCar = async () => {
    const response = await fetch("http://localhost:5000/car")
    return response.json()
  }

  const fetchBrand = async () => {
    const response = await fetch("http://localhost:5000/brand")
    return response.json()
  }

  const { data: car, status: carStatus } = useQuery("cars", fetchCar)
  const { data: carBrand, status: brandStatus } = useQuery("brand", fetchBrand)

  if (carStatus, brandStatus === "loading") {
    return <div>Loading...</div>
  }
 
  if (carStatus, brandStatus === "error") {
    return <div>Error</div>
  }

return(
  <Container>
  <div className="flex justify-between">
   <h1 className="text-3xl">Carros</h1>
   <button className="border-2 rounded-md border-black p-2"><Link href="/carro_form"><a> + Novo Carro</a></Link></button>
  </div>
  <div className="flex flex-row space-x-10 mt-5">
   <div className="flex flex-col">
     <label htmlFor="pesquisaPlaca">Filtrar por placa</label>
     <input className="border-2 rounded-md" id="pesquisaPlaca"></input>
   </div>
   <div className="flex flex-col">
     <label htmlFor="pesquisaMarca">Filtrar por marca</label>
     <select className="border-2 rounded-md" id="pesquisaMarca">
       {carBrand.map((car) => (
         <option>{car.name}</option>
       ))}
     </select>
   </div>
  </div>

   <table className="border-2 border-black mt-5">
       <thead>
         <tr>
           <td className="border-r-2 border-black bg-black text-white">Placa</td>
           <td className="border-r-2 border-black bg-black text-white">Cor</td>
           <td className="border-r-2 border-black bg-black text-white">Marca</td>
           <td className="border-r-2 border-black bg-black text-white">Ações</td>
         </tr>
       </thead>
       {car.map((car) => (
          <tbody>
            <tr>
              <td className="border-r-2 border-black">{car.plate}</td>
              <td className="border-r-2 border-black">{car.color}</td>
              <td className="border-r-2 border-black">{car.brand}</td>
              <td className="border-r-2 border-black"></td>
            </tr>
          </tbody>
       ))}
   </table>
</Container>
)
}