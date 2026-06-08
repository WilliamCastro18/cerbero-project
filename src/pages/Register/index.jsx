import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/img/LOGO-CÉRBERO---SEM-FUNDO-(BRONZE) - Editado.png'
import './style.css'
import api from '../../services/api'

export default function Register() {
    const [form, setForm] = useState({ nome: '', email: '', senha: '', confirmarSenha: '', lembrar: false })
    const [showSenha, setShowSenha] = useState(false)
    const [showConfirmar, setShowConfirmar] = useState(false)
    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    async function getUsers() {
        const usersFromApi = await api.get('/users')

        setUsers(usersFromApi.data)
    }
    async function createUsers() {
        await api.post('/users', {
            name: form.nome,
            email: form.email,
            password: form.senha
        })
    }

    useEffect(() => {
        getUsers()
    }, [])

    function handleChange(e) {
        const { name, value, type, checked } = e.target
        setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if (form.senha !== form.confirmarSenha) {
            alert('As senhas não coincidem!')
            return
        }
        try {
            await createUsers()
            navigate('/')
        } catch (error) {
            if (error.response?.status === 400) {
                alert('Este e-mail já está cadastrado!')
            } else {
                alert('Erro ao cadastrar. Tente novamente.')
            }
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
                    <p className="form-title">Preencha os campos</p>
                    <h1 className="form-heading">Faça seu cadastro</h1>

                    <form onSubmit={handleSubmit}>
                        <div className='input-group'>
                            <label htmlFor='nome'>Nome completo</label>
                            <input
                                id="nome"
                                name="nome"
                                type="text"
                                placeholder="Seu Nome"
                                value={form.nome}
                                onChange={handleChange}
                                required
                            />
                        </div>

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

                        <div className="input-group">
                            <label htmlFor="confirmarSenha">Confirmar Senha</label>
                            <input
                                id="confirmarSenha"
                                name="confirmarSenha"
                                type={showConfirmar ? 'text' : 'password'}
                                placeholder="••••••••"
                                value={form.confirmarSenha}
                                onChange={handleChange}
                                required
                            />
                            <i className={`bx ${showConfirmar ? 'bx-show' : 'bx-hide'}`} onClick={() => setShowConfirmar(!showConfirmar)} style={{ cursor: 'pointer' }} />
                        </div>

                        <button type="submit" className="btn-login">Cadastrar</button>

                        <p className="register-link">
                            Ao se cadastrar, você concorda com nossos <Link to="/Register">Termos de uso</Link>
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
