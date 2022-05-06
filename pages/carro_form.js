import Container from "../components/container";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

export default function CarroForm () {
return(
    <Container>
      <h1 className="text-3xl">Novo Carro</h1>
      <form className="flex flex-col mt-5 w-1/6">
        <label htmlFor="placa">Placa</label>
        <input className="border-2 rounded-md border-black" id="placa"></input>
        <label htmlFor="marca">Marca</label>
        <select className="border-2 rounded-md border-black" id="marca"></select>
        <label htmlFor="cor">Cor</label>
        <input className="border-2 rounded-md border-black" id="cor"></input>
        <div className="space-x-5 mt-5 flex">
          <button className="border-2 rounded-md px-6 py-2 border-black">Salvar</button>
          <button className="border-2 rounded-md px-6 py-2 border-black">Voltar</button>
        </div>
      </form>
    </Container>
)
}