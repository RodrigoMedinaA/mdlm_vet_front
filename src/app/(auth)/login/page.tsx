'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/common/Footer';
import Button from '@/components/common/Button';
import { useAuthStore } from '@/store/useAuthStore';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error, user } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login({ email, password });
    if (success) {
      setShowWelcome(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 2500);
    }
  };

  return (
    <main
      className="flex min-h-screen flex-col text-white relative overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, #013d21 0%, #015f33 30%, #017a42 60%, #015f33 100%)',
      }}
    >
      {/* Decorative background circles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full border border-white/5" />
        <div className="absolute -top-16 -right-16 w-[500px] h-[500px] rounded-full border border-white/5" />
        <div className="absolute top-1/2 -left-48 w-[400px] h-[400px] rounded-full border border-white/5" />
        <div className="absolute bottom-0 right-1/3 w-[350px] h-[350px] rounded-full border border-white/5" />
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-[#2ecc71]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-32 right-1/4 w-80 h-80 bg-[#fec107]/5 rounded-full blur-3xl" />
      </div>

      {/* Contenido centrado */}
      <div className="flex-grow flex items-center justify-center px-4 py-12 relative z-10">
        {/* Card de Login */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 md:p-10 space-y-8">
          {/* Logo como cabecera del card */}
          <div className="flex justify-center">
            <Image
              src="/logo_munimolina.png"
              alt="Municipalidad de La Molina"
              width={260}
              height={90}
              priority
              className="h-16 md:h-20 w-auto"
            />
          </div>

          {/* Título */}
          <h1 className="text-center text-gray-800 text-xl font-bold tracking-wide uppercase transition-opacity duration-500">
            {showWelcome ? '¡Bienvenido!' : 'Inicia Sesión'}
          </h1>

          {/* Error message */}
          {error && !showWelcome && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 text-center">
              {error}
            </div>
          )}

          {/* Custom Styles for Animation */}
          <style dangerouslySetInnerHTML={{
            __html: `
            @keyframes customFadeIn {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-delay-1 { opacity: 0; animation: customFadeIn 0.8s ease-out 0.2s forwards; }
            .animate-delay-2 { opacity: 0; animation: customFadeIn 0.8s ease-out 0.8s forwards; }
            .animate-delay-3 { opacity: 0; animation: customFadeIn 0.8s ease-out 1.4s forwards; }
          `}} />

          {/* Formulario o Bienvenida */}
          {showWelcome && user ? (
            <div className="flex flex-col items-center space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-3xl md:text-4xl font-bold text-[#2ecc71] uppercase tracking-wider animate-delay-1">
                  {user.name}
                </h2>
                <p className="text-gray-500 font-medium text-lg animate-delay-2">
                  Rol: {user.roles?.join(', ')}
                </p>
              </div>
            </div>
          ) : (
            <form className={`space-y-5 transition-opacity duration-500 ${showWelcome ? 'opacity-0' : 'opacity-100'}`} onSubmit={handleSubmit}>
              {/* Campo Gmail */}
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600"
                >
                  Gmail
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@gmail.com"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-800 
                           placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2ecc71]/50 
                           focus:border-[#2ecc71] transition duration-200"
                />
              </div>

              {/* Campo Contraseña */}
              <div className="space-y-1.5">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-600"
                >
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa tu contraseña"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-800 
                           placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2ecc71]/50 
                           focus:border-[#2ecc71] transition duration-200"
                />
              </div>

              {/* Link ¿Olvidaste tu contraseña? */}
              <div className="text-right">
                <Link
                  href="#"
                  className="text-sm text-[#015f33] hover:text-[#2ecc71] font-medium transition-colors duration-200"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              {/* Botón reutilizable */}
              <Button type="submit" fullWidth disabled={isLoading}>
                {isLoading ? 'Ingresando...' : 'INGRESAR'}
              </Button>
            </form>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
