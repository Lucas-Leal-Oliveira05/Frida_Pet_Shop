import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Home from './pages/Home'
import Login from "./pages/Login";
import CadastroUsuario from "./pages/CadastroUsuario";
import CadastroPet from "./pages/CadastroPet";
import UserPage from "./pages/UserPage";
import EditarPet from "./pages/EditarPet";
import Agendamento from "./pages/Agendamento";

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
      </Routes>
    </Router>
  );
}

export default App;