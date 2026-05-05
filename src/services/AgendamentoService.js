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