import React from "react"

interface ModalProps {
  modalConfirm: (confirm: boolean) => void
}

const Modal:React.FC<ModalProps> = ( { modalConfirm } ) => {
  return(
    <div className="w-screen h-screen fixed top-0 left-0 z-2000 flex">
      <div className="border-2 rounded-md border-black w-96 m-auto">
        <div className="flex flex-col text-center space-y-5 bg-white">
          <div className="border-b-2 border-black bg-black text-white">
            <h1 className="font-bold text-lg">Tem certeza que deseja excluir este carro?</h1>
          </div>
          <p>Essa ação não poderá ser desfeita.</p>
        </div>
        <div className="flex text-center mt-10 border-t-2 border-black">
          <div className="border-r-2 border-black w-1/2"><button onClick={() => {modalConfirm(false)}}>Não</button></div>
          <div className="w-1/2 hover:bg-red-500"><button onClick={() => {modalConfirm(true)}}>Sim</button></div>
        </div>
      </div>
    </div>
  )
}

export default Modal