import { useState } from 'react'
import './Aeronaves.css'
import ModalAdicionarAeronave from '../Modals/ModalAdicionarAeronave'

interface Peca {
  id: string
  nome: string
  fornecedor: string
  tipo: string
  status: string
}

interface Etapa {
  id: string
  nome: string
  prazo: string
  status: string
  idAeronave: string
  funcionarios: any[]
}

interface Teste {
  id: string
  idAeronave: string
  tipo: string
  resultado: string
}

interface Aeronave {
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
  aeronaves: Aeronave[]
  onSalvar: (a: Aeronave) => void
  onDeletar: (id: string) => void
  proximoId: string
  todasPecas: Peca[]
  todasEtapas: Etapa[]
  todosTestes: Teste[]
  onAtualizarAeronave: (a: Aeronave) => void
}

function Aeronaves({
  aeronaves,
  onSalvar,
  onDeletar,
  proximoId,
  todasPecas,
  todasEtapas,
  todosTestes,
  onAtualizarAeronave
}: Props) {

  const [modalAberto, setModalAberto] = useState(false)
  const [selecionado, setSelecionado] = useState<Aeronave | null>(null)
  const [confirmandoDeletar, setConfirmandoDeletar] = useState(false)

  const [modalPecaAberto, setModalPecaAberto] = useState(false)
  const [modalEtapaAberto, setModalEtapaAberto] = useState(false)
  const [modalTesteAberto, setModalTesteAberto] = useState(false)

  const [inputId, setInputId] = useState('')
  const [erroInput, setErroInput] = useState('')

  function syncAeronave(id: string) {
    const a = aeronaves.find(x => x.id === id)
    if (!a) return

    const etapas = todasEtapas.filter(e => e.idAeronave === id)
    const testes = todosTestes.filter(t => t.idAeronave === id)

    const atualizado: Aeronave = {
      ...a,
      etapas,
      testes
    }

    setSelecionado(atualizado)
    onAtualizarAeronave(atualizado)
  }

  function abrirDetalhe(a: Aeronave) {
    setSelecionado({
      ...a,
      etapas: todasEtapas.filter(e => e.idAeronave === a.id),
      testes: todosTestes.filter(t => t.idAeronave === a.id)
    })
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

  function resetModal() {
    setInputId('')
    setErroInput('')
  }

  function fecharModal() {
    setModalPecaAberto(false)
    setModalEtapaAberto(false)
    setModalTesteAberto(false)
    resetModal()
  }

  // ================= ADICIONAR =================
  function handleAdicionarPeca() {
    if (!selecionado) return

    const peca = todasPecas.find(p => p.id.toUpperCase() === inputId.toUpperCase())
    if (!peca) return setErroInput('Peça não encontrada.')

    if (selecionado.pecas.some(p => p.id === peca.id)) {
      return setErroInput('Peça já adicionada.')
    }

    const atualizado: Aeronave = {
      ...selecionado,
      pecas: [...selecionado.pecas, peca]
    }

    setSelecionado(atualizado)
    onAtualizarAeronave(atualizado)
    fecharModal()
  }

  function handleAdicionarEtapa() {
    if (!selecionado) return

    const etapa = todasEtapas.find(e => e.id.toUpperCase() === inputId.toUpperCase())
    if (!etapa) return setErroInput('Etapa não encontrada.')

    if (selecionado.etapas.some(e => e.id === etapa.id)) {
      return setErroInput('Etapa já adicionada.')
    }

    etapa.idAeronave = selecionado.id
    syncAeronave(selecionado.id)

    fecharModal()
  }

  function handleAdicionarTeste() {
    if (!selecionado) return

    const teste = todosTestes.find(t => t.id.toUpperCase() === inputId.toUpperCase())
    if (!teste) return setErroInput('Teste não encontrado.')

    if (selecionado.testes.some(t => t.id === teste.id)) {
      return setErroInput('Teste já adicionado.')
    }

    teste.idAeronave = selecionado.id
    syncAeronave(selecionado.id)

    fecharModal()
  }

  // ================= REMOVER =================
  function removerPeca(id: string) {
    if (!selecionado) return

    const atualizado: Aeronave = {
      ...selecionado,
      pecas: selecionado.pecas.filter(p => p.id !== id)
    }

    setSelecionado(atualizado)
    onAtualizarAeronave(atualizado)
  }

  function removerEtapa(id: string) {
    const etapa = todasEtapas.find(e => e.id === id)
    if (etapa && selecionado) {
      etapa.idAeronave = ''
      syncAeronave(selecionado.id)
    }
  }

  function removerTeste(id: string) {
    const teste = todosTestes.find(t => t.id === id)
    if (teste && selecionado) {
      teste.idAeronave = ''
      syncAeronave(selecionado.id)
    }
  }

  function gerarRelatorio() {
    if (!selecionado) return

    const etapas = todasEtapas.filter(e => e.idAeronave === selecionado.id)
    const testes = todosTestes.filter(t => t.idAeronave === selecionado.id)

    const linhas = [
      `RELATÓRIO - AERONAVE ${selecionado.id}`,
      `========================================`,
      `MODELO: ${selecionado.modelo}`,
      `TIPO: ${selecionado.tipo}`,
      `CAPACIDADE: ${selecionado.capacidade}`,
      `ALCANCE: ${selecionado.alcance}`,
      ``,
      `PEÇAS:`,
      ...selecionado.pecas.map(p => `[${p.id}] ${p.nome}`),
      ``,
      `ETAPAS:`,
      ...etapas.map(e => `[${e.id}] ${e.nome} - ${e.status}`),
      ``,
      `TESTES:`,
      ...testes.map(t => `[${t.id}] ${t.tipo} - ${t.resultado}`)
    ]

    const blob = new Blob([linhas.join('\n')], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = `relatorio_${selecionado.id}.txt`
    link.click()

    URL.revokeObjectURL(url)
  }

  if (selecionado) {

    const etapas = todasEtapas.filter(e => e.idAeronave === selecionado.id)
    const testes = todosTestes.filter(t => t.idAeronave === selecionado.id)

    return (
      <main>
        <div className='corpin-aeronaves'>

          <div className='detalhe-topbar'>
            <div className='detalhe-topbar-esquerda'>
              <button className='detalhe-btn-voltar' onClick={fecharDetalhe}>↩</button>

              {confirmandoDeletar ? (
                <div className='detalhe-confirmar-delete'>
                  <span>Deletar?</span>
                  <button className='detalhe-btn-confirmar-sim' onClick={handleDeletar}>Sim</button>
                  <button className='detalhe-btn-confirmar-nao' onClick={() => setConfirmandoDeletar(false)}>Não</button>
                </div>
              ) : (
                <button className='detalhe-btn-lixeira-header' onClick={() => setConfirmandoDeletar(true)}>🗑</button>
              )}
            </div>

            <span className='detalhe-titulo'>ID: {selecionado.id}</span>

            <button className='aeronave-btn-relatorio' onClick={gerarRelatorio}>
              GERAR RELATÓRIO
            </button>
          </div>

          <div className='detalhe-card'>
            <div className='aeronave-info-bar'>
              <span>TIPO: <strong>{selecionado.tipo}</strong></span>
              <span>MODELO: <strong>{selecionado.modelo}</strong></span>
              <span>CAPACIDADE: <strong>{selecionado.capacidade}</strong></span>
              <span>ALCANCE: <strong>{selecionado.alcance}</strong></span>
            </div>

            <div className='aeronave-tabela-wrapper'>

              <div className='aeronave-coluna'>
                <div className='aeronave-coluna-titulo'>
                  <span>ETAPAS</span>
                  <button className='aeronave-btn-plus' onClick={() => setModalEtapaAberto(true)}>+</button>
                </div>

                <div className='aeronave-coluna-header'>
                  <span>ID</span>
                  <span>STATUS</span>
                </div>

                <div className='aeronave-coluna-body'>
                  {etapas.length === 0 && <p className='aeronave-vazio'>—</p>}
                  {etapas.map(e => (
                    <div className='aeronave-coluna-row' key={e.id}>
                      <span>{e.id}</span>
                      <span>{e.status}</span>
                      <button className='detalhe-btn-lixeira' onClick={() => removerEtapa(e.id)}>🗑</button>
                    </div>
                  ))}
                </div>
              </div>

              <div className='aeronave-divisor' />

              <div className='aeronave-coluna'>
                <div className='aeronave-coluna-titulo'>
                  <span>PEÇAS</span>
                  <button className='aeronave-btn-plus' onClick={() => setModalPecaAberto(true)}>+</button>
                </div>

                <div className='aeronave-coluna-header'>
                  <span>ID</span>
                  <span>TIPO</span>
                </div>

                <div className='aeronave-coluna-body'>
                  {selecionado.pecas.length === 0 && <p className='aeronave-vazio'>—</p>}
                  {selecionado.pecas.map(p => (
                    <div className='aeronave-coluna-row' key={p.id}>
                      <span>{p.id}</span>
                      <span>{p.tipo}</span>
                      <button className='detalhe-btn-lixeira' onClick={() => removerPeca(p.id)}>🗑</button>
                    </div>
                  ))}
                </div>
              </div>

              <div className='aeronave-divisor' />

              <div className='aeronave-coluna'>
                <div className='aeronave-coluna-titulo'>
                  <span>TESTES</span>
                  <button className='aeronave-btn-plus' onClick={() => setModalTesteAberto(true)}>+</button>
                </div>

                <div className='aeronave-coluna-header'>
                  <span>ID</span>
                  <span>RESULTADO</span>
                </div>

                <div className='aeronave-coluna-body'>
                  {testes.length === 0 && <p className='aeronave-vazio'>—</p>}
                  {testes.map(t => (
                    <div className='aeronave-coluna-row' key={t.id}>
                      <span>{t.id}</span>
                      <span>{t.resultado}</span>
                      <button className='detalhe-btn-lixeira' onClick={() => removerTeste(t.id)}>🗑</button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {(modalEtapaAberto || modalTesteAberto || modalPecaAberto) && (
          <div className='modal-overlay' onClick={fecharModal}>
            <div className='modal-box' onClick={e => e.stopPropagation()}>
              <button className='modal-btn-fechar' onClick={fecharModal}>✕</button>

              <h2 className='modal-titulo'>Adicionar</h2>

              <div className='modal-campo'>
                <label>ID</label>
                <input
                  value={inputId}
                  onChange={e => setInputId(e.target.value)}
                  className={erroInput ? 'input-erro' : ''}
                />
              </div>

              {erroInput && <p className='modal-erro'>{erroInput}</p>}

              <div className='modal-footer'>
                <button
                  className='modal-btn-salvar'
                  onClick={
                    modalEtapaAberto ? handleAdicionarEtapa :
                    modalTesteAberto ? handleAdicionarTeste :
                    handleAdicionarPeca
                  }
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    )
  }

  return (
    <main>
      <div className='corpin-aeronaves'>
        <div className='aeronaves-wrapper'>

          <div className='aeronaves-header'>
            <span>ID</span>
            <span>MODELO</span>
            <span>TIPO</span>
            <span>CAPACIDADE</span>
            <span>ALCANCE</span>
          </div>

          <div className='aeronaves-body'>
            {aeronaves.map(a => (
              <div className='aeronaves-row' key={a.id} onClick={() => abrirDetalhe(a)}>
                <span>{a.id}</span>
                <span>{a.modelo}</span>
                <span>{a.tipo}</span>
                <span>{a.capacidade}</span>
                <span>{a.alcance}</span>
              </div>
            ))}
          </div>

        </div>

        <div className='aeronaves-footer'>
          <button className='aeronaves-btn-adicionar' onClick={() => setModalAberto(true)}>
            ADICIONAR AERONAVE +
          </button>
          <button className='aeronaves-btn-sair'>→]</button>
        </div>
      </div>

      {modalAberto && (
        <ModalAdicionarAeronave
          onFechar={() => setModalAberto(false)}
          onSalvar={(a) => {
            onSalvar(a)
            setModalAberto(false)
          }}
          proximoId={proximoId}
        />
      )}
    </main>
  )
}

export default Aeronaves