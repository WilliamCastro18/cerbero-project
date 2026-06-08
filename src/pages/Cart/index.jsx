import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/img/LOGO-CÉRBERO---SEM-FUNDO-(BRONZE) - Editado.png'
import './style.css'

const initialItems = [
    { id: 1, modulo: 'Módulo 1', title: 'Análise Técnica de Mercado',   price: 199.90, oldPrice: 299.90, qty: 1, icon: 'bx bx-line-chart' },
    { id: 2, modulo: 'Módulo 2', title: 'Fundamentos de Investimentos', price: 199.90, oldPrice: 299.90, qty: 1, icon: 'bx bx-coin-stack' },
    { id: 3, modulo: 'Módulo 3', title: 'Triagem de Carreira com IA',   price: 199.90, oldPrice: 299.90, qty: 1, icon: 'bx bx-brain' },
]

export default function Cart() {
    const [items, setItems] = useState(initialItems)
    const [coupon, setCoupon] = useState('')
    const navigate = useNavigate()

    function handleRemove(id) {
        setItems(prev => prev.filter(item => item.id !== id))
    }

    function handleChangeQty(id, delta) {
        setItems(prev => prev.map(item =>
            item.id === id
                ? { ...item, qty: Math.max(1, item.qty + delta) }
                : item
        ))
    }

    const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0)
    const discount = items.reduce((acc, item) => acc + (item.oldPrice - item.price) * item.qty, 0)
    const total = subtotal

    function fmt(value) {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }

    return (
        <div className="cart-page">

            {/* ── HEADER ── */}
            <header className="cart-header">
                <Link to="/" className="cart-logo">
                    <img src={logo} alt="Logo Cérbero" />
                </Link>
                <nav className="cart-nav">
                    <Link to="/">Home</Link>
                </nav>
            </header>

            {/* ── CONTENT ── */}
            <main className="cart-content">
                <div className="cart-title-row">
                    <i className='bx bx-cart-alt'></i>
                    <h1>Meu Carrinho</h1>
                    {items.length > 0 && (
                        <span className="cart-badge">{items.length} {items.length === 1 ? 'item' : 'itens'}</span>
                    )}
                </div>

                {items.length === 0 ? (

                    /* ── EMPTY STATE ── */
                    <div className="cart-empty">
                        <i className='bx bx-cart-download'></i>
                        <p>Seu carrinho está vazio.</p>
                        <Link to="/#courses" className="btn-back-shop">Ver cursos</Link>
                    </div>

                ) : (

                    <div className="cart-grid">

                        {/* ── ITEMS ── */}
                        <ul className="cart-items">
                            {items.map(item => {
                                const discountPct = Math.round((1 - item.price / item.oldPrice) * 100)
                                return (
                                    <li className="cart-item" key={item.id}>
                                        <div className="cart-item-thumb">
                                            <i className={item.icon}></i>
                                        </div>

                                        <div className="cart-item-info">
                                            <span className="cart-item-modulo">{item.modulo}</span>
                                            <h2 className="cart-item-title">{item.title}</h2>
                                            <div className="cart-item-pricing">
                                                <span className="cart-item-price">{fmt(item.price)}</span>
                                                <span className="cart-item-old">{fmt(item.oldPrice)}</span>
                                                <span className="cart-item-discount">-{discountPct}%</span>
                                            </div>
                                        </div>

                                        <button
                                            className="cart-remove"
                                            onClick={() => handleRemove(item.id)}
                                            aria-label="Remover item"
                                        >
                                            <i className='bx bx-trash'></i>
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>

                        {/* ── ORDER SUMMARY ── */}
                        <aside className="cart-summary">
                            <h3 className="summary-heading">Resumo do pedido</h3>

                            <div className="summary-rows">
                                <div className="summary-row">
                                    <span>Subtotal</span>
                                    <span>{fmt(subtotal + discount)}</span>
                                </div>
                                <div className="summary-row discount">
                                    <span>Desconto</span>
                                    <span>− {fmt(discount)}</span>
                                </div>
                                <div className="summary-row total">
                                    <span>Total</span>
                                    <span>{fmt(total)}</span>
                                </div>
                            </div>

                            <div className="summary-coupon">
                                <input
                                    type="text"
                                    placeholder="Cupom de desconto"
                                    value={coupon}
                                    onChange={e => setCoupon(e.target.value)}
                                />
                                <button>Aplicar</button>
                            </div>

                            <button className="btn-checkout">Finalizar compra</button>

                            <button className="btn-keep-shopping" onClick={() => navigate('/')}>
                                <i className='bx bx-arrow-back'></i>
                                Continuar comprando
                            </button>
                        </aside>

                    </div>
                )}
            </main>
        </div>
    )
}
