import './Modal.css'
import { useState } from 'react'

interface Etapa {
  id: string; nome: string; prazo: string; status: string; idAeronave: string;
}

interface Props {
  onFechar: () => void
  onSalvar: (e: Etapa) => void
  idsAeronaves: string[]
}

function ModalAdicionarEtapa({ onFechar, onSalvar, idsAeronaves }: Props) {
  const [nome, setNome] = useState('')
  const [idAeronave, setIdAeronave] = useState('')
  const [prazo, setPrazo] = useState('')
  const [erro, setErro] = useState('')

  function handleSalvar() {
    if (!nome || !idAeronave || !prazo) {
      setErro('Preencha todos os campos antes de salvar.')
      return
    }
    if (!idsAeronaves.includes(idAeronave.toUpperCase())) {
      setErro(`Aeronave "${idAeronave.toUpperCase()}" não encontrada.`)
      return
    }

    const data = new Date(prazo)
    const prazoFormatado = `${String(data.getDate()).padStart(2, '0')} / ${String(data.getMonth() + 1).padStart(2, '0')} / ${data.getFullYear()}`

    onSalvar({
      id: '',
      nome: nome.toUpperCase(),
      prazo: prazoFormatado,
      status: 'PENDENTE',
      idAeronave: idAeronave.toUpperCase(),
    })
  }

  return (
    <div className='modal-overlay' onClick={onFechar}>
      <div className='modal-box' onClick={e => e.stopPropagation()}>
        <button className='modal-btn-fechar' onClick={onFechar}>✕</button>
        <h2 className='modal-titulo'>Adicionar Etapa</h2>

        <div className='modal-campo'>
          <label>Nome</label>
          <input
            type='text'
            placeholder='Ex: ETAPA DE MONTAGEM'
            value={nome}
            onChange={e => { setNome(e.target.value); setErro('') }}
            maxLength={30}
            className={erro && !nome ? 'input-erro' : ''}
          />
        </div>

        <div className='modal-campo'>
          <label>ID da Aeronave</label>
          <input
            type='text'
            placeholder='Ex: A001'
            value={idAeronave}
            onChange={e => { setIdAeronave(e.target.value.toUpperCase()); setErro('') }}
            maxLength={10}
            className={erro && (!idAeronave || !idsAeronaves.includes(idAeronave.toUpperCase())) ? 'input-erro' : ''}
          />
        </div>

        <div className='modal-campo'>
          <label>Prazo</label>
          <input
            type='date'
            value={prazo}
            onChange={e => { setPrazo(e.target.value); setErro('') }}
            className={erro && !prazo ? 'input-erro' : ''}
          />
        </div>

        {erro && <p className='modal-erro'>{erro}</p>}

        <div className='modal-footer'>
          <button className='modal-btn-salvar' onClick={handleSalvar}>Salvar 💾</button>
        </div>
      </div>
    </div>
  )
}

export default ModalAdicionarEtapa