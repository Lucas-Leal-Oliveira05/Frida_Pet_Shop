import { CircleUserRound, Search } from 'lucide-react';
import Logo from '../assets/Frida_logo.png'

function Header(){
    return(
        <div>
            <div className='w-full pl-4 pr-8 bg-[#5FA79B] flex flex-row justify-between items-center '>

                <img className='h-45' src={Logo} alt="Logo - Petshop" />

                <div className='flex-1 flex flex-col'>
                    <div className='flex items-center justify-between'>
                        <div className= 'flex flex-1 mx-20 items-center'>
                            <input className='bg-gray-100 border w-full border-slate-300 outline-slate-400 pr-10 rounded-l-full h-7' 
                            type="text" name="pesquisa" id="" />
                            <button className='bg-gray-100 border-slate-300 outline-slate-400 rounded-r-full h-7 w-10 flex items-center justify-center p-0.5'>
                                <Search/>
                            </button>
                        </div>
                        <div className=' bg-[#F1E3C6] rounded-full flex items-center justify-center p-2'>
                            <CircleUserRound strokeWidth={1.25} size={50}/>
                        </div>                
                    </div>
                    <div className='relative flex items-center justify-center px-6 py-2 font-medium pt-7'>
                        <div className='flex gap-6 mx-auto text-white'>
                            <button>Início</button>
                            <button>Serviços</button>
                            <button>Sobre</button>
                            <button>Contato</button>
                        </div>
                        <button className='absolute right-4 rounded-md bg-[#E67C73] px-6 py-3 text-sm font-medium'>
                            Agendar Serviços
                        </button>
                    </div> 
                </div>
                 
            </div>
        </div>
        
    );
}
export default Header;