export interface Creator {
  id: string;
  username: string;
  bio: string;
  category: 'Art Numérique' | 'Musique' | 'Mode' | 'Illustrations' | 'Photographie' | 'Jeux Vidéo';
  profilePictureUrl: string;
  bannerImageUrl: string;
}

export interface IPAsset {
  id: string;
  creatorId: string;
  name: string;
  description: string;
  licenseType: 'exclusive' | 'remix_allowed' | 'commercial_use';
  royaltyTokensEmitted: number;
}

export interface Design {
  id: string;
  name: string;
  ipAssetId: string;
  imageUrl: string;
}

export interface MerchProduct {
  id: string;
  designId: string;
  type: 'T-shirt' | 'Mug' | 'Hoodie' | 'Poster';
  name: string;
  price: number;
  currency: 'EUR' | 'USD';
  availableSizes?: string[];
}

export const mockCreators: Creator[] = [
  {
    id: 'creator1',
    username: '@PixelRider',
    bio: 'Artiste 3D passionné par les univers cosmiques.',
    category: 'Art Numérique',
    profilePictureUrl: 'https://via.placeholder.com/150?text=Pixel',
    bannerImageUrl: 'https://via.placeholder.com/600x200?text=PixelRider',
  },
  {
    id: 'creator2',
    username: '@MelodyMaker',
    bio: 'Producteur de beats électroniques et mélodiques.',
    category: 'Musique',
    profilePictureUrl: 'https://via.placeholder.com/150?text=Melody',
    bannerImageUrl: 'https://via.placeholder.com/600x200?text=MelodyMaker',
  },
  {
    id: 'creator3',
    username: '@StyleGuru',
    bio: 'Designer mode inspiré par la street culture.',
    category: 'Mode',
    profilePictureUrl: 'https://via.placeholder.com/150?text=Style',
    bannerImageUrl: 'https://via.placeholder.com/600x200?text=StyleGuru',
  },
  {
    id: 'creator4',
    username: '@SnapMaster',
    bio: 'Photographe de scènes urbaines et naturelles.',
    category: 'Photographie',
    profilePictureUrl: 'https://via.placeholder.com/150?text=Snap',
    bannerImageUrl: 'https://via.placeholder.com/600x200?text=SnapMaster',
  },
];

export const mockIPAssets: IPAsset[] = [
  {
    id: 'ip1',
    creatorId: 'creator1',
    name: 'Cosmic Dream',
    description: 'Série d\'illustrations spatiales aux couleurs vives.',
    licenseType: 'exclusive',
    royaltyTokensEmitted: 1000,
  },
  {
    id: 'ip2',
    creatorId: 'creator1',
    name: 'Neon City',
    description: 'Visuels cyberpunk baignés de néons.',
    licenseType: 'remix_allowed',
    royaltyTokensEmitted: 500,
  },
  {
    id: 'ip3',
    creatorId: 'creator2',
    name: 'Chill Vibes Album',
    description: 'Collection de morceaux lo-fi relaxants.',
    licenseType: 'commercial_use',
    royaltyTokensEmitted: 2000,
  },
  {
    id: 'ip4',
    creatorId: 'creator2',
    name: 'Synthwave Beats',
    description: 'Pistes aux sonorités rétro futuristes.',
    licenseType: 'remix_allowed',
    royaltyTokensEmitted: 1500,
  },
  {
    id: 'ip5',
    creatorId: 'creator3',
    name: 'Urban Wear Collection',
    description: 'Ligne de vêtements inspirée de la culture urbaine.',
    licenseType: 'exclusive',
    royaltyTokensEmitted: 800,
  },
  {
    id: 'ip6',
    creatorId: 'creator3',
    name: 'Vintage Revival',
    description: 'Designs revisitant des classiques rétro.',
    licenseType: 'commercial_use',
    royaltyTokensEmitted: 600,
  },
  {
    id: 'ip7',
    creatorId: 'creator4',
    name: 'Street Life Photos',
    description: 'Clairs-obscurs de la vie urbaine.',
    licenseType: 'exclusive',
    royaltyTokensEmitted: 900,
  },
  {
    id: 'ip8',
    creatorId: 'creator4',
    name: 'Nature Wonders',
    description: 'Paysages majestueux capturés à travers le monde.',
    licenseType: 'commercial_use',
    royaltyTokensEmitted: 1200,
  },
];

export const mockDesigns: Design[] = [
  { id: 'd1', name: 'Cosmic Flow', ipAssetId: 'ip1', imageUrl: 'https://via.placeholder.com/300?text=Cosmic+Flow' },
  { id: 'd2', name: 'Neon Skyline', ipAssetId: 'ip2', imageUrl: 'https://via.placeholder.com/300?text=Neon+Skyline' },
  { id: 'd3', name: 'Chill Cover', ipAssetId: 'ip3', imageUrl: 'https://via.placeholder.com/300?text=Chill+Cover' },
  { id: 'd4', name: 'Synthwave Poster', ipAssetId: 'ip4', imageUrl: 'https://via.placeholder.com/300?text=Synthwave' },
  { id: 'd5', name: 'Street Tee', ipAssetId: 'ip5', imageUrl: 'https://via.placeholder.com/300?text=Street+Tee' },
  { id: 'd6', name: 'Retro Hoodie', ipAssetId: 'ip6', imageUrl: 'https://via.placeholder.com/300?text=Retro+Hoodie' },
  { id: 'd7', name: 'City Snap', ipAssetId: 'ip7', imageUrl: 'https://via.placeholder.com/300?text=City+Snap' },
  { id: 'd8', name: 'Mountain Light', ipAssetId: 'ip8', imageUrl: 'https://via.placeholder.com/300?text=Mountain+Light' },
];

export const mockMerchProducts: MerchProduct[] = [
  {
    id: 'p1',
    designId: 'd1',
    type: 'T-shirt',
    name: "T-shirt 'Cosmic Flow'",
    price: 25.99,
    currency: 'USD',
    availableSizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'p2',
    designId: 'd1',
    type: 'Mug',
    name: "Mug 'Cosmic Flow'",
    price: 12.99,
    currency: 'USD',
  },
  {
    id: 'p3',
    designId: 'd2',
    type: 'Hoodie',
    name: "Hoodie 'Neon Skyline'",
    price: 39.99,
    currency: 'USD',
    availableSizes: ['M', 'L', 'XL'],
  },
  {
    id: 'p4',
    designId: 'd2',
    type: 'Poster',
    name: "Poster 'Neon Skyline'",
    price: 14.99,
    currency: 'USD',
  },
  {
    id: 'p5',
    designId: 'd3',
    type: 'T-shirt',
    name: "T-shirt 'Chill Cover'",
    price: 22.99,
    currency: 'EUR',
    availableSizes: ['S', 'M', 'L'],
  },
  {
    id: 'p6',
    designId: 'd3',
    type: 'Poster',
    name: "Poster 'Chill Cover'",
    price: 11.99,
    currency: 'EUR',
  },
  {
    id: 'p7',
    designId: 'd4',
    type: 'Mug',
    name: "Mug 'Synthwave'",
    price: 13.99,
    currency: 'EUR',
  },
  {
    id: 'p8',
    designId: 'd4',
    type: 'T-shirt',
    name: "T-shirt 'Synthwave'",
    price: 27.99,
    currency: 'EUR',
    availableSizes: ['M', 'L', 'XL'],
  },
  {
    id: 'p9',
    designId: 'd5',
    type: 'T-shirt',
    name: "T-shirt 'Street Tee'",
    price: 26.99,
    currency: 'USD',
    availableSizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'p10',
    designId: 'd5',
    type: 'Poster',
    name: "Poster 'Street Tee'",
    price: 15.99,
    currency: 'USD',
  },
  {
    id: 'p11',
    designId: 'd6',
    type: 'Hoodie',
    name: "Hoodie 'Retro Hoodie'",
    price: 42.99,
    currency: 'USD',
    availableSizes: ['M', 'L', 'XL'],
  },
  {
    id: 'p12',
    designId: 'd6',
    type: 'Mug',
    name: "Mug 'Retro Hoodie'",
    price: 13.49,
    currency: 'USD',
  },
  {
    id: 'p13',
    designId: 'd7',
    type: 'Poster',
    name: "Poster 'City Snap'",
    price: 16.99,
    currency: 'EUR',
  },
  {
    id: 'p14',
    designId: 'd7',
    type: 'T-shirt',
    name: "T-shirt 'City Snap'",
    price: 28.99,
    currency: 'EUR',
    availableSizes: ['S', 'M', 'L'],
  },
  {
    id: 'p15',
    designId: 'd8',
    type: 'Poster',
    name: "Poster 'Mountain Light'",
    price: 18.99,
    currency: 'USD',
  },
  {
    id: 'p16',
    designId: 'd8',
    type: 'T-shirt',
    name: "T-shirt 'Mountain Light'",
    price: 29.99,
    currency: 'USD',
    availableSizes: ['M', 'L', 'XL'],
  },
];

export const getCreatorData = () => {
  return mockCreators.map((creator) => {
    const creatorIPs = mockIPAssets.filter((ip) => ip.creatorId === creator.id);
    const creatorDesigns = mockDesigns.filter((d) =>
      creatorIPs.some((ip) => ip.id === d.ipAssetId)
    );
    const creatorMerch = mockMerchProducts.filter((product) =>
      creatorDesigns.some((design) => design.id === product.designId)
    );
    return {
      ...creator,
      ips: creatorIPs,
      designs: creatorDesigns,
      merch: creatorMerch,
    };
  });
};
