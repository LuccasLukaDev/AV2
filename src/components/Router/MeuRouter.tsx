import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Cabess from "../Cabess/Cabess";
import Funcionarios from "../Funcionarios/Funcionarios";
import Etapas from "../Etapas/Etapas";
import Pecas from "../Pecas/Pecas";
import Testes from "../Testes/Testes";
import Aeronaves from "../Aeronaves/Aeronaves";
import Login from "../Login/login";

// ================= TIPOS =================
type Funcionario = {
  id: number
  nomeCompleto: string
  username: string
  senha: string
  telefone: string
  tipo: string
  endereco: string
}

type Etapa = {
  id: string
  nome: string
  prazo: string
  status: string
  idAeronave: string
  funcionarios: Funcionario[]
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

export default function MeuRouter() {

  const [usuarioLogado, setUsuarioLogado] = useState<Funcionario | null>(null)

  const [aeronaves, setAeronaves] = useState<Aeronave[]>([
    { id: 'A001', modelo: 'MODELO 1', tipo: 'MILITAR', capacidade: '1000 KG', alcance: '1500 M', etapas: [], pecas: [], testes: [] },
    { id: 'A002', modelo: 'MODELO 2', tipo: 'MILITAR', capacidade: '1500 KG', alcance: '200 M',  etapas: [], pecas: [], testes: [] },
    { id: 'A003', modelo: 'MODELO 3', tipo: 'MILITAR', capacidade: '3000 KG', alcance: '100 M',  etapas: [], pecas: [], testes: [] },
  ])

  const [etapas, setEtapas] = useState<Etapa[]>([
    { id: 'E001', nome: 'ETAPA 1', prazo: '20 / 11 / 2026', status: 'PENDENTE', idAeronave: 'A001', funcionarios: [] },
    { id: 'E002', nome: 'ETAPA 2', prazo: '20 / 11 / 2026', status: 'PENDENTE', idAeronave: 'A001', funcionarios: [] },
    { id: 'E003', nome: 'ETAPA 3', prazo: '20 / 11 / 2026', status: 'PENDENTE', idAeronave: 'A001', funcionarios: [] },
  ])

  const [pecas, setPecas] = useState<Peca[]>([
    { id: 'P001', nome: 'PEÇA 1', fornecedor: 'FORNECEDOR 1', tipo: 'NACIONAL',  status: 'EM_PRODUCAO' },
    { id: 'P002', nome: 'PEÇA 2', fornecedor: 'FORNECEDOR 2', tipo: 'IMPORTADA', status: 'EM_PRODUCAO' },
    { id: 'P003', nome: 'PEÇA 3', fornecedor: 'FORNECEDOR 3', tipo: 'NACIONAL',  status: 'EM_PRODUCAO' },
  ])

  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([
    { id: 1, nomeCompleto: 'Dean Winchester', username: 'dean', senha: '123', telefone: '12994568473', tipo: 'ADM', endereco: 'Rua A' },
    { id: 2, nomeCompleto: 'Sam Winchester',  username: 'sam',  senha: '123', telefone: '12998568473', tipo: 'ENGENHEIRO', endereco: 'Rua B' },
    { id: 3, nomeCompleto: 'John Winchester', username: 'john', senha: '123', telefone: '12994566666', tipo: 'OPERADOR', endereco: 'Rua C' },
  ])

  const [testes, setTestes] = useState<Teste[]>([
    { id: 'T001', idAeronave: 'A001', tipo: 'ELETRICO',     resultado: 'APROVADO'  },
    { id: 'T002', idAeronave: 'A001', tipo: 'HIDRAULICO',   resultado: 'APROVADO'  },
    { id: 'T003', idAeronave: 'A002', tipo: 'AERODINAMICO', resultado: 'REPROVADO' },
  ])

  function proximoIdFuncionario() {
    if (funcionarios.length === 0) return 1
    return Math.max(...funcionarios.map(f => f.id)) + 1
  }

  function proximoIdTeste() {
    if (testes.length === 0) return 'T001'
    const nums = testes.map(t => parseInt(t.id.replace('T', '')))
    return `T${String(Math.max(...nums) + 1).padStart(3, '0')}`
  }

  function proximoIdEtapa() {
    if (etapas.length === 0) return 'E001'
    const nums = etapas.map(e => parseInt(e.id.replace('E', '')))
    return `E${String(Math.max(...nums) + 1).padStart(3, '0')}`
  }

  function proximoIdAeronave() {
    if (aeronaves.length === 0) return 'A001'
    const nums = aeronaves.map(a => parseInt(a.id.replace('A', '')))
    return `A${String(Math.max(...nums) + 1).padStart(3, '0')}`
  }

  function proximoIdPeca() {
    if (pecas.length === 0) return 'P001'
    const nums = pecas.map(p => parseInt(p.id.replace('P', '')))
    return `P${String(Math.max(...nums) + 1).padStart(3, '0')}`
  }

  const idsAeronaves = aeronaves.map(a => a.id)

  function logout() {
    setUsuarioLogado(null)
  }

  function temPermissao(pagina: string) {
    if (!usuarioLogado) return false

    if (usuarioLogado.tipo === 'ADM') return true
    if (usuarioLogado.tipo === 'ENGENHEIRO')
      return ['pecas', 'etapas', 'testes'].includes(pagina)
    if (usuarioLogado.tipo === 'OPERADOR')
      return ['pecas'].includes(pagina)

    return false
  }

  function SemPermissao() {
    return (
      <main>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          gap: '16px',
          fontFamily: "'Rajdhani', sans-serif",
        }}>
          <span style={{ fontSize: '48px' }}>🚫</span>
          <h2 style={{
            color: 'rgba(255, 100, 100, 0.9)',
            fontSize: '28px',
            fontWeight: 700,
            letterSpacing: '2px',
            margin: 0,
          }}>ACESSO NEGADO</h2>
          <p style={{
            color: 'rgba(255, 255, 255, 0.4)',
            fontSize: '18px',
            margin: 0,
          }}>Você não tem permissão para acessar esta página.</p>
        </div>
      </main>
    )
  }

  // ================= LOGIN =================
  if (!usuarioLogado) {
    return (
      <Login
        onLogin={(user) => setUsuarioLogado(user)}
        usuarios={funcionarios}
      />
    )
  }

  return (
    <>
      <Cabess />

      <Routes>

        <Route path="/" element={<Navigate to="/pecas" />} />

        <Route path="/aeronaves" element={
          temPermissao('aeronaves') ? (
            <Aeronaves
              aeronaves={aeronaves}
              onLogout={logout}
              onSalvar={(a) => setAeronaves(prev => [...prev, a])}
              onDeletar={(id) => setAeronaves(prev => prev.filter(a => a.id !== id))}
              onAtualizarAeronave={(aAtualizada) =>
                setAeronaves(prev =>
                  prev.map(a => a.id === aAtualizada.id ? aAtualizada : a)
                )
              }
              proximoId={proximoIdAeronave()}
              todasPecas={pecas}
              todasEtapas={etapas}
              todosTestes={testes}
            />
          ) : <SemPermissao />
        } />

        <Route path="/etapas" element={
          temPermissao('etapas') ? (
            <Etapas
              etapas={etapas}
              idsAeronaves={idsAeronaves}
              funcionarios={funcionarios}
              onLogout={logout}
              onSalvar={(e) => setEtapas(prev => [...prev, { ...e, id: proximoIdEtapa() }])}
              onDeletar={(id) => setEtapas(prev => prev.filter(e => e.id !== id))}
              onAtualizarStatus={(id, status) =>
                setEtapas(prev => prev.map(e => e.id === id ? { ...e, status } : e))
              }
              onAtualizarFuncionarios={(id, funcs) =>
                setEtapas(prev => prev.map(e => e.id === id ? { ...e, funcionarios: funcs } : e))
              }
            />
          ) : <SemPermissao />
        } />

        <Route path="/pecas" element={
          temPermissao('pecas') ? (
            <Pecas
              pecas={pecas}
              onLogout={logout}
              onSalvar={(p) => setPecas(prev => [...prev, { ...p, id: proximoIdPeca() }])}
              onDeletar={(id) => setPecas(prev => prev.filter(p => p.id !== id))}
              onEditar={(pAtualizada) =>
                setPecas(prev => prev.map(p => p.id === pAtualizada.id ? pAtualizada : p))
              }
            />
          ) : <SemPermissao />
        } />

        <Route path="/funcionarios" element={
          temPermissao('funcionarios') ? (
            <Funcionarios
              funcionarios={funcionarios}
              onLogout={logout}
              onSalvar={(f) => setFuncionarios(prev => [...prev, { ...f, id: proximoIdFuncionario() }])}
              onDeletar={(id) => setFuncionarios(prev => prev.filter(f => f.id !== id))}
              onEditar={(fAtualizado) =>
                setFuncionarios(prev => prev.map(f => f.id === fAtualizado.id ? fAtualizado : f))
              }
            />
          ) : <SemPermissao />
        } />

        <Route path="/testes" element={
          temPermissao('testes') ? (
            <Testes
              testes={testes}
              idsAeronaves={idsAeronaves}
              onLogout={logout}
              onSalvar={(t) => setTestes(prev => [...prev, { ...t, id: proximoIdTeste() }])}
              onDeletar={(id) => setTestes(prev => prev.filter(t => t.id !== id))}
              onEditar={(tAtualizado) =>
                setTestes(prev => prev.map(t => t.id === tAtualizado.id ? tAtualizado : t))
              }
            />
          ) : <SemPermissao />
        } />

      </Routes>
    </>
  )
}