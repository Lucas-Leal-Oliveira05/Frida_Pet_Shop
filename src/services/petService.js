import { supabase } from "./supabase";

export const getPetsUsuario = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('pets')
    .select('*')
    .eq('usuario_id', user.id);
  if (error) throw error;
  return data;
}

export const cadastroPets = async (petData) => {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Usuário não autenticado");

  const { data, error } = await supabase
    .from('pets')
    .insert([
      {
        nome: petData.nome,
        especie: petData.especie,
        raca: petData.raca,
        nascimento: petData.nascimento,
        peso: petData.peso ? parseFloat(petData.peso) : null,
        observacoes: petData.observacoes,
        foto_url: petData.foto_url,
        usuario_id: user.id
      }
    ]);

  if (error) throw error;
  return data;
};

export const uploadPetPhoto = async (file) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('fotos-pets')
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage
    .from('fotos-pets')
    .getPublicUrl(filePath);

  return data.publicUrl;
};

export async function getPetById(id) {
  const { data, error } = await supabase
    .from("pets")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function updatePet(id, petData) {
  const { error } = await supabase
    .from("pets")
    .update(petData)
    .eq("id", id);

  if (error) throw error;
}

export async function deletePet(id) {
  const { error } = await supabase
    .from("pets")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export const getPetsAdmin = async () => {
    const { data, error } = await supabase
        .from('pets')
        .select(`
            id,
            nome,
            especie,
            raca,
            nascimento,
            peso,
            foto_url,
            observacoes,
            usuario_id,
            usuarios ( nome, telefone )
        `)
        .order('nome', { ascending: true });

    if (error) throw error;

    return data.map(pet => {
        let idadeTexto = "Idade não informada";
        if (pet.nascimento) {
            const anoNascimento = new Date(pet.nascimento).getFullYear();
            const anoAtual = new Date().getFullYear();
            const diff = anoAtual - anoNascimento;
            idadeTexto = diff <= 1 ? `${diff} ano` : `${diff} anos`;
        }

        return {
            ...pet,
            tutor: pet.usuarios?.nome || 'Sem tutor',
            telefoneTutor: pet.usuarios?.telefone || 'Sem telefone',
            idade: idadeTexto
        };
    });
};

export const getHistoricoPet = async (petId) => {
    const { data, error } = await supabase
        .from('agendamentos')
        .select(`
            data_hora,
            servicos ( nome )
        `)
        .eq('pet_id', petId)
        .eq('status', 'CONCLUIDO')
        .order('data_hora', { ascending: false });

    if (error) throw error;

    return data.map(h => {
        const dataFormatada = new Date(h.data_hora).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
        return {
            data: dataFormatada,
            servico: h.servicos?.nome || 'Serviço'
        };
    });
};

export const atualizarPetAdmin = async (id, dados) => {
    const { data, error } = await supabase
        .from('pets')
        .update({
            nome: dados.nome,
            especie: dados.especie,
            raca: dados.raca,
            nascimento: dados.nascimento,
            peso: parseFloat(dados.peso) || null,
            observacoes: dados.observacoes,
            foto_url: dados.foto_url
        })
        .eq('id', id);

    if (error) throw error;
    return data;
};

export const deletarPetAdmin = async (id) => {
    const { error } = await supabase
        .from('pets')
        .delete()
        .eq('id', id);
    if (error) throw error;
};