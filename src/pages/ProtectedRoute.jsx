import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../services/supabase"; // Ajuste o caminho se necessário

export default function ProtectedRoute({ children, perfilExigido }) {
  const [loading, setLoading] = useState(true);
  const [autorizado, setAutorizado] = useState(false);
  const [rotaRedirecionamento, setRotaRedirecionamento] = useState("/");

  useEffect(() => {
    async function verificarAcesso() {
      try {
        // 1. Verifica se existe uma sessão ativa no navegador
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          // Se não estiver logado, manda direto para a tela de Login
          setRotaRedirecionamento("/"); 
          setAutorizado(false);
          setLoading(false);
          return;
        }

        // 2. Busca o nível de acesso (perfil) na sua tabela de 'usuarios'
        const { data: perfilData, error } = await supabase
          .from("usuarios")
          .select("perfil")
          .eq("id", user.id)
          .single();

        if (error) throw error;

        const perfilUsuario = perfilData?.perfil; // Deve retornar "ADMIN" ou "CLIENTE"

        // 3. Valida se o perfil bate com o que a rota exige
        if (perfilExigido && perfilUsuario !== perfilExigido) {
          // Se for um ADMIN tentando entrar em páginas de cliente
          if (perfilUsuario === "ADMIN") {
            setRotaRedirecionamento("/AdminServicos"); // Redireciona pro painel dele
          }
          // Se for um CLIENTE tentando invadir o painel Admin
          else if (perfilUsuario === "CLIENTE") {
            setRotaRedirecionamento("/UserPage"); // Redireciona para a área dele
          }
          setAutorizado(false);
        } else {
          // Perfil correto! Acesso liberado
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

  // Enquanto consulta o banco, exibe uma mensagem de carregamento limpa
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F6EBDD] flex items-center justify-center">
        <p className="text-[#7A5A3F] font-bold text-lg animate-pulse">Verificando credenciais...</p>
      </div>
    );
  }

  // Se estiver tudo certo, renderiza a página. Se não, executa o redirecionamento
  return autorizado ? children : <Navigate to={rotaRedirecionamento} replace />;
}