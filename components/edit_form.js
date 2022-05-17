import Container from "./container";
import { useQuery, useMutation } from "react-query";
import { useState, useEffect } from 'react'
import Link from 'next/link'
import ReactInputMask from "react-input-mask";


export function EditarCarro (id) {

  const [car, setCar] = useState()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const fetchBrand = async () => {
    const response = await fetch("http://localhost:5000/brand")
    return response.json()
  }

  const fetchCar = async () => {
    const response = await fetch(`http://localhost:5000/car/${id.id}`)
    return response.json()
  }

  const editCar = async (car) => {
    const response = await fetch(`http://localhost:5000/car/${id.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(car),
    })
    return response.json()
  }

  const { mutateAsync } = useMutation(editCar, {
    onSuccess: () => {setSuccess(true)}
  })

  const edit = async () => {
    if (!car.plate?.length) {
      setError('O campo placa é obrigatório')
      return 
    }
    if (car.plate?.length < 8) {
      setError('Informe uma placa valida')
      return 
    }  
    if (!car.brand?.length) {
      setError('O campo marca é obrigatório')
      return 
    } 
    if (!car.color?.length) {
      setError('O campo cor é obrigatório')
      return 
    } 
    await mutateAsync(car)
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

  function handleOnChange (e) {
    setCar({
      ...car,
      [e.target.name]: e.target.value
    })
}

  const { data } = useQuery("car" + id.id, fetchCar)

  const { data: carBrand, status: brandStatus } = useQuery("brand", fetchBrand)

  if (brandStatus === "loading") {
    return <div>Loading...</div>
  }
 
  if (brandStatus === "error") {
    return <div>Error</div>
  }

  return(
    <Container key={id}>
      {success && <div className="self-center bg-green-500 py-4 px-8 text-white font-semibold rounded">Carro editado com sucesso!</div>}
      {error.length  > 0 && <div className="self-center bg-red-500 py-4 px-8 text-white font-semibold rounded">{error}</div>}
      {data && (<>
        <h1 className="text-3xl">Editar Carro</h1>
      <form className="flex flex-col mt-5 w-1/6" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="placa">Placa</label>
        <ReactInputMask defaultValue={data.plate} mask={'aaa-9*99' } className="border-2 rounded-md border-black" id="plate" name="plate" onChange={handleOnChange}/>
        <label htmlFor="marca">Marca</label>
        <select defaultValue={data.brand} defaultChecked className="border-2 rounded-md border-black" id="brand" name="brand" onChange={handleOnChange}>
          {carBrand.map((car) => (
            <option>{car.name}</option>
          ))}
        </select>
        <label htmlFor="cor">Cor</label>
        <input defaultValue={data.color} className="border-2 rounded-md border-black" id="color" name="color"  onChange={handleOnChange}></input>
        <div className="space-x-5 mt-5 flex">
          <button type="submit" className="border-2 rounded-md px-6 py-2 border-black" onClick={() => edit()}>Salvar</button>
          <button className="border-2 rounded-md px-6 py-2 border-black"><Link href="/"><a>Voltar</a></Link></button>
        </div>
      </form>   
      </>)}
    </Container>
  )
}