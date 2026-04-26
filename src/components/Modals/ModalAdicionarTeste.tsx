import './Modal.css'
import { useState } from 'react'

interface Teste {
  id: string; idAeronave: string; tipo: string; resultado: string;
}

interface Props {
  onFechar: () => void
  onSalvar: (t: Teste) => void
  idsAeronaves: string[]
}

function ModalAdicionarTeste({ onFechar, onSalvar, idsAeronaves }: Props) {
  const [idAeronave, setIdAeronave] = useState('')
  const [tipo, setTipo] = useState('')
  const [resultado, setResultado] = useState('')
  const [erro, setErro] = useState('')

  function handleSalvar() {
    if (!idAeronave || !tipo || !resultado) {
      setErro('Preencha todos os campos antes de salvar.')
      return
    }
    if (!idsAeronaves.includes(idAeronave.toUpperCase())) {
      setErro(`Aeronave "${idAeronave.toUpperCase()}" não encontrada.`)
      return
    }

    onSalvar({
      id: '',
      idAeronave: idAeronave.toUpperCase(),
      tipo,
      resultado,
    })
  }

  return (
    <div className='modal-overlay' onClick={onFechar}>
      <div className='modal-box' onClick={e => e.stopPropagation()}>
        <button className='modal-btn-fechar' onClick={onFechar}>✕</button>
        <h2 className='modal-titulo'>Adicionar Teste</h2>

        <div className='modal-campo'>
          <label>ID da Aeronave</label>
          <input
            type='text'
            placeholder='Ex: A001'
            value={idAeronave}
            onChange={e => { setIdAeronave(e.target.value); setErro('') }}
            maxLength={10}
            className={erro && (!idAeronave || !idsAeronaves.includes(idAeronave.toUpperCase())) ? 'input-erro' : ''}
          />
        </div>

        <div className='modal-campo'>
          <label>Tipo</label>
          <div className={`modal-select-wrapper ${erro && !tipo ? 'input-erro' : ''}`}>
            <select value={tipo} onChange={e => { setTipo(e.target.value); setErro('') }}>
              <option value='' disabled></option>
              <option value='ELETRICO'>ELETRICO</option>
              <option value='HIDRAULICO'>HIDRAULICO</option>
              <option value='AERODINAMICO'>AERODINAMICO</option>
            </select>
          </div>
        </div>

        <div className='modal-campo'>
          <label>Resultado</label>
          <div className={`modal-select-wrapper ${erro && !resultado ? 'input-erro' : ''}`}>
            <select value={resultado} onChange={e => { setResultado(e.target.value); setErro('') }}>
              <option value='' disabled></option>
              <option value='APROVADO'>APROVADO</option>
              <option value='REPROVADO'>REPROVADO</option>
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

export default ModalAdicionarTeste