import './Modal.css'
import { useState } from 'react'

// 🔥 TIPOS PADRONIZADOS
type Etapa = {
  id: string
  nome: string
  prazo: string
  status: string
  idAeronave: string
  funcionarios: any[]
}

type Peca = {
  id: string
  nome: string
  fornecedor: string
  tipo: string
  status: string
}

type Teste = {
  id: string
  idAeronave: string
  tipo: string
  resultado: string
}

type Aeronave = {
  id: string
  modelo: string
  tipo: string
  capacidade: string
  alcance: string
  etapas: Etapa[]
  pecas: Peca[]
  testes: Teste[]
}

interface Props {
  onFechar: () => void
  onSalvar: (a: Aeronave) => void
  proximoId: string
}

function ModalAdicionarAeronave({ onFechar, onSalvar, proximoId }: Props) {
  const [modelo, setModelo] = useState('')
  const [tipo, setTipo] = useState('')
  const [capacidade, setCapacidade] = useState('')
  const [alcance, setAlcance] = useState('')
  const [erro, setErro] = useState('')

  function somenteNumeros(valor: string) {
    return valor.replace(/\D/g, '')
  }

  function handleSalvar() {
    if (!modelo || !tipo || !capacidade || !alcance) {
      setErro('Preencha todos os campos antes de salvar.')
      return
    }

    onSalvar({
      id: proximoId,
      modelo: modelo.toUpperCase(),
      tipo,
      capacidade: `${capacidade} KG`,
      alcance: `${alcance} M`,
      etapas: [],
      pecas: [],
      testes: [],
    })

    // 🔥 fecha modal automaticamente depois de salvar
    onFechar()
  }

  return (
    <div className='modal-overlay' onClick={onFechar}>
      <div className='modal-box' onClick={e => e.stopPropagation()}>
        
        <button className='modal-btn-fechar' onClick={onFechar}>✕</button>

        <h2 className='modal-titulo'>Adicionar Aeronave</h2>

        <div className='modal-campo'>
          <label>Modelo</label>
          <input
            type='text'
            placeholder='Ex: MODELO 1'
            value={modelo}
            onChange={e => { setModelo(e.target.value); setErro('') }}
            maxLength={20}
            className={erro && !modelo ? 'input-erro' : ''}
          />
        </div>

        <div className='modal-campo'>
          <label>Tipo</label>
          <div className={`modal-select-wrapper ${erro && !tipo ? 'input-erro' : ''}`}>
            <select
              value={tipo}
              onChange={e => { setTipo(e.target.value); setErro('') }}
            >
              <option value='' disabled>Selecione</option>
              <option value='MILITAR'>MILITAR</option>
              <option value='COMERCIAL'>COMERCIAL</option>
            </select>
          </div>
        </div>

        <div className='modal-campo'>
          <label>Capacidade</label>
          <div className={`modal-input-sufixo-wrapper ${erro && !capacidade ? 'input-erro' : ''}`}>
            <input
              type='text'
              placeholder='Ex: 1000'
              value={capacidade}
              onChange={e => {
                setCapacidade(somenteNumeros(e.target.value))
                setErro('')
              }}
              maxLength={7}
            />
            <span className='modal-sufixo'>KG</span>
          </div>
        </div>

        <div className='modal-campo'>
          <label>Alcance</label>
          <div className={`modal-input-sufixo-wrapper ${erro && !alcance ? 'input-erro' : ''}`}>
            <input
              type='text'
              placeholder='Ex: 1500'
              value={alcance}
              onChange={e => {
                setAlcance(somenteNumeros(e.target.value))
                setErro('')
              }}
              maxLength={7}
            />
            <span className='modal-sufixo'>M</span>
          </div>
        </div>

        {erro && <p className='modal-erro'>{erro}</p>}

        <div className='modal-footer'>
          <button className='modal-btn-salvar' onClick={handleSalvar}>
            Salvar 💾
          </button>
        </div>

      </div>
    </div>
  )
}

export default ModalAdicionarAeronave