// import Agendamento from "../pages/Agendamento";
/* Deixei o isso aqui pois sera usado futuramente (provavelmente)
*/
import { supabase } from "./supabase";

export async function criarAgendamento(dados) {
  const { data: { user } } = await supabase.auth.getUser();

  const { error } = await supabase.from("agendamentos").insert([
    {
      user_id: user.id,
      servico: dados.servico,
      nome: dados.nome,
      pet_id: dados.pet_id,
      profissional: dados.profissional,
      horario: dados.horario,
      data: dados.data,
      observacoes: dados.observacoes,
    },
  ]);

  if (error) throw error;
}

export const getAgendamentosPainel = async () => {
    const { data, error } = await supabase
        .from('agendamentos')
        .select(`
            id,
            data_hora,
            status,
            usuarios!agendamentos_cliente_id_fkey ( nome ),
            pets ( nome ),
            servicos ( nome ) 
        `)
        .order('data_hora', { ascending: true });

    if (error) throw error;

    // Ajusta o mapeamento para ler as propriedades com os nomes novos
    return data.map(agendamento => ({
        id: agendamento.id,
        data_hora: agendamento.data_hora,
        status: agendamento.status,
        cliente: agendamento.usuarios?.nome || 'Não informado',
        pet: agendamento.pets?.nome || 'Não informado',  
        servico: agendamento.servicos?.nome || 'Não informado' 
    }));
};

export const atualizarStatusAgendamento = async (id, novoStatus) => {
  const { data,error } = await supabase 
    .from('agendamentos')
    .update({status: novoStatus})
    .eq('id', id);

    if (error) throw error;
    return data;
};

export const getMetricasDashboard = async () => {
  const hoje = new Date().toISOString().split('T')[0];

  const {count: totalClientes, error: err1 } = await supabase
    .from('usuarios')
    .select('*',{count: 'exact', head: true})
    .eq('perfil','CLIENTE');

  const {count: totalPets, error: err2 } = await supabase
    .from('pets')
    .select('*', {count: 'exact', head: true});
  
  const {count: pendentes, error: err3 } = await supabase
    .from('agendamentos')
    .select('*',{count: 'exact', head:true })
    .eq('status', 'Pendentes' );

  const {count: hojeCount, error:err4 } = await supabase
    .from('agendamentos')
    .select('*', {count: 'exact', head: true})
    .gte('data_hora', `${hoje}T00:00:00`)
    .lte('data_hora', `${hoje}T23:59:59`);

  if (err1 || err2 || err3 || err4){
    throw new Error("Erro ao calcular métricas do dashborad")
  }

  return {
    agendamentosHoje: hojeCount || 0,
    pendentes: pendentes || 0,
    totalClientes: totalClientes || 0,
    totalPets: totalPets || 0
  }

}