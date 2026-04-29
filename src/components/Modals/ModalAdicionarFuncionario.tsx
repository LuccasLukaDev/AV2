import './Modal.css'
import { useState } from 'react'

interface Funcionario {
  id: number; nomeCompleto: string; username: string; senha: string; telefone: string; tipo: string, endereco: string;
}

interface Props {
  onFechar: () => void
  onSalvar: (f: Funcionario) => void
  usernamesExistentes: string[]
  proximoId: number
}

function ModalAdicionarFuncionario({ onFechar, onSalvar, usernamesExistentes, proximoId }: Props) {
  const [nomeCompleto, setNomeCompleto] = useState('')
  const [username, setUsername] = useState('')
  const [tipo, setTipo] = useState('')
  const [senha, setSenha] = useState('')
  const [senhaVisivel, setSenhaVisivel] = useState(false)
  const [telefone, setTelefone] = useState('')
  const [endereco, setEndereco] = useState('')
  const [erro, setErro] = useState('')

  function somenteNumeros(valor: string) {
    return valor.replace(/\D/g, '')
  }

  function handleSalvar() {
    if (!nomeCompleto || !username || !tipo || !senha || !telefone || !endereco) {
      setErro('Preencha todos os campos antes de salvar.')
      return
    }
    if (usernamesExistentes.includes(username.toLowerCase())) {
      setErro('Já existe um funcionário com esse username.')
      return
    }

    onSalvar({
      id: proximoId,
      nomeCompleto: nomeCompleto.toUpperCase(),
      username,
      senha,
      telefone,
      tipo,
      endereco,
    })
  }

  return (
    <div className='modal-func-overlay' onClick={onFechar}>
      <div className='modal-func-box' onClick={e => e.stopPropagation()}>
        <button className='modal-func-btn-fechar' onClick={onFechar}>✕</button>
        <h2 className='modal-func-titulo'>Adicionar Funcionário</h2>

        <div className='modal-func-grid'>
          <div className='modal-func-campo'>
            <label>Nome Completo</label>
            <input
              type='text'
              placeholder='Ex: Dean Winchester'
              value={nomeCompleto}
              onChange={e => { setNomeCompleto(e.target.value); setErro('') }}
              maxLength={40}
              className={erro && !nomeCompleto ? 'modal-func-input-erro' : ''}
            />
          </div>

          <div className='modal-func-campo'>
            <label>Nome de Usuário</label>
            <input
              type='text'
              placeholder='Ex: Dean'
              value={username}
              onChange={e => { setUsername(e.target.value); setErro('') }}
              maxLength={20}
              className={erro && (!username || usernamesExistentes.includes(username.toLowerCase())) ? 'modal-func-input-erro' : ''}
            />
          </div>

          <div className='modal-func-campo'>
            <label>Tipo de Usuário</label>
            <div className={`modal-func-select-wrapper ${erro && !tipo ? 'modal-func-input-erro' : ''}`}>
              <select value={tipo} onChange={e => { setTipo(e.target.value); setErro('') }}>
                <option value='' disabled></option>
                <option value='ADM'>ADM</option>
                <option value='ENGENHEIRO'>ENGENHEIRO</option>
                <option value='OPERADOR'>OPERADOR</option>
              </select>
            </div>
          </div>

          <div className='modal-func-campo'>
            <label>Senha</label>
            <div className={`modal-func-input-wrapper ${erro && !senha ? 'modal-func-input-erro' : ''}`}>
              <input
                type={senhaVisivel ? 'text' : 'password'}
                placeholder='••••••••'
                value={senha}
                onChange={e => { setSenha(e.target.value); setErro('') }}
                maxLength={30}
              />
              <button
                className='modal-func-btn-olho'
                onClick={() => setSenhaVisivel(prev => !prev)}
              >
                {senhaVisivel ? '🙈' : '👁'}
              </button>
            </div>
          </div>

          <div className='modal-func-campo'>
            <label>Telefone</label>
            <input
              type='text'
              placeholder='Ex: 12 99456 8473'
              value={telefone}
              onChange={e => { setTelefone(somenteNumeros(e.target.value)); setErro('') }}
              maxLength={11}
              className={erro && !telefone ? 'modal-func-input-erro' : ''}
            />
          </div>

          <div className='modal-func-campo'>
            <label>Endereço</label>
            <input
              type='text'
              placeholder='Ex: Rua das Flores, 123'
              value={endereco}
              onChange={e => { setEndereco(e.target.value); setErro('') }}
              maxLength={40}
              className={erro && !endereco ? 'modal-func-input-erro' : ''}
            />
          </div>
        </div>

        {erro && <p className='modal-func-erro'>{erro}</p>}

        <div className='modal-func-footer'>
          <button className='modal-func-btn-salvar' onClick={handleSalvar}>Salvar 💾</button>
        </div>
      </div>
    </div>
  )
}

export default ModalAdicionarFuncionario