import Container from "../components/container";
import Link from 'next/link'

export default function Marcas () {
  return(
    <Container>
      <div className="flex justify-between">
        <h1 className="text-3xl">Marcas</h1>
        <button className="border-2 rounded-md border-black p-2"><Link href="/marca_form"><a> + Nova Marca</a></Link></button>
       </div>
      <table className="border-2 border-black mt-5">
          <thead>
            <tr>
              <td className="border-r-2 border-black bg-black text-white">Marca</td>
              <td className="border-r-2 border-black bg-black text-white">Ações</td>
            </tr>
          </thead>
          <tbody>
          <tr>
            <td className="border-r-2 border-black">Volkswagen</td>
            <td className="border-r-2 border-black">a</td>
          </tr>
          <tr>
            <td className="border-r-2 border-black">Ford</td>
            <td className="border-r-2 border-black">a</td>
          </tr>
        </tbody>
      </table>
    </Container>
  )
}