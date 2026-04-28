import { useState } from 'react'
import './Etapas.css'
import ModalAdicionarEtapa from '../Modals/ModalAdicionarEtapa'

interface Funcionario {
  id: number
  nomeCompleto: string
  username: string
  senha: string
  telefone: string
  tipo: string
  endereco: string
}

interface Etapa {
  id: string
  nome: string
  prazo: string
  status: string
  idAeronave: string
  funcionarios: Funcionario[]
}

interface Props {
  etapas: Etapa[]
  idsAeronaves: string[]
  funcionarios: Funcionario[]
  onSalvar: (e: Etapa) => void
  onDeletar: (id: string) => void
  onAtualizarStatus: (id: string, status: string) => void
  onAtualizarFuncionarios: (id: string, funcs: Funcionario[]) => void
}

function Etapas({
  etapas,
  idsAeronaves,
  funcionarios,
  onSalvar,
  onDeletar,
  onAtualizarStatus,
  onAtualizarFuncionarios
}: Props) {

  const [modalAberto, setModalAberto] = useState(false)
  const [selecionado, setSelecionado] = useState<Etapa | null>(null)
  const [confirmandoDeletar, setConfirmandoDeletar] = useState(false)
  const [modalFuncAberto, setModalFuncAberto] = useState(false)
  const [inputIdFunc, setInputIdFunc] = useState('')
  const [erroFunc, setErroFunc] = useState('')

  function abrirDetalhe(e: Etapa) {
    setSelecionado(e)
    setConfirmandoDeletar(false)
  }

  function fecharDetalhe() {
    setSelecionado(null)
    setConfirmandoDeletar(false)
  }

  function handleDeletar() {
    if (!selecionado) return
    onDeletar(selecionado.id)
    fecharDetalhe()
  }

  function handleAdicionarFuncionario() {
    if (!selecionado) return

    const id = parseInt(inputIdFunc)
    const func = funcionarios.find(f => f.id === id)

    if (!func) {
      setErroFunc('Funcionário não encontrado.')
      return
    }

    const jaExiste = selecionado.funcionarios.some(f => f.id === id)

    if (jaExiste) {
      setErroFunc('Funcionário já adicionado.')
      return
    }

    const novosFunc = [...selecionado.funcionarios, func]

    onAtualizarFuncionarios(selecionado.id, novosFunc)

    setSelecionado(prev =>
      prev ? { ...prev, funcionarios: novosFunc } : null
    )

    setInputIdFunc('')
    setErroFunc('')
    setModalFuncAberto(false)
  }

  function handleRemoverFuncionario(idFunc: number) {
    if (!selecionado) return

    const novosFunc = selecionado.funcionarios.filter(f => f.id !== idFunc)

    onAtualizarFuncionarios(selecionado.id, novosFunc)

    setSelecionado(prev =>
      prev ? { ...prev, funcionarios: novosFunc } : null
    )
  }

  function handleStatus(status: string) {
    if (!selecionado) return

    onAtualizarStatus(selecionado.id, status)

    setSelecionado(prev =>
      prev ? { ...prev, status } : null
    )
  }

  // ── DETALHE ──
  if (selecionado) {
    return (
      <main>
        <div className='corpin-etapas'>

          <div className='detalhe-topbar'>
            <div className='detalhe-topbar-esquerda'>
              <button className='detalhe-btn-voltar' onClick={fecharDetalhe}>↩</button>
              <button className='detalhe-btn-func-add' onClick={() => setModalFuncAberto(true)}>+</button>
            </div>

            <span className='detalhe-titulo'>ID: {selecionado.id}</span>

            <div className='detalhe-topbar-direita'>
              {confirmandoDeletar ? (
                <div className='detalhe-confirmar-delete'>
                  <span>Deletar?</span>
                  <button className='detalhe-btn-confirmar-sim' onClick={handleDeletar}>Sim</button>
                  <button className='detalhe-btn-confirmar-nao' onClick={() => setConfirmandoDeletar(false)}>Não</button>
                </div>
              ) : (
                <>
                  <button className='detalhe-btn-status pendente' onClick={() => handleStatus('PENDENTE')}>⚠</button>
                  <button className='detalhe-btn-status andamento' onClick={() => handleStatus('ANDAMENTO')}>🔄</button>
                  <button className='detalhe-btn-status concluida' onClick={() => handleStatus('CONCLUIDA')}>✅</button>
                  <button className='detalhe-btn-lixeira' onClick={() => setConfirmandoDeletar(true)}>🗑</button>
                </>
              )}
            </div>
          </div>

          <div className='detalhe-card'>
            <div className='etapa-info-bar'>
              <span>STATUS: <strong className={
                selecionado.status === 'CONCLUIDA' ? 'status-concluida' :
                selecionado.status === 'ANDAMENTO' ? 'status-andamento' :
                'status-pendente'
              }>{selecionado.status}</strong></span>

              <span>PRAZO: <strong>{selecionado.prazo}</strong></span>
            </div>

            <div className='etapa-func-titulo'>FUNCIONÁRIOS</div>

            <div className='etapa-func-header'>
              <span>NOME</span>
              <span>CARGO</span>
              <span></span>
            </div>

            <div className='etapa-func-body'>
              {selecionado.funcionarios.length === 0 && (
                <p className='etapa-func-vazio'>Nenhum funcionário adicionado.</p>
              )}

              {selecionado.funcionarios.map(f => (
                <div className='etapa-func-row' key={f.id}>
                  <span>{f.nomeCompleto}</span>
                  <span>{f.tipo}</span>
                  <button
                    className='etapa-func-remover'
                    onClick={() => handleRemoverFuncionario(f.id)}
                  >
                    🗑
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {modalFuncAberto && (
          <div className='modal-overlay' onClick={() => setModalFuncAberto(false)}>
            <div className='modal-box' onClick={e => e.stopPropagation()}>
              <h2 className='modal-titulo'>Adicionar Funcionário</h2>
              <div className='modal-campo input'>
                <input
                  value={inputIdFunc}
                  onChange={e => setInputIdFunc(e.target.value)}
                />
              </div>

              {erroFunc && <p className='modal-erro'>{erroFunc}</p>}

              <button className='modal-btn-salvar' onClick={handleAdicionarFuncionario}>
                Confirmar
              </button>
            </div>
          </div>
        )}
      </main>
    )
  }

  // ── LISTAGEM ──
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
            {etapas.map(e => (
              <div
                className='etapas-row'
                key={e.id}
                onClick={() => abrirDetalhe(e)}
              >
                <span>{e.id}</span>
                <span>{e.nome}</span>
                <span>{e.prazo}</span>
                <span className={
                  e.status === 'CONCLUIDA' ? 'status-concluida' :
                  e.status === 'ANDAMENTO' ? 'status-andamento' :
                  'status-pendente'
                }>
                  {e.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className='etapas-footer'>
          <button
            className='etapas-btn-adicionar'
            onClick={() => setModalAberto(true)}
          >
            ADICIONAR ETAPA +
          </button>

          <button className='etapas-btn-sair'>→]</button>
        </div>
      </div>

      {modalAberto && (
        <ModalAdicionarEtapa
          onFechar={() => setModalAberto(false)}
          onSalvar={(e) => {
            onSalvar(e)
            setModalAberto(false)
          }}
          idsAeronaves={idsAeronaves}
        />
      )}
    </main>
  )
}

export default Etapas