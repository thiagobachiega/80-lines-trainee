import Link from 'next/link'

const Navbar = () => {
  return(
    <div className='bg-black flex w-screen h-10 items-center'>
      <ul className='flex p-4 text-white text-lg'>
          <Link href='/'><a className='pr-5'><li>Carros</li></a></Link>
          <Link href='/marcas'><a className='pr-5'><li>Marcas</li></a></Link>
      </ul>
    </div>
  )
}

export default Navbar