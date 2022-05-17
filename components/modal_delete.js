const Modal = ( { modalConfirm } ) => {
  return(
    <div className="border-2 rounded-md border-black w-96 m-auto">
      <div className="flex flex-col text-center space-y-5">
        <div className="border-b-2 border-black">
          <h1 className="font-bold text-lg">Tem certeza que deseja excluir este carro?</h1>
        </div>
        <p>Essa ação não poderá ser desfeita.</p>
      </div>
      <div className="flex text-center mt-10 border-t-2 border-black">
        <div className="border-r-2 border-black w-1/2"><button onClick={() => {modalConfirm(false)}}>Não</button></div>
        <div className="w-1/2 hover:bg-red-500"><button onClick={() => {modalConfirm(true)}}>Sim</button></div>
      </div>
    </div>
  )
}

export default Modal