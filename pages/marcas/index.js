import Container from "../../components/container";
import Link from 'next/link'
import { useQuery, useMutation, QueryClientProvider, QueryClient } from "react-query";
import { BsTrash, BsPencil } from "react-icons/bs";

const queryClient = new QueryClient()

export default function Marcas () {
  return(
    <QueryClientProvider client={queryClient}>
      <Brands></Brands>
    </QueryClientProvider>
  )
}

function Brands () {

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/brand/${id}`,{
       method: 'DELETE',
     })
   }
   
   const { mutateAsync, status: delStatus } = useMutation(handleDelete)
 
   const remove = async (id) => {
     await mutateAsync(id)
     queryClient.invalidateQueries("cars")
   }

  const fetchBrand = async () => {
    const response = await fetch("http://localhost:5000/brand")
    return response.json()
  }
  const { data: carBrand, status: brandStatus } = useQuery("brand", fetchBrand)

  if (brandStatus === 'loading') {
    return <div>Loading...</div>
  }

  if (brandStatus === 'error') {
    return <div>Error!</div>
  }

  return(
    <Container>
    {delStatus === 'success' && <div className="self-center bg-green-500 py-4 px-8 text-white font-semibold rounded">Marca excluida com sucesso!</div>}
    <div className="flex justify-between">
      <h1 className="text-3xl">Marcas</h1>
      <button className="border-2 rounded-md border-black p-2"><Link href="/marcas/novamarca"><a> + Nova Marca</a></Link></button>
     </div>
    <table className="border-2 border-black mt-5">
        <thead>
          <tr>
            <td className="border-r-2 border-black bg-black text-white">Marca</td>
            <td className="border-r-2 border-black bg-black text-white w-56">Ações</td>
          </tr>
        </thead>
        {carBrand.map((car) => (
          <tbody>
            <tr>
              <td className="border-r-2 border-black">{car.name}</td>
              <td className="border-r-2 border-black flex justify-evenly">
              <Link href={`/marcas/${car.id}`}>
              <div className="flex items-center border-black border-2 hover:text-red-500 hover:cursor-pointer">
                <BsPencil className="hover:text-red-500 hover:cursor-pointer mx-2"/>
                <p className="mr-2">Editar</p>
              </div>
              </Link>
              <div className="flex items-center border-black border-2 hover:text-red-500 hover:cursor-pointer" onClick={() => remove(car.id)}>
                <BsTrash className="hover:text-red-500 hover:cursor-pointer mx-2"/>
                <p className="mr-2">Excluir</p>
              </div>
              </td>
            </tr>
          </tbody>
          ))}
    </table>
  </Container>
  )
}