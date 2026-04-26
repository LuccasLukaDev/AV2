import { useState } from 'react'
import './Funcionarios.css'
import ModalAdicionarFuncionario from '../Modals/ModalAdicionarFuncionario'

interface Funcionario {
  id: number; nomeCompleto: string; username: string; senha: string; telefone: string; tipo: string;
}

interface Props {
  funcionarios: Funcionario[]
  onSalvar: (f: Funcionario) => void
}

function Funcionarios({ funcionarios, onSalvar }: Props) {
  const [modalAberto, setModalAberto] = useState(false)
  const [senhasVisiveis, setSenhasVisiveis] = useState<Record<number, boolean>>({})

  function toggleSenha(id: number) {
    setSenhasVisiveis(prev => ({ ...prev, [id]: !prev[id] }))
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
              <div className='tabela-row' key={f.id}>
                <span>{f.id}</span>
                <span>{f.nomeCompleto}</span>
                <span>{f.username}</span>
                <span className='senha-cell'>
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
          <button className='btn-sair'>→]</button>
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