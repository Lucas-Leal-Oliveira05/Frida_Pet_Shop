import Header from "../components/Header";
import Footerx from "../components/Footerx";
import Logo from '../assets/logo/Frida_logo.png';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../services/authService";

function LoginAdmin() {
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLoginAdmin = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try{
            await loginAdmin(usuario, password);

            alert("Acesso autorizado! Bem-vindo ao painel de controle")
            navigate('/AdminDasboard'); //tenho que mudar dps para a rota do painel 
        } catch (error) {
            console.error("Erro no login do administrador:", error.message)
            alert(error.message)
        } finally {
            setLoading(false)
        }
    };


    return (
        <div className="min-h-screen bg-[#F6EBDD] flex flex-col">
            <Header />
            
            <main className="flex-1 flex justify-center items-center p-4 md:p-10">
                <div className="w-150 bg-[#F1E3C6] rounded-[40px] shadow-lg flex flex-col items-center p-8">
                    
                    {/* Logo central */}
                    <div className="mb-8">
                        <img className='h-24' src={Logo} alt="Logo - Petshop" />
                    </div>
                    
                    <form onSubmit={handleLoginAdmin} className="w-full flex flex-col gap-6">
                        
                        {/* Input do Usuário Administrador */}
                        <div className="flex flex-col gap-1">
                            <label className="text-[#7A5A3F] font-semibold text-lg">Usuário administrador</label>
                            <input
                                type="email"
                                placeholder="Digite o usuario administrador"
                                className="w-full h-12 px-4 rounded-md border-none outline-none drop-shadow-2xl bg-[#FFFFFF]"
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)}
                                required
                            />
                        </div>
                        
                        {/* Input da Senha */}
                        <div className="flex flex-col gap-1">
                            <label className="text-[#7A5A3F] font-semibold text-lg">Senha</label>
                            <input
                                type="password"
                                placeholder="Digite sua senha"
                                className="w-full h-12 px-4 rounded-md border-none outline-none drop-shadow-2xl bg-[#FFFFFF]"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {/* Botão de Enviar */}
                        <button className="w-full h-16 bg-[#E8837E] text-white text-3xl font-bold rounded-2xl mt-4 shadow-md hover:bg-[#d6726d] transition-all ">
                            {loading ? 'Verificando...' : 'Entrar'}
                        </button>
                        
                    </form>
                </div>
            </main>
            
            <Footerx />
        </div>
    );
}

export default LoginAdmin;