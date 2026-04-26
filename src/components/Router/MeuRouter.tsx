import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Cabess from "../Cabess/Cabess";
import Funcionarios from "../Funcionarios/Funcionarios";
import Etapas from "../Etapas/Etapas";
import Pecas from "../Pecas/Pecas";
import Testes from "../Testes/Testes";
import Aeronaves from "../Aeronaves/Aeronaves";

interface Aeronave {
  id: string; modelo: string; tipo: string; capacidade: string; alcance: string;
  etapas: Etapa[]; pecas: Peca[]; testes: Teste[];
}
interface Etapa {
  id: string; nome: string; prazo: string; status: string; idAeronave: string;
}
interface Peca {
  nome: string; fornecedor: string; tipo: string; status: string;
}
interface Funcionario {
  id: number; nomeCompleto: string; username: string; senha: string; telefone: string; tipo: string;
}
interface Teste {
  id: string; idAeronave: string; tipo: string; resultado: string;
}

export default function MeuRouter() {
  const [aeronaves, setAeronaves] = useState<Aeronave[]>([
    { id: 'A001', modelo: 'MODELO 1', tipo: 'MILITAR', capacidade: '1000 KG', alcance: '1500 M', etapas: [], pecas: [], testes: [] },
    { id: 'A002', modelo: 'MODELO 2', tipo: 'MILITAR', capacidade: '1500 KG', alcance: '200 M',  etapas: [], pecas: [], testes: [] },
    { id: 'A003', modelo: 'MODELO 3', tipo: 'MILITAR', capacidade: '3000 KG', alcance: '100 M',  etapas: [], pecas: [], testes: [] },
  ])

  const [etapas, setEtapas] = useState<Etapa[]>([
    { id: 'E001', nome: 'ETAPA 1', prazo: '20 / 11 / 2026', status: 'CONCLUIDA', idAeronave: 'A001' },
    { id: 'E002', nome: 'ETAPA 2', prazo: '20 / 11 / 2026', status: 'ANDAMENTO', idAeronave: 'A001' },
    { id: 'E003', nome: 'ETAPA 3', prazo: '20 / 11 / 2026', status: 'PENDENTE',  idAeronave: 'A002' },
  ])

  const [pecas, setPecas] = useState<Peca[]>([
    { nome: 'PEÇA 1', fornecedor: 'FORNECEDOR 1', tipo: 'NACIONAL',  status: 'EM_PRODUCAO' },
    { nome: 'PEÇA 2', fornecedor: 'FORNECEDOR 2', tipo: 'IMPORTADA', status: 'EM_PRODUCAO' },
    { nome: 'PEÇA 3', fornecedor: 'FORNECEDOR 3', tipo: 'NACIONAL',  status: 'EM_PRODUCAO' },
  ])

  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([
    { id: 1, nomeCompleto: 'Dean Winchester', username: 'Dean', senha: 'Impala Sport Sedan 1967', telefone: '12 99456 8473', tipo: 'ADM' },
    { id: 2, nomeCompleto: 'Sam Winchester',  username: 'Sam',  senha: 'hunter', telefone: '12 99856 8473', tipo: 'ENGENHEIRO' },
    { id: 3, nomeCompleto: 'John Winchester', username: 'John', senha: 'mary',   telefone: '12 99456 6666', tipo: 'OPERADOR' },
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
    const proximo = Math.max(...nums) + 1
    return `T${String(proximo).padStart(3, '0')}`
  }

  function proximoIdEtapa() {
    if (etapas.length === 0) return 'E001'
    const nums = etapas.map(e => parseInt(e.id.replace('E', '')))
    const proximo = Math.max(...nums) + 1
    return `E${String(proximo).padStart(3, '0')}`
  }
  function proximoIdAeronave() {
  if (aeronaves.length === 0) return 'A001'
    const nums = aeronaves.map(a => parseInt(a.id.replace('A', '')))
    const proximo = Math.max(...nums) + 1
    return `A${String(proximo).padStart(3, '0')}`
  }
  const idsAeronaves = aeronaves.map(a => a.id)

  return (
    <>
      <Cabess />
      <Routes>
        <Route path="/aeronaves" element={
        <Aeronaves
            aeronaves={aeronaves}
            onSalvar={(a) => setAeronaves(prev => [...prev, a])}
            proximoId={proximoIdAeronave()}
        />
        } />
        <Route path="/etapas" element={
          <Etapas
            etapas={etapas}
            idsAeronaves={idsAeronaves}
            onSalvar={(e) => setEtapas(prev => [...prev, { ...e, id: proximoIdEtapa() }])}
          />
        } />
        <Route path="/pecas" element={
          <Pecas
            pecas={pecas}
            onSalvar={(p) => setPecas(prev => [...prev, p])}
          />
        } />
        <Route path="/funcionarios" element={
          <Funcionarios
            funcionarios={funcionarios}
            onSalvar={(f) => setFuncionarios(prev => [...prev, { ...f, id: proximoIdFuncionario() }])}
          />
        } />
        <Route path="/testes" element={
          <Testes
            testes={testes}
            idsAeronaves={idsAeronaves}
            onSalvar={(t) => setTestes(prev => [...prev, { ...t, id: proximoIdTeste() }])}
          />
        } />
      </Routes>
    </>
  )
}