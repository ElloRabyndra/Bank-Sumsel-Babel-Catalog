import Link from "next/link"
import Image from "next/image"

export function LoginHeader() {
  return (
    <>
      {/* Mobile Logo */}
      <div className="lg:hidden flex justify-center mb-8">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Logo"
            width={120}
            height={40}
            priority
          />
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-2 text-center lg:text-left">
        <h2 className="text-3xl font-bold text-foreground">
          Selamat Datang! 
        </h2>
        <p className="text-muted-foreground">
          Masuk ke dashboard admin untuk mengelola katalog
        </p>
      </div>
    </>
  )
}