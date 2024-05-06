'use client';
import {supabase} from '.';

export async function getStratagems() {
  const d = await supabase.from('stratagems').select('*');

  return d;
}
