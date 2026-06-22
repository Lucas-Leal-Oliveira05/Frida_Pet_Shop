import { useState } from "react";
import Header from "../components/Header";

function DashboardProfissional() {
  const [abaAtiva, setAbaAtiva] = useState("agenda");
  const [folgas, setFolgas] = useState(["Ter", "Sáb"]); 
  const diasSemana = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

  const toggleFolga = (dia) => {
    if (folgas.includes(dia)) {
      setFolgas(folgas.filter(d => d !== dia));
    } else {
      setFolgas([...folgas, dia]);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6EBDD] flex flex-col font-sans text-[#5a4a3a]">
      <Header />

      {/* Container Principal que ocupa o resto da tela perfeitamente */}
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
        </aside>

        {/* ÁREA DE CONTEÚDO DIREITA */}
        <main className="flex-1 p-8 md:p-12">
          
          {/* CONTEÚDO DA ABA: AGENDA */}
          {abaAtiva === "agenda" && (
            <div className="max-w-3xl">
              <div className="mb-8">
                <label className="block text-[#7A5A3F] font-bold mb-2">Data</label>
                <input 
                  type="text" 
                  defaultValue="19/03" 
                  className="bg-[#F3D77A] text-[#7A5A3F] font-bold px-4 py-2 rounded-md shadow-sm border-none outline-none focus:ring-2 focus:ring-[#5FA79B] w-32"
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
                    <tr className="border-b border-[#D1BFAE] hover:bg-[#e8dbc0] transition-colors">
                      <td className="py-4 border-r border-[#D1BFAE] font-medium">Banho</td>
                      <td className="py-4 border-r border-[#D1BFAE] font-medium">13:15</td>
                      <td className="py-4 font-medium">Toby</td>
                    </tr>
                    <tr className="border-b border-[#D1BFAE] hover:bg-[#e8dbc0] transition-colors">
                      <td className="py-4 border-r border-[#D1BFAE] font-medium">Banho + tosa</td>
                      <td className="py-4 border-r border-[#D1BFAE] font-medium">15:30</td>
                      <td className="py-4 font-medium">Thor</td>
                    </tr>
                    <tr className="border-b border-[#D1BFAE] h-14">
                      <td className="border-r border-[#D1BFAE]"></td>
                      <td className="border-r border-[#D1BFAE]"></td>
                      <td></td>
                    </tr>
                    <tr className="h-14">
                      <td className="border-r border-[#D1BFAE]"></td>
                      <td className="border-r border-[#D1BFAE]"></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CONTEÚDO DA ABA: GERENCIAMENTO (FOLGA) */}
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
              <p className="text-sm text-[#7A5A3F] mt-4 font-medium">Clique nos dias para marcar ou desmarcar suas folgas.</p>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

export default DashboardProfissional;