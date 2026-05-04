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

// Busca um pet pelo id
export async function getPetById(id) {
  const { data, error } = await supabase
    .from("pets")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

// Atualiza dados de um pet
export async function updatePet(id, petData) {
  const { error } = await supabase
    .from("pets")
    .update(petData)
    .eq("id", id);

  if (error) throw error;
}

// Exclui pet pelo ID
export async function deletePet(id) {
  const { error } = await supabase
    .from("pets")
    .delete()
    .eq("id", id);

  if (error) throw error;
}