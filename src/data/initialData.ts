export type MacroRegion = {
  id: string;
  name: string;
  color: string;
  colorHex: string;
};

export type Regional = {
  id: string;
  name: string;
  macroRegionId: string;
  churchesCount: number;
  lat: number;
  lng: number;
};

export type Church = {
  id: string;
  name: string;
  regionalId: string;
};

export const macroRegions: MacroRegion[] = [
  { id: 'centro', name: 'Centro', color: 'Azul', colorHex: '#4285F4' },
  { id: 'norte', name: 'Norte', color: 'Verde', colorHex: '#34A853' },
  { id: 'sul_sudeste', name: 'Sul/Sudeste', color: 'Vermelho', colorHex: '#EA4335' },
  { id: 'sudoeste', name: 'Sudoeste', color: 'Laranja', colorHex: '#FBBC05' },
  { id: 'oeste', name: 'Oeste', color: 'Roxo', colorHex: '#9C27B0' },
  { id: 'nordeste', name: 'Nordeste', color: 'Marrom', colorHex: '#795548' },
  { id: 'entorno_df', name: 'Entorno DF', color: 'Ciano', colorHex: '#00BCD4' },
];

export const initialRegionals: Regional[] = [
  // Centro
  { id: 'anapolis', name: 'Anápolis', macroRegionId: 'centro', churchesCount: 0, lat: -16.3267, lng: -48.9528 },
  { id: 'trindade', name: 'Trindade', macroRegionId: 'centro', churchesCount: 0, lat: -16.6493, lng: -49.4889 },
  { id: 'goiania', name: 'Goiânia', macroRegionId: 'centro', churchesCount: 0, lat: -16.6869, lng: -49.2648 },
  { id: 'senador_canedo', name: 'Senador Canedo', macroRegionId: 'centro', churchesCount: 0, lat: -16.6974, lng: -49.0911 },
  { id: 'garavelos', name: 'Garavelos de Goiânia', macroRegionId: 'centro', churchesCount: 0, lat: -16.7869, lng: -49.3048 },
  
  // Norte
  { id: 'sao_miguel', name: 'São Miguel do Araguaia', macroRegionId: 'norte', churchesCount: 0, lat: -13.275, lng: -50.1628 },
  { id: 'porangatu', name: 'Porangatu', macroRegionId: 'norte', churchesCount: 0, lat: -13.4408, lng: -49.1486 },
  { id: 'uruacu', name: 'Uruaçu', macroRegionId: 'norte', churchesCount: 0, lat: -14.5247, lng: -49.1408 },
  { id: 'niquelandia', name: 'Niquelândia', macroRegionId: 'norte', churchesCount: 0, lat: -14.4739, lng: -48.4597 },
  
  // Sul/Sudeste
  { id: 'morrinhos', name: 'Morrinhos', macroRegionId: 'sul_sudeste', churchesCount: 0, lat: -17.7311, lng: -49.1006 },
  { id: 'caldas_novas', name: 'Caldas Novas', macroRegionId: 'sul_sudeste', churchesCount: 0, lat: -17.7428, lng: -48.6253 },
  { id: 'pires_do_rio', name: 'Pires do Rio', macroRegionId: 'sul_sudeste', churchesCount: 0, lat: -17.2997, lng: -48.2794 },
  { id: 'ipameri', name: 'Ipameri', macroRegionId: 'sul_sudeste', churchesCount: 0, lat: -17.7219, lng: -48.1597 },
  { id: 'catalao', name: 'Catalão', macroRegionId: 'sul_sudeste', churchesCount: 0, lat: -18.1658, lng: -47.9464 },
  { id: 'bom_jesus', name: 'Bom Jesus', macroRegionId: 'sul_sudeste', churchesCount: 0, lat: -18.215, lng: -49.7139 },
  { id: 'itumbiara', name: 'Itumbiara', macroRegionId: 'sul_sudeste', churchesCount: 0, lat: -18.4217, lng: -49.2189 },

  // Sudoeste
  { id: 'mineiros', name: 'Mineiros', macroRegionId: 'sudoeste', churchesCount: 0, lat: -17.5689, lng: -52.5511 },
  { id: 'jatai', name: 'Jataí', macroRegionId: 'sudoeste', churchesCount: 0, lat: -17.8814, lng: -51.7144 },
  { id: 'rio_verde', name: 'Rio Verde', macroRegionId: 'sudoeste', churchesCount: 0, lat: -17.7892, lng: -50.9206 },
  { id: 'montividiu', name: 'Montividiu', macroRegionId: 'sudoeste', churchesCount: 0, lat: -17.4411, lng: -51.1764 },
  { id: 'quirinopolis', name: 'Quirinópolis', macroRegionId: 'sudoeste', churchesCount: 0, lat: -18.4483, lng: -50.4517 },
  { id: 'sao_simao', name: 'São Simão', macroRegionId: 'sudoeste', churchesCount: 0, lat: -18.9911, lng: -50.5439 },

  // Oeste
  { id: 'ipora', name: 'Iporá', macroRegionId: 'oeste', churchesCount: 0, lat: -16.4419, lng: -51.1178 },
  { id: 'jussara', name: 'Jussara', macroRegionId: 'oeste', churchesCount: 0, lat: -15.8653, lng: -50.8669 },
  { id: 'sao_luis', name: 'São Luís de Montes Belos', macroRegionId: 'oeste', churchesCount: 0, lat: -16.5239, lng: -50.3236 },
  { id: 'itaberaí', name: 'Itaberaí', macroRegionId: 'oeste', churchesCount: 0, lat: -16.0203, lng: -49.8106 },
  { id: 'itapuranga', name: 'Itapuranga', macroRegionId: 'oeste', churchesCount: 0, lat: -15.5622, lng: -49.9486 },
  { id: 'itapaci', name: 'Itapaci', macroRegionId: 'oeste', churchesCount: 0, lat: -14.9506, lng: -49.5494 },
  
  // Nordeste
  { id: 'campos_belos', name: 'Campos Belos', macroRegionId: 'nordeste', churchesCount: 0, lat: -13.0369, lng: -46.2208 },
  { id: 'posse', name: 'Posse', macroRegionId: 'nordeste', churchesCount: 0, lat: -14.0931, lng: -46.3606 },
  
  // Entorno DF
  { id: 'planaltina', name: 'Planaltina GO', macroRegionId: 'entorno_df', churchesCount: 0, lat: -15.4528, lng: -47.6142 },
  { id: 'formosa', name: 'Formosa', macroRegionId: 'entorno_df', churchesCount: 0, lat: -15.5369, lng: -47.3364 },
  { id: 'aguas_lindas', name: 'Águas Lindas', macroRegionId: 'entorno_df', churchesCount: 0, lat: -15.7725, lng: -48.2483 },
  { id: 'santo_antonio', name: 'Santo Antônio', macroRegionId: 'entorno_df', churchesCount: 0, lat: -15.8719, lng: -48.2586 },
  { id: 'valparaiso', name: 'Valparaíso', macroRegionId: 'entorno_df', churchesCount: 0, lat: -16.0686, lng: -47.9764 },
  { id: 'luziania', name: 'Luziânia', macroRegionId: 'entorno_df', churchesCount: 0, lat: -16.2525, lng: -47.9503 },
  { id: 'cristalina', name: 'Cristalina', macroRegionId: 'entorno_df', churchesCount: 0, lat: -16.7686, lng: -47.6136 },
];

export const initialChurches: Church[] = [];
