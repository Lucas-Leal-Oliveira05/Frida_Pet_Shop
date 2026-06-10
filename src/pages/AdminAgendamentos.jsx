import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import { getAtendimentosDoDia } from "../services/atendimentoService";

function AdminAgendamentos() {
    const navigate = useNavigate();
    const [atendimentos, setAtendimentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dataAtualFormatada, setDataAtualFormatada] = useState("");

    useEffect(() => {
        const hoje = new Date();
        setDataAtualFormatada(hoje.toLocaleDateString('pt-BR'));

        async function carregarAtendimentos() {
            try {
                setLoading(true);
                const dados = await getAtendimentosDoDia();
                setAtendimentos(dados);
            } catch (error) {
                console.error("Erro ao carregar atendimentos do dia:", error.message);
            } finally {
                setLoading(false);
            }
        }

        carregarAtendimentos();
    }, []);

    return (
        <div className="min-h-screen bg-[#F6EBDD] flex relative">
            <AdminSidebar />

            {/* CONTEÚDO PRINCIPAL */}
            <main className="flex-1 p-8 md:p-12 overflow-y-auto">
                <h1 className="text-3xl font-bold mb-2 text-black">Atendimentos do dia</h1>
                
                {/* Campo de exibição de data do mockup */}
                <div className="mb-8">
                    <div className="w-48 h-10 bg-white border border-gray-300 rounded flex items-center justify-center font-semibold text-gray-700 shadow-sm">
                        {dataAtualFormatada}
                    </div>
                </div>

                {/* TABELA DE ATENDIMENTOS */}
                <section className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden mb-8">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-700px">
                            <thead>
                                <tr className="bg-[#E5E5E5] border-b border-gray-300 text-black font-bold text-base">
                                    <th className="py-3 px-4">Horário</th>
                                    <th className="py-3 px-4">Cliente</th>
                                    <th className="py-3 px-4">Pet</th>
                                    <th className="py-3 px-4">Profissional</th>
                                    <th className="py-3 px-4">Status</th>
                                    <th className="py-3 px-4">Telefone</th>
                                </tr>
                            </thead>
                            <tbody className="text-black font-medium">
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" className="py-8 text-center text-gray-500">Buscando atendimentos de hoje...</td>
                                    </tr>
                                ) : atendimentos.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="py-8 text-center text-gray-500">Nenhum atendimento agendado para o dia de hoje.</td>
                                    </tr>
                                ) : (
                                    atendimentos.map((atend, index) => (
                                        <tr 
                                            key={atend.id} 
                                            className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-[#F9F9F9]'}`}
                                        >
                                            <td className="py-4 px-4 text-gray-600 font-semibold">{atend.horario}</td>
                                            <td className="py-4 px-4">{atend.cliente}</td>
                                            <td className="py-4 px-4">{atend.pet}</td>
                                            <td className="py-4 px-4">{atend.profissional}</td>
                                            <td className="py-4 px-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                    atend.status === 'CONFIRMADO' || atend.status === 'Confirmado'
                                                        ? 'bg-[#5FA79B] text-black' 
                                                        : 'bg-[#F3D77A] text-[#7A5A3F]'
                                                }`}>
                                                    {atend.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 text-gray-700">{atend.telefone}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* BOTÃO HISTÓRICO */}
                <button 
                    onClick={() => navigate("/AdminServicos")} 
                    className="bg-[#5FA79B] text-black font-semibold px-6 py-3 rounded-md hover:brightness-95 transition-all shadow-sm"
                >
                    Histórico de atendimentos
                </button>
            </main>
        </div>
    );
}

export default AdminAgendamentos;