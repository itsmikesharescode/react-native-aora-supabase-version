import { supabase } from '../supabase';

const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) return error;
};

export default signOut;
