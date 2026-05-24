// src/components/AdminSidebar.jsx
import { useNavigate, useLocation } from "react-router-dom";
import { logoutUser } from "../services/authService";

function AdminSidebar() {
    const navigate = useNavigate();
    const location = useLocation(); // Ajuda a saber em qual página o admin está para destacar o botão

    const handleSair = async () => {
        const confirmou = window.confirm("Deseja realmente sair do painel administrativo?");
        if (confirmou) {
            await logoutUser();
            navigate('/LoginAdmin');
        }
    };

    // Função interna para aplicar a cor escura apenas no botão da página ativa
    const aplicarEstiloBotao = (path) => {
        const baseStyle = "text-left py-2 px-3 rounded-md font-semibold text-lg transition-all ";
        if (location.pathname === path) {
            return baseStyle + "bg-[#4d9084]"; // Botão ativo (página atual)
        }
        return baseStyle + "hover:bg-[#53968b]"; // Botão normal com hover
    };

    return (
        <aside className="w-64 bg-[#5FA79B] text-white flex flex-col p-6 min-h-screen shrink-0">
            <h1 className="text-3xl font-bold mb-10 mt-4 pl-2 tracking-wide">Admin</h1>
            
            <nav className="flex flex-col gap-5 flex-1">
                <button onClick={() => navigate('/AdminDashboard')} className={aplicarEstiloBotao('/AdminDashboard')}>
                    Dashboard
                </button>
                <button onClick={() => navigate('/AdminAgendamentos')}className={aplicarEstiloBotao('/AdminAgendamentos')}>
                    Agendamentos
                </button>
                <button onClick={() => navigate('/AdminClientes')} className={aplicarEstiloBotao('/AdminClientes')}>
                    Clientes
                </button>
                <button onClick={() => navigate('/AdminPets')}className={aplicarEstiloBotao('/AdminPets')}>
                    Pets
                </button>
                <button onClick={() => navigate('/AdminServicos')}className={aplicarEstiloBotao('/AdminHistorico')}>
                    Serviços
                </button>
                <button onClick={() => navigate('/AdminProfissionais')} className={aplicarEstiloBotao('/AdminProfissionais')}>
                    Profissionais
                </button>
            </nav>

            <button 
                onClick={handleSair}
                className="text-left py-2 px-3 rounded-md text-lg font-semibold hover:bg-red-600 transition-all mt-auto"
            >
                Sair
            </button>
        </aside>
    );
}

export default AdminSidebar;