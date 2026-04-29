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
  onLogout: () => void
  onSalvar: (e: Etapa) => void
  onDeletar: (id: string) => void
  onAtualizarStatus: (id: string, status: string) => void
  onAtualizarFuncionarios: (id: string, funcs: Funcionario[]) => void
}

function Etapas({
  etapas,
  idsAeronaves,
  funcionarios,
  onLogout,
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
    setErroFunc('')
  }

  function fecharDetalhe() {
    setSelecionado(null)
    setConfirmandoDeletar(false)
    setErroFunc('')
  }

  function handleDeletar() {
    if (!selecionado) return
    onDeletar(selecionado.id)
    fecharDetalhe()
  }

  // 🔥 REGRA DE NEGÓCIO (PDF)
  function handleStatus(novoStatus: string) {
    if (!selecionado) return

    const statusAtual = selecionado.status

    if (novoStatus === 'PENDENTE') {
      setErroFunc('Não é possível voltar para PENDENTE.')
      return
    }

  if (novoStatus === 'ANDAMENTO') {
    if (statusAtual !== 'PENDENTE') {
      setErroFunc('A etapa precisa estar PENDENTE para iniciar.')
      return
    }

    const idAtual = parseInt(selecionado.id.replace('E', ''))

    const temAnteriorPendente = etapas.some(e => {
      const idE = parseInt(e.id.replace('E', ''))
      return idE < idAtual && e.status === 'PENDENTE'
    })

    if (temAnteriorPendente) {
      setErroFunc('Existe uma etapa anterior ainda pendente.')
      return
    }
  }

    if (novoStatus === 'CONCLUIDA') {
      if (statusAtual !== 'ANDAMENTO') {
        setErroFunc('A etapa precisa estar EM ANDAMENTO para ser concluída.')
        return
      }

      const idAtual = parseInt(selecionado.id.replace('E', ''))

      const temAnteriorEmAndamento = etapas.some(e => {
        const idE = parseInt(e.id.replace('E', ''))
        return idE < idAtual && e.status === 'ANDAMENTO'
      })

      if (temAnteriorEmAndamento) {
        setErroFunc('Existe uma etapa anterior ainda em andamento.')
        return
      }
    }

    setErroFunc('')
    onAtualizarStatus(selecionado.id, novoStatus)
    setSelecionado(prev => prev ? { ...prev, status: novoStatus } : null)
  }

  function handleAdicionarFuncionario() {
    if (!selecionado) return

    const id = parseInt(inputIdFunc)
    const func = funcionarios.find(f => f.id === id)

    if (!func) return setErroFunc('Funcionário não encontrado.')

    if (selecionado.funcionarios.some(f => f.id === id))
      return setErroFunc('Funcionário já adicionado.')

    const novos = [...selecionado.funcionarios, func]

    onAtualizarFuncionarios(selecionado.id, novos)
    setSelecionado(prev => prev ? { ...prev, funcionarios: novos } : null)

    setInputIdFunc('')
    setErroFunc('')
    setModalFuncAberto(false)
  }

  function handleRemoverFuncionario(idFunc: number) {
    if (!selecionado) return

    const novos = selecionado.funcionarios.filter(f => f.id !== idFunc)

    onAtualizarFuncionarios(selecionado.id, novos)
    setSelecionado(prev => prev ? { ...prev, funcionarios: novos } : null)
  }

  // ================= DETALHE =================
  if (selecionado) {
    return (
      <main>
        <div className='corpin-etapas'>

          <div className='detalhe-topbar'>
            <div className='detalhe-topbar-esquerda'>
              <button className='detalhe-btn-voltar' onClick={fecharDetalhe}>↩</button>
              <button className='detalhe-btn-func-add' onClick={() => {
                setModalFuncAberto(true)
                setInputIdFunc('')
                setErroFunc('')
              }}>+</button>
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
                  <button className='detalhe-btn-lixeira-head' onClick={() => setConfirmandoDeletar(true)}>🗑</button>
                </>
              )}
            </div>
          </div>

          {erroFunc && <p className='detalhe-erro'>{erroFunc}</p>}

          <div className='detalhe-card'>
            <div className='etapa-info-bar'>
              <span>
                STATUS: <strong className={
                  selecionado.status === 'CONCLUIDA' ? 'status-concluida' :
                  selecionado.status === 'ANDAMENTO' ? 'status-andamento' :
                  'status-pendente'
                }>
                  {selecionado.status}
                </strong>
              </span>

              <span>PRAZO: <strong>{selecionado.prazo}</strong></span>
              <span>AERONAVE: <strong>{selecionado.idAeronave}</strong></span>
            </div>

            <div className='etapa-func-titulo'>FUNCIONÁRIOS</div>

            <div className='etapa-func-header'>
              <span>NOME</span>
              <span>CARGO</span>
              <span></span>
            </div>

            <div className='etapa-func-body'>
              {selecionado.funcionarios.length === 0 && (
                <p className='etapa-func-vazio'>Nenhum funcionário.</p>
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
              <button className='modal-btn-fechar' onClick={() => setModalFuncAberto(false)}>✕</button>

              <h2 className='modal-titulo'>Adicionar Funcionário</h2>

              <div className='modal-campo'>
                <label>ID</label>
                <input
                  value={inputIdFunc}
                  onChange={e => setInputIdFunc(e.target.value)}
                />
              </div>

              {erroFunc && <p className='modal-erro'>{erroFunc}</p>}

              <div className='modal-footer'>
                <button className='modal-btn-salvar' onClick={handleAdicionarFuncionario}>
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    )
  }

  // ================= LISTA =================
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
              <div key={e.id} className='etapas-row' onClick={() => abrirDetalhe(e)}>
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
          <button className='etapas-btn-adicionar' onClick={() => setModalAberto(true)}>
            ADICIONAR ETAPA +
          </button>
          <button className='etapas-btn-sair' onClick={onLogout}>→]</button>
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