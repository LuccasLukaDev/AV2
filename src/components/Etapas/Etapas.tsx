import { useState } from 'react'
import './Etapas.css'
import ModalAdicionarEtapa from '../Modals/ModalAdicionarEtapa'

interface Etapa {
  id: string; nome: string; prazo: string; status: string; idAeronave: string;
}

interface Props {
  etapas: Etapa[]
  idsAeronaves: string[]
  onSalvar: (e: Etapa) => void
}

function Etapas({ etapas, idsAeronaves, onSalvar }: Props) {
  const [modalAberto, setModalAberto] = useState(false)

  return (
    <main>
      <div className='corpin-etapas'>
        <div className='etapas-wrapper'>
          <div className='etapas-header'>
            <span>ID</span>
            <span>NOME</span>
            <span>PRAZO</span>
            <span>STATUS</span>
          </div>
          <div className='etapas-body'>
            {etapas.map((e) => (
              <div className='etapas-row' key={e.id}>
                <span>{e.id}</span>
                <span>{e.nome}</span>
                <span>{e.prazo}</span>
                <span className={
                  e.status === 'CONCLUIDA' ? 'status-concluida' :
                  e.status === 'ANDAMENTO' ? 'status-andamento' : 'status-pendente'
                }>{e.status}</span>
              </div>
            ))}
          </div>
        </div>
        <div className='etapas-footer'>
          <button className='etapas-btn-adicionar' onClick={() => setModalAberto(true)}>
            ADICIONAR ETAPA +
          </button>
          <button className='etapas-btn-sair'>→]</button>
        </div>
      </div>

      {modalAberto && (
        <ModalAdicionarEtapa
          onFechar={() => setModalAberto(false)}
          onSalvar={(e) => { onSalvar(e); setModalAberto(false) }}
          idsAeronaves={idsAeronaves}
        />
      )}
    </main>
  )
}

export default Etapas