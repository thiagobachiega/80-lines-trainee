import Container from "./container";
import Link from 'next/link'
import { useQuery, useMutation } from "react-query";
import { useState } from 'react'

export default function EditMarcaForm ({id}) {

  const [brand, setBrand] = useState()

const addBrand = async (brand) => {
    const response = await fetch("http://localhost:5000/brand", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(brand),
    })
    return response.json()
  }

 const { mutateAsync, status } = useMutation(addBrand)
  const add = async () => {
    await mutateAsync(brand)
  }

  function handleOnChange (e) {
    console.log(brand)
    setBrand({
      ...brand,
      [e.target.name]: e.target.value
    })
}

const fetchBrand = async () => {
  const response = await fetch(`http://localhost:5000/brand/${id}`)
  return response.json()
}
const { data, status: carStatus } = useQuery("brand", fetchBrand)

const editBrand = async (brand) => {
  const response = await fetch(`http://localhost:5000/brand/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(brand),
  })
  return response.json()
}

const { mutateAsync: editMutate, status: statusMutate } = useMutation(editBrand)

const edit = async () => {
  await editMutate(brand)
}

console.log(id)
console.log(data)

return(
  <Container>
    {statusMutate === 'success' && <div className="self-center bg-green-500 py-4 px-8 text-white font-semibold rounded">Marca editada com sucesso!</div>}
    <h1 className="text-3xl">Nova Marca</h1>
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