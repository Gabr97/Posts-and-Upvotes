import { useState } from 'react'
import { useHistory } from 'react-router'
import api from '../../api'
import * as yup from 'yup'
import './cadastro.css'

const Cadastro = () => {
  const history = useHistory()

  const [novoUsuario, setNovoUsuario] = useState({
    username: '',
    password: '',
  })

  const handleChange = (e) => {
    setNovoUsuario({
      ...novoUsuario,
      [e.target.name]: e.target.value,
    })
  }

  const cadastroSchema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
  })

  const handleCadastro = async (e) => {
    e.preventDefault()
    const isValid = await cadastroSchema.isValid(novoUsuario)

    if (!isValid) {
      alert('Preencha o(s) Campo(s) Obrigatório(s)')
    } else if (isValid) {
      await cadastroSchema.validate(novoUsuario, { abortEarly: false })

      await api.post('sign-up', novoUsuario)
      alert('Usuário Criado com Sucesso')
      history.push('/')
    }
  }
  return (
    <div className="cadastro container">
      <div className="cadastroInput">
        <header>
          <h1>Crie um usuário.</h1>
        </header>     
        <form>
          <input
            type="text"
            name="username"
            value={novoUsuario.username}
            placeholder="Usuário"
            className="form-control field"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            value={novoUsuario.password}
            placeholder="Senha"
            className="form-control field"
            onChange={handleChange}
          />
          <button onClick={handleCadastro} className="btn b-entrar">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  )
}

export default Cadastro
