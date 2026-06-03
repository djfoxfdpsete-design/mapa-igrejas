import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xzxssvzofkwpkeanjegx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6eHNzdnpvZmt3cGtlYW5qZWd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0MzI3MTUsImV4cCI6MjA5NjAwODcxNX0.Bai1xwRv5cMdV6twy_8VUWEHRf-I6IwCaJJeTiHnjAs';
const supabase = createClient(supabaseUrl, supabaseKey);

const allRegionals = [
  // NORTE (7)
  { id: 'sao_miguel', name: 'São Miguel do Araguaia', macroRegionId: 'norte', churchesCount: 0, lat: -13.27, lng: -50.16 },
  { id: 'porangatu', name: 'Porangatu', macroRegionId: 'norte', churchesCount: 0, lat: -13.44, lng: -49.14 },
  { id: 'uruacu', name: 'Uruaçu', macroRegionId: 'norte', churchesCount: 0, lat: -14.52, lng: -49.14 },
  { id: 'niquelandia', name: 'Niquelândia', macroRegionId: 'norte', churchesCount: 0, lat: -14.47, lng: -48.45 },
  { id: 'itapaci', name: 'Itapaci', macroRegionId: 'norte', churchesCount: 0, lat: -14.95, lng: -49.54 },
  { id: 'goianesia', name: 'Goianésia', macroRegionId: 'norte', churchesCount: 0, lat: -15.32, lng: -49.11 },
  { id: 'itapuranga', name: 'Itapuranga', macroRegionId: 'norte', churchesCount: 0, lat: -15.56, lng: -49.94 },

  // OESTE (4)
  { id: 'jussara', name: 'Jussara', macroRegionId: 'oeste', churchesCount: 0, lat: -15.86, lng: -50.86 },
  { id: 'ipora', name: 'Iporá', macroRegionId: 'oeste', churchesCount: 0, lat: -16.44, lng: -51.11 },
  { id: 'sao_luis', name: 'São Luís de Montes Belos', macroRegionId: 'oeste', churchesCount: 0, lat: -16.52, lng: -50.32 },
  { id: 'itaberai', name: 'Itaberaí', macroRegionId: 'oeste', churchesCount: 0, lat: -16.02, lng: -49.81 },

  // SUDOESTE (7)
  { id: 'mineiros', name: 'Mineiros', macroRegionId: 'sudoeste', churchesCount: 0, lat: -17.56, lng: -52.55 },
  { id: 'jatai', name: 'Jataí', macroRegionId: 'sudoeste', churchesCount: 0, lat: -17.88, lng: -51.71 },
  { id: 'rio_verde', name: 'Rio Verde', macroRegionId: 'sudoeste', churchesCount: 0, lat: -17.78, lng: -50.92 },
  { id: 'montividiu', name: 'Montividiu', macroRegionId: 'sudoeste', churchesCount: 0, lat: -17.44, lng: -51.17 },
  { id: 'quirinopolis', name: 'Quirinópolis', macroRegionId: 'sudoeste', churchesCount: 0, lat: -18.44, lng: -50.45 },
  { id: 'sao_simao', name: 'São Simão', macroRegionId: 'sudoeste', churchesCount: 0, lat: -18.99, lng: -50.54 },
  { id: 'bom_jesus', name: 'Bom Jesus', macroRegionId: 'sudoeste', churchesCount: 0, lat: -18.21, lng: -49.71 },

  // SUL/SUDESTE (7)
  { id: 'morrinhos', name: 'Morrinhos', macroRegionId: 'sul_sudeste', churchesCount: 0, lat: -17.73, lng: -49.10 },
  { id: 'caldas_novas', name: 'Caldas Novas', macroRegionId: 'sul_sudeste', churchesCount: 0, lat: -17.74, lng: -48.62 },
  { id: 'pires_do_rio', name: 'Pires do Rio', macroRegionId: 'sul_sudeste', churchesCount: 0, lat: -17.29, lng: -48.27 },
  { id: 'ipameri', name: 'Ipameri', macroRegionId: 'sul_sudeste', churchesCount: 0, lat: -17.72, lng: -48.15 },
  { id: 'catalao', name: 'Catalão', macroRegionId: 'sul_sudeste', churchesCount: 0, lat: -18.16, lng: -47.94 },
  { id: 'itumbiara', name: 'Itumbiara', macroRegionId: 'sul_sudeste', churchesCount: 0, lat: -18.42, lng: -49.21 },
  { id: 'goiatuba', name: 'Goiatuba', macroRegionId: 'sul_sudeste', churchesCount: 0, lat: -18.01, lng: -49.35 },

  // NORDESTE (2)
  { id: 'campos_belos', name: 'Campos Belos', macroRegionId: 'nordeste', churchesCount: 0, lat: -13.03, lng: -46.22 },
  { id: 'posse', name: 'Posse', macroRegionId: 'nordeste', churchesCount: 0, lat: -14.09, lng: -46.36 },

  // ENTORNO DF (9)
  { id: 'planaltina', name: 'Planaltina GO', macroRegionId: 'entorno_df', churchesCount: 0, lat: -15.45, lng: -47.61 },
  { id: 'formosa', name: 'Formosa', macroRegionId: 'entorno_df', churchesCount: 0, lat: -15.53, lng: -47.33 },
  { id: 'aguas_lindas', name: 'Águas Lindas', macroRegionId: 'entorno_df', churchesCount: 0, lat: -15.77, lng: -48.24 },
  { id: 'santo_antonio', name: 'Santo Antônio', macroRegionId: 'entorno_df', churchesCount: 0, lat: -15.87, lng: -48.25 },
  { id: 'valparaiso', name: 'Valparaíso', macroRegionId: 'entorno_df', churchesCount: 0, lat: -16.06, lng: -47.97 },
  { id: 'luziania', name: 'Luziânia', macroRegionId: 'entorno_df', churchesCount: 0, lat: -16.25, lng: -47.95 },
  { id: 'cristalina', name: 'Cristalina', macroRegionId: 'entorno_df', churchesCount: 0, lat: -16.76, lng: -47.61 },
  { id: 'padre_bernardo', name: 'Padre Bernardo', macroRegionId: 'entorno_df', churchesCount: 0, lat: -15.16, lng: -48.28 },
  { id: 'novo_gama', name: 'Novo Gama', macroRegionId: 'entorno_df', churchesCount: 0, lat: -16.05, lng: -48.03 },

  // CENTRO (10)
  { id: 'anapolis', name: 'Anápolis', macroRegionId: 'centro', churchesCount: 0, lat: -16.32, lng: -48.95 },
  { id: 'trindade', name: 'Trindade', macroRegionId: 'centro', churchesCount: 0, lat: -16.64, lng: -49.48 },
  { id: 'goiania', name: 'Goiânia', macroRegionId: 'centro', churchesCount: 0, lat: -16.68, lng: -49.26 },
  { id: 'senador_canedo', name: 'Senador Canedo', macroRegionId: 'centro', churchesCount: 0, lat: -16.69, lng: -49.09 },
  { id: 'garavelos', name: 'Garavelos', macroRegionId: 'centro', churchesCount: 0, lat: -16.78, lng: -49.30 },
  { id: 'vila_mutirao', name: 'Vila Mutirão', macroRegionId: 'centro', churchesCount: 0, lat: -16.60, lng: -49.32 },
  { id: 'inhumas', name: 'Inhumas', macroRegionId: 'centro', churchesCount: 0, lat: -16.35, lng: -49.49 },
  { id: 'neropolis', name: 'Nerópolis', macroRegionId: 'centro', churchesCount: 0, lat: -16.40, lng: -49.21 },
  { id: 'goianira', name: 'Goianira', macroRegionId: 'centro', churchesCount: 0, lat: -16.49, lng: -49.42 },
  { id: 'bela_vista', name: 'Bela Vista', macroRegionId: 'centro', churchesCount: 0, lat: -16.97, lng: -48.95 }
];

async function seedV4() {
  console.log('Iniciando limpeza e injeção do esqueleto de 46 estrelas...');
  
  // Limpa as regionais existentes e insere as 46 corretas
  const { error: delErr } = await supabase.from('regionals').delete().neq('id', 'null');
  console.log('Limpeza Regionais:', delErr);
  
  const { error: insErr } = await supabase.from('regionals').insert(allRegionals);
  console.log('Insercao 46 Regionais:', insErr);

  console.log('Injeção completa! As 7 cores do mapa agora serão geradas de forma perfeita.');
}

seedV4();
