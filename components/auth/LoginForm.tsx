"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LoginBranding } from "./LoginBranding"
import { LoginHeader } from "./LoginHeader"
import { LoginFormFields } from "./LoginFormFields"
import { useLoginForm } from "@/hooks/useLoginForm"

export default function LoginForm() {
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') || '/admin'
  
  const {
    email,
    password,
    isLoading,
    error,
    setEmail,
    setPassword,
    handleSubmit,
  } = useLoginForm(redirectTo)

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <LoginBranding />

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          <LoginHeader />

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Form */}
          <LoginFormFields
            email={email}
            password={password}
            isLoading={isLoading}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onSubmit={handleSubmit}
          />

          {/* Back to Home */}
          <p className="text-center text-muted-foreground">
            <Link 
              href="/" 
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              ← Kembali ke Beranda
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}