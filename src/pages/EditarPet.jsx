
import Header from "../components/Header";
import Footerx from "../components/Footerx";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPetById, updatePet, uploadPetPhoto, deletePet } from "../services/petService";

function EditarPet() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [loadingDados, setLoadingDados] = useState(true);

  const [nome, setNome] = useState("");
  const [especie, setEspecie] = useState("");
  const [raca, setRaca] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [peso, setPeso] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [fotoUrl, setFotoUrl] = useState("");
  const [fotoFile, setFotoFile] = useState(null);

  useEffect(() => {
    const carregarPet = async () => {
      try {
        const pet = await getPetById(id);
        setNome(pet.nome || "");
        setEspecie(pet.especie || "");
        setRaca(pet.raca || "");
        setNascimento(pet.nascimento || "");
        setPeso(pet.peso || "");
        setObservacoes(pet.observacoes || "");
        setFotoUrl(pet.foto_url || "");
      } catch (error) {
        alert("Erro ao carregar dados do pet: " + error.message);
        navigate("/UserPage");
      } finally {
        setLoadingDados(false);
      }
    };

    carregarPet();
  }, [id]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFotoFile(file);
      setFotoUrl(URL.createObjectURL(file)); // preview local
    }
  };

  const handleSalvar = async () => {
    if (!nome || !especie) {
      alert("Nome e Espécie são obrigatórios!");
      return;
    }

    setLoading(true);
    try {
      let urlDaFoto = fotoUrl;
      if (fotoFile) {
        urlDaFoto = await uploadPetPhoto(fotoFile);
      }

      const petData = {
        nome,
        especie,
        raca,
        nascimento,
        peso,
        observacoes,
        foto_url: urlDaFoto,
      };

      await updatePet(id, petData);
      alert("Pet atualizado com sucesso!");
      navigate("/UserPage");
    } catch (error) {
      alert("Erro ao salvar alterações: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleExcluir = async () => {
    const confirmado = window.confirm(
      `Tem certeza que deseja excluir ${nome}? Esta ação não pode ser desfeita.`
    );
    if (!confirmado) return;

    setLoading(true);
    try {
      await deletePet(id);
      alert("Pet excluído com sucesso.");
      navigate("/UserPage");
    } catch (error) {
      alert("Erro ao excluir pet: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-[#EDE8D0] rounded px-3 py-2 text-sm text-[#5a4a3a] placeholder-[#9a8a7a] outline-none border border-transparent focus:border-[#5FA79B] transition-colors disabled:opacity-50";

  if (loadingDados) {
    return (
      <div>
        <Header />
        <div className="min-h-screen bg-[#F6EBDD] flex items-center justify-center">
          <p className="text-[#7A5A3F]">Carregando dados do pet...</p>
        </div>
        <Footerx />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-[#F6EBDD] flex flex-col items-center justify-start py-10 px-4">
        <div className="w-full max-w-3xl">
          <h1 className="text-[#7A5A3F] text-2xl mb-6 font-medium">Editar Pet</h1>

          <div className="bg-[#F3D77A] rounded-xl p-6 flex flex-col gap-4">

            {/* Foto */}
            <div className="flex flex-col gap-2">
              <img
                src={fotoUrl || "https://placehold.co/96x96?text=Pet"}
                alt="Foto do pet"
                className="w-24 h-24 object-cover rounded-md border border-[#c9b55a]"
              />
              <div className="w-full bg-[#EDE8D0] rounded px-3 py-2 flex items-center">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="fileInput"
                  onChange={handleFileChange}
                  disabled={loading}
                />
                <label htmlFor="fileInput" className="cursor-pointer">
                  <span className="bg-[#F3D77A] border border-[#c9b55a] text-[#7A5A3F] text-sm px-4 py-1 rounded hover:bg-[#e8c85a] transition-colors">
                    {fotoFile ? fotoFile.name : "Escolher Arquivo"}
                  </span>
                </label>
              </div>
            </div>

            {/* Nome */}
            <div className="flex flex-col gap-1">
              <label className="text-[#7A5A3F] text-sm">Nome do Pet</label>
              <input
                type="text"
                className={inputClass}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                disabled={loading}
              />
            </div>

            {/* Espécie */}
            <div className="flex flex-col gap-1">
              <label className="text-[#7A5A3F] text-sm">Espécie</label>
              <select
                className={inputClass}
                value={especie}
                onChange={(e) => setEspecie(e.target.value)}
                disabled={loading}
              >
                <option value="">Selecione</option>
                <option value="Cachorro">Cachorro</option>
                <option value="Gato">Gato</option>
                <option value="Outro">Outro</option>
              </select>
            </div>

            {/* Raça */}
            <div className="flex flex-col gap-1">
              <label className="text-[#7A5A3F] text-sm">Raça</label>
              <input
                type="text"
                className={inputClass}
                value={raca}
                onChange={(e) => setRaca(e.target.value)}
                disabled={loading}
              />
            </div>

            {/* Data de Nascimento */}
            <div className="flex flex-col gap-1">
              <label className="text-[#7A5A3F] text-sm">Data de Nascimento</label>
              <input
                type="date"
                className={inputClass}
                value={nascimento}
                onChange={(e) => setNascimento(e.target.value)}
                disabled={loading}
              />
            </div>

            {/* Peso */}
            <div className="flex flex-col gap-1">
              <label className="text-[#7A5A3F] text-sm">Peso (kg)</label>
              <input
                type="number"
                placeholder="Ex: 8.5"
                className={inputClass}
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
                disabled={loading}
              />
            </div>

            {/* Observações */}
            <div className="flex flex-col gap-1">
              <label className="text-[#7A5A3F] text-sm">Observações</label>
              <textarea
                rows={5}
                className={`${inputClass} resize-none`}
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                disabled={loading}
              />
            </div>

            {/* Voltar / Salvar */}
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <button
                onClick={() => navigate("/UserPage")}
                className="flex-1 bg-[#E67C73] hover:bg-[#d4675e] text-white text-sm font-medium py-3 rounded transition-colors disabled:opacity-50"
                disabled={loading}
              >
                Voltar
              </button>
              <button
                onClick={handleSalvar}
                className="flex-1 bg-[#5FA79B] hover:bg-[#4d8f84] text-white text-sm font-medium py-3 rounded transition-colors disabled:bg-gray-400"
                disabled={loading}
              >
                {loading ? "Salvando..." : "Salvar Alterações"}
              </button>
            </div>

            {/* Excluir */}
            <button
              onClick={handleExcluir}
              className="w-full bg-[#E67C73] hover:bg-[#d4675e] text-white text-sm font-medium py-3 rounded transition-colors disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Aguarde..." : "Excluir Pet"}
            </button>
          </div>
        </div>
      </div>
      <Footerx />
    </div>
  );
}

export default EditarPet;