import { useState, useEffect } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { getPetsAdmin, getHistoricoPet, atualizarPetAdmin, deletarPetAdmin } from "../services/petService";

function AdminPets() {
    const [pets, setPets] = useState([]);
    const [petsFiltrados, setPetsFiltrados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [busca, setBusca] = useState("");
    const [paginaAtual, setPaginaAtual] = useState(1);
    const petsPorPagina = 13; 
    const [petDetalhado, setPetDetalhado] = useState(null);
    const [historicoPet, setHistoricoPet] = useState([]);
    const [petEditando, setPetEditando] = useState(null);
    const [formData, setFormData] = useState({ nome: "", especie: "", raca: "", nascimento: "", peso: "", observacoes: "", foto_url: "" });

    async function carregarPets() {
        try {
            setLoading(true);
            const dados = await getPetsAdmin();
            setPets(dados);
            setPetsFiltrados(dados);
            setPaginaAtual(1);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { carregarPets(); }, []);

    const handleBuscar = (e) => {
        e.preventDefault();
        const termo = busca.toLowerCase();
        const filtrados = pets.filter(p => 
            p.nome.toLowerCase().includes(termo) || p.tutor.toLowerCase().includes(termo)
        );
        setPetsFiltrados(filtrados);
        setPaginaAtual(1);
    };

    const abrirDetalhes = async (pet) => {
        setPetDetalhado(pet);
        try {
            const hist = await getHistoricoPet(pet.id);
            setHistoricoPet(hist);
        } catch (error) {
            console.error("Erro ao buscar histórico do pet:", error.message);
        }
    };

    // Inicia o card de Edição
    const iniciarEdicao = (pet) => {
        setPetDetalhado(null); 
        setPetEditando(pet.id);
        setFormData({
            nome: pet.nome,
            especie: pet.especie || "",
            raca: pet.raca || "",
            nascimento: pet.nascimento || "",
            peso: pet.peso || "",
            observacoes: pet.observacoes || "",
            foto_url: pet.foto_url || ""
        });
    };

    const handleSalvarEdicao = async (e) => {
        e.preventDefault();
        try {
            await atualizarPetAdmin(petEditando, formData);
            alert("Pet atualizado com sucesso!");
            setPetEditando(null);
            carregarPets();
        } catch (error) {
            alert("Erro ao editar pet: " + error.message);
        }
    };

    const handleExcluirPet = async (id) => {
        if (window.confirm("Tem certeza que deseja remover este pet definitivamente?")) {
            try {
                await deletarPetAdmin(id);
                alert("Pet removido com sucesso.");
                setPetDetalhado(null);
                carregarPets();
            } catch (error) {
                alert("Erro ao remover: " + error.message);
            }
        }
    };

    // Paginação
    const indiceUltimo = paginaAtual * petsPorPagina;
    const indicePrimeiro = indiceUltimo - petsPorPagina;
    const petsDaPagina = petsFiltrados.slice(indicePrimeiro, indiceUltimo);
    const totalPaginas = Math.ceil(petsFiltrados.length / petsPorPagina);
    const numerosPaginas = Array.from({ length: totalPaginas }, (_, i) => i + 1);

    return (
        <div className="min-h-screen bg-[#F6EBDD] flex relative text-black">
            <AdminSidebar />

            <main className="flex-1 p-8 md:p-12 overflow-y-auto">
                <h1 className="text-3xl font-bold mb-6 text-black">Pets Cadastrados</h1>

                {!petEditando && (
                    <form onSubmit={handleBuscar} className="flex gap-4 mb-8">
                        <input 
                            type="text" 
                            placeholder="Buscar pet ou tutor..." 
                            className="w-full max-w-sm h-10 px-4 bg-white border border-gray-300 rounded outline-none text-sm font-medium"
                            value={busca}
                            onChange={e => setBusca(e.target.value)}
                        />
                        <button type="submit" className="bg-[#5FA79B] hover:brightness-95 text-black font-semibold px-6 rounded text-sm h-10 shadow-sm">
                            Buscar
                        </button>
                    </form>
                )}

                {petEditando ? (
                    <div className="max-w-2xl bg-[#F4D97D] rounded-[20px] p-8 shadow-sm">
                        <h2 className="text-2xl font-bold text-[#7A5A3F] mb-6">Editar Pet</h2>
                        <form onSubmit={handleSalvarEdicao} className="flex flex-col gap-4 font-semibold">
                            <div>
                                <label className="block text-gray-700 text-sm mb-1">Foto do Pet</label>
                                {formData.foto_url && <img src={formData.foto_url} alt="Pet" className="w-24 h-24 rounded-md object-cover mb-2 border-2 border-white shadow-sm"/>}
                                <input 
                                    type="text" 
                                    placeholder="URL da foto do pet"
                                    className="w-full h-10 px-3 bg-white/90 rounded border outline-none font-normal"
                                    value={formData.foto_url}
                                    onChange={e => setFormData({...formData, foto_url: e.target.value})}
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 text-sm mb-1">Nome do Pet</label>
                                    <input type="text" className="w-full h-10 px-3 bg-white/90 rounded border outline-none font-normal" value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} required/>
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm mb-1">Espécie</label>
                                    <input type="text" className="w-full h-10 px-3 bg-white/90 rounded border outline-none font-normal" value={formData.especie} onChange={e => setFormData({...formData, especie: e.target.value})}/>
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm mb-1">Raça</label>
                                    <input type="text" className="w-full h-10 px-3 bg-white/90 rounded border outline-none font-normal" value={formData.raca} onChange={e => setFormData({...formData, raca: e.target.value})}/>
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm mb-1">Data de Nascimento</label>
                                    <input type="date" className="w-full h-10 px-3 bg-white/90 rounded border outline-none font-normal" value={formData.nascimento} onChange={e => setFormData({...formData, nascimento: e.target.value})}/>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-gray-700 text-sm mb-1">Peso (kg)</label>
                                    <input type="number" step="0.1" className="w-full h-10 px-3 bg-white/90 rounded border outline-none font-normal" value={formData.peso} onChange={e => setFormData({...formData, peso: e.target.value})}/>
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm mb-1">Observações</label>
                                <textarea rows="3" className="w-full p-3 bg-white/90 rounded border outline-none font-normal" value={formData.observacoes} onChange={e => setFormData({...formData, observacoes: e.target.value})}/>
                            </div>
                            <div className="flex gap-4 mt-4">
                                <button type="button" onClick={() => setPetEditando(null)} className="flex-1 bg-[#E67C73] text-black font-bold py-2.5 rounded-md hover:brightness-95">Voltar</button>
                                <button type="submit" className="flex-1 bg-[#5FA79B] text-black font-bold py-2.5 rounded-md hover:brightness-95">Salvar Alterações</button>
                            </div>
                        </form>
                    </div>
                ) : (
                    /* TABELA PRINCIPAL DE LISTAGEM */
                    <section className="bg-[#F6D57F] rounded-md overflow-hidden shadow-sm border border-yellow-500/20 mb-8">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-700px">
                                <thead>
                                    <tr className="bg-[#E5E5E5] border-b border-gray-300 text-black font-bold text-sm">
                                        <th className="py-3 px-4">Pet</th>
                                        <th className="py-3 px-4">Tutor</th>
                                        <th className="py-3 px-4">Raça</th>
                                        <th className="py-3 px-4">Idade</th>
                                        <th className="py-3 px-4 text-center">Ações</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm font-semibold">
                                    {loading ? (
                                        <tr><td colSpan="5" className="py-8 text-center bg-white/50">Carregando pets...</td></tr>
                                    ) : petsDaPagina.length === 0 ? (
                                        <tr><td colSpan="5" className="py-8 text-center bg-white/50">Nenhum pet encontrado.</td></tr>
                                    ) : (
                                        petsDaPagina.map((item) => (
                                            <tr key={item.id} className="border-b border-black/10 hover:bg-white/10 transition-colors">
                                                <td className="py-3 px-4">{item.nome}</td>
                                                <td className="py-3 px-4 text-gray-800">{item.tutor}</td>
                                                <td className="py-3 px-4 text-gray-800">{item.raca || 'Vira-lata'}</td>
                                                <td className="py-3 px-4 text-gray-800">{item.idade}</td>
                                                <td className="py-3 px-4 text-center">
                                                    <button onClick={() => abrirDetalhes(item)} className="bg-[#5FA79B] text-black text-xs px-4 py-1 rounded shadow-sm hover:brightness-95 font-bold">Ver</button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>
                )}

                {/* PAGINAÇÃO DINÂMICA */}
                {!petEditando && totalPaginas > 1 && (
                    <div className="flex gap-3 mt-4">
                        {numerosPaginas.map(num => (
                            <button key={num} onClick={() => setPaginaAtual(num)} className={`w-8 h-8 flex items-center justify-center font-bold rounded cursor-pointer ${paginaAtual === num ? 'bg-[#5FA79B]' : 'bg-[#E67C73]'}`}>
                                {num}
                            </button>
                        ))}
                    </div>
                )}
                {petDetalhado && (
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-[30px] p-8 max-w-md w-full shadow-lg border relative text-left">
                            <h2 className="text-2xl font-bold text-black mb-1">{petDetalhado.nome}</h2>
                            <p className="text-sm font-medium text-gray-600 mb-4"><b>Espécie:</b> {petDetalhado.especie || 'Não informada'}</p>
                            
                            <div className="text-sm font-medium text-gray-800 space-y-1 mb-4 border-b pb-3">
                                <p><b>Raça:</b> {petDetalhado.raca || 'Não informada'}</p>
                                <p><b>Idade:</b> {petDetalhado.idade}</p>
                                <p><b>Peso:</b> {petDetalhado.peso ? `${petDetalhado.peso}kg` : 'Não informado'}</p>
                            </div>

                            <h4 className="font-bold text-base text-black mb-1">Tutor</h4>
                            <div className="text-sm font-medium text-gray-700 mb-4 border-b pb-3">
                                <p>{petDetalhado.tutor}</p>
                                <p>Telefone: {petDetalhado.telefoneTutor}</p>
                            </div>

                            <h4 className="font-bold text-base text-black mb-1">Histórico</h4>
                            <div className="text-sm font-medium text-gray-600 space-y-1 mb-6 max-h-24 overflow-y-auto">
                                {historicoPet.length === 0 ? (
                                    <p className="text-gray-400 italic">Nenhum serviço concluído ainda.</p>
                                ) : (
                                    historicoPet.map((h, i) => <p key={i}>{h.data} - {h.servico}</p>)
                                )}
                            </div>
                            <div className="flex gap-3">
                                <button onClick={() => iniciarEdicao(petDetalhado)} className="flex-1 bg-[#EDD185] font-bold py-2 rounded-lg hover:brightness-95 text-xs text-center shadow-sm">Editar</button>
                                <button onClick={() => handleExcluirPet(petDetalhado.id)} className="flex-1 bg-[#E67C73] font-bold py-2 rounded-lg hover:brightness-95 text-xs text-center shadow-sm">Excluir</button>
                                <button onClick={() => alert("Abrindo modal de agendamento...")} className="flex-[1.5] bg-[#5FA79B] text-black font-bold py-2 rounded-lg hover:brightness-95 text-xs text-center shadow-sm">Novo agendamento</button>
                            </div>
                            
                            <button onClick={() => setPetDetalhado(null)} className="absolute top-4 right-5 text-gray-400 hover:text-black font-bold text-lg">✕</button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default AdminPets;