import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './style.css'
import logo from '../../assets/img/LOGO-CÉRBERO---SEM-FUNDO-(BRONZE) - Editado.png'
import logoPretoBg from '../../assets/img/LOGO-CÉRBERO---FUNDO-PRETO.png'
import quoteImg from '../../assets/img/quote-img.png'
import course1 from '../../assets/img/course1.jpg'
import course2 from '../../assets/img/course2.jpg'
import course3 from '../../assets/img/course3.jpg'
import course4 from '../../assets/img/course4.jpg'
import course5 from '../../assets/img/course5.jpg'
import course6 from '../../assets/img/course6.jpg'
import pic1 from '../../assets/img/pic-1.png'
import pic2 from '../../assets/img/pic-2.png'
import pic3 from '../../assets/img/pic-3.png'

// ── Dados ────────────────────────────────────────────────────────────────────

const courses = [
  { id: 1, title: 'Curso de número 1', price: 'R$ 199,90', oldPrice: 'R$299,90', img: course1 },
  { id: 2, title: 'Curso de número 2', price: 'R$ 199,90', oldPrice: 'R$299,90', img: course2 },
  { id: 3, title: 'Curso de número 3', price: 'R$ 199,90', oldPrice: 'R$299,90', img: course3 },
  { id: 4, title: 'Curso de número 4', price: 'R$ 199,90', oldPrice: 'R$299,90', img: course4 },
  { id: 5, title: 'Curso de número 5', price: 'R$ 199,90', oldPrice: 'R$299,90', img: course5 },
  { id: 6, title: 'Curso de número 6', price: 'R$ 199,90', oldPrice: 'R$299,90', img: course6 },
]

const reviews = [
  { id: 1, name: 'João da Silva', pic: pic1 },
  { id: 2, name: 'Maria Oliveira', pic: pic2 },
  { id: 3, name: 'Carlos Santos', pic: pic3 },
]

// ── Componente de estrelas ────────────────────────────────────────────────────

function Stars() {
  return (
    <div className="stars">
      <img width="30" height="30" src="https://img.icons8.com/ios-filled/30/ffffff/star--v1.png" alt="star" />
      <img width="30" height="30" src="https://img.icons8.com/ios-filled/30/ffffff/star--v1.png" alt="star" />
      <img width="30" height="30" src="https://img.icons8.com/ios-filled/30/ffffff/star--v1.png" alt="star" />
      <img width="30" height="30" src="https://img.icons8.com/ios-filled/30/ffffff/star--v1.png" alt="star" />
      <img width="30" height="30" src="https://img.icons8.com/ios-filled/30/ffffff/star-half-empty.png" alt="star-half" />
    </div>
  )
}

function Home() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const saved = localStorage.getItem('user')
    if (saved) setUser(JSON.parse(saved))
  }, [])

  function handleLogout() {
    localStorage.removeItem('user')
    setUser(null)
    navigate('/')
  }

  return (
    <>

      {/* ── HEADER ── */}
      <header className="header">
        <section>
          <a href="#" className="logo">
            <img src={logo} alt="Logo Cérbero" />
          </a>

          <nav className="navbar">
            <a href="#home">Home</a>
            <a href="#about">Sobre</a>
            <a href="#courses">Cursos</a>
            <a href="#reviews">Avaliações</a>
            <a href="#consultation">Consultar IA</a>
          </nav>

          <div className="icons">
            <img width="30" height="30" src="https://img.icons8.com/ios-filled/30/ffffff/search--v2.png" alt="buscar" />
            <Link to='/Cart'>
              <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/ffffff/shopping-cart--v1.png" alt="carrinho" />
            </Link>
          </div>

          <div>
            { user ? (
              <div className="user-menu">
                <img width="36" height="36" src="https://img.icons8.com/ios-filled/36/ffffff/user-male-circle.png" alt="perfil"/>
                <span className="user-name">{user.name}</span>
                <button className="btn-logout" onClick={handleLogout}>Sair</button>
              </div>
            ) : ( 
              <Link to="/Login" className="btn">Entrar</Link>
            )}
          </div>
        </section>
      </header>

      {/* ── HOME / HERO ── */}
      <div className="home-container">
        <section id="home">
          <div className="content">
            <h3>Explore nossos cursos</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, repellendus aspernatur accusantium
              aliquam ex itaque officiis veniam hic magnam numquam ab dignissimos consequuntur. Nulla quisquam
              facere voluptatibus quae vel qui?
            </p>
            <a href="#courses" className="btn">Explorar cursos</a>
          </div>
        </section>
      </div>

      {/* ── SOBRE ── */}
      <section className="about" id="about">
        <h2 className="tittle">Sobre <span>Nós</span></h2>
        <div className="row">
          <div className="container-image">
            <img src={logoPretoBg} alt="sobre-nos" />
          </div>
          <div className="content">
            <h3>Quem somos?</h3>
            <p>
              Fundada em 2024 e localizada no Sul de Minas, a Cérbero Análises de Mercado e Investimentos se
              destaca no setor de finanças com uma abordagem inovadora e comprometida com a excelência. Nossa
              missão é fornecer soluções de análise de mercado e investimentos que capacitem nossos clientes a
              tomar decisões informadas e estratégicas.
            </p>
            <p>
              Na Cérbero, estamos dedicados a transformar a maneira como nossos clientes abordam o mercado
              financeiro, fornecendo as ferramentas e o conhecimento necessários para alcançar o sucesso. Com uma
              equipe experiente e apaixonada pelo que faz, estamos aqui para apoiar e guiar você em cada passo do
              seu caminho financeiro.
            </p>
            <a href="#" className="btn">Saiba mais</a>
          </div>
        </div>
      </section>

      {/* ── CURSOS ── */}
      <section className="courses" id="courses">
        <h2 className="tittle">Nossos <span>Cursos</span></h2>
        <div className="box-container">
          {courses.map((course) => (
            <div className="box" key={course.id}>
              <div className="image">
                <img src={course.img} alt={course.title} />
              </div>
              <h3>{course.title}</h3>
              <div className="price">
                {course.price}<span>{course.oldPrice}</span>
              </div>
              <a href="#" className="btn">Adicionar ao carrinho</a>
            </div>
          ))}
        </div>
      </section>

      {/* ── AVALIAÇÕES ── */}
      <section className="reviews" id="reviews">
        <h2 className="tittle">Nossos <span>Alunos</span></h2>
        <div className="box-container">
          {reviews.map((review) => (
            <div className="box" key={review.id}>
              <img src={quoteImg} alt="comentário" />
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis voluptatibus sit neque
                quibusdam commodi odit sed delectus officia qui? Perspiciatis a praesentium dolores. Iusto iste,
                officia deserunt repellat repudiandae nihil!
              </p>
              <img src={review.pic} alt="foto-aluno" className="user" />
              <h3>{review.name}</h3>
              <Stars />
            </div>
          ))}
        </div>
      </section>

      {/* ── CONSULTAR IA ── */}
      <section className="consultation" id="consultation">
        <h2 className="tittle">Consultar <span>IA</span></h2>
        <div className="box-container">
          <div className="box">
            <h3>Faça sua triagem de carreira com a nossa IA</h3>
            <a href="#" className="btn">Entrar</a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <section className="footer">
        <div className="share">
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
            <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/ffffff/instagram-new.png" alt="Instagram" />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
            <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/ffffff/facebook-new.png" alt="Facebook" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
            <img width="30" height="30" src="https://img.icons8.com/ios/30/ffffff/twitterx--v2.png" alt="Twitter/X" />
          </a>
        </div>
      </section>

    </>
  )
}

export default Home
