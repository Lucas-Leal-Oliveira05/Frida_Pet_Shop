import Header from "./components/Header";
import Footerx from "./components/Footerx";

function App(){
  return(
    <div>
      <Header/>
      {/* Sec 1 */}
      <section className="w-full  flex justify-between bg-[#F1E3C6]">
        <div className="justify-center-safe flex">
          {/*escrita + botão */}
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
            {/*Imagem */}
            <img className="pt-5 pb-5"  src="https://placehold.co/850x750" alt="" />
          </div>          
        </div>
      </section>

      {/* Sec 2 */}
      <section className="w-full flex flex-col items-center bg-[#F6EBDD]">
        <h1 className="pt-10 text-3xl text-[#7A5A3F] ">Nossos serviços</h1>
        <div className="w-full flex flex-row justify-between items-center pb-20 pt-10 pl-20 pr-20">
          {/* Card Banho */}
          <div className="w-96 h-96 bg-[#F6EDDF] shadow-xl rounded-4xl flex items-center flex-col gap-10">
            <div className="h-36 w-36 rounded-full bg-[#5FA79B] flex mt-10"></div>
            <div className="items-center flex flex-col text-[#7A5A3F] gap-5">
              <h1 className="text-4xl" >Banho</h1>
              <h2 className="text-lg">Higiene completa e cheirosa</h2>
            </div>
          </div>
          {/* Card tosa*/}
          <div className="w-96 h-96 bg-[#F6EDDF] shadow-xl rounded-4xl flex items-center flex-col gap-10">
            <div className="h-36 w-36 rounded-full bg-[#E38870] flex mt-10"></div>
            <div className="items-center flex flex-col text-[#7A5A3F] gap-5">
              <h1 className="text-4xl" >Tosa</h1>
              <h2 className="text-lg">Estilo e conforto para seu pet</h2>
            </div>
          </div>
          {/* Card loja*/}
          <div className="w-96 h-96 bg-[#F6EDDF] shadow-xl rounded-4xl flex items-center flex-col gap-10">
            <div className="h-36 w-36 rounded-full bg-[#F6CF8F] flex mt-10"></div>
            <div className="items-center flex flex-col text-[#7A5A3F] gap-5">
              <h1 className="text-4xl" >Loja</h1>
              <h2 className="text-lg">Rações e brinquedos premium</h2>
            </div>
          </div>
        </div>
      </section>

      {/* Sec 3 */}
      <section className="bg-[#F1E3C6] flex flex-col justify-center items-center gap-5 pb-10"> 
        <h1 className="text-[#7A5A3F] text-3xl pt-10"> Seu pet merece o melhor</h1>
        <button className="rounded-md bg-[#E67C73] px-6 py-3 text-sm font-medium text-white w-52">Falar no whatsapp</button>
      </section>

      <Footerx/>
    </div>
  );
}

export default App;