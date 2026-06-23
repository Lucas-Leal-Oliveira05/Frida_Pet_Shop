import { supabase } from "./supabase";

export const criarAgendamento = async (dados) => {
  const dataHoraCombinada = `${dados.data}T${dados.horario}:00`;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Usuário não autenticado.");

  const { data, error } = await supabase
    .from('agendamentos')
    .insert([
      {
        cliente_id: user.id,
        pet_id: dados.pet_id,
        profissional_id: dados.profissional_id,
        servico_id: dados.servico_id,
        data_hora: dataHoraCombinada,
        status: 'PENDENTE',
        observacoes: dados.observacoes
      }
    ]);

  if (error) throw error;
  return data;
};

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

  if (error) throw error

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
  const { data, error } = await supabase
    .from('agendamentos')
    .update({ status: novoStatus })
    .eq('id', id);

  if (error) throw error;
  return data;
};

export const getMetricasDashboard = async () => {
  const hoje = new Date().toISOString().split('T')[0];

  const { count: totalClientes, error: err1 } = await supabase
    .from('usuarios')
    .select('*', { count: 'exact', head: true })
    .eq('perfil', 'CLIENTE');

  const { count: totalPets, error: err2 } = await supabase
    .from('pets')
    .select('*', { count: 'exact', head: true });

  const { count: pendentes, error: err3 } = await supabase
    .from('agendamentos')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'PENDENTE');

  const { count: hojeCount, error: err4 } = await supabase
    .from('agendamentos')
    .select('*', { count: 'exact', head: true })
    .gte('data_hora', `${hoje}T00:00:00`)
    .lte('data_hora', `${hoje}T23:59:59`);

  if (err1 || err2 || err3 || err4) {
    throw new Error("Erro ao calcular métricas do dashborad")
  }

  return {
    agendamentosHoje: hojeCount || 0,
    pendentes: pendentes || 0,
    totalClientes: totalClientes || 0,
    totalPets: totalPets || 0
  }

}
export const getServicosAtivos = async () => {
  const { data, error } = await supabase
    .from('servicos')
    .select('id, nome, preco')
    .order('nome', { ascending: true });

  if (error) throw error;
  return data;
};

export const getMeusAgendamentos = async () => {

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Usuário não autenticado.");

  const { data, error } = await supabase
    .from('agendamentos')
    .select(`
            id,
            data_hora,
            status,
            pets ( nome ),
            servicos ( nome ),
            profissionais ( nome )
        `)
    .eq('cliente_id', user.id)
    .order('data_hora', { ascending: true });

  if (error) throw error;
  return data.map(agendamento => ({
    id: agendamento.id,
    data_hora: agendamento.data_hora,
    status: agendamento.status,
    pet: agendamento.pets?.nome || 'Pet não encontrado',
    servico: agendamento.servicos?.nome || 'Serviço não encontrado',
    profissional: agendamento.profissionais?.nome || 'Profissional não definido'
  }));
};