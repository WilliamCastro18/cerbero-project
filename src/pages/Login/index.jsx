import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/img/LOGO-CÉRBERO---SEM-FUNDO-(BRONZE) - Editado.png'
import './style.css'
import api from '../../services/api'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', senha: '', lembrar: false })
  const [showSenha, setShowSenha] = useState(false)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await api.post('/users/login', {
        email: form.email,
        password: form.senha
      }, {
        withCredentials: true
      })

      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data.user))
        navigate('/')
      }
    } catch (error) {
      if (error.response?.status === 404) {
        alert("E-mail não cadastrado!")
      } else if (error.response?.status === 401) {
        alert("Senha incorreta!")
      } else {
        alert("Erro ao conectar. Tente novamente.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="card">

        {/* ── LEFT: Brand panel ── */}
        <div className="panel-left">
          <div className="deco-ring deco-ring-1"></div>
          <div className="deco-ring deco-ring-2"></div>
          <div className="deco-ring deco-ring-3"></div>

          <img
            className="brand-logo"
            src={logo}
            alt="Logo Cérbero"
            onError={(e) => { e.target.style.display = 'none' }}
          />

          <p className="brand-name">Cérbero</p>
          <p className="brand-tagline">Análises de Mercado e Investimentos</p>

          <div className="brand-sep"></div>

          <p className="brand-copy">
            Capacitamos nossos clientes a tomar decisões informadas e estratégicas no mercado financeiro.
          </p>
        </div>

        {/* ── RIGHT: Form panel ── */}
        <div className="panel-right">
          <p className="form-title">Bem-vindo de volta</p>
          <h1 className="form-heading">Acessar conta</h1>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="seu@email.com"
                value={form.email}
                onChange={handleChange}
                required
              />
              <i className='bx bx-user'></i>
            </div>

            <div className="input-group">
              <label htmlFor="senha">Senha</label>
              <input
                id="senha"
                name="senha"
                type={showSenha ? "text" : "password"}
                placeholder="••••••••"
                value={form.senha}
                onChange={handleChange}
                required
              />
              <i className={`bx ${showSenha ? 'bx-show' : 'bx-hide'}`} onClick={() => setShowSenha(!showSenha)} style={{ cursor: 'pointer' }} />
            </div>

            <div className="extras">
              <label>
                <input
                  type="checkbox"
                  name="lembrar"
                  checked={form.lembrar}
                  onChange={handleChange}
                />
                Lembrar senha
              </label>
              <a href="#">Esqueci minha senha</a>
            </div>

            <button type="submit" className="btn-login" disabled={loading}>{loading ? <span className="spinner"></span> : 'Entrar'}</button>

            <p className="register-link">
              Não tem uma conta? <Link to="/Register">Cadastre-se</Link>
            </p>
          </form>

          <p className="register-link" style={{ marginTop: '12px' }}>
            <Link to="/">← Voltar para o início</Link>
          </p>
        </div>

      </div>
    </div>
  )
}
