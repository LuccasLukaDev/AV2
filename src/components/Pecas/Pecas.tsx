import { useState } from 'react'
import './Pecas.css'
import ModalAdicionarPeca from '../Modals/ModalAdicionarPeca'

interface Peca {
  id: string
  nome: string
  fornecedor: string
  tipo: string
  status: string
}

interface Props {
  pecas: Peca[]
  onLogout: () => void
  onSalvar: (p: Omit<Peca, 'id'>) => void
  onDeletar: (id: string) => void
  onEditar: (p: Peca) => void
}

const statusColor: Record<string, string> = {
  EM_PRODUCAO: 'status-producao',
  EM_TRANSPORTE: 'status-transporte',
  PRONTA: 'status-pronta',
}

function Pecas({ pecas, onSalvar, onDeletar, onEditar, onLogout}: Props) {
  const [modalAberto, setModalAberto] = useState(false)
  const [selecionado, setSelecionado] = useState<Peca | null>(null)
  const [confirmandoDeletar, setConfirmandoDeletar] = useState(false)

  const [editNome, setEditNome] = useState('')
  const [editFornecedor, setEditFornecedor] = useState('')
  const [editTipo, setEditTipo] = useState('')
  const [editStatus, setEditStatus] = useState('')
  const [editErro, setEditErro] = useState('')

  function abrirDetalhe(p: Peca) {
    setSelecionado(p)
    setEditNome(p.nome)
    setEditFornecedor(p.fornecedor)
    setEditTipo(p.tipo)
    setEditStatus(p.status)
    setEditErro('')
    setConfirmandoDeletar(false)
  }

  function fecharDetalhe() {
    setSelecionado(null)
    setConfirmandoDeletar(false)
    setEditErro('')
  }

  function handleSalvarEdicao() {
    if (!editNome || !editFornecedor || !editTipo || !editStatus) {
      setEditErro('Preencha todos os campos antes de salvar.')
      return
    }

    if (!selecionado) return

    onEditar({
      ...selecionado,
      nome: editNome.toUpperCase(),
      fornecedor: editFornecedor.toUpperCase(),
      tipo: editTipo,
      status: editStatus,
    })

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
        <div className='corpin-pecas'>
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
                <label>NOME</label>
                <input value={editNome} onChange={e => setEditNome(e.target.value)} maxLength={20}/>
              </div>

              <div className='detalhe-campo'>
                <label>FORNECEDOR</label>
                <input value={editFornecedor} onChange={e => setEditFornecedor(e.target.value)} maxLength={20}/>
              </div>

              <div className='detalhe-campo'>
                <label>TIPO</label>
                <div className='detalhe-select-wrapper'>
                  <select value={editTipo} onChange={e => setEditTipo(e.target.value)}>
                    <option value='NACIONAL'>NACIONAL</option>
                    <option value='IMPORTADA'>IMPORTADA</option>
                  </select>
                </div>
              </div>

              <div className='detalhe-campo'>
                <label>STATUS</label>
                <div className='detalhe-select-wrapper'>
                  <select value={editStatus} onChange={e => setEditStatus(e.target.value)}>
                    <option value='EM_PRODUCAO'>EM_PRODUCAO</option>
                    <option value='EM_TRANSPORTE'>EM_TRANSPORTE</option>
                    <option value='PRONTA'>PRONTA</option>
                  </select>
                </div>
              </div>

            </div>

            {editErro && <p className='detalhe-erro'>{editErro}</p>}

            <div className='detalhe-footer'>
              <button className='detalhe-btn-salvar' onClick={handleSalvarEdicao}>Salvar 💾</button>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main>
      <div className='corpin-pecas'>
        <div className='pecas-wrapper'>
          <div className='pecas-header'>
            <span>ID</span>
            <span>NOME</span>
            <span>FORNECEDOR</span>
            <span>TIPO</span>
            <span>STATUS</span>
          </div>

          <div className='pecas-body'>
            {pecas.map(p => (
              <div className='pecas-row' key={p.id} onClick={() => abrirDetalhe(p)}>
                <span>{p.id}</span>
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
          <button className='pecas-btn-sair' onClick={onLogout}>→]</button>
        </div>
      </div>

      {modalAberto && (
        <ModalAdicionarPeca
          onFechar={() => setModalAberto(false)}
          onSalvar={(p) => {
            onSalvar(p)
            setModalAberto(false)
          }}
        />
      )}
    </main>
  )
}

export default Pecas