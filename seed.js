import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xzxssvzofkwpkeanjegx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6eHNzdnpvZmt3cGtlYW5qZWd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0MzI3MTUsImV4cCI6MjA5NjAwODcxNX0.Bai1xwRv5cMdV6twy_8VUWEHRf-I6IwCaJJeTiHnjAs';
const supabase = createClient(supabaseUrl, supabaseKey);

const macros = [
  { id: 'centro', name: 'Centro', color: 'Azul', colorHex: '#4285F4' },
  { id: 'norte', name: 'Norte', color: 'Verde', colorHex: '#34A853' },
  { id: 'sul_sudeste', name: 'Sul/Sudeste', color: 'Vermelho', colorHex: '#EA4335' },
  { id: 'sudoeste', name: 'Sudoeste', color: 'Laranja', colorHex: '#FBBC05' },
  { id: 'oeste', name: 'Oeste', color: 'Roxo', colorHex: '#9C27B0' },
  { id: 'nordeste', name: 'Nordeste', color: 'Marrom', colorHex: '#795548' },
  { id: 'entorno_df', name: 'Entorno DF', color: 'Ciano', colorHex: '#00BCD4' },
];

const regionals = [
  { id: 'anapolis', name: 'Anápolis', macroRegionId: 'centro', churchesCount: 0, lat: -16.3267, lng: -48.9528 },
  { id: 'goiania', name: 'Goiânia', macroRegionId: 'centro', churchesCount: 0, lat: -16.6869, lng: -49.2648 },
  { id: 'sao_miguel', name: 'São Miguel do Araguaia', macroRegionId: 'norte', churchesCount: 0, lat: -13.275, lng: -50.1628 },
  { id: 'porangatu', name: 'Porangatu', macroRegionId: 'norte', churchesCount: 0, lat: -13.4408, lng: -49.1486 },
  { id: 'uruacu', name: 'Uruaçu', macroRegionId: 'norte', churchesCount: 0, lat: -14.5247, lng: -49.1408 },
  { id: 'niquelandia', name: 'Niquelândia', macroRegionId: 'norte', churchesCount: 0, lat: -14.4739, lng: -48.4597 },
  { id: 'itapuranga', name: 'Itapuranga', macroRegionId: 'oeste', churchesCount: 0, lat: -15.5622, lng: -49.9486 },
  { id: 'itapaci', name: 'Itapaci', macroRegionId: 'oeste', churchesCount: 0, lat: -14.9506, lng: -49.5494 },
];

const churches = [
  { name: 'Nova Crixás (115 km)', regional_id: 'sao_miguel', lat: -14.098, lng: -50.327 },
  { name: 'Novo Planalto T.E (54 km)', regional_id: 'porangatu', lat: -13.242, lng: -49.237 },
  { name: 'Setor Santa Paula T.E (0 km)', regional_id: 'porangatu', lat: -13.450, lng: -49.150 },
  { name: 'Trombas T.E (54 km)', regional_id: 'porangatu', lat: -13.510, lng: -48.741 },
  { name: 'Formoso (62 km)', regional_id: 'porangatu', lat: -13.628, lng: -48.889 },
  { name: 'Minaçu (130 km)', regional_id: 'porangatu', lat: -13.532, lng: -48.221 },
  { name: 'Campinorte (43 km)', regional_id: 'uruacu', lat: -14.316, lng: -49.153 },
  { name: 'Mara Rosa T.E (80 km)', regional_id: 'uruacu', lat: -14.017, lng: -49.173 },
  { name: 'Campos Verdes T.E (66 km)', regional_id: 'uruacu', lat: -14.257, lng: -49.699 },
  { name: 'Santa Terezinha T.E (64 km)', regional_id: 'uruacu', lat: -14.437, lng: -49.707 },
  { name: 'Crixás (108 km)', regional_id: 'itapaci', lat: -14.548, lng: -49.969 },
  { name: 'Nova Glória T.E (43 km)', regional_id: 'itapaci', lat: -15.143, lng: -49.571 },
  { name: 'Ceres (37 km)', regional_id: 'itapaci', lat: -15.306, lng: -49.598 },
  { name: 'Mozarlândia (104 km)', regional_id: 'itapuranga', lat: -14.744, lng: -50.570 },
  { name: 'Araguapaz T.E (69 km)', regional_id: 'itapuranga', lat: -15.022, lng: -50.627 },
  { name: 'Matrinchã T.E (64 km)', regional_id: 'itapuranga', lat: -15.441, lng: -50.146 },
  { name: 'Faina (47 km)', regional_id: 'itapuranga', lat: -15.446, lng: -50.360 },
  { name: 'Uruana T.E (33 km)', regional_id: 'itapuranga', lat: -15.498, lng: -49.682 },
  { name: 'Jaraguá (53 km)', regional_id: 'itapuranga', lat: -15.750, lng: -49.333 }
];

async function seed() {
  console.log('Inserindo Macros...');
  await supabase.from('macros').upsert(macros);
  
  console.log('Inserindo Regionais...');
  await supabase.from('regionals').upsert(regionals);

  console.log('Inserindo Igrejas...');
  await supabase.from('churches').insert(churches);

  console.log('Concluido com Sucesso!');
}

seed();
