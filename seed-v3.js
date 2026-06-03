import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xzxssvzofkwpkeanjegx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6eHNzdnpvZmt3cGtlYW5qZWd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0MzI3MTUsImV4cCI6MjA5NjAwODcxNX0.Bai1xwRv5cMdV6twy_8VUWEHRf-I6IwCaJJeTiHnjAs';
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log('1. Atualizando Itapaci e Itapuranga para Norte (Verde)...');
  await supabase.from('regionals').update({ macroRegionId: 'norte' }).in('id', ['itapaci', 'itapuranga']);

  console.log('2. Adicionando Goianésia...');
  await supabase.from('regionals').upsert([
    { id: 'goianesia', name: 'Goianésia', macroRegionId: 'norte', churchesCount: 0, lat: -15.323, lng: -49.117 }
  ]);

  console.log('3. Limpando igrejas locais antigas para evitar duplicatas...');
  await supabase.from('churches').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  console.log('4. Inserindo igrejas com posições geométricas recalibradas...');
  const novasIgrejas = [
    // SÃO MIGUEL (lat: -13.275, lng: -50.1628)
    { name: 'Nova Crixás (115 km)', regional_id: 'sao_miguel', lat: -14.31, lng: -50.25 }, // 115km Sul

    // PORANGATU (lat: -13.4408, lng: -49.1486)
    { name: 'Novo Planalto T.E (54 km)', regional_id: 'porangatu', lat: -13.40, lng: -49.65 },
    { name: 'Setor Santa Paula T.E (0 km)', regional_id: 'porangatu', lat: -13.445, lng: -49.148 },
    { name: 'Trombas T.E (54 km)', regional_id: 'porangatu', lat: -13.45, lng: -48.65 },
    { name: 'Formoso (62 km)', regional_id: 'porangatu', lat: -13.80, lng: -48.80 },
    { name: 'Minaçu (130 km)', regional_id: 'porangatu', lat: -13.53, lng: -48.22 },

    // URUAÇU (lat: -14.5247, lng: -49.1408)
    { name: 'Campinorte (43 km)', regional_id: 'uruacu', lat: -14.20, lng: -48.95 },
    { name: 'Mara Rosa T.E (80 km)', regional_id: 'uruacu', lat: -14.02, lng: -49.17 },
    { name: 'Campos Verdes T.E (66 km)', regional_id: 'uruacu', lat: -14.25, lng: -49.70 },
    { name: 'Santa Terezinha T.E (64 km)', regional_id: 'uruacu', lat: -14.43, lng: -49.70 },

    // ITAPACI (lat: -14.9506, lng: -49.5494)
    { name: 'Crixás (108 km)', regional_id: 'itapaci', lat: -14.54, lng: -50.50 },
    { name: 'Nova Glória T.E (43 km)', regional_id: 'itapaci', lat: -15.14, lng: -49.20 },
    { name: 'Ceres (37 km)', regional_id: 'itapaci', lat: -15.30, lng: -49.60 },

    // ITAPURANGA (lat: -15.5622, lng: -49.9486)
    { name: 'Mozarlândia (104 km)', regional_id: 'itapuranga', lat: -14.74, lng: -50.57 },
    { name: 'Araguapaz T.E (69 km)', regional_id: 'itapuranga', lat: -15.02, lng: -50.62 },
    { name: 'Matrinchã T.E (64 km)', regional_id: 'itapuranga', lat: -15.44, lng: -50.60 },
    { name: 'Faina (47 km)', regional_id: 'itapuranga', lat: -15.44, lng: -50.36 },
    { name: 'Uruana T.E (33 km)', regional_id: 'itapuranga', lat: -15.49, lng: -49.68 },
    { name: 'Jaraguá (53 km)', regional_id: 'itapuranga', lat: -15.75, lng: -49.33 },

    // GOIANÉSIA (lat: -15.323, lng: -49.117)
    { name: 'São Luiz do Norte T.E (59 km)', regional_id: 'goianesia', lat: -14.86, lng: -49.32 },
    { name: 'Barro Alto (114 km)', regional_id: 'goianesia', lat: -15.00, lng: -48.10 }
  ];

  await supabase.from('churches').insert(novasIgrejas);

  console.log('5. Concluído! Mapa Verde recalibrado com perfeição.');
}

run();
