import Container from "../components/container";

export default function MarcaForm () {
return(
  <Container>
    <h1 className="text-3xl">Nova Marca</h1>
    <form className="flex flex-col mt-5 w-1/6">
      <label htmlFor="id">ID</label>
      <input className="border-2 rounded-md border-black" id="id"></input>
      <label htmlFor="marca">Marca</label>
      <input className="border-2 rounded-md border-black" id="marca"></input>
      <div className="space-x-5 mt-5 flex">
        <button className="border-2 rounded-md px-6 py-2 border-black">Salvar</button>
        <button className="border-2 rounded-md px-6 py-2 border-black">Voltar</button>
      </div>
    </form>
  </Container>
)
}