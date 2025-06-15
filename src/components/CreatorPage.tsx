import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import {
  mockCreators,
  mockIPAssets,
  mockDesigns,
  mockMerchProducts,
} from '../data/mockData';

export default function CreatorPage() {
  const { slug } = useParams<{ slug: string }>();
  const creator = mockCreators.find(
    (c) => c.username.slice(1).toLowerCase() === slug
  );

  if (!creator) {
    return (
      <div className="font-sans">
        <Navbar />
        <div className="max-w-7xl mx-auto mt-6 px-4 text-white">Créateur non trouvé.</div>
        <Footer />
      </div>
    );
  }

  const creatorIPs = mockIPAssets.filter((ip) => ip.creatorId === creator.id);
  const creatorDesigns = mockDesigns.filter((d) =>
    creatorIPs.some((ip) => ip.id === d.ipAssetId)
  );
  const creatorMerch = mockMerchProducts.filter((m) =>
    creatorDesigns.some((d) => d.id === m.designId)
  );

  return (
    <div className="font-sans">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-6 px-4 text-white space-y-6">
        <img
          src={creator.bannerImageUrl}
          alt="banner"
          className="w-full h-40 object-cover rounded"
        />
        <div className="flex items-center space-x-4">
          <img
            src={creator.profilePictureUrl}
            alt={creator.username}
            className="w-20 h-20 rounded-full border-2 border-white -mt-10"
          />
          <div>
            <h1 className="text-3xl font-bold">{creator.username}</h1>
            <p className="text-sm">{creator.bio}</p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Designs</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {creatorDesigns.map((design) => (
              <div
                key={design.id}
                className="bg-white/10 border border-purple-800 rounded p-2"
              >
                <img
                  src={design.imageUrl}
                  alt={design.name}
                  className="w-full h-32 object-cover mb-2"
                />
                <h3 className="font-semibold text-center">{design.name}</h3>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Produits merch</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {creatorMerch.map((product) => (
              <div
                key={product.id}
                className="bg-white/10 border border-purple-800 rounded p-2 text-center"
              >
                <p className="font-semibold">{product.name}</p>
                <p className="text-sm">
                  {product.price} {product.currency}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
