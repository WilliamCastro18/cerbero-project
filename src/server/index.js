import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'   // ← novo

const prisma = new PrismaClient()
const app = express()

app.use(cors({
  origin: ['http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true   // ← necessário para cookies funcionarem
}))
app.use(express.json())
app.use(cookieParser())   // ← novo

// ── Cadastrar usuário ────────────────────────────────────────────
app.post('/users', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      }
    })
    const { password, ...userWithoutPassword } = user
    res.status(201).json(userWithoutPassword)
  } catch (error) {
    res.status(400).json({ error: 'Erro ao cadastrar usuário. E-mail já cadastrado?' })
  }
})

// ── Login ────────────────────────────────────────────────────────
app.post('/users/login', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.body.email }
    })

    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' })

    const senhaCorreta = await bcrypt.compare(req.body.password, user.password)
    if (!senhaCorreta) return res.status(401).json({ error: 'Senha incorreta' })

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    // token vai no cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,      // mudar para true quando for produção (HTTPS)
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000   // 7 dias em ms
    })

    const { password, ...userWithoutPassword } = user
    res.status(200).json({ user: userWithoutPassword })
  } catch (error) {
    res.status(400).json({ error: 'Erro ao fazer login' })
  }
})

// ── Logout ───────────────────────────────────────────────────────
app.post('/users/logout', (req, res) => {
  res.clearCookie('token')
  res.status(200).json({ message: 'Logout realizado com sucesso' })
})

// ── Listar usuários ──────────────────────────────────────────────
app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      }
    })
    res.status(200).json(users)
  } catch (error) {
    res.status(400).json({ error: 'Erro ao buscar usuários' })
  }
})

// ── Atualizar usuário ────────────────────────────────────────────
app.put('/users/:id', async (req, res) => {
  try {
    const data = { name: req.body.name, email: req.body.email }
    if (req.body.password) {
      data.password = await bcrypt.hash(req.body.password, 10)
    }
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data
    })
    const { password, ...userWithoutPassword } = user
    res.status(200).json(userWithoutPassword)
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar usuário' })
  }
})

// ── Deletar usuário ──────────────────────────────────────────────
app.delete('/users/:id', async (req, res) => {
  try {
    await prisma.user.delete({ where: { id: req.params.id } })
    res.status(200).json({ message: 'Usuário deletado com sucesso!' })
  } catch (error) {
    res.status(400).json({ error: 'Erro ao deletar usuário' })
  }
})

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000')
})