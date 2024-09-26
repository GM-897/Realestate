
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
dotenv.config();
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export const insertData = async (Brand, Features, Tone, Length, Output) => {
  try {
    const { data, error } = await supabase
      .from('realestate_db')
      .insert([
        {
          positioning: Brand,
          features: Features,
          tone: Tone,
          length: Length,
          output: Output
        }
      ]);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error inserting data:', error);
    throw error;
  }
};
