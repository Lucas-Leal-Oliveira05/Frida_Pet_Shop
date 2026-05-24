import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Home from './pages/Home'
import Login from "./pages/Login";
import CadastroUsuario from "./pages/CadastroUsuario";
import CadastroPet from "./pages/CadastroPet";
import UserPage from "./pages/UserPage";
import EditarPet from "./pages/EditarPet";
import Agendamento from "./pages/Agendamento";
import LoginAdmin from "./pages/LoginAdmin";
import AdminDashboard from "./pages/AdminDashboard"
import AdminProfissionais from "./pages/AdminProfissionais";
import AdminAgendamentos from "./pages/AdminAgendamentos";
import AdminHistorico from "./pages/AdminHistorico";
import AdminClientes from "./pages/AdminClientes";
import AdminPets from "./pages/AdminPets";

function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Rotas Usuarios */}
        <Route path="/login" element={<Login/>}/> 
        <Route path="/CadastroUsuario" element={<CadastroUsuario/>}/>
        <Route path="/UserPage" element={<UserPage/>}/>
        {/* Rotas Pet */}
        <Route path="/editarPet/:id" element={<EditarPet />} />
        <Route path="/CadastroPet" element={<CadastroPet/>}/>
        {/* Rotas Agendamento */}
        <Route path="/Agendamento" element={<Agendamento/>} />
        <Route path="/loginAdmin" element={<LoginAdmin/>} />
        <Route path="/AdminDashboard" element = {<AdminDashboard/>} />
        <Route path="/AdminProfissionais" element = {<AdminProfissionais/>}/>
        <Route path="/AdminAgendamentos" element = {<AdminAgendamentos/>}/>
        <Route path="/AdminServicos" element={<AdminHistorico />} />
        <Route path="/AdminClientes" element={<AdminClientes />} />
        <Route path="/AdminPets" element={<AdminPets />} />
      </Routes>
    </Router>
  );
}

export default App;