import { useState, useEffect } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { getHistoricoCompletoServicos, getDadosRelatoriosPeriodo } from "../services/atendimentoService";

function AdminHistorico() {
    const [historicoTotal, setHistoricoTotal] = useState([]);
    const [historicoFiltrado, setHistoricoFiltrado] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filtroCliente, setFiltroCliente] = useState("");
    const [filtroPet, setFiltroPet] = useState("");
    const [filtroProfissional, setFiltroProfissional] = useState("");
    const [dataInicio, setDataInicio] = useState("");
    const [dataFim, setDataFim] = useState("");

    async function carregarHistorico() {
        try {
            setLoading(true);
            const dados = await getHistoricoCompletoServicos();
            setHistoricoTotal(dados);
            setHistoricoFiltrado(dados);
        } catch (error) {
            console.error("Erro ao carregar histórico:", error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        carregarHistorico();
    }, []);

    useEffect(() => {
        let resultado = historicoTotal;

        if (filtroCliente) {
            resultado = resultado.filter(item => 
                item.cliente.toLowerCase().includes(filtroCliente.toLowerCase())
            );
        }
        if (filtroPet) {
            resultado = resultado.filter(item => 
                item.pet.toLowerCase().includes(filtroPet.toLowerCase())
            );
        }
        if (filtroProfissional) {
            resultado = resultado.filter(item => 
                item.profissional.toLowerCase().includes(filtroProfissional.toLowerCase())
            );
        }

        setHistoricoFiltrado(resultado);
    }, [filtroCliente, filtroPet, filtroProfissional, historicoTotal]);

    // Função para simular ou gerar o download do relatório
    const handleBaixarHistorico = async () => {
        if (!dataInicio || !dataFim) {
            alert("Por favor, selecione as duas datas para gerar o relatório.");
            return;
        }
        try {
            const dados = await getDadosRelatoriosPeriodo(dataInicio, dataFim);
            alert(`Relatório gerado com sucesso! Encontrados ${dados.length} atendimentos no período.`);
        } catch (error) {
            alert("Erro ao gerar relatório: " + error.message);
        }
    }

return (
        <div className="min-h-screen bg-[#F6EBDD] flex relative text-black">
            <AdminSidebar />

            <main className="flex-1 p-8 md:p-12 overflow-y-auto">
                <h1 className="text-3xl font-bold mb-8 text-black font-sans">Histórico de Atendimentos</h1>

                {/* INPUTS DE FILTRO (IGUAL AO SEU FIGMA) */}
                <div className="flex flex-wrap gap-4 mb-6">
                    <input 
                        type="text" 
                        placeholder="Cliente" 
                        className="w-48 h-9 px-3 bg-white border border-gray-300 rounded outline-none font-medium text-sm"
                        value={filtroCliente}
                        onChange={e => setFiltroCliente(e.target.value)}
                    />
                    <input 
                        type="text" 
                        placeholder="Pet" 
                        className="w-48 h-9 px-3 bg-white border border-gray-300 rounded outline-none font-medium text-sm"
                        value={filtroPet}
                        onChange={e => setFiltroPet(e.target.value)}
                    />
                    <input 
                        type="text" 
                        placeholder="Profissional" 
                        className="w-48 h-9 px-3 bg-white border border-gray-300 rounded outline-none font-medium text-sm"
                        value={filtroProfissional}
                        onChange={e => setFiltroProfissional(e.target.value)}
                    />
                </div>

                {/* TABELA PRINCIPAL */}
                <section className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden mb-8">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-800px">
                            <thead>
                                <tr className="bg-[#E5E5E5] border-b border-gray-300 font-bold text-sm text-black">
                                    <th className="py-2.5 px-4">Data</th>
                                    <th className="py-2.5 px-4">Horário</th>
                                    <th className="py-2.5 px-4">Cliente</th>
                                    <th className="py-2.5 px-4">Pet</th>
                                    <th className="py-2.5 px-4">Serviço</th>
                                    <th className="py-2.5 px-4">Profissional</th>
                                    <th className="py-2.5 px-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm font-medium">
                                {loading ? (
                                    <tr><td colSpan="7" className="py-6 text-center text-gray-500">Buscando registros...</td></tr>
                                ) : historicoFiltrado.length === 0 ? (
                                    <tr><td colSpan="7" className="py-6 text-center text-gray-400">Nenhum atendimento corresponde aos filtros salvos.</td></tr>
                                ) : (
                                    historicoFiltrado.map((item, idx) => (
                                        <tr key={item.id} className={`border-b border-gray-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-[#F9F9F9]'}`}>
                                            <td className="py-3 px-4 text-gray-600">{item.data}</td>
                                            <td className="py-3 px-4 text-gray-500">{item.horario}</td>
                                            <td className="py-3 px-4">{item.cliente}</td>
                                            <td className="py-3 px-4">{item.pet}</td>
                                            <td className="py-3 px-4">{item.servico}</td>
                                            <td className="py-3 px-4">{item.profissional}</td>
                                            <td className="py-3 px-4">
                                                <span className={`px-2 py-0.5 rounded text-xs font-bold ${item.status === 'CONCLUIDO' || item.status === 'Concluído' ? 'bg-gray-200 text-gray-700' : 'bg-[#5FA79B] text-black'}`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* PAINEL CINZA DE DOWNLOAD DE RELATÓRIO */}
                <section className="bg-[#E5E5E5] rounded-[20px] p-8 max-w-3xl shadow-sm">
                    <h2 className="text-xl font-bold mb-6 text-black">Selecione a data para baixar</h2>
                    
                    <div className="flex flex-wrap items-center gap-6">
                        <div className="flex flex-col gap-3">
                            <input 
                                type="date" 
                                className="w-44 h-9 px-3 bg-white rounded border border-gray-300 outline-none font-medium text-sm"
                                value={dataInicio}
                                onChange={e => setDataInicio(e.target.value)}
                            />
                            <input 
                                type="date" 
                                className="w-44 h-9 px-3 bg-white rounded border border-gray-300 outline-none font-medium text-sm"
                                value={dataFim}
                                onChange={e => setDataFim(e.target.value)}
                            />
                        </div>

                        <button 
                            onClick={handleBaixarHistorico}
                            className="bg-[#5FA79B] text-black font-bold px-8 h-11 rounded-md hover:brightness-95 transition-all shadow-sm self-end"
                        >
                            Baixar Histórico
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default AdminHistorico;