import { useState } from 'react'
import './Testes.css'
import ModalAdicionarTeste from '../Modals/ModalAdicionarTeste'

interface Teste {
  id: string; idAeronave: string; tipo: string; resultado: string;
}

interface Props {
  testes: Teste[]
  idsAeronaves: string[]
  onSalvar: (t: Teste) => void
}

function Testes({ testes, idsAeronaves, onSalvar }: Props) {
  const [modalAberto, setModalAberto] = useState(false)

  return (
    <main>
      <div className='corpin-testes'>
        <div className='testes-wrapper'>
          <div className='testes-header'>
            <span>ID</span>
            <span>TIPO</span>
            <span>RESULTADO</span>
          </div>
          <div className='testes-body'>
            {testes.map((t) => (
              <div className='testes-row' key={t.id}>
                <span>{t.id}</span>
                <span>{t.tipo}</span>
                <span className={t.resultado === 'APROVADO' ? 'resultado-aprovado' : 'resultado-reprovado'}>
                  {t.resultado}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className='testes-footer'>
          <button className='testes-btn-adicionar' onClick={() => setModalAberto(true)}>
            ADICIONAR TESTES +
          </button>
          <button className='testes-btn-sair'>→]</button>
        </div>
      </div>

      {modalAberto && (
        <ModalAdicionarTeste
          onFechar={() => setModalAberto(false)}
          onSalvar={(t) => { onSalvar(t); setModalAberto(false) }}
          idsAeronaves={idsAeronaves}
        />
      )}
    </main>
  )
}

export default Testes