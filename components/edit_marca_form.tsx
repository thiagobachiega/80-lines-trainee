import Container from "./container";
import Link from 'next/link'
import { useQuery, useMutation } from "react-query";
import { useState, useEffect } from 'react'
import Brands from "../types/brands";

interface EditMarcaFormProps {
  id: string | string[]
}

const EditMarcaForm:React.FC<EditMarcaFormProps> = (id) => {

  const [brand, setBrand] = useState<Brands>()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  function handleOnChange (e: React.ChangeEvent<HTMLInputElement>) {
    console.log(brand)
    setBrand({
      ...brand, 
      [e.target.name]: e.target.value
    })
}

const fetchBrand = async () => {
  const response = await fetch(`http://localhost:5000/brand/${id.id}`)
  return response.json()
}
const { data, status: brandStatus } = useQuery("brand" + id.id, fetchBrand)

const editBrand = async (brand) => {
  const response = await fetch(`http://localhost:5000/brand/${id.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(brand),
  })
  return response.json()
}

const { mutateAsync } = useMutation(editBrand, {
  onSuccess: () => {setSuccess(true)}
})

const edit = async () => {
  if (!brand.id?.length) {
    setError('O campo ID é obrigatório')
    return 
  }
  if (!brand.name?.length) {
    setError('O campo marca é obrigatório')
    return 
  } 
  await mutateAsync(brand)
}

useEffect(() => {
  if (success) {
    setTimeout(() => {
      setSuccess(false)
    }, 3000);
  }
  if (error.length) {
    setTimeout(() => {
      setError('')
    }, 3000);
  }
}, [success, error])

if (brandStatus === "loading") {
  return <div>Loading...</div>
}

if (brandStatus === "error") {
  return <div>Error</div>
}

return(
  <Container>
    {success && <div className="self-center bg-green-500 py-4 px-8 text-white font-semibold rounded">Marca editada com sucesso!</div>}
    {error.length  > 0 && <div className="self-center bg-red-500 py-4 px-8 text-white font-semibold rounded">{error}</div>}
    <h1 className="text-3xl">Editar Marca</h1>
    {data && (
      <form className="flex flex-col mt-5 w-1/6" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="id">ID</label>
      <input defaultValue={data.id} className="border-2 rounded-md border-black" id="id" name="id" onChange={handleOnChange}></input>
      <label htmlFor="marca">Marca</label>
      <input defaultValue={data.name} className="border-2 rounded-md border-black" id="name" name="name" onChange={handleOnChange}></input>
      <div className="space-x-5 mt-5 flex">
        <button className="border-2 rounded-md px-6 py-2 border-black" onClick={() => edit()}>Salvar</button>
        <button className="border-2 rounded-md px-6 py-2 border-black" ><Link href="/marcas"><a>Voltar</a></Link></button>
      </div>
    </form>
    )}
  </Container>
)
}

export default EditMarcaForm