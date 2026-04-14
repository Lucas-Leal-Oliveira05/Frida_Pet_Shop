import Header from "../components/Header";
import Footerx from "../components/Footerx";
import Logo from '../assets/logo/Frida_logo.png'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";


function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try{
            const {data,error} = await loginUser(email,password);
            if(error){
                console.error("Erro retornando pelo Subase:", error.message);
                alert("Erro: " + error.message);
                return;
            }
            await loginUser(email,password);
            console.log("Usuário logado com sucesso:", data);
            alert("Login realizado com sucesso!");
            navigate('/UserPage');
        } catch (error) {
            console.error("Erro inesperado na função:", error);
            alert("Erro ao entrar: " + error.message);
        }
    }

    return (
        <div className="min-h-screen bg-[#F6EBDD] flex flex-col">
            <Header />
            <main className="flex-1 flex justify-center items-center p-4  md:p-10">
                <div className="w-150 h-564px bg-[#F1E3C6] rounded-[40px] shadow-lg flex flex-col items-center p-8">
                    <div className="mb-8">
                        <img className='h-24' src={Logo} alt="Logo - Petshop" />
                    </div>
                    <form onSubmit={handleLogin} className="w-full flex flex-col gap-6">
                        <div className="flex flex-col gap-1">
                            <label className="text-[#7A5A3F] font-semibold text-lg">Email</label>
                            <input
                                type="text"
                                placeholder="Digite seu email"
                                className="w-full h-12 px-4 rounded-md border-none outline-none drop-shadow-2xl bg-[#FFFFFF]"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
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
                        <div className="flex gap-4 mt-2">
                            <button type="button" className="flex-1 bg-[#E67C73] text-white p-2 rounded-md flex items-center justify-center gap-2 text-sm hover:brightness-95">
                                <img src="/src/assets/icons/google.svg" className="w-6 h-6" alt="" /> Entrar com o Google
                            </button>
                            <button type="button" className="flex-1 bg-[#E67C73] text-white p-2 rounded-md flex items-center justify-center gap-2 text-sm hover:brightness-95">
                                <img src="/src/assets/icons/facebook.svg" className="w-6 h-6" alt="" /> Entrar com o facebook
                            </button>
                        </div>
                        <a href="/CadastroUsuario" className="text-[#5B9A93] text-sm text-center font-medium hover:underline">
                            Não possui uma conta? Crie uma agora
                        </a>
                        <button className="w-full h-16 bg-[#E8837E] text-white text-3xl font-bold rounded-2xl mt-4 shadow-md hover:bg-[#d6726d] transition-all ">
                            Entrar
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );


}


export default Login;