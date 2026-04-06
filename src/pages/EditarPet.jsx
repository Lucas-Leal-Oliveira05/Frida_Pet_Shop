import Header from "../components/Header";
import Footerx from "../components/Footerx";

function editarPet() {
  const inputClass =
    "w-full bg-[#EDE8D0] rounded px-3 py-2 text-sm text-[#5a4a3a] placeholder-[#9a8a7a] outline-none border border-transparent focus:border-[#5FA79B] transition-colors";

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-[#F6EBDD] flex flex-col items-center justify-start py-10 px-4">
        <div className="w-full max-w-3xl">
          <h1 className="text-[#7A5A3F] text-2xl mb-6 font-medium">
            Editar Pet
          </h1>

          <div className="bg-[#F3D77A] rounded-xl p-6 flex flex-col gap-4">

            {/* Foto  */}
            <div className="flex flex-col gap-2">
              <img
                src=""
                alt="Foto do pet"
                className="w-24 h-24 object-cover rounded-md border border-[#c9b55a]"
              />
              <div className="w-full bg-[#EDE8D0] rounded px-3 py-2 flex items-center">
                <label className="cursor-pointer">
                  <span className="bg-[#F3D77A] border border-[#c9b55a] text-[#7A5A3F] text-sm px-4 py-1 rounded hover:bg-[#e8c85a] transition-colors">
                    Escolher o Ficheiro
                  </span>
                  <input type="file" accept="image/*" className="hidden" />
                </label>
              </div>
            </div>

            {/* Nome */}
            <div className="flex flex-col gap-1">
              <label className="text-[#7A5A3F] text-sm">Nome do Pet</label>
              <input type="text" defaultValue="" className={inputClass} />
            </div>

            {/* Espécie */}
            <div className="flex flex-col gap-1">
              <label className="text-[#7A5A3F] text-sm">Espécie</label>
              <select defaultValue="" className={inputClass}>
                <option value="">Selecione</option>
                <option>Cachorro</option>
                <option>Gato</option>
                <option>Outro</option>
              </select>
            </div>

            {/* Raça */}
            <div className="flex flex-col gap-1">
              <label className="text-[#7A5A3F] text-sm">Raça</label>
              <input type="text" defaultValue="" className={inputClass} />
            </div>

            {/* Idade */}
            <div className="flex flex-col gap-1">
              <label className="text-[#7A5A3F] text-sm">Idade</label>
              <input type="text" defaultValue="" className={inputClass} />
            </div>

            {/* Peso */}
            <div className="flex flex-col gap-1">
              <label className="text-[#7A5A3F] text-sm">Peso (kg)</label>
              <input type="number" defaultValue="" className={inputClass} />
            </div>

            {/* Observações */}
            <div className="flex flex-col gap-1">
              <label className="text-[#7A5A3F] text-sm">Observações</label>
              <textarea
                rows={5}
                defaultValue=""
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Voltar / Salvar */}
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <button className="flex-1 bg-[#E67C73] hover:bg-[#d4675e] text-white text-sm font-medium py-3 rounded transition-colors">
                Voltar
              </button>
              <button className="flex-1 bg-[#5FA79B] hover:bg-[#4d8f84] text-white text-sm font-medium py-3 rounded transition-colors">
                Salvar Alterações
              </button>
            </div>

            {/* Excluir */}
            <button className="w-full bg-[#E67C73] hover:bg-[#d4675e] text-white text-sm font-medium py-3 rounded transition-colors">
              Excluir Pet
            </button>
          </div>
        </div>
      </div>
      <Footerx />
    </div>
  );
}

export default editarPet;