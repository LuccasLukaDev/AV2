import { useState } from 'react'
import './Testes.css'
import ModalAdicionarTeste from '../Modals/ModalAdicionarTeste'

interface Teste {
  id: string; idAeronave: string; tipo: string; resultado: string;
}

interface Props {
  testes: Teste[]
  idsAeronaves: string[]
  onLogout: () => void
  onSalvar: (t: Teste) => void
  onDeletar: (id: string) => void
  onEditar: (t: Teste) => void
}

function Testes({ testes, idsAeronaves, onSalvar, onDeletar, onEditar, onLogout }: Props) {
  const [modalAberto, setModalAberto] = useState(false)
  const [selecionado, setSelecionado] = useState<Teste | null>(null)
  const [confirmandoDeletar, setConfirmandoDeletar] = useState(false)
  const [editTipo, setEditTipo] = useState('')
  const [editResultado, setEditResultado] = useState('')

  function abrirDetalhe(t: Teste) {
    setSelecionado(t)
    setEditTipo(t.tipo)
    setEditResultado(t.resultado)
    setConfirmandoDeletar(false)
  }

  function fecharDetalhe() {
    setSelecionado(null)
    setConfirmandoDeletar(false)
  }

  function handleSalvarEdicao() {
    if (!selecionado) return
    onEditar({ ...selecionado, tipo: editTipo, resultado: editResultado })
    fecharDetalhe()
  }

  function handleDeletar() {
    if (!selecionado) return
    onDeletar(selecionado.id)
    fecharDetalhe()
  }

  if (selecionado) {
    return (
      <main>
        <div className='corpin-testes'>
          <div className='detalhe-topbar'>
            <button className='detalhe-btn-voltar' onClick={fecharDetalhe}>↩</button>
            <span className='detalhe-titulo'>ID: {selecionado.id}</span>
            {confirmandoDeletar ? (
              <div className='detalhe-confirmar-delete'>
                <span>Deletar?</span>
                <button className='detalhe-btn-confirmar-sim' onClick={handleDeletar}>Sim</button>
                <button className='detalhe-btn-confirmar-nao' onClick={() => setConfirmandoDeletar(false)}>Não</button>
              </div>
            ) : (
              <button className='detalhe-btn-lixeira' onClick={() => setConfirmandoDeletar(true)}>🗑</button>
            )}
          </div>

          <div className='detalhe-card'>
            <div className='detalhe-grid-2'>
              <div className='detalhe-campo'>
                <label>TIPO</label>
                <div className='detalhe-select-wrapper'>
                  <select value={editTipo} onChange={e => setEditTipo(e.target.value)}>
                    <option value='ELETRICO'>ELETRICO</option>
                    <option value='HIDRAULICO'>HIDRAULICO</option>
                    <option value='AERODINAMICO'>AERODINAMICO</option>
                  </select>
                </div>
              </div>

              <div className='detalhe-campo'>
                <label>RESULTADO</label>
                <div className='detalhe-select-wrapper'>
                  <select value={editResultado} onChange={e => setEditResultado(e.target.value)}>
                    <option value='APROVADO'>APROVADO</option>
                    <option value='REPROVADO'>REPROVADO</option>
                  </select>
                </div>
              </div>
            </div>

            <div className='detalhe-footer'>
              <button className='detalhe-btn-salvar' onClick={handleSalvarEdicao}>
                Salvar 💾
              </button>
            </div>
          </div>
        </div>
      </main>
    )
  }

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
              <div
                className='testes-row'
                key={t.id}
                onClick={() => abrirDetalhe(t)}
              >
                <span>{t.id}</span>
                <span>{t.tipo}</span>
                <span className={
                  t.resultado === 'APROVADO'
                    ? 'resultado-aprovado'
                    : 'resultado-reprovado'
                }>
                  {t.resultado}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className='testes-footer'>
          <button
            className='testes-btn-adicionar'
            onClick={() => setModalAberto(true)}
          >
            ADICIONAR TESTES +
          </button>

          <button className='testes-btn-sair' onClick={onLogout}>→]</button>
        </div>
      </div>

      {modalAberto && (
        <ModalAdicionarTeste
          onFechar={() => setModalAberto(false)}
          onSalvar={(t) => {
            onSalvar(t)
            setModalAberto(false)
          }}
          idsAeronaves={idsAeronaves}
        />
      )}
    </main>
  )
}

export default Testes