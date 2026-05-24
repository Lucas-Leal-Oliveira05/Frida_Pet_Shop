import { useState, useEffect } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { getClientesAdmin, atualizarClienteAdmin, deletarClienteAdmin } from "../services/clienteService";

function AdminClientes() {
    const [clientes, setClientes] = useState([]);
    const [clientesFiltrados, setClientesFiltrados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [busca, setBusca] = useState("");
    const [paginaAtual, setPaginaAtual] = useState(1);
    const clientesPorPagina = 13; //aqui eu consigo decidir quantos clientes eu quero ver por pagina.
    const [clienteEditando, setClienteEditando] = useState(null);
    const [formData, setFormData] = useState({ nome: "", email: "", telefone: "" });
    const [clienteExcluir, setClienteExcluir] = useState(null);

    async function carregarClientes() {
        try {
            setLoading(true);
            const dados = await getClientesAdmin();
            setClientes(dados);
            setClientesFiltrados(dados);
            setPaginaAtual(1);
        } catch (error) {
            console.error("Erro ao buscar clientes:", error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        carregarClientes();
    }, []);

    const handleBuscar = (e) => {
        e.preventDefault();
        if (!busca.trim()) {
            setClientesFiltrados(clientes);
            setPaginaAtual(1);
            return;
        }
        const termo = busca.toLowerCase();
        const filtrados = clientes.filter(c => 
            c.nome.toLowerCase().includes(termo) || 
            c.email.toLowerCase().includes(termo) || 
            c.telefone.includes(termo)
        );
        setClientesFiltrados(filtrados);
        setPaginaAtual(1); // Reseta para a primeira página após buscar
    };

    const indiceUltimoCliente = paginaAtual * clientesPorPagina;
    const indicePrimeiroCliente = indiceUltimoCliente - clientesPorPagina;
    const clientesDaPaginaAtual = clientesFiltrados.slice(indicePrimeiroCliente, indiceUltimoCliente);
    // Calcula o total de páginas necessário
    const totalPaginas = Math.ceil(clientesFiltrados.length / clientesPorPagina);

    // Cria um array de números dinâmicos [1, 2, 3...] com base no total de páginas
    const numerosPaginas = [];
    for (let i = 1; i <= totalPaginas; i++) {
        numerosPaginas.push(i);
    }

    const iniciarEdicao = (cliente) => {
        setClienteEditando(cliente.id);
        setFormData({ nome: cliente.nome, email: cliente.email, telefone: cliente.telefone });
    };

    const handleSalvarEdicao = async (e) => {
        e.preventDefault();
        try {
            await atualizarClienteAdmin(clienteEditando, formData);
            alert("Dados do cliente atualizados com sucesso!");
            setClienteEditando(null);
            carregarClientes();
        } catch (error) {
            alert("Erro ao editar cliente: " + error.message);
        }
    };

    const handleConfirmarExclusao = async () => {
        try {
            await deletarClienteAdmin(clienteExcluir.id);
            alert(`Cliente ${clienteExcluir.nome} removido com sucesso.`);
            setClienteExcluir(null);
            carregarClientes();
        } catch (error) {
            alert("Erro ao remover: " + error.message);
        }
    };

    return (
        <div className="min-h-screen bg-[#F6EBDD] flex relative text-black">
            <AdminSidebar />

            <main className="flex-1 p-8 md:p-12 overflow-y-auto">
                <h1 className="text-3xl font-bold mb-6 text-black">Clientes Cadastrados</h1>

                {!clienteEditando && (
                    <form onSubmit={handleBuscar} className="flex gap-4 mb-8">
                        <input 
                            type="text" 
                            placeholder="Buscar cliente por nome, email ou telefone" 
                            className="w-full max-w-md h-10 px-4 bg-white border border-gray-300 rounded outline-none text-sm font-medium"
                            value={busca}
                            onChange={e => setBusca(e.target.value)}
                        />
                        <button type="submit" className="bg-[#EDD185] hover:brightness-95 px-6 rounded font-semibold text-sm h-10 shadow-sm">
                            Buscar
                        </button>
                    </form>
                )}

                {clienteEditando ? (
                    <div className="max-w-md bg-[#F4D97D] rounded-[30px] p-8 shadow-sm">
                        <h2 className="text-2xl font-bold text-[#7A5A3F] mb-6">Editar Cliente</h2>
                        <form onSubmit={handleSalvarEdicao} className="flex flex-col gap-5">
                            <div>
                                <label className="block font-bold text-black mb-1.5 text-sm">Nome</label>
                                <input 
                                    type="text"
                                    className="w-full h-10 px-3 bg-white/90 rounded border border-yellow-600/20 outline-none font-semibold"
                                    value={formData.nome}
                                    onChange={e => setFormData({...formData, nome: e.target.value})}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-bold text-black mb-1.5 text-sm">Email</label>
                                <input 
                                    type="email"
                                    className="w-full h-10 px-3 bg-white/90 rounded border border-yellow-600/20 outline-none font-semibold"
                                    value={formData.email}
                                    onChange={e => setFormData({...formData, email: e.target.value})}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-bold text-black mb-1.5 text-sm">Telefone</label>
                                <input 
                                    type="text"
                                    className="w-full h-10 px-3 bg-white/90 rounded border border-yellow-600/20 outline-none font-semibold"
                                    value={formData.telefone}
                                    onChange={e => setFormData({...formData, telefone: e.target.value})}
                                />
                            </div>
                            <div className="flex gap-4 mt-2">
                                <button type="submit" className="flex-1 bg-[#5FA79B] text-black font-bold py-2.5 rounded-xl hover:brightness-95 shadow-sm">
                                    Salvar
                                </button>
                                <button type="button" onClick={() => setClienteEditando(null)} className="flex-1 bg-[#E67C73] text-black font-bold py-2.5 rounded-xl hover:brightness-95 shadow-sm">
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <section className="bg-[#F6D57F] rounded-md overflow-hidden shadow-sm border border-yellow-500/20 mb-8">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-800px">
                                <thead>
                                    <tr className="bg-[#E5E5E5] border-b border-gray-300 text-black font-bold text-sm">
                                        <th className="py-3 px-4">Cliente</th>
                                        <th className="py-3 px-4">Telefone</th>
                                        <th className="py-3 px-4">Email</th>
                                        <th className="py-3 px-4">Pets</th>
                                        <th className="py-3 px-4 text-center">Ações</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm font-semibold">
                                    {loading ? (
                                        <tr><td colSpan="5" className="py-8 text-center text-gray-700 bg-white/50">Carregando dados dos clientes...</td></tr>
                                    ) : clientesDaPaginaAtual.length === 0 ? (
                                        <tr><td colSpan="5" className="py-8 text-center text-gray-600 bg-white/50">Nenhum cliente cadastrado ou encontrado.</td></tr>
                                    ) : (
                                        clientesDaPaginaAtual.map((item) => (
                                            <tr key={item.id} className="border-b border-black/10 hover:bg-white/10 transition-colors">
                                                <td className="py-3 px-4">{item.nome}</td>
                                                <td className="py-3 px-4 text-gray-800">{item.telefone}</td>
                                                <td className="py-3 px-4 text-gray-800">{item.email}</td>
                                                <td className="py-3 px-4 max-w-xs truncate text-gray-700 font-medium">{item.petsTexto}</td>
                                                <td className="py-3 px-4">
                                                    <div className="flex gap-2 justify-center">
                                                        <button className="bg-[#5FA79B] text-black text-xs px-2.5 py-1 rounded shadow-sm hover:brightness-95">Ver</button>
                                                        <button onClick={() => iniciarEdicao(item)} className="bg-[#A78BFA] text-white text-xs px-2.5 py-1 rounded shadow-sm hover:brightness-95">Editar</button>
                                                        <button onClick={() => setClienteExcluir(item)} className="bg-[#E67C73] text-black text-xs px-2.5 py-1 rounded shadow-sm hover:brightness-95">Excluir</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>
                )}
                {!clienteEditando && totalPaginas > 1 && (
                    <div className="flex gap-3 mt-4 select-none">
                        {numerosPaginas.map((numero) => (
                            <button
                                key={numero}
                                onClick={() => setPaginaAtual(numero)}
                                className={`w-8 h-8 flex items-center justify-center font-bold rounded cursor-pointer shadow-sm transition-all text-black ${
                                    paginaAtual === numero 
                                        ? 'bg-[#5FA79B]' 
                                        : 'bg-[#E67C73] hover:brightness-95' 
                                }`}
                            >
                                {numero}
                            </button>
                        ))}
                    </div>
                )}
                {clienteExcluir && (
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-[#E5E5E5] rounded-xl p-8 max-w-lg w-full text-center shadow-lg border border-gray-300">
                            <div className="flex justify-center mb-4">
                                <svg className="w-16 h-16 text-[#F3D77A]" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-black mb-2">
                                Tem certeza que deseja excluir o {clienteExcluir.nome}?
                            </h3>
                            <p className="text-sm text-gray-700 mb-6 font-medium">
                                Essa ação não poderá ser desfeita
                            </p>
                            <div className="flex gap-6 justify-center max-w-xs mx-auto">
                                <button onClick={() => setClienteExcluir(null)} className="flex-1 bg-[#5FA79B] text-black font-bold py-2.5 rounded-xl hover:brightness-95 transition-all shadow-sm">
                                    Cancelar
                                </button>
                                <button onClick={handleConfirmarExclusao} className="flex-1 bg-[#E67C73] text-white font-bold py-2.5 rounded-xl hover:brightness-95 transition-all shadow-sm">
                                    Confirmar Exclusão
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default AdminClientes;