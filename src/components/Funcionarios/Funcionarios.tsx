import { useState } from 'react'
import './Funcionarios.css'
import ModalAdicionarFuncionario from '../Modals/ModalAdicionarFuncionario'

interface Funcionario {
  id: number; nomeCompleto: string; username: string; senha: string;
  telefone: string; tipo: string; endereco: string;
}

interface Props {
  funcionarios: Funcionario[]
  onLogout: () => void
  onSalvar: (f: Funcionario) => void
  onDeletar: (id: number) => void
  onEditar: (f: Funcionario) => void
}

function Funcionarios({ funcionarios, onSalvar, onDeletar, onEditar, onLogout }: Props) {
  const [modalAberto, setModalAberto] = useState(false)
  const [senhasVisiveis, setSenhasVisiveis] = useState<Record<number, boolean>>({})
  const [selecionado, setSelecionado] = useState<Funcionario | null>(null)
  const [confirmandoDeletar, setConfirmandoDeletar] = useState(false)

  const [editNome, setEditNome] = useState('')
  const [editUsername, setEditUsername] = useState('')
  const [editTipo, setEditTipo] = useState('')
  const [editSenha, setEditSenha] = useState('')
  const [editSenhaVisivel, setEditSenhaVisivel] = useState(false)
  const [editTelefone, setEditTelefone] = useState('')
  const [editEndereco, setEditEndereco] = useState('')
  const [editErro, setEditErro] = useState('')

  function toggleSenha(id: number) {
    setSenhasVisiveis(prev => ({ ...prev, [id]: !prev[id] }))
  }

  function abrirDetalhe(f: Funcionario) {
    setSelecionado(f)
    setEditNome(f.nomeCompleto)
    setEditUsername(f.username)
    setEditTipo(f.tipo)
    setEditSenha(f.senha)
    setEditTelefone(f.telefone)
    setEditEndereco(f.endereco)
    setEditErro('')
    setConfirmandoDeletar(false)
  }

  function fecharDetalhe() {
    setSelecionado(null)
    setConfirmandoDeletar(false)
    setEditErro('')
  }

  function handleSalvarEdicao() {
    if (!selecionado) return

    if (!editNome || !editUsername || !editTipo || !editSenha || !editTelefone || !editEndereco) {
      setEditErro('Preencha todos os campos antes de salvar.')
      return
    }

    const usernamesMenos = funcionarios
      .filter(f => f.id !== selecionado.id)
      .map(f => f.username.toLowerCase())

    if (usernamesMenos.includes(editUsername.toLowerCase())) {
      setEditErro('Já existe um funcionário com esse username.')
      return
    }

    onEditar({
      ...selecionado,
      nomeCompleto: editNome,
      username: editUsername,
      tipo: editTipo,
      senha: editSenha,
      telefone: editTelefone,
      endereco: editEndereco,
    })
    fecharDetalhe()
  }

  function handleDeletar() {
    if (!selecionado) return
    onDeletar(selecionado.id)
    fecharDetalhe()
  }

  function somenteNumeros(v: string) { return v.replace(/\D/g, '') }

  if (selecionado) {
    return (
      <main>
        <div className='corpin-funcionarios'>

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
                <label>NOME COMPLETO</label>
                <input
                  type='text'
                  value={editNome}
                  onChange={e => { setEditNome(e.target.value); setEditErro('') }}
                  maxLength={40}
                  className={editErro && !editNome ? 'input-erro' : ''}
                />
              </div>

              <div className='detalhe-campo'>
                <label>NOME DE USUÁRIO</label>
                <input
                  type='text'
                  value={editUsername}
                  onChange={e => { setEditUsername(e.target.value); setEditErro('') }}
                  maxLength={20}
                  className={editErro && !editUsername ? 'input-erro' : ''}
                />
              </div>

              <div className='detalhe-campo'>
                <label>TIPO DE USUÁRIO</label>
                <div className='detalhe-select-wrapper'>
                  <select
                    value={editTipo}
                    onChange={e => { setEditTipo(e.target.value); setEditErro('') }}
                    className={editErro && !editTipo ? 'input-erro' : ''}
                  >
                    <option value='ADM'>ADM</option>
                    <option value='ENGENHEIRO'>ENGENHEIRO</option>
                    <option value='OPERADOR'>OPERADOR</option>
                  </select>
                </div>
              </div>

              <div className='detalhe-campo'>
                <label>SENHA</label>
                <div className={`detalhe-input-olho ${editErro && !editSenha ? 'input-erro' : ''}`}>
                  <input
                    type={editSenhaVisivel ? 'text' : 'password'}
                    value={editSenha}
                    onChange={e => { setEditSenha(e.target.value); setEditErro('') }}
                    maxLength={30}
                  />
                  <button className='btn-olho' onClick={() => setEditSenhaVisivel(p => !p)}>
                    {editSenhaVisivel ? '🙈' : '👁'}
                  </button>
                </div>
              </div>

              <div className='detalhe-campo'>
                <label>TELEFONE</label>
                <input
                  type='text'
                  value={editTelefone}
                  onChange={e => { setEditTelefone(somenteNumeros(e.target.value)); setEditErro('') }}
                  maxLength={11}
                  className={editErro && !editTelefone ? 'input-erro' : ''}
                />
              </div>

              <div className='detalhe-campo'>
                <label>ENDEREÇO</label>
                <input
                  type='text'
                  value={editEndereco}
                  onChange={e => { setEditEndereco(e.target.value); setEditErro('') }}
                  maxLength={60}
                  className={editErro && !editEndereco ? 'input-erro' : ''}
                />
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
      <div className='corpin-funcionarios'>
        <div className='tabela-wrapper'>
          <div className='tabela-header'>
            <span>ID</span>
            <span>NOME COMPLETO</span>
            <span>USERNAME</span>
            <span>SENHA</span>
            <span>TELEFONE</span>
            <span>TIPO</span>
          </div>
          <div className='tabela-body'>
            {funcionarios.map((f) => (
              <div
                className='tabela-row'
                key={f.id}
                onClick={() => abrirDetalhe(f)}
                style={{ cursor: 'pointer' }}
              >
                <span>{f.id}</span>
                <span>{f.nomeCompleto}</span>
                <span>{f.username}</span>
                <span className='senha-cell' onClick={e => e.stopPropagation()}>
                  {senhasVisiveis[f.id] ? f.senha : '••••••••'}
                  <button className='btn-olho' onClick={() => toggleSenha(f.id)}>
                    {senhasVisiveis[f.id] ? '🙈' : '👁'}
                  </button>
                </span>
                <span>{f.telefone}</span>
                <span>{f.tipo}</span>
              </div>
            ))}
          </div>
        </div>

        <div className='footer-bar'>
          <button className='btn-adicionar' onClick={() => setModalAberto(true)}>
            ADICIONAR FUNCIONARIO +
          </button>
          <button className='btn-sair' onClick={onLogout}>→]</button>
        </div>
      </div>

      {modalAberto && (
        <ModalAdicionarFuncionario
          onFechar={() => setModalAberto(false)}
          onSalvar={(f) => { onSalvar(f); setModalAberto(false) }}
          usernamesExistentes={funcionarios.map(f => f.username.toLowerCase())}
          proximoId={funcionarios.length === 0 ? 1 : Math.max(...funcionarios.map(f => f.id)) + 1}
        />
      )}
    </main>
  )
}

export default Funcionarios