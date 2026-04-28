import './Modal.css'
import { useState } from 'react'

interface Peca {
  nome: string
  fornecedor: string
  tipo: string
  status: string
}

interface Props {
  onFechar: () => void
  onSalvar: (p: Peca) => void
}

function ModalAdicionarPeca({ onFechar, onSalvar }: Props) {
  const [nome, setNome] = useState('')
  const [fornecedor, setFornecedor] = useState('')
  const [tipo, setTipo] = useState('')
  const [status, setStatus] = useState('')
  const [erro, setErro] = useState('')

  function handleSalvar() {
    if (!nome || !fornecedor || !tipo || !status) {
      setErro('Preencha todos os campos antes de salvar.')
      return
    }

    onSalvar({
      nome: nome.toUpperCase(),
      fornecedor: fornecedor.toUpperCase(),
      tipo,
      status,
    })

    onFechar()
  }

  return (
    <div className='modal-overlay' onClick={onFechar}>
      <div className='modal-box' onClick={e => e.stopPropagation()}>
        <button className='modal-btn-fechar' onClick={onFechar}>✕</button>

        <h2 className='modal-titulo'>Adicionar Peça</h2>

        <div className='modal-campo'>
          <label>Nome</label>
          <input 
            value={nome} 
            onChange={e => {
              setNome(e.target.value)
              setErro('')
            }} 
            className={erro && (!nome) ? 'input-erro' : ''}
            maxLength={20} />
          
        </div>

        <div className='modal-campo'>
          <label>Fornecedor</label>
          <input 
            value={fornecedor} 
            onChange={e => {
              setFornecedor(e.target.value)
              setErro('')
            }} 
            className={erro && (!fornecedor) ? 'input-erro' : ''} 
            maxLength={20} />
        </div>

        <div className='modal-campo'>
          <label>Tipo</label>
          <div className={`modal-select-wrapper ${erro && !tipo ? 'input-erro' : ''}`}>
            <select value={tipo} onChange={e => setTipo(e.target.value)}>
              <option value='' disabled></option>
              <option value='NACIONAL'>NACIONAL</option>
              <option value='IMPORTADA'>IMPORTADA</option>
            </select>
          </div>
        </div>

        <div className='modal-campo'>
          <label>Status</label>
          <div className={`modal-select-wrapper ${erro && !status ? 'input-erro' : ''}`}>
            <select value={status} onChange={e => setStatus(e.target.value)}>
              <option value='' disabled></option>
              <option value='EM_PRODUCAO'>EM_PRODUCAO</option>
              <option value='EM_TRANSPORTE'>EM_TRANSPORTE</option>
              <option value='PRONTA'>PRONTA</option>
            </select>
          </div>
        </div>

        {erro && <p className='modal-erro'>{erro}</p>}

        <div className='modal-footer'>
          <button className='modal-btn-salvar' onClick={handleSalvar}>Salvar 💾</button>
        </div>
      </div>
    </div>
  )
}

export default ModalAdicionarPeca