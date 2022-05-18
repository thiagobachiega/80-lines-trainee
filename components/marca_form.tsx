import Container from "./container";
import Link from 'next/link'
import { useMutation } from "react-query";
import { useState, useEffect } from 'react'
import Brands from "../types/brands";
import React from 'react'

const MarcaForm:React.FC = () => {

  const [brand, setBrand] = useState<Brands>()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

const addBrand = async (car: Brands) => {
    const response = await fetch("http://localhost:5000/brand", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(car),
    })
    return response.json()
  }

  function handleOnChange (e: React.ChangeEvent<HTMLInputElement>) {
    setBrand({
      ...brand,
      [e.target.name]: e.target.value
    })
}

 const { mutateAsync } = useMutation(addBrand, {
  onSuccess: () => {setSuccess(true)}
})

  const add = async () => {
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



return(
  <Container>
    {success && <div className="self-center bg-green-500 py-4 px-8 text-white font-semibold rounded">Marca adicionada com sucesso!</div>}
    {error.length  > 0 && <div className="self-center bg-red-500 py-4 px-8 text-white font-semibold rounded">{error}</div>}
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

export default MarcaForm