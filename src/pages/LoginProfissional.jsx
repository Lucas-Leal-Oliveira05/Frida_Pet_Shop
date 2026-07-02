import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { supabase } from "../services/supabase";

function LoginProfissional() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
      if (error) throw error;
      
      // Se deu certo, manda pro dashboard do profissional
      navigate("/DashboardProfissional");
    } catch (error) {
      alert("Erro ao entrar: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6EBDD] flex flex-col font-sans text-black">
      <Header />

      <main className="flex-1 flex items-center justify-center p-4 mt--50px">
        <div className="bg-[#EFE3C8] p-8 md:p-12 rounded-xl shadow-sm w-full max-w-md flex flex-col items-center">
          
          {/* Logo Centralizada (Substitua o src depois pela sua logo real) */}
          <div className="w-20 h-20 mb-4 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-inner">
             <span className="text-xs text-center text-gray-400">Logo<br/>Frida</span>
          </div>

          <h2 className="text-[#5a4a3a] text-xl font-bold mb-8 tracking-wide">
            LOGIN PROFISSIONAIS
          </h2>

          <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="text-[#7A5A3F] font-medium text-sm mb-1">Usuário</label>
              <input
                type="email"
                required
                placeholder="Digite seu usuário"
                className="p-3 rounded bg-white border border-[#D1BFAE] outline-none focus:ring-2 focus:ring-[#5FA79B]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-[#7A5A3F] font-medium text-sm mb-1">Senha</label>
              <input
                type="password"
                required
                placeholder="Digite sua senha"
                className="p-3 rounded bg-white border border-[#D1BFAE] outline-none focus:ring-2 focus:ring-[#5FA79B]"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-[#E67C73] text-white font-bold text-lg py-3 rounded hover:brightness-95 transition-all shadow-sm disabled:opacity-70"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default LoginProfissional;