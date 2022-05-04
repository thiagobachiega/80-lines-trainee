import Container from "../components/container";


export default function Home() {
  return (
     <Container>
       <div className="flex justify-between">
        <h1>Carros</h1>
        <button className="border-2 rounded-md border-black p-2"> + Novo Carro</button>
       </div>
       <div className="flex flex-row space-x-10">
        <div className="flex flex-col">
          <label htmlFor="pesquisaPlaca">Filtrar por placa</label>
          <input className="border-2 rounded-md" id="pesquisaPlaca"></input>
        </div>
        <div className="flex flex-col">
          <label htmlFor="pesquisaMarca">Filtrar por marca</label>
          <select className="border-2 rounded-md" id="pesquisaMarca"></select>
        </div>
       </div>

      

     </Container>
  )
}
