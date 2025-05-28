import { useState } from 'react'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-400">MintyShirt</h1>
            <nav className="ml-10 hidden md:flex">
              <a href="#" className="px-4 py-2 hover:text-blue-400">Explorer</a>
              <a href="#" className="px-4 py-2 hover:text-blue-400">DesignHub</a>
              <a href="#" className="px-4 py-2 hover:text-blue-400">Créateurs</a>
              <a href="#" className="px-4 py-2 hover:text-blue-400">TokenSwap</a>
            </nav>
          </div>
          <div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
              Connecter Wallet
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">Créez, Partagez, Monétisez</h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            La première plateforme décentralisée pour les créateurs de designs de t-shirts, 
            propulsée par la blockchain et la technologie IP de Story Protocol.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium">
              Explorer les Designs
            </button>
            <button className="border border-blue-500 text-blue-500 hover:bg-blue-500/10 px-6 py-3 rounded-lg font-medium">
              Devenir Créateur
            </button>
          </div>
        </div>
      </section>

      {/* Featured Designs */}
      <section className="py-16 px-6 bg-gray-800/50">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-10 text-center">Designs Populaires</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Design Card 1 */}
            <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all">
              <div className="h-64 bg-gray-700"></div>
              <div className="p-4">
                <h4 className="text-xl font-semibold mb-2">Cosmic Dreams</h4>
                <p className="text-gray-400 mb-3">Par @stellardesigner</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-400">0.05 ETH</span>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm">
                    Voir
                  </button>
                </div>
              </div>
            </div>

            {/* Design Card 2 */}
            <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all">
              <div className="h-64 bg-gray-700"></div>
              <div className="p-4">
                <h4 className="text-xl font-semibold mb-2">Urban Legend</h4>
                <p className="text-gray-400 mb-3">Par @cityartist</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-400">0.08 ETH</span>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm">
                    Voir
                  </button>
                </div>
              </div>
            </div>

            {/* Design Card 3 */}
            <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all">
              <div className="h-64 bg-gray-700"></div>
              <div className="p-4">
                <h4 className="text-xl font-semibold mb-2">Digital Nomad</h4>
                <p className="text-gray-400 mb-3">Par @techcreative</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-400">0.12 ETH</span>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm">
                    Voir
                  </button>
                </div>
              </div>
            </div>

            {/* Design Card 4 */}
            <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all">
              <div className="h-64 bg-gray-700"></div>
              <div className="p-4">
                <h4 className="text-xl font-semibold mb-2">Nature's Call</h4>
                <p className="text-gray-400 mb-3">Par @ecodesigner</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-400">0.07 ETH</span>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm">
                    Voir
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-10">
            <button className="border border-blue-500 text-blue-500 hover:bg-blue-500/10 px-6 py-3 rounded-lg font-medium">
              Voir Plus de Designs
            </button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-12 text-center">Comment ça marche</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h4 className="text-xl font-semibold mb-3">Créez & Enregistrez</h4>
              <p className="text-gray-400">
                Téléversez vos designs et enregistrez-les comme propriété intellectuelle sur la blockchain.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h4 className="text-xl font-semibold mb-3">Partagez & Licenciez</h4>
              <p className="text-gray-400">
                Définissez vos conditions de licence et permettez à d'autres de remixer ou d'utiliser vos créations.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h4 className="text-xl font-semibold mb-3">Monétisez & Gagnez</h4>
              <p className="text-gray-400">
                Recevez des royalties automatiques via des tokens chaque fois que vos designs sont utilisés.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-10 px-6 border-t border-gray-700">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold text-blue-400">MintyShirt</h2>
              <p className="text-gray-400 mt-2">La plateforme de design décentralisée</p>
            </div>
            <div className="flex flex-col md:flex-row gap-8">
              <div>
                <h5 className="font-semibold mb-3">Explorer</h5>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-blue-400">Tous les designs</a></li>
                  <li><a href="#" className="hover:text-blue-400">Créateurs</a></li>
                  <li><a href="#" className="hover:text-blue-400">TokenSwap</a></li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold mb-3">Ressources</h5>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-blue-400">Documentation</a></li>
                  <li><a href="#" className="hover:text-blue-400">Tutoriels</a></li>
                  <li><a href="#" className="hover:text-blue-400">FAQ</a></li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold mb-3">Communauté</h5>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-blue-400">Discord</a></li>
                  <li><a href="#" className="hover:text-blue-400">Twitter</a></li>
                  <li><a href="#" className="hover:text-blue-400">Blog</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500">
            <p>© 2025 MintyShirt. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
