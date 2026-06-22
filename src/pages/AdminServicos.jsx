import { useState, useEffect } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { supabase } from "../services/supabase"; // Confirme se o caminho do seu supabase.js é esse

function AdminServicos() {
  const [servicos, setServicos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estados para o Modal de Cadastro/Edição
  const [modalAberto, setModalAberto] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [formData, setFormData] = useState({ nome: "", preco: "", duracao_minutos: "" });

  // 1. BUSCAR SERVIÇOS DO BANCO
  const carregarServicos = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("servicos")
      .select("*")
      .order("nome", { ascending: true });

    if (error) {
      console.error("Erro ao buscar serviços:", error.message);
    } else {
      setServicos(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    carregarServicos();
  }, []);

  // 2. SALVAR (CRIAR OU ATUALIZAR)
  const handleSalvar = async (e) => {
    e.preventDefault();
    
    const payload = {
      nome: formData.nome,
      preco: parseFloat(formData.preco.replace(',', '.')), // Garante que o banco aceite o número
      duracao_minutos: parseInt(formData.duracao_minutos, 10)
    };

    if (editandoId) {
      // Atualizar existente
      await supabase.from("servicos").update(payload).eq("id", editandoId);
      alert("Serviço atualizado com sucesso!");
    } else {
      // Criar novo
      await supabase.from("servicos").insert([payload]);
      alert("Novo serviço adicionado!");
    }

    fecharModal();
    carregarServicos();
  };

  // 3. EXCLUIR
  const handleExcluir = async (id, nome) => {
    const confirmar = window.confirm(`Tem certeza que deseja excluir o serviço "${nome}"?`);
    if (confirmar) {
      await supabase.from("servicos").delete().eq("id", id);
      carregarServicos();
    }
  };

  // FUNÇÕES DO MODAL
  const abrirModalNovo = () => {
    setFormData({ nome: "", preco: "", duracao_minutos: "" });
    setEditandoId(null);
    setModalAberto(true);
  };

  const abrirModalEditar = (servico) => {
    setFormData({ 
      nome: servico.nome, 
      preco: servico.preco.toString(), 
      duracao_minutos: servico.duracao_minutos.toString() 
    });
    setEditandoId(servico.id);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setEditandoId(null);
  };

  return (
    <div className="flex min-h-screen bg-[#F6EBDD] font-sans text-black">
      {/* SIDEBAR IGUAL AO SEU PRINT */}
      <AdminSidebar />

      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        
        {/* OS 4 CARDS AMARELOS DO TOPO */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          {["Clientes", "Pets", "Agendamentos", "Profissionais"].map((titulo) => (
            <div key={titulo} className="bg-[#F3D77A] rounded-xl p-4 flex flex-col items-center justify-center shadow-sm h-24">
              <span className="text-sm font-medium text-gray-800">{titulo}</span>
              <span className="text-2xl font-bold text-black">0</span>
            </div>
          ))}
        </div>

        {/* CABEÇALHO */}
        <h1 className="text-3xl font-bold mb-6">Gerenciar Serviços</h1>

        {/* BOTÃO ADICIONAR */}
        <button
          onClick={abrirModalNovo}
          className="bg-[#5FA79B] text-black font-semibold py-2 px-5 rounded hover:brightness-95 transition-all mb-8 shadow-sm"
        >
          + Adicionar Serviço
        </button>

        {/* TABELA DE SERVIÇOS */}
        <div className="bg-[#F1E4C3] rounded-lg p-6 shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-600px">
            <thead>
              <tr className="border-b-2 border-[#D1BFAe]">
                <th className="pb-3 text-[#5a4a3a] font-bold">Nome</th>
                <th className="pb-3 text-[#5a4a3a] font-bold">Preço</th>
                <th className="pb-3 text-[#5a4a3a] font-bold">Duração (Min)</th>
                <th className="pb-3 text-[#5a4a3a] font-bold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="4" className="py-4 text-center">Carregando serviços...</td></tr>
              ) : servicos.length === 0 ? (
                <tr><td colSpan="4" className="py-4 text-center text-gray-500">Nenhum serviço cadastrado ainda.</td></tr>
              ) : (
                servicos.map((servico) => (
                  <tr key={servico.id} className="border-b border-[#e5d5b5] hover:bg-[#ebdca6] transition-colors">
                    <td className="py-3 font-medium">{servico.nome}</td>
                    <td className="py-3 text-[#5FA79B] font-bold">R$ {servico.preco.toFixed(2)}</td>
                    <td className="py-3">{servico.duracao_minutos} min</td>
                    <td className="py-3 flex gap-3">
                      <button onClick={() => abrirModalEditar(servico)} className="text-blue-600 hover:underline font-medium text-sm">Editar</button>
                      <button onClick={() => handleExcluir(servico.id, servico.nome)} className="text-red-600 hover:underline font-medium text-sm">Excluir</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* MODAL DE CADASTRO / EDIÇÃO */}
      {modalAberto && (
       <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#F3E8C0] p-8 rounded-2xl w-full max-w-md shadow-lg">
            <h2 className="text-2xl font-bold text-[#7A5A3F] mb-6">
              {editandoId ? "Editar Serviço" : "Novo Serviço"}
            </h2>
            
            <form onSubmit={handleSalvar} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-[#7A5A3F]">Nome do Serviço</label>
                <input required type="text" placeholder="Ex: Banho Completo" className="p-2 rounded border-none outline-none focus:ring-2 focus:ring-[#5FA79B]" value={formData.nome} onChange={(e) => setFormData({...formData, nome: e.target.value})} />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-[#7A5A3F]">Preço (R$)</label>
                <input required type="number" step="0.01" placeholder="Ex: 50.00" className="p-2 rounded border-none outline-none focus:ring-2 focus:ring-[#5FA79B]" value={formData.preco} onChange={(e) => setFormData({...formData, preco: e.target.value})} />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-[#7A5A3F]">Duração (Minutos)</label>
                <input required type="number" placeholder="Ex: 60" className="p-2 rounded border-none outline-none focus:ring-2 focus:ring-[#5FA79B]" value={formData.duracao_minutos} onChange={(e) => setFormData({...formData, duracao_minutos: e.target.value})} />
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button type="button" onClick={fecharModal} className="px-4 py-2 bg-gray-300 text-black font-semibold rounded hover:bg-gray-400 transition-all">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-[#5FA79B] text-black font-semibold rounded hover:brightness-95 transition-all">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminServicos;