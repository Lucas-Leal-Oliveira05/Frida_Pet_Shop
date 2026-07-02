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
import AdminServicos from "./pages/AdminServicos";
import LoginProfissional from "./pages/LoginProfissional";
import DashboardProfissional from "./pages/DashboardProfissional";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/CadastroUsuario" element={<CadastroUsuario />} />
        <Route path="/loginAdmin" element={<LoginAdmin />} />
        <Route path="/LoginProfissional" element={<LoginProfissional />} />
        {/*Cliente*/}
        <Route path="/UserPage" element={<ProtectedRoute perfilExigido="CLIENTE"><UserPage /></ProtectedRoute>} />
        <Route path="/editarPet/:id" element={<ProtectedRoute perfilExigido="CLIENTE"><EditarPet /></ProtectedRoute>} />
        <Route path="/CadastroPet" element={<ProtectedRoute perfilExigido="CLIENTE"><CadastroPet /></ProtectedRoute>} />
        <Route path="/Agendamento" element={<ProtectedRoute perfilExigido="CLIENTE"><Agendamento /></ProtectedRoute>} />
        {/*Administrador*/}
        <Route path="/AdminDashboard" element={<ProtectedRoute perfilExigido="ADMIN"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/AdminProfissionais" element={<ProtectedRoute perfilExigido="ADMIN"><AdminProfissionais /></ProtectedRoute>} />
        <Route path="/AdminAgendamentos" element={<ProtectedRoute perfilExigido="ADMIN"><AdminAgendamentos /></ProtectedRoute>} />
        <Route path="/AdminServicos" element={<ProtectedRoute perfilExigido="ADMIN"><AdminHistorico /></ProtectedRoute>} />
        <Route path="/AdminClientes" element={<ProtectedRoute perfilExigido="ADMIN"><AdminClientes /></ProtectedRoute>} />
        <Route path="/AdminPets" element={<ProtectedRoute perfilExigido="ADMIN"><AdminPets /></ProtectedRoute>} />
        <Route path="/AdminAdicionarServicos" element={<ProtectedRoute perfilExigido="ADMIN"><AdminServicos /></ProtectedRoute>} />
        {/* 🩺 ROTAS DO PROFISSIONAL */}
        <Route path="/DashboardProfissional" element={<ProtectedRoute perfilExigido="PROFISSIONAL"><DashboardProfissional /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;