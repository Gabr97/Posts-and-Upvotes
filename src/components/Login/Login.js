import React, { useState } from 'react'
import * as yup from 'yup'
import './login.css'
import { useHistory } from 'react-router'
import api from '../../api'
import { Link } from 'react-router-dom'

const Login = (props) => {
  const history = useHistory()

  const [usuario, setUsuario] = useState({
    username: '',
    password: '',
  })

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    })
  }

  const userSchema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
  })

  const handleLogin = async (e) => {
    e.preventDefault()
    const isValid = await userSchema.isValid(usuario)

    if (!isValid) {
      alert('Preencha o(s) Campo(s) Obrigatório(s)')
    } else if (isValid) {
      await userSchema.validate(usuario, { abortEarly: false })

      const response = await api.post('sign-in', usuario)
      api.defaults.headers.Authorization = `Bearer ${response.data}`
      history.push('/feed')
    }
  }
  return (
    <div className="login container">
      <div className="loginInput">
        <header>
          <h1>Faça login ou cadastre-se para visualizar os posts.</h1>
        </header>
        <hr
          style={{ width: '35vw', marginLeft: 'auto', marginRight: 'auto' }}
        />
        <form>
          <input
            type="text"
            name="username"
            value={usuario.username}
            placeholder="Usuário"
            className="form-control field"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            value={usuario.password}
            placeholder="Senha"
            className="form-control field"
            onChange={handleChange}
          />
          <button onClick={handleLogin} className="btn b-entrar">
            Entrar
          </button>
        </form>
        <hr
          style={{ width: '180px', marginLeft: 'auto', marginRight: 'auto' }}
        />
        <Link style={{textDecoration:'none'}} className='nova-conta' to="/cadastro">
          <p>Criar conta</p>
        </Link>
      </div>
    </div>
  )
}

export default Login
