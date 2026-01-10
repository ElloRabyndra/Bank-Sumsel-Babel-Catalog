import { Metadata } from 'next'
import LoginForm from '@/components/auth/LoginForm'

export const metadata: Metadata = {
  title: 'Login Admin - Bank Sumsel Babel',
  description: 'Login untuk mengakses dashboard admin',
}

export default function LoginPage() {
  return <LoginForm />
}