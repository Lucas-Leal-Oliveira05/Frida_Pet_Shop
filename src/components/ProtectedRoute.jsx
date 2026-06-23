import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../services/supabase";

export default function ProtectedRoute({ children, perfilExigido }) {
  const [loading, setLoading] = useState(true);
  const [autorizado, setAutorizado] = useState(false);
  const [rotaRedirecionamento, setRotaRedirecionamento] = useState("/");

  useEffect(() => {
    async function verificarAcesso() {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          setRotaRedirecionamento("/"); 
          setAutorizado(false);
          setLoading(false);
          return;
        }

        const { data: perfilData, error } = await supabase
          .from("usuarios")
          .select("perfil")
          .eq("id", user.id)
          .single();

        if (error) throw error;

        const perfilUsuario = perfilData?.perfil;

        if (perfilExigido && perfilUsuario !== perfilExigido) {
          if (perfilUsuario === "ADMIN") {
            setRotaRedirecionamento("/AdminServicos");
          } else if (perfilUsuario === "CLIENTE") {
            setRotaRedirecionamento("/UserPage");
          }
          setAutorizado(false);
        } else {
          setAutorizado(true);
        }
      } catch (error) {
        console.error("Erro na trava de segurança:", error.message);
        setAutorizado(false);
        setRotaRedirecionamento("/");
      } finally {
        setLoading(false);
      }
    }

    verificarAcesso();
  }, [perfilExigido]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F6EBDD] flex items-center justify-center">
        <p className="text-[#7A5A3F] font-bold text-lg animate-pulse">Verificando credenciais...</p>
      </div>
    );
  }

  return autorizado ? children : <Navigate to={rotaRedirecionamento} replace />;
}