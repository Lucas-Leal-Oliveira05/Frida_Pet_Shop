import Header from "../components/Header";
import Footerx from "../components/Footerx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cadastroPets, uploadPetPhoto } from "../services/petService";

function CadastroPet() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [nome, setNome] = useState("");
    const [especie, setEspecie] = useState("");
    const [raca, setRaca] = useState("");
    const [idade, setIdade] = useState(""); // Formato YYYY-MM-DD do input date
    const [peso, setPeso] = useState("");
    const [observacoes, setObservacoes] = useState("");
    const [fotoFile, setFotoFile] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFotoFile(e.target.files[0]);
        }
    };

    const handleSalvar = async () => {
        if (!nome || !especie) {
            alert("Nome e Espécie são obrigatórios!");
            return;
        }

        setLoading(true);
        try {
            let urlDaFoto = "";
            if (fotoFile) {
                urlDaFoto = await uploadPetPhoto(fotoFile);
            }

            const petData = { 
                nome, 
                especie, 
                raca, 
                nascimento: idade, 
                peso, 
                observacoes, 
                foto_url: urlDaFoto 
            };

            await cadastroPets(petData);
            alert("Pet cadastrado com sucesso!");
            navigate("/UserPage");
        } catch (error) {
            alert("Erro ao salvar pet: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const inputClass = "w-full bg-[#EDE8D0] rounded px-3 py-2 text-sm text-[#5a4a3a] placeholder-[#9a8a7a] outline-none border border-transparent focus:border-[#5FA79B] transition-colors disabled:opacity-50";

    return (
        <div>
            <Header />
            <div className="min-h-screen bg-[#F6EBDD] flex flex-col items-center justify-start py-10 px-4">
                <div className="w-full max-w-2xl">
                    <h1 className="text-[#7A5A3F] text-2xl mb-6 font-medium">Adicionar novo pet</h1>

                    <div className="bg-[#F3D77A] rounded-xl p-6 flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-[#7A5A3F] text-sm">Nome do Pet</label>
                            <input type="text" placeholder="Ex: Rex" className={inputClass} value={nome} onChange={(e) => setNome(e.target.value)} disabled={loading} />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-[#7A5A3F] text-sm">Espécie</label>
                            <select className={inputClass} value={especie} onChange={(e) => setEspecie(e.target.value)} disabled={loading}>
                                <option value="">Selecione</option>
                                <option value="Cachorro">Cachorro</option>
                                <option value="Gato">Gato</option>
                                <option value="Outro">Outro</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-[#7A5A3F] text-sm">Raça</label>
                            <input type="text" className={inputClass} value={raca} onChange={(e) => setRaca(e.target.value)} disabled={loading} />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-[#7A5A3F] text-sm">Data de Nascimento</label>
                            <input type="date" className={inputClass} value={idade} onChange={(e) => setIdade(e.target.value)} disabled={loading} />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-[#7A5A3F] text-sm">Peso (kg)</label>
                            <input type="number" placeholder="Ex: 8.5" className={inputClass} value={peso} onChange={(e) => setPeso(e.target.value)} disabled={loading} />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-[#7A5A3F] text-sm">Observações</label>
                            <textarea rows={4} className={`${inputClass} resize-none`} value={observacoes} onChange={(e) => setObservacoes(e.target.value)} disabled={loading} />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-[#7A5A3F] text-sm">Foto do Pet</label>
                            <div className="w-full bg-[#EDE8D0] rounded px-3 py-2 flex items-center">
                                <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} id="fileInput" disabled={loading} />
                                <label htmlFor="fileInput" className="cursor-pointer">
                                    <span className="bg-[#F3D77A] border border-[#c9b55a] text-[#7A5A3F] text-sm px-4 py-1 rounded hover:bg-[#e8c85a]">
                                        {fotoFile ? fotoFile.name : "Escolher Arquivo"}
                                    </span>
                                </label>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 mt-2">
                            <button onClick={() => navigate("/UserPage")} className="flex-1 bg-[#E67C73] text-white py-3 rounded" disabled={loading}>Cancelar</button>
                            <button onClick={handleSalvar} className="flex-1 bg-[#5FA79B] text-white py-3 rounded font-medium disabled:bg-gray-400" disabled={loading}>
                                {loading ? "Salvando..." : "Salvar Pet"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footerx />
        </div>
    );
}

export default CadastroPet;