import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import Header from "../components/Header";
import { supabase } from "../services/supabase";

function DashboardProfissional() {
  const navigate = useNavigate(); // <-- Iniciamos o hook
  const [abaAtiva, setAbaAtiva] = useState("agenda");
  const [loading, setLoading] = useState(true);
  const [profissionalId, setProfissionalId] = useState(null);
  const [folgas, setFolgas] = useState([]);
  const [agendamentos, setAgendamentos] = useState([]);
  const hoje = new Date().toISOString().split("T")[0];
  const [dataSelecionada, setDataSelecionada] = useState(hoje);

  const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  useEffect(() => {
    async function carregarDadosProfissional() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data: profData, error } = await supabase
          .from("profissionais")
          .select("id, dias_folga")
          .eq("id", user.id) 
          .maybeSingle(); 

        if (error) throw error;

        if (!profData) {
          console.warn("O usuário logado não está cadastrado na tabela de profissionais.");
          setLoading(false);
          return;
        }

        setProfissionalId(profData.id);
        setFolgas(profData.dias_folga || []);
      } catch (error) {
        console.error("Erro ao buscar dados do profissional:", error.message);
        setLoading(false);
      }
    }
    carregarDadosProfissional();
  }, []);

  useEffect(() => {
    async function carregarAgenda() {
      if (!profissionalId || !dataSelecionada) return;
      setLoading(true);

      try {
        const { data, error } = await supabase
          .from("agendamentos")
          .select(`
            id,
            data_hora,
            pets ( nome ),
            servicos ( nome )
          `)
          .eq("profissional_id", profissionalId)
          .gte("data_hora", `${dataSelecionada}T00:00:00`)
          .lte("data_hora", `${dataSelecionada}T23:59:59`)
          .order("data_hora", { ascending: true }); 

        if (error) throw error;

        const agendaFormatada = (data || []).map(item => {
          const dataObj = new Date(item.data_hora);
          return {
            ...item,
            horarioExibicao: dataObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
          };
        });

        setAgendamentos(agendaFormatada);
      } catch (error) {
        console.error("Erro ao carregar a agenda:", error.message);
      } finally {
        setLoading(false);
      }
    }
    carregarAgenda();
  }, [profissionalId, dataSelecionada]);

  const toggleFolga = async (dia) => {
    if (!profissionalId) return;

    let novasFolgas;
    if (folgas.includes(dia)) {
      novasFolgas = folgas.filter((d) => d !== dia);
    } else {
      novasFolgas = [...folgas, dia];
    }

    setFolgas(novasFolgas);

    try {
      const { error } = await supabase
        .from("profissionais")
        .update({ dias_folga: novasFolgas })
        .eq("id", profissionalId);

      if (error) throw error;
    } catch (error) {
      alert("Erro ao salvar a folga: " + error.message);
      setFolgas(folgas); 
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      navigate("/LoginProfissional");
    } catch (error) {
      alert("Erro ao sair: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6EBDD] flex flex-col font-sans text-[#5a4a3a]">
      <Header />

      <div className="flex flex-1">
        
        {/* SIDEBAR ESQUERDA */}
        <aside className="w-48 md:w-64 bg-[#F1E3C6] border-r border-[#D1BFAE] flex flex-col shadow-sm z-10">
          <button
            onClick={() => setAbaAtiva("agenda")}
            className={`py-6 text-center font-bold text-lg border-b border-[#D1BFAE] transition-all
              ${abaAtiva === "agenda" 
                ? "bg-[#F6EBDD] text-[#7A5A3F] border-r-4 border-r-[#5FA79B]" 
                : "text-[#7A5A3F] font-medium hover:bg-[#e8dbc0]"}`}
          >
            Agenda
          </button>
          <button
            onClick={() => setAbaAtiva("gerenciamento")}
            className={`py-6 text-center font-bold text-lg border-b border-[#D1BFAE] transition-all
              ${abaAtiva === "gerenciamento" 
                ? "bg-[#F6EBDD] text-[#7A5A3F] border-r-4 border-r-[#5FA79B]" 
                : "text-[#7A5A3F] font-medium hover:bg-[#e8dbc0]"}`}
          >
            Gerenciamento
          </button>
          <button
            onClick={handleLogout}
            className="mt-auto py-6 text-center font-bold text-lg text-[#E67C73] border-t border-[#D1BFAE] hover:bg-[#e8dbc0] transition-colors"
          >
            Sair
          </button>
        </aside>

        {/* ÁREA DE CONTEÚDO DIREITA */}
        <main className="flex-1 p-8 md:p-12">
          
          {/* ABA AGENDA */}
          {abaAtiva === "agenda" && (
            <div className="max-w-3xl">
              <div className="mb-8">
                <label className="block text-[#7A5A3F] font-bold mb-2">Selecione a Data</label>
                <input 
                  type="date" 
                  value={dataSelecionada}
                  onChange={(e) => setDataSelecionada(e.target.value)}
                  className="bg-[#F3D77A] text-[#7A5A3F] font-bold px-4 py-2 rounded-md shadow-sm border-none outline-none focus:ring-2 focus:ring-[#5FA79B]"
                />
              </div>

              <h3 className="text-[#7A5A3F] font-bold text-xl mb-4">Horários agendados</h3>
              
              <div className="bg-[#F1E3C6] rounded-lg shadow-sm overflow-hidden">
                <table className="w-full text-center border-collapse">
                  <thead>
                    <tr className="border-b-2 border-[#D1BFAE]">
                      <th className="py-4 border-r border-[#D1BFAE] font-bold text-[#7A5A3F]">Serviço</th>
                      <th className="py-4 border-r border-[#D1BFAE] font-bold text-[#7A5A3F]">Horário</th>
                      <th className="py-4 font-bold text-[#7A5A3F]">Pet</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="3" className="py-8 text-[#7A5A3F] font-medium animate-pulse">Carregando agenda...</td>
                      </tr>
                    ) : agendamentos.length === 0 ? (
                      <tr>
                        <td colSpan="3" className="py-8 text-[#7A5A3F] font-medium">Nenhum agendamento para este dia. 🎉</td>
                      </tr>
                    ) : (
                      agendamentos.map((agendamento) => (
                        <tr key={agendamento.id} className="border-b border-[#D1BFAE] hover:bg-[#e8dbc0] transition-colors">
                          <td className="py-4 border-r border-[#D1BFAE] font-medium">{agendamento.servicos?.nome || '-'}</td>
                          <td className="py-4 border-r border-[#D1BFAE] font-medium">{agendamento.horarioExibicao || '-'}</td>
                          <td className="py-4 font-medium">{agendamento.pets?.nome || '-'}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ABA GERENCIAMENTO */}
          {abaAtiva === "gerenciamento" && (
            <div className="max-w-3xl">
              <h3 className="text-[#7A5A3F] font-bold text-xl mb-4">Dias de Folga</h3>
              
              <div className="flex flex-wrap rounded-lg overflow-hidden w-fit shadow-sm border border-[#D1BFAE]">
                {diasSemana.map((dia, index) => (
                  <button
                    key={dia}
                    onClick={() => toggleFolga(dia)}
                    className={`px-6 py-3 font-bold transition-all
                      ${index !== diasSemana.length - 1 ? 'border-r border-[#D1BFAE]' : ''}
                      ${folgas.includes(dia) 
                        ? 'bg-[#5FA79B] text-white' 
                        : 'bg-[#F1E3C6] text-[#7A5A3F] hover:bg-[#e8dbc0]'}`}
                  >
                    {dia}
                  </button>
                ))}
              </div>
              <p className="text-sm text-[#7A5A3F] mt-4 font-medium">
                Clique nos dias para marcar ou desmarcar suas folgas. Elas são salvas automaticamente.
              </p>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

export default DashboardProfissional;