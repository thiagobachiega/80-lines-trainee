import Container from "../components/container";
import Link from 'next/link';
import { QueryClient, QueryClientProvider, useQuery, useMutation } from "react-query";
import { BsTrash, BsPencil } from "react-icons/bs";
import { useState } from 'react'
import Modal from "../components/modal_delete";

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

  const handleDelete = async (id) => {
   const response = await fetch(`http://localhost:5000/car/${id}`,{
      method: 'DELETE',
    })
  }
  
  const { mutateAsync, status: delStatus } = useMutation(handleDelete)

  const remove = async (id) => {
    await mutateAsync(id)
    queryClient.invalidateQueries("cars")
  }

  const modalConfirm = (confirm) => {
    if (confirm && removingCarId.length) {
      remove(removingCarId)
      setRemovingCarId('')
    } else {
      setRemovingCarId('')
    }
  }

  const [removingCarId, setRemovingCarId] = useState('')

  const { data: cars, status: carStatus } = useQuery("cars", fetchCar)
  const { data: carBrand, status: brandStatus } = useQuery("brand", fetchBrand)

  const [ busca, setBusca ] = useState('')

  const [ buscaBrand, setBuscaBrand ] = useState('')

  const handleBusca = (e) => {
    setBusca(e.target.value)
  }

  const handleBuscaBrand = (e) => {
    setBuscaBrand(e.target.value)
  }

  if (carStatus, brandStatus === "loading") {
    return <div>Loading...</div>
  }

  const filteredCar = cars.filter((car) => {
    return car.plate.toUpperCase().includes(busca.toUpperCase()) && car.brand.toUpperCase().includes(buscaBrand.toUpperCase())
  })

  if (carStatus, brandStatus === "error") {
    return <div>Error</div>
  }

return(
  <Container>
    {delStatus === 'success' && <div className="self-center bg-green-500 py-4 px-8 text-white font-semibold rounded">Carro excluido com sucesso!</div>}
  <div className="flex justify-between">
   <h1 className="text-3xl">Carros</h1>
   <button className="border-2 rounded-md border-black p-2"><Link href="/carros"><a> + Novo Carro</a></Link></button>
  </div>
  <div className="flex flex-row space-x-10 mt-5">
  <div className="flex flex-col">
     <label htmlFor="pesquisaPlaca">Filtrar por placa</label>
     <input className="border-2 rounded-md" id="pesquisaPlaca" value={busca} onChange={handleBusca}></input>
  </div>
  <div className="flex flex-col">
    <label htmlFor="pesquisaMarca">Filtrar por marca</label>
    <select className="border-2 rounded-md" id="pesquisaMarca" onChange={handleBuscaBrand}>
      <option value=''>Selecione uma marca</option>
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
        <td className="border-r-2 border-black bg-black text-white w-56">Ações</td>
      </tr>
    </thead>
    {filteredCar.map((car) => (
    <tbody>
      <tr>
        <td className="border-r-2 border-black">{car.plate}</td>
        <td className="border-r-2 border-black">{car.color}</td>
        <td className="border-r-2 border-black">{car.brand}</td>
        <td className="border-r-2 border-black flex justify-evenly">
        <Link href={`/carros/${car.id}`}>
        <div className="flex items-center border-black border-2 hover:text-red-500 hover:cursor-pointer">
          <BsPencil className="hover:text-red-500 hover:cursor-pointer mx-2"/>
          <p className="mr-2">Editar</p>
        </div>
        </Link>
        <div className="flex items-center border-black border-2 hover:text-red-500 hover:cursor-pointer" onClick={() => setRemovingCarId(car.id.toString())}>
          <BsTrash className="hover:text-red-500 hover:cursor-pointer mx-2"/>
          <p className="mr-2">Excluir</p>
        </div>
        </td>
      </tr>
    </tbody>
    ))}
  </table>
  {removingCarId.length > 0 && <Modal modalConfirm={modalConfirm}/>}
</Container>
)
}