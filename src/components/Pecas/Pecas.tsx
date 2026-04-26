import { useState } from 'react'
import './Pecas.css'
import ModalAdicionarPeca from '../Modals/ModalAdicionarPeca'

interface Peca {
  nome: string; fornecedor: string; tipo: string; status: string;
}

interface Props {
  pecas: Peca[]
  onSalvar: (p: Peca) => void
}

const statusColor: Record<string, string> = {
  EM_PRODUCAO:   'status-producao',
  EM_TRANSPORTE: 'status-transporte',
  PRONTA:        'status-pronta',
}

function Pecas({ pecas, onSalvar }: Props) {
  const [modalAberto, setModalAberto] = useState(false)

  return (
    <main>
      <div className='corpin-pecas'>
        <div className='pecas-wrapper'>
          <div className='pecas-header'>
            <span>NOME</span>
            <span>FORNECEDOR</span>
            <span>TIPO</span>
            <span>STATUS</span>
          </div>
          <div className='pecas-body'>
            {pecas.map((p, i) => (
              <div className='pecas-row' key={i}>
                <span>{p.nome}</span>
                <span>{p.fornecedor}</span>
                <span>{p.tipo}</span>
                <span className={statusColor[p.status]}>{p.status}</span>
              </div>
            ))}
          </div>
        </div>
        <div className='pecas-footer'>
          <button className='pecas-btn-adicionar' onClick={() => setModalAberto(true)}>
            ADICIONAR PEÇA +
          </button>
          <button className='pecas-btn-sair'>→]</button>
        </div>
      </div>

      {modalAberto && (
        <ModalAdicionarPeca
          onFechar={() => setModalAberto(false)}
          onSalvar={(p) => { onSalvar(p); setModalAberto(false) }}
        />
      )}
    </main>
  )
}

export default Pecas