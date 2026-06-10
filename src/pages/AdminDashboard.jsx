import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { logoutUser } from "../services/authService";
import { getAgendamentosPainel, getMetricasDashboard, atualizarStatusAgendamento } from "../services/agendamentoService";
import AdminSidebar from "../components/AdminSidebar";

function AdminDashboard() {
    // const navigate = useNavigate();

    // Estados estáticos para o mockup (depois você conecta as funções do banco aqui)
    const [agendamentos, setAgendamentos] = useState([]);
    const [metricas, setMetricas] = useState({ 
        agendamentosHoje: 0, 
        pendentes: 0, 
        totalClientes: 0, 
        totalPets: 0 
    })
    const [, setLoading] = useState(true);

    const [modalConfig, setModalConfig] = useState({ show: false, type: '', id: null });

    async function carregarDados() {
    try {
        setLoading(true);
        
        const dadosAgendamentos = await getAgendamentosPainel();
        const dadosMetricas = await getMetricasDashboard();
        
        setAgendamentos(dadosAgendamentos);
        setMetricas(dadosMetricas);
    } catch (error) {
        console.error("Erro detalhado ao carregar dashboard:", error); 
    } finally {
        setLoading(false);
    }
}

    useEffect(() => {
        carregarDados();
    }, []);

    //pop-ups
    const abrirModal = (type, id) => {
        setModalConfig({ show: true, type, id });
    };

    const fecharModal = () => {
        setModalConfig({ show: false, type: '', id: null })
    };

    //Confirmar ou cancelar
    const processarAcao = async () => {
        const novoStatus = modalConfig.type === 'Confirmar' ? 'Confirmado' : 'Cancelado';
        try {
            await atualizarStatusAgendamento(modalConfig.id, novoStatus);
            fecharModal();
            carregarDados();
        } catch (error) {
            alert("Erro ao atualizar: " + error.message);
        }
    };

    // const handleSair = async () => {
    //     await logoutUser();
    //     navigate('/LoginAdmin')
    // }

    return (
        <div className="min-h-screen bg-[#F6EBDD] flex">

           <AdminSidebar />

            {/* 2. CONTEÚDO PRINCIPAL (Direita) */}
            <main className="flex-1 p-8 md:p-12 overflow-y-auto">

                {/* LINHA DE METRICAS (Cards Superiores) */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <div className="bg-[#F3D77A] rounded-[20px] p-4 text-center shadow-sm text-[#7A5A3F]">
                        <p className="font-semibold text-sm">Agendamentos Hoje</p>
                        <p className="text-3xl font-bold mt-2">{metricas.agendamentosHoje}</p>
                    </div>

                    <div className="bg-[#F3D77A] rounded-[20px] p-4 text-center shadow-sm text-[#7A5A3F]">
                        <p className="font-semibold text-sm">Pendentes</p>
                        <p className="text-3xl font-bold mt-2">{metricas.pendentes}</p>
                    </div>

                    <div className="bg-[#F3D77A] rounded-[20px] p-4 text-center shadow-sm text-[#7A5A3F]">
                        <p className="font-semibold text-sm">Total Clientes</p>
                        <p className="text-3xl font-bold mt-2">{metricas.totalClientes}</p>
                    </div>

                    <div className="bg-[#F3D77A] rounded-[20px] p-4 text-center shadow-sm text-[#7A5A3F]">
                        <p className="font-semibold text-sm">Total Pets</p>
                        <p className="text-3xl font-bold mt-2">{metricas.totalPets}</p>
                    </div>
                </section>

                {/* CONTAINER DA TABELA */}
                <section className="bg-[#F3D77A] rounded-[10px] p-6 shadow-sm text-[#7A5A3F]">
                    <h2 className="text-3xl font-bold mb-6 text-left">Agendamentos Recentes</h2>

                    {/* Tabela Responsiva */}
                    <div className="bg-[#F1E3C6] rounded-md p-4 shadow-inner overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-600px">
                            <thead>
                                <tr className="border-b-2 border-[#7A5A3F] font-bold text-base md:text-lg">
                                    <th className="pb-3">Data</th>
                                    <th className="pb-3">Cliente</th>
                                    <th className="pb-3">Pet</th>
                                    <th className="pb-3">Serviços</th>
                                    <th className="pb-3">Status</th>
                                    <th className="pb-3">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="font-medium text-black">
                                {agendamentos.map((item) => (
                                    <tr key={item.id} className="border-b border-[#ebd7b1]">
                                        <td className="py-4 text-[#7A5A3F]">{new Date(item.data_hora).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}</td>
                                        <td className="py-4">{item.cliente}</td>
                                        <td className="py-4">{item.pet}</td>
                                        <td className="py-4">{item.servico}</td>
                                        <td className="py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.status === 'Confirmado' ? 'bg-[#5FA79B]' : 'bg-[#F3D77A] border border-[#ebd7b1] text-[#7A5A3F]'}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="py-4 flex gap-2">
                                            {item.status === 'Pendentes' && (
                                                <button onClick={() => abrirModal('confirmar', item.id)} className="bg-[#5FA79B] text-black text-xs font-bold px-3 py-1.5 rounded">Confirmar</button>
                                            )}
                                            <button onClick={() => abrirModal('cancelar', item.id)} className="bg-[#E67C73] text-black text-xs font-bold px-3 py-1.5 rounded">Cancelar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>

            {/* POP-UPS (MODAIS) */}
            {modalConfig.show && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-8 max-w-lg w-full text-center shadow-2xl text-black">
                        {modalConfig.type === 'confirmar' ? (
                            <>
                                <h2 className="text-2xl font-bold mb-6">Você deseja confirmar este agendamento?</h2>
                                <div className="flex gap-4">
                                    {/* AQUI: Chame a função pura, ela já sabe o ID através do estado modalConfig.id */}
                                    <button onClick={processarAcao} className="flex-1 bg-[#5FA79B] text-black font-bold py-3 rounded-md">Confirmar</button>
                                    <button onClick={fecharModal} className="flex-1 bg-[#E67C73] text-black font-bold py-3 rounded-md">Cancelar</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="text-6xl mb-4">⚠️</div>
                                <h2 className="text-2xl font-bold mb-4">Tem certeza que deseja cancelar o agendamento?</h2>
                                <p className="text-gray-500 mb-8">Essa ação não poderá ser desfeita</p>
                                <div className="flex gap-4">
                                    <button onClick={fecharModal} className="flex-1 bg-[#5FA79B] text-black font-bold py-3 rounded-md">Voltar</button>
                                    {/* AQUI TAMBÉM: Apenas chama a função processarAcao */}
                                    <button onClick={processarAcao} className="flex-1 bg-[#E67C73] text-black font-bold py-3 rounded-md">Confirmar</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

        </div>
    );
}

export default AdminDashboard;