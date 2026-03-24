import FacebookIcon from '../assets/icons/facebook.svg'
import YoutubeIcon from '../assets/icons/youtube.svg'
import InstagramIcon from '../assets/icons/instagram.svg'


function Footerx(){
    return(
        <div className="w-full bg-[#5FA79B] h-70 flex flex-row justify-between items-start pt-7 pl-10 pr-10">
            <div className="h-50 w-70  bg-[#F3D77A] flex flex-col items-center pl-3 text-[#7A5A3F]">
                <h1 className="pt-3 text-2xl font-medium">Como podemos ajudar você?</h1>
                <p className="pt-3">Conheça mais sobre nossa empresa, políticas e tenha o melhor atendimento do mercado pet</p>
              </div>

            <div className="flex flex-col text-white gap-4 text-lg">
                <h1>Links</h1>
                <li className="pl-2">Produtos</li>
                <li className="pl-2">Serviços</li>
                <li className="pl-2">Contatos</li>
            </div>

            <div className="flex flex-col text-white gap-4  text-lg">
                <h1>Contato</h1>
                <li className="pl-2">Central de Atendimentos</li>
                <li className="pl-2">Joinville - SC</li>
                <li className="pl-2">Horário Seg-Sex 9h-18h</li>
            </div>

            <div className="flex flex-col text-white text-lg">
                <h1>Redes</h1>
                <div className='flex flex-row gap-3'>
                    <img className="w-8 h-8" src={YoutubeIcon} alt="Youtube Icon" />
                    <img className="w-8 h-8" src={FacebookIcon} alt="Facebook Icon" />
                    <img className="w-8 h-8" src={InstagramIcon} alt="Instagram Icon" />
                </div>
            </div>


        </div>
    );   
}
export default Footerx;