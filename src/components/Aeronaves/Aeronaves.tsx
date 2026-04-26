import { useState } from 'react'
import './Aeronaves.css'
import ModalAdicionarAeronave from '../Modals/ModalAdicionarAeronave'

interface Aeronave {
  id: string; modelo: string; tipo: string; capacidade: string; alcance: string;
  etapas: any[]; pecas: any[]; testes: any[];
}

interface Props {
  aeronaves: Aeronave[]
  onSalvar: (a: Aeronave) => void
  proximoId: string
}

function Aeronaves({ aeronaves, onSalvar, proximoId }: Props) {
  const [modalAberto, setModalAberto] = useState(false)

  return (
    <main>
      <div className='corpin-aeronaves'>
        <div className='aeronaves-wrapper'>
          <div className='aeronaves-header'>
            <span>ID</span>
            <span>MODELO</span>
            <span>TIPO</span>
            <span>CAPACIDADE</span>
            <span>ALCANCE</span>
          </div>
          <div className='aeronaves-body'>
            {aeronaves.map((a) => (
              <div className='aeronaves-row' key={a.id}>
                <span>{a.id}</span>
                <span>{a.modelo}</span>
                <span>{a.tipo}</span>
                <span>{a.capacidade}</span>
                <span>{a.alcance}</span>
              </div>
            ))}
          </div>
        </div>
        <div className='aeronaves-footer'>
          <button className='aeronaves-btn-adicionar' onClick={() => setModalAberto(true)}>
            ADICIONAR AERONAVE +
          </button>
          <button className='aeronaves-btn-sair'>→]</button>
        </div>
      </div>

      {modalAberto && (
        <ModalAdicionarAeronave
          onFechar={() => setModalAberto(false)}
          onSalvar={(a) => { onSalvar(a); setModalAberto(false) }}
          proximoId={proximoId}
        />
      )}
    </main>
  )
}

export default Aeronaves