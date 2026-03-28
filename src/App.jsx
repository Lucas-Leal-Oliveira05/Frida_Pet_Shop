import Header from "./components/Header";
import Footerx from "./components/Footerx";

function App(){
  return(
    <div>
      <Header/>
      <section className="w-full  flex justify-between bg-[#F1E3C6]"> {/* Sec 1 */}
        <div className="justify-center-safe flex">
          {/*escrita + botão - div 1 */}
          <div className="w-96 flex flex-col text-[#7A5A3F] justify-center gap-5 pl-20"> 
            <h1 className="text-3xl">Cuidado e carinho para o seu pet</h1>
            <p>Banho, tosa e produtos</p>
            <div className="flex">
              <button className="rounded-md bg-[#E67C73] px-6 py-3 text-sm font-medium text-white w-52 ">
              Agendar Serviços
              </button>
            </div>
          </div>
        </div>
        <div className="justify-center-safe flex pr-20"> 
          <div>
            {/*Imagem - div 1 */}
            <img className="pt-5 pb-5"  src="https://placehold.co/850x750" alt="" />
          </div>          
        </div>
      </section>

      <section className="w-full flex flex-col items-center bg-[#F6EBDD]"> {/* Sec 2 */}
        <h1 className="pt-10 text-3xl text-[#7A5A3F] ">Nossos serviços</h1>
        <div className="w-full flex flex-row justify-between items-center pb-20 pt-10 pl-20 pr-20">
          <div className="w-96 h-96 bg-[#F6EDDF] shadow-xl rounded-4xl flex justify-center items-center flex-col">
            <div className="h-28 w-28 rounded-full bg-[#5FA79B] flex"></div>
            <h1>Banho</h1>
            <h2>Higiene completa e cheirosa</h2>
          </div>

          <div className="w-96 h-96 bg-[#F6EDDF] shadow-xl rounded-4xl"></div>

          <div className="w-96 h-96 bg-[#F6EDDF] shadow-xl rounded-4xl"></div>

        </div>
      </section>
      <Footerx/>
    </div>
  );
}

export default App;