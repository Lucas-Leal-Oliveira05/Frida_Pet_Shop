import { useState, useEffect } from "react";
import { getProfissionais, cadastrarProfissional, atualizarProfissional, deletarProfissional, getContagensProfissionaisPainel } from "../services/profissionalService";
import AdminSidebar from "../components/AdminSidebar";

function AdminProfissionais() {
    
    // Estados da listagem e métricas
    const [profissionais, setProfissionais] = useState([]);
    const [metricas, setMetricas] = useState({ 
        clientes: 0, 
        pets: 0, 
        agendamentos: 0, 
        profissionaisCount: 0 });
    const [, setLoading] = useState(true);

    // Estados do Formulário/Modal (Adicionar e Editar)
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null); // Se tiver ID, estamos editando. Se for null, estamos adicionando.
    const [formData, setFormData] = useState({ nome: '', email: '', senha: '', telefone: '', especialidade: '' });


    useEffect(() => {
        carregarProfissionais();
    }, []);

    // Abre o formulário limpo para cadastro
    const handleNovoProfissional = () => {
        setEditId(null);
        setFormData({ nome: '', email: '', senha: '', telefone: '', especialidade: '' });
        setShowForm(true);
    };

    // Abre o formulário preenchido para edição
    const handleEditarClick = (prof) => {
        setEditId(prof.id);
        setFormData({
            nome: prof.nome,
            email: prof.email,
            senha: '••••••', // Senha fictícia na edição por segurança
            telefone: prof.telefone || '',
            especialidade: prof.dados_specificos || ''
        });
        setShowForm(true);
    };

    // Salva ou Atualiza os dados no banco
   const handleSalvar = async (e) => {
    e.preventDefault();
    try {
        if (editId) {
            const profissionalSelecionado = profissionais.find(p => p.id === editId);
            
            if (!profissionalSelecionado) {
                throw new Error("Profissional não encontrado na listagem local.");
            }
            await atualizarProfissional(editId, profissionalSelecionado.usuario_id, formData);
            alert("Profissional atualizado com sucesso!");
        } else {
            await cadastrarProfissional(formData);
            alert("Profissional cadastrado com sucesso!");
        }
        setShowForm(false);
        carregarProfissionais(); // Recarrega a tabela limpa
    } catch (error) {
        alert("Erro ao salvar: " + error.message);
    }
};
    const handleExcluir = async (id) => {
        if (window.confirm("Deseja realmente remover este profissional do sistema?")) {
            try {
                await deletarProfissional(id);
                carregarProfissionais();
            } catch (error) {
                alert("Erro ao excluir: " + error.message);
            }
        }
    };

    async function carregarProfissionais() {
    try {
        setLoading(true);
        
        // Busca a lista de profissionais e as contagens em paralelo
        const dadosProfissionais = await getProfissionais();
        const dadosMetricas = await getContagensProfissionaisPainel();
        setProfissionais(dadosProfissionais);
        
        setMetricas({
            clientes: dadosMetricas.clientes,
            pets: dadosMetricas.pets,
            agendamentos: dadosMetricas.agendamentos,
            profissionaisCount: dadosProfissionais.length 
        });
        
    } catch (error) {
        console.error("Erro ao carregar os dados do painel:", error.message);
    } finally {
        setLoading(false);
    }
}

    return (
        <div className="min-h-screen bg-[#F6EBDD] flex relative">
            <AdminSidebar />

            {/* CONTEÚDO PRINCIPAL */}
            <main className="flex-1 p-8 md:p-12 overflow-y-auto">
                
                {/* CARDS SUPERIORES */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <div className="bg-[#F3D77A] rounded-[20px] p-4 text-center text-[#7A5A3F]">
                        <p className="font-semibold text-sm">Clientes</p>
                        <p className="text-2xl font-bold mt-1">{metricas.clientes}</p>
                    </div>
                    <div className="bg-[#F3D77A] rounded-[20px] p-4 text-center text-[#7A5A3F]">
                        <p className="font-semibold text-sm">Pets</p>
                        <p className="text-2xl font-bold mt-1">{metricas.pets}</p>
                    </div>
                    <div className="bg-[#F3D77A] rounded-[20px] p-4 text-center text-[#7A5A3F]">
                        <p className="font-semibold text-sm">Agendamentos</p>
                        <p className="text-2xl font-bold mt-1">{metricas.agendamentos}</p>
                    </div>
                    <div className="bg-[#F3D77A] rounded-[20px] p-4 text-center text-[#7A5A3F]">
                        <p className="font-semibold text-sm">Profissionais</p>
                        <p className="text-2xl font-bold mt-1">{metricas.profissionaisCount}</p>
                    </div>
                </section>

                {/* LISTAGEM DE PROFISSIONAIS */}
                {!showForm ? (
                    <section className="text-[#7A5A3F]">
                        <h2 className="text-3xl font-bold mb-4 text-black font-sans">Gerenciar Profissionais</h2>
                        <button onClick={handleNovoProfissional} className="bg-[#5FA79B] text-black font-semibold px-4 py-2 rounded-md mb-8 hover:brightness-95">
                            + Adicionar Profissionais
                        </button>
                        
                        <div className="bg-[#F1E3C6] rounded-md p-4 shadow-sm overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-500px">
                                <thead>
                                    <tr className="border-b-2 border-[#7A5A3F] font-bold text-base text-[#7A5A3F]">
                                        <th className="pb-3 w-1/4">Nome</th>
                                        <th className="pb-3 w-1/4">Email</th>
                                        <th className="pb-3 w-1/4">Especialidade</th>
                                        <th className="pb-3 w-1/4">Ações</th>
                                    </tr>
                                </thead>
                                <tbody className="text-black font-medium">
                                    {profissionais.map((prof) => (
                                        <tr key={prof.id} className="border-b border-[#ebd7b1]">
                                            <td className="py-3">{prof.nome}</td>
                                            <td className="py-3">{prof.email}</td>
                                            <td className="py-3">{prof.especialidade || 'Geral'}</td>
                                            <td className="py-3 flex gap-2">
                                                <button onClick={() => handleEditarClick(prof)} className="bg-[#5FA79B] text-black text-xs font-bold px-3 py-1 rounded">Editar</button>
                                                <button onClick={() => handleExcluir(prof.id)} className="bg-[#E67C73] text-black text-xs font-bold px-3 py-1 rounded">Excluir</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                ) : (
                    /* FORMULÁRIO DINÂMICO (CRIAÇÃO / EDIÇÃO) */
                    <section className="max-w-xl">
                        <h2 className="text-3xl font-bold mb-6 text-[#7A5A3F] font-serif">
                            {editId ? "Editar Profissionais" : "Adicionar Profissional"}
                        </h2>
                        
                        <form onSubmit={handleSalvar} className="bg-[#F3D77A] rounded-[30px] p-8 flex flex-col gap-5 shadow-md">
                            <div className="flex flex-col gap-1">
                                <label className="font-bold text-black text-base">Nome</label>
                                <input type="text" placeholder="Nome do profissional" className="w-full h-10 px-3 rounded bg-[#EFE3C3] border-none outline-none font-medium" value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} required />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="font-bold text-black text-base">Email</label>
                                <input type="email" placeholder="Email" className="w-full h-10 px-3 rounded bg-[#EFE3C3] border-none outline-none font-medium" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="font-bold text-black text-base">Senha</label>
                                <input type="password" placeholder="Senha de acesso" className="w-full h-10 px-3 rounded bg-[#EFE3C3] border-none outline-none font-medium" value={formData.senha} onChange={e => setFormData({...formData, senha: e.target.value})} disabled={!!editId} required />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="font-bold text-black text-base">Telefone</label>
                                <input type="text" placeholder="Telefone" className="w-full h-10 px-3 rounded bg-[#EFE3C3] border-none outline-none font-medium" value={formData.telefone} onChange={e => setFormData({...formData, telefone: e.target.value})} />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="font-bold text-black text-base">Especialidade</label>
                                <select className="w-full h-10 px-3 rounded bg-[#EFE3C3] border-none outline-none font-medium text-gray-700" value={formData.especialidade} onChange={e => setFormData({...formData, especialidade: e.target.value})} required>
                                    <option value="">Selecione</option>
                                    <option value="Banho">Banho</option>
                                    <option value="Tosa">Tosa</option>
                                    <option value="Banho e Tosa">Banho e Tosa</option>
                                    <option value="Veterinário">Veterinário</option>
                                </select>
                            </div>

                            <div className="flex gap-4 mt-4">
                                <button type="submit" className="flex-1 bg-[#5FA79B] text-black font-bold h-11 rounded-md shadow-sm hover:brightness-95">Salvar</button>
                                <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-[#E67C73] text-black font-bold h-11 rounded-md shadow-sm hover:brightness-95">Cancelar</button>
                            </div>
                        </form>
                    </section>
                )}
            </main>
        </div>
    );
}

export default AdminProfissionais;