import { useState } from "react"
import "./Login.css"

interface Funcionario {
  id: number
  nomeCompleto: string
  username: string
  senha: string
  telefone: string
  tipo: string
  endereco: string
}

interface Props {
  onLogin: (user: Funcionario) => void
  usuarios: Funcionario[]
}

export default function Login({ onLogin, usuarios }: Props) {

  const [username, setUsername] = useState("")
  const [senha, setSenha] = useState("")
  const [erro, setErro] = useState("")

  function handleLogin() {
    const user = usuarios.find(
      u => u.username === username && u.senha === senha
    )

    if (!user) {
      setErro("Usuário ou senha inválidos")
      return
    }

    setErro("")
    onLogin(user)
  }

  return (
    <div className="login-container">

      <h1 className="login-title">LOGIN</h1>

      <div className="login-box">
        <label>USUÁRIO</label>
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <label>SENHA</label>
        <input
          type="password"
          value={senha}
          onChange={e => setSenha(e.target.value)}
        />

        {erro && <p className="login-erro">{erro}</p>}

        <button onClick={handleLogin}>
          ENTRAR
        </button>
      </div>
    </div>
  )
}