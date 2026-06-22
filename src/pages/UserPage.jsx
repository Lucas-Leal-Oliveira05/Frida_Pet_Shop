import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import Footerx from "../components/Footerx";
import { logoutUser, deletarUsuarioCompleto } from "../services/authService";
import { getPerfilUsuario } from '../services/userService';
import { getPetsUsuario, deletePet } from '../services/petService';
import { getMeusAgendamentos } from '../services/agendamentoService'; 

function UserPage() {
    const navigate = useNavigate();
    
    // Estados para armazenar os dados que vêm do banco
    const [perfil, setPerfil] = useState(null);
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);

    // <-- Novos estados para os agendamentos
    const [meusAgendamentos, setMeusAgendamentos] = useState([]);
    const [loadingAgendamentos, setLoadingAgendamentos] = useState(true);

    // useEffect: Dispara assim que a página abre
    useEffect(() => {
        async function carregarDados() {
            try {
                const dadosPerfil = await getPerfilUsuario();
                const listaPets = await getPetsUsuario();
                const listaAgendamentos = await getMeusAgendamentos(); // <-- Busca os agendamentos do banco
                
                setPerfil(dadosPerfil);
                setPets(listaPets);
                setMeusAgendamentos(listaAgendamentos); // <-- Salva no estado
            } catch (error) {
                console.error("Detalhes do erro:", error);
                alert ("Erro ao carregar dados:", + error.message);
            } finally {
                setLoading(false);
                setLoadingAgendamentos(false); // <-- Finaliza o loading dos agendamentos
            }
        }
        carregarDados();
    }, []);

    const handleLogout = async () => {
        await logoutUser();
        navigate('/Login');
    };

    const handleDeleteAccount = async () => {
        const confirmou = window.confirm(
            "ATENÇÃO: Tem certeza que deseja excluir sua conta permanentemente?"
        );
        if (confirmou) {
            try {
                await deletarUsuarioCompleto();
                alert("Conta excluída.");
                navigate('/Login');
            } catch {
                alert("Erro ao excluir.");
            }
        }
    };

    const handleExcluirPet = async (petId, petNome) => {
    const confirmou = window.confirm(
        `Tem certeza que deseja excluir ${petNome}?`
    );
    if (!confirmou) return;

    try {
        await deletePet(petId);
        setPets((prev) => prev.filter((p) => p.id !== petId));
    } catch (error) {
        alert("Erro ao excluir pet: " + error.message);
    }
};

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-[#F6EBDD] text-[#7A5A3F] font-bold text-xl">Carregando dados do Frida Petshop...</div>;
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            
            <div className="w-full bg-[#F6EBDD] flex-1 flex flex-col pb-20">
                
                {/* Cabeçalho do Perfil - NOME DINÂMICO */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-20 mt-10">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <div className="h-28 w-28 rounded-full bg-white flex shrink-0 shadow-sm overflow-hidden">
                            {/* Espaço para foto do dono futuramente */}
                        </div>
                        <h1 className="text-[#7A5A3F] text-2xl md:text-4xl text-center md:text-left font-bold">
                            Olá, {perfil?.nome || 'Usuário'}
                        </h1>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="bg-[#7A5A3F] text-white px-6 py-2 rounded-md hover:opacity-90 transition-opacity"
                    >
                        Sair da Conta
                    </button>
                </div>

                {/* Dashboard - NÚMERO DE PETS DINÂMICO */}
                <section className="flex flex-col md:flex-row gap-4 mt-10 items-center px-4 md:px-10 lg:px-28">
                    <div className="rounded-md bg-[#F3D77A] w-full md:w-1/3 text-center text-sm font-medium text-[#7A5A3F] pt-2 pb-2 shadow-sm">
                        <p>Pets Cadastrados:</p>
                        <p className="text-lg font-bold">{pets.length}</p>
                    </div>

                    <div className="rounded-md bg-[#F3D77A] text-center text-sm font-medium text-[#7A5A3F] w-full md:w-1/3 pt-2 pb-2 shadow-sm">
                        <p>Próximo horário agendado:</p>
                        <p className="text-lg font-bold">
                            {meusAgendamentos.length > 0 && meusAgendamentos[0].status !== 'CANCELADO'
                                ? new Date(meusAgendamentos[0].data_hora).toLocaleDateString('pt-BR') 
                                : '(Nenhum)'}
                        </p>
                    </div>

                    <div className="rounded-md bg-[#F3D77A] text-center text-sm font-medium text-[#7A5A3F] w-full md:w-1/3 pt-2 pb-2 shadow-sm">
                        <p>Último agendamento:</p>
                        <p className="text-lg font-bold">(Em breve)</p>
                    </div>
                </section>  
        
                {/* Meus Pets - LISTA DINÂMICA (MAP) */}
                <section className="flex flex-col mt-20 px-4 md:px-10 lg:px-28">
                    <h1 className="text-[#7A5A3F] text-lg font-bold border-b border-[#7A5A3F] w-fit mb-4">
                        Meus Pets
                    </h1>

                    {pets.length > 0 ? (
                        pets.map((pet) => (
                            <div key={pet.id} className="bg-[#F1E3C6] rounded-md flex flex-col md:flex-row items-center pt-1 pb-1 mt-5 shadow-sm">
                                <div className="h-28 w-28 shrink-0 rounded-full bg-white flex ml-0 md:ml-3 mt-3 md:mt-0 overflow-hidden shadow-inner">
                                    {pet.foto_url ? (
                                        <img src={pet.foto_url} alt={pet.nome} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">Sem foto</div>
                                    )}
                                </div>

                                <div className="flex flex-col items-center md:items-start justify-center gap-1 pl-0 md:pl-7 text-center md:text-left py-3 md:py-0">
                                    <h1 className="text-[#7A5A3F] text-2xl font-bold">{pet.nome}</h1>
                                    <p className="text-[#7A5A3F] font-medium">({pet.especie} - {pet.raca})</p>
                                </div>

                                <div className="flex flex-row justify-center items-center ml-auto flex-wrap w-full md:w-auto md:justify-end pr-0 md:pr-10 gap-5 pb-3 md:pb-0 px-4 md:px-0">
                                    <button onClick={() => navigate(`/EditarPet/${pet.id}`)} 
                                            className="rounded-md bg-[#F3D77A] text-center text-sm font-medium text-black w-40 h-10 hover:brightness-95">
                                        Editar
                                    </button>
                                    <button onClick={() => handleExcluirPet(pet.id, pet.nome)}
                                            className="rounded-md bg-[#E67C73] text-center text-sm font-medium text-black w-20 h-10 hover:brightness-95">
                                        Excluir
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bg-[#F1E3C6] p-10 rounded-md text-center text-[#7A5A3F] mt-5">
                            Você ainda não cadastrou nenhum pet. Vamos começar?
                        </div>
                    )}

                    <button 
                        onClick={() => navigate('/CadastroPet')}
                        className="rounded-md bg-[#5FA79B] mr-auto text-center text-lg font-medium w-full max-w-xs py-2 mt-5 hover:opacity-90 shadow-sm"
                    >
                        + Adicionar pet
                    </button>
                </section>

                {/* Agendamentos - AGORA DINÂMICO */}
                <section className="flex flex-col mt-20 px-4 md:px-10 lg:px-28 text-[#7A5A3F]">
                    <div className="bg-[#F3D77A] rounded-md flex flex-col pt-3 shadow-md pb-5">
                        <h1 className="ml-4 md:ml-15 text-lg font-bold px-4 mb-3">Próximos agendamentos</h1>
                        
                        {loadingAgendamentos ? (
                            <div className="bg-[#F1E3C6] p-6 mx-4 md:mx-15 rounded-md text-center">
                                Carregando agendamentos...
                            </div>
                        ) : meusAgendamentos.length === 0 ? (
                            <div className="bg-[#F1E3C6] p-6 mx-4 md:mx-15 rounded-md text-center">
                                Você ainda não tem nenhum agendamento.
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3 mx-4 md:mx-15">
                                {meusAgendamentos.map((agendamento) => {
                                    const dataObj = new Date(agendamento.data_hora);
                                    const dataFormatada = dataObj.toLocaleDateString('pt-BR');
                                    const horaFormatada = dataObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

                                    let statusColor = "bg-gray-200 text-gray-700";
                                    if (agendamento.status === "PENDENTE") statusColor = "bg-yellow-200 text-yellow-800";
                                    if (agendamento.status === "CONFIRMADO") statusColor = "bg-blue-200 text-blue-800";
                                    if (agendamento.status === "CONCLUIDO") statusColor = "bg-green-200 text-green-800";
                                    if (agendamento.status === "CANCELADO") statusColor = "bg-red-200 text-red-800";

                                    return (
                                        <div key={agendamento.id} className="bg-[#F1E3C6] p-4 rounded-md flex flex-col md:flex-row items-center justify-between shadow-sm">
                                            <div className="flex flex-col mb-2 md:mb-0 text-center md:text-left">
                                                <span className="font-bold text-[#5a4a3a] text-lg">
                                                    {agendamento.servico} <span className="font-normal text-sm text-[#7A5A3F]">- com {agendamento.profissional}</span>
                                                </span>
                                                <span className="text-[#7A5A3F] text-sm">
                                                    🐾 Pet: {agendamento.pet}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4 justify-center md:justify-end">
                                                <div className="text-right">
                                                    <p className="text-[#5a4a3a] font-bold">{dataFormatada}</p>
                                                    <p className="text-[#7A5A3F] text-sm">às {horaFormatada}</p>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColor}`}>
                                                    {agendamento.status}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </section>

                {/* LGPD */}
                <section className="mt-20 mx-4 md:mx-28 p-6 bg-white rounded-md border-2 border-red-100 shadow-sm">
                    <h2 className="text-red-600 font-bold text-lg mb-2">Privacidade e Segurança</h2>
                    <p className="text-gray-600 text-sm mb-6">
                        Em conformidade com a LGPD, você pode excluir seu perfil e todos os dados dos pets permanentemente.
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