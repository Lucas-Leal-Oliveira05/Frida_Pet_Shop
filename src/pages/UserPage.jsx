import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import Footerx from "../components/Footerx";
import { logoutUser, deletarUsuarioCompleto } from "../services/authService";

function UserPage() {
    const navigate = useNavigate();

    // Função para Logout simples
    const handleLogout = async () => {
        await logoutUser();
        navigate('/Login');
    };

    // Função para Excluir Conta (LGPD)
    const handleDeleteAccount = async () => {
        const confirmou = window.confirm(
            "ATENÇÃO: Tem certeza que deseja excluir sua conta? Todos os seus dados e de seus pets serão apagados permanentemente conforme a LGPD. Esta ação não pode ser desfeita."
        );

        if (confirmou) {
            try {
                console.log("Iniciando exclusão de dados...");
                await deletarUsuarioCompleto(); 
                alert("Sua conta e os dados dos seus pets foram excluídos com sucesso. Sentiremos sua falta!");
                navigate('/Login');
            } catch (error) {
                console.error(error);
                alert("Erro ao processar exclusão.");
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            
            <div className="w-full bg-[#F6EBDD] flex-1 flex flex-col pb-20">
                
                {/* Cabeçalho do Perfil */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-20 mt-10">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <div className="h-28 w-28 rounded-full bg-white flex shrink-0 shadow-sm"></div>
                        <h1 className="text-[#7A5A3F] text-2xl md:text-4xl text-center md:text-left font-bold">
                            Olá, (Puxa do banco)
                        </h1>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="bg-[#7A5A3F] text-white px-6 py-2 rounded-md hover:opacity-90 transition-opacity"
                    >
                        Sair da Conta
                    </button>
                </div>

                {/* Dashboard de Status */}
                <section className="flex flex-col md:flex-row gap-4 mt-10 items-center px-4 md:px-10 lg:px-28">
                    <div className="rounded-md bg-[#F3D77A] w-full md:w-1/3 text-center text-sm font-medium text-[#7A5A3F] pt-2 pb-2 shadow-sm">
                        <p>Pets Cadastrados:</p>
                        <p className="text-lg font-bold">(Num pets)</p>
                    </div>

                    <div className="rounded-md bg-[#F3D77A] text-center text-sm font-medium text-[#7A5A3F] w-full md:w-1/3 pt-2 pb-2 shadow-sm">
                        <p>Próximo horário agendado:</p>
                        <p className="text-lg font-bold">(horário/data)</p>
                    </div>

                    <div className="rounded-md bg-[#F3D77A] text-center text-sm font-medium text-[#7A5A3F] w-full md:w-1/3 pt-2 pb-2 shadow-sm">
                        <p>Último agendamento:</p>
                        <p className="text-lg font-bold">(horário/data)</p>
                    </div>
                </section>  
                                                                                                        
                {/* Meus Pets */}
                <section className="flex flex-col mt-20 px-4 md:px-10 lg:px-28">
                    <h1 className="text-[#7A5A3F] text-lg font-bold border-b border-[#7A5A3F] w-fit mb-4">
                        Meus Pets
                    </h1>

                    {/* Card de Pet (Template) */}
                    <div className="bg-[#F1E3C6] rounded-md flex flex-col md:flex-row items-center pt-1 pb-1 mt-5 shadow-sm">
                        <div className="h-28 w-28 shrink-0 rounded-full bg-white flex ml-0 md:ml-3 mt-3 md:mt-0"></div>

                        <div className="flex flex-col items-center md:items-start justify-center gap-1 pl-0 md:pl-7 text-center md:text-left py-3 md:py-0">
                            <h1 className="text-[#7A5A3F] text-2xl font-bold">(Template)</h1>
                            <p className="text-[#7A5A3F] font-medium">(Espécie - raça)</p>
                        </div>

                        <div className="flex flex-row justify-center items-center ml-auto flex-wrap w-full md:w-auto md:justify-end pr-0 md:pr-10 gap-5 pb-3 md:pb-0 px-4 md:px-0">
                            <button className="rounded-md bg-[#F3D77A] text-center text-sm font-medium text-black w-40 h-10 hover:brightness-95">Editar</button>
                            <button className="rounded-md bg-[#E67C73] text-center text-sm font-medium text-black w-20 h-10 hover:brightness-95">Excluir</button>
                        </div>
                    </div>

                    <button 
                        onClick={() => navigate('/CadastroPet')}
                        className="rounded-md bg-[#5FA79B] mr-auto text-center text-lg font-medium w-full max-w-xs py-2 mt-5 hover:opacity-90 shadow-sm"
                    >
                        + Adicionar pet
                    </button>
                </section>

                {/* Agendamentos */}
                <section className="flex flex-col mt-20 px-4 md:px-10 lg:px-28 text-[#7A5A3F]">
                    <div className="bg-[#F3D77A] rounded-md flex flex-col pt-3 shadow-md">
                        <h1 className="ml-4 md:ml-15 text-lg font-bold">Próximos agendamentos</h1>

                        <div className="bg-[#F1E3C6] flex flex-col mx-4 md:mx-15 pt-3 mt-3 mb-5 rounded-md shadow-inner">
                            <div className="flex flex-col md:flex-row ml-5 mr-5 md:mr-28 font-bold">
                                <h1>(Data - horário)</h1>
                            </div>

                            <div className="flex flex-col md:flex-row mt-5 ml-5 pb-3 gap-4 md:gap-0">
                                <div className="flex flex-col gap-3 font-medium">
                                    <p>Pet: <span className="font-normal">(Nome)</span></p>
                                    <p>Serviço: <span className="font-normal">(Banho/Tosa)</span></p>
                                    <p>Status: <span className="font-normal">(Confirmado)</span></p>
                                </div>

                                <div className="flex flex-row items-center justify-center flex-wrap gap-4 md:ml-auto md:mr-10">
                                    <button className="rounded-md bg-[#5FA79B] text-black text-center text-sm font-medium w-32 h-8">Confirmar</button>
                                    <button className="rounded-md bg-[#F3D77A] text-black text-center text-sm font-medium w-32 h-8 border border-[#7A5A3F]">Reagendar</button>
                                    <button className="rounded-md bg-[#E67C73] text-black text-center text-sm font-medium w-32 h-8">Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <button className="rounded-md bg-[#5FA79B] text-center text-lg font-medium text-black h-12 w-auto mx-4 md:mx-28 mt-8 mb-10 shadow-sm hover:opacity-90">
                    + Novo agendamento
                </button>

                {/* Seção de Segurança / LGPD */}
                <section className="mt-20 mx-4 md:mx-28 p-6 bg-white rounded-md border-2 border-red-100 shadow-sm">
                    <h2 className="text-red-600 font-bold text-lg mb-2">Privacidade e Segurança</h2>
                    <p className="text-gray-600 text-sm mb-6">
                        Em conformidade com a LGPD, você tem o direito de remover todos os seus dados pessoais do nosso sistema a qualquer momento. Esta ação excluirá seu perfil, histórico de agendamentos e dados dos seus pets.
                    </p>
                    <button 
                        onClick={handleDeleteAccount}
                        className="rounded-md bg-[#E67C73] text-black text-center text-sm font-bold w-full max-w-xs h-10 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                    >
                        EXCLUIR MINHA CONTA PERMANENTEMENTE
                    </button>
                </section>
            </div>

            <Footerx />
        </div>
    );
}

export default UserPage;