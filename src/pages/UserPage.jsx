import Header from "../components/Header";
import Footerx from "../components/Footerx";

function UserPage(){
    return(
        <div>
            <Header/>
            
            <div className="w-full bg-[#F6EBDD] flex flex-col">
                <div className="flex flex-col md:flex-row items-center gap-4 px-4 md:px-20 mt-10">
                    <div className="h-28 w-28 rounded-full bg-white flex shrink-0"></div>
                    <h1 className="text-[#7A5A3F] text-2xl md:text-4xl text-center md:text-left">Olá,(Puxa do banco)</h1>
                </div>

                <section className="flex flex-col md:flex-row gap-4 mt-10 items-center px-4 md:px-10 lg:px-28">
                    <div className="rounded-md bg-[#F3D77A] w-full md:w-1/3 text-center text-sm font-medium text-[#7A5A3F] pt-2 pb-2">
                        <p>Pets Cadastrados:</p>
                        <p>(Num pets)</p>
                    </div>

                    <div className="rounded-md bg-[#F3D77A] text-center text-sm font-medium text-[#7A5A3F] w-full md:w-1/3 pt-2 pb-2">
                        <p>Próximo horário agendado:</p>
                        <p>(horário/data)</p>
                    </div>

                    <div className="rounded-md bg-[#F3D77A] text-center text-sm font-medium text-[#7A5A3F] w-full md:w-1/3 pt-2 pb-2">
                        <p>Último agendamento:</p>
                        <p>(horário/data)</p>
                    </div>
                </section>  

                <section className="flex flex-col mt-20 px-4 md:px-10 lg:px-28">
                    <h1 className="text-[#7A5A3F] text-lg">Meus Pets (refazer quando banco funcionar)</h1>

                    <div className="bg-[#F1E3C6] rounded-md flex flex-col md:flex-row items-center pt-1 pb-1 mt-5">
                        <div className="h-28 w-28 shrink-0 rounded-full bg-white flex ml-0 md:ml-3 mt-3 md:mt-0"></div>

                        <div className="flex flex-col items-center md:items-start justify-center gap-3 pl-0 md:pl-7 text-center md:text-left py-3 md:py-0">
                            <h1 className="text-[#7A5A3F] text-2xl">(Template)</h1>
                            <p className="text-[#7A5A3F]">(Espécie - raça)</p>
                        </div>

                        <div className="flex flex-row justify-center items-center ml-auto flex-wrap w-full md:w-auto md:justify-end pr-0 md:pr-10 gap-5 pb-3 md:pb-0 px-4 md:px-0">
                            <button className="rounded-md bg-[#F3D77A] text-center text-sm text-black w-40 h-10">Editar</button>
                            <button className="rounded-md bg-[#E67C73] text-center text-sm text-black w-20 h-10">Excluir</button>
                        </div>
                    </div>

                    <button className="rounded-md bg-[#5FA79B] mr-auto text-center text-lg w-full max-w-xs pt-1 pb-1 mt-5">+ Adicionar pet</button>
                </section>

                <section className="flex flex-col mt-20 px-4 md:px-10 lg:px-28 text-[#7A5A3F]">
                    <div className="bg-[#F3D77A] rounded-md flex flex-col pt-3">
                        <h1 className="ml-4 md:ml-15 text-lg font-medium">Próximos agendamentos</h1>

                        <div className="bg-[#F1E3C6] flex flex-col mx-4 md:mx-15 pt-3 mt-3 mb-5 rounded-md">
                            <div className="flex flex-col md:flex-row ml-5 mr-5 md:mr-28">
                                <h1>(Data - horário)</h1>
                            </div>

                            <div className="flex flex-col md:flex-row mt-5 ml-5 pb-3 gap-4 md:gap-0">
                                <div className="flex flex-col gap-3">
                                    <p>Pet:</p>
                                    <p>Serviço:</p>
                                    <p>Status:</p>
                                </div>

                                <div className="flex flex-row items-center justify-center flex-wrap gap-4 md:ml-auto md:mr-10">
                                    <button className="rounded-md bg-[#5FA79B] text-black text-center text-sm w-32 h-8">Confirmar</button>
                                    <button className="rounded-md bg-[#F3D77A] text-black text-center text-sm w-32 h-8">Reagendar</button>
                                    <button className="rounded-md bg-[#E67C73] text-black text-center text-sm w-32 h-8">Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <button className="rounded-md bg-[#5FA79B] text-center text-lg text-black h-10 w-auto mx-4 md:mx-28 mt-5 mb-10">+ Novo agendamento</button>
            </div>

            <Footerx/>
        </div>
    );
}
export default UserPage;