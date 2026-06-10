import Header from "../components/Header";
import Footerx from "../components/Footerx";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPerfilUsuario } from "../services/userService";
import { getPetsUsuario } from "../services/petService";
import { criarAgendamento } from "../services/agendamentoService";

const SERVICOS = ["Banho", "Tosa", "Banho + Tosa", "Hidratação"];

const HORARIOS = [
  "08:00", "09:00", "10:00", "11:00",
  "13:00", "14:00", "15:00", "16:00", "17:00",
];

const PROFISSIONAIS = ["Ana", "Carlos", "Fernanda", "João"];

function Agendamento() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingDados, setLoadingDados] = useState(true);

  const [servicoSelecionado, setServicoSelecionado] = useState("");
  const [nome, setNome] = useState("");
  const [petId, setPetId] = useState("");
  const [profissional, setProfissional] = useState("");
  const [horario, setHorario] = useState("");
  const [data, setData] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [pets, setPets] = useState([]);

  useEffect(() => {
    async function carregarDados() {
      try {
        const perfil = await getPerfilUsuario();
        const listaPets = await getPetsUsuario();
        setNome(perfil?.nome || "");
        setPets(listaPets);
      } catch (error) {
        console.error("Erro ao carregar dados:", error.message);
      } finally {
        setLoadingDados(false);
      }
    }
    carregarDados();
  }, []);

  const handleAgendar = async () => {
    if (!servicoSelecionado || !petId || !profissional || !horario || !data) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    setLoading(true);
    try {
      await criarAgendamento({
        servico: servicoSelecionado,
        nome,
        pet_id: petId,
        profissional,
        horario,
        data,
        observacoes,
      });
      alert("Agendamento realizado com sucesso!");
      navigate("/UserPage");
    } catch (error) {
      alert("Erro ao agendar: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-white rounded px-3 py-2 text-sm text-[#5a4a3a] placeholder-[#b0a090] outline-none border border-transparent focus:border-[#5FA79B] transition-colors disabled:opacity-50";

  if (loadingDados) {
    return (
      <div>
        <Header />
        <div className="min-h-screen bg-[#F6EBDD] flex items-center justify-center">
          <p className="text-[#7A5A3F]">Carregando...</p>
        </div>
        <Footerx />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-[#F6EBDD] flex flex-col items-center justify-start py-10 px-4">
        <div className="w-full max-w-2xl">

          {/* Título */}
          <h1 className="text-[#7A5A3F] text-2xl font-semibold mb-1">
            Agendar banho ou tosa
          </h1>
          <p className="text-[#9a8070] text-sm mb-6">
            Escolha o serviço e marque um horário para seu pet
          </p>

          {/* Botões de serviço */}
          <div className="flex flex-wrap gap-3 mb-6">
            {SERVICOS.map((s) => (
              <button
                key={s}
                onClick={() => setServicoSelecionado(s)}
                className={`px-5 py-2 rounded-full text-sm font-medium border transition-all
                  ${servicoSelecionado === s
                    ? "bg-[#5FA79B] text-white border-[#5FA79B]"
                    : "bg-[#F3D77A] text-[#7A5A3F] border-[#e8c85a] hover:bg-[#e8c85a]"
                  }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Formulário */}
          <div className="bg-[#F3E8C0] rounded-2xl p-6 flex flex-col gap-4 shadow-sm">

            {/* Nome */}
            <div className="flex flex-col gap-1">
              <label className="text-[#7A5A3F] text-sm font-medium">Nome</label>
              <input
                type="text"
                placeholder="Seu nome......"
                className={inputClass}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                disabled={loading}
              />
            </div>

            {/* Pet */}
            <div className="flex flex-col gap-1">
              <label className="text-[#7A5A3F] text-sm font-medium">Pet</label>
              <select
                className={inputClass}
                value={petId}
                onChange={(e) => setPetId(e.target.value)}
                disabled={loading}
              >
                <option value="">Selecione o pet</option>
                {pets.map((pet) => (
                  <option key={pet.id} value={pet.id}>
                    {pet.nome} ({pet.especie})
                  </option>
                ))}
              </select>
            </div>

            {/* Profissional */}
            <div className="flex flex-col gap-1">
              <label className="text-[#7A5A3F] text-sm font-medium">Profissional</label>
              <select
                className={inputClass}
                value={profissional}
                onChange={(e) => setProfissional(e.target.value)}
                disabled={loading}
              >
                <option value="">Selecione o profissional</option>
                {PROFISSIONAIS.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* Horário */}
            <div className="flex flex-col gap-1">
              <label className="text-[#7A5A3F] text-sm font-medium">Horário</label>
              <select
                className={inputClass}
                value={horario}
                onChange={(e) => setHorario(e.target.value)}
                disabled={loading}
              >
                <option value="">Selecione o horario</option>
                {HORARIOS.map((h) => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
            </div>

            {/* Data */}
            <div className="flex flex-col gap-1">
              <label className="text-[#7A5A3F] text-sm font-medium">Data</label>
              <input
                type="date"
                className={inputClass}
                value={data}
                onChange={(e) => setData(e.target.value)}
                disabled={loading}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            {/* Observações */}
            <div className="flex flex-col gap-1">
              <textarea
                rows={4}
                placeholder="Observações"
                className={`${inputClass} resize-none`}
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                disabled={loading}
              />
            </div>

            {/* Botão Agendar */}
            <button
              onClick={handleAgendar}
              disabled={loading}
              className="w-full bg-[#E67C73] hover:bg-[#d4675e] text-white text-lg font-medium py-3 rounded-xl transition-colors disabled:bg-gray-400 mt-1"
            >
              {loading ? "Agendando..." : "Agendar"}
            </button>
          </div>
        </div>
      </div>
      <Footerx />
    </div>
  );
}

export default Agendamento;