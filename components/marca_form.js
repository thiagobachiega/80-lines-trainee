import Container from "./container";
import Link from 'next/link'
import { useQuery, useMutation } from "react-query";
import { useState } from 'react'

export default function MarcaForm ({id}) {

  const [brand, setBrand] = useState()

const addBrand = async (car) => {
    const response = await fetch("http://localhost:5000/brand", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(car),
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

return(
  <Container>
    {status === 'success' && <div className="self-center bg-green-500 py-4 px-8 text-white font-semibold rounded">Marca adicionada com sucesso!</div>}
    <h1 className="text-3xl">Nova Marca</h1>
    <form className="flex flex-col mt-5 w-1/6" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="id">ID</label>
      <input className="border-2 rounded-md border-black" id="id" name="id" onChange={handleOnChange}></input>
      <label htmlFor="marca">Marca</label>
      <input className="border-2 rounded-md border-black" id="name" name="name" onChange={handleOnChange}></input>
      <div className="space-x-5 mt-5 flex">
        <button className="border-2 rounded-md px-6 py-2 border-black" onClick={() => add()}>Salvar</button>
        <button className="border-2 rounded-md px-6 py-2 border-black" ><Link href="/marcas"><a>Voltar</a></Link></button>
      </div>
    </form>
  </Container>
)
}