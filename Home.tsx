
import React, { useState, useEffect } from 'react';
import { Profile, Movie } from '../types';
import { MOCK_MOVIES } from '../constants';
import { GeminiService } from '../services/geminiService';

interface HomeProps {
  profile: Profile;
  onSelectMovie: (movie: Movie) => void;
  onLogout: () => void;
  onSwitchProfile: () => void;
}

const Home: React.FC<HomeProps> = ({ profile, onSelectMovie, onLogout, onSwitchProfile }) => {
  const [aiRecs, setAiRecs] = useState<string[]>([]);
  const [humor, setHumor] = useState('Relaxado');
  const [loadingRecs, setLoadingRecs] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  const fetchRecs = async (selectedHumor: string) => {
    setLoadingRecs(true);
    const ids = await GeminiService.getRecommendationsByHumor(selectedHumor, MOCK_MOVIES);
    setAiRecs(ids);
    setLoadingRecs(false);
  };

  useEffect(() => {
    fetchRecs(humor);
  }, []);

  const categories = ['Sci-Fi', 'Documentary', 'Nature', 'Thriller'];

  return (
    <div className="min-h-screen bg-black pb-32">
      {/* App Bar Estilo Android */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent p-6 flex justify-between items-center backdrop-blur-sm">
        <h1 className="text-3xl font-black text-red-600 tracking-tighter italic">GEMINI</h1>
        <div className="flex items-center space-x-6">
          <button className="text-xl"><i className="fa fa-search"></i></button>
          <img 
            onClick={onSwitchProfile}
            src={profile.avatarUrl} 
            className="w-8 h-8 rounded shadow-md border border-neutral-700 active:scale-90 transition cursor-pointer" 
            alt="avatar" 
          />
        </div>
      </header>

      {/* Hero Content */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        <img 
          src={MOCK_MOVIES[0].thumbnailUrl} 
          className="w-full h-full object-cover scale-110 blur-[2px] opacity-60 absolute" 
          alt="bg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end items-center px-6 pb-12">
          <img src={MOCK_MOVIES[0].thumbnailUrl} className="w-2/3 max-w-[200px] aspect-video object-cover rounded shadow-2xl mb-6 border border-neutral-800" />
          <div className="flex space-x-3 text-[10px] font-bold uppercase tracking-widest text-neutral-300 mb-6">
            <span>Explosivo</span>
            <span className="text-red-600">•</span>
            <span>Inteligente</span>
            <span className="text-red-600">•</span>
            <span>Futurista</span>
          </div>
          <div className="flex space-x-3 w-full max-w-sm">
            <button className="flex-1 py-3 bg-neutral-800/80 rounded flex items-center justify-center space-x-2 font-bold text-sm">
              <i className="fa fa-plus"></i>
              <span>Minha Lista</span>
            </button>
            <button 
              onClick={() => onSelectMovie(MOCK_MOVIES[0])}
              className="flex-1 py-3 bg-white text-black rounded flex items-center justify-center space-x-2 font-bold text-sm shadow-xl active:scale-95 transition"
            >
              <i className="fa fa-play"></i>
              <span>Assistir</span>
            </button>
          </div>
        </div>
      </div>

      {/* Gemini AI Recommendation Section */}
      <section className="px-4 mt-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 text-red-500">
            <i className="fa fa-sparkles animate-pulse"></i>
            <h3 className="text-lg font-bold text-white">Escolhas da IA</h3>
          </div>
          <select 
            value={humor}
            onChange={(e) => { setHumor(e.target.value); fetchRecs(e.target.value); }}
            className="bg-neutral-900 text-[10px] py-1 px-3 rounded-full border border-neutral-700 font-bold uppercase"
          >
            <option>Relaxado</option>
            <option>Aventureiro</option>
            <option>Produtivo</option>
          </select>
        </div>
        <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
          {loadingRecs ? (
            [1,2,3].map(i => <div key={i} className="flex-none w-32 h-48 bg-neutral-900 rounded-md animate-pulse"></div>)
          ) : (
            MOCK_MOVIES.filter(m => aiRecs.includes(m.id)).map(movie => (
              <MovieCard key={movie.id} movie={movie} onClick={() => onSelectMovie(movie)} />
            ))
          )}
        </div>
      </section>

      {/* Categorias */}
      {categories.map(cat => (
        <section key={cat} className="px-4 mt-8">
          <h3 className="text-lg font-bold mb-3">{cat}</h3>
          <div className="flex space-x-3 overflow-x-auto pb-4 scrollbar-hide">
            {MOCK_MOVIES.filter(m => m.category === cat).map(movie => (
              <MovieCard key={movie.id} movie={movie} onClick={() => onSelectMovie(movie)} />
            ))}
          </div>
        </section>
      ))}

      {/* Bottom Navigation Android Nativa */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-neutral-900 flex justify-around items-center py-3 safe-bottom z-50">
        <NavButton active={activeTab === 'home'} icon="fa-house" label="Home" onClick={() => setActiveTab('home')} />
        <NavButton active={activeTab === 'games'} icon="fa-gamepad" label="Jogos" onClick={() => setActiveTab('games')} />
        <NavButton active={activeTab === 'new'} icon="fa-layer-group" label="Novidades" onClick={() => setActiveTab('new')} />
        <NavButton active={activeTab === 'downloads'} icon="fa-circle-down" label="Downloads" onClick={() => setActiveTab('downloads')} />
        <NavButton active={activeTab === 'more'} icon="fa-bars" label="Mais" onClick={() => setActiveTab('more')} />
      </nav>
    </div>
  );
};

const NavButton = ({ active, icon, label, onClick }: any) => (
  <button onClick={onClick} className={`flex flex-col items-center space-y-1 transition-all ${active ? 'text-white' : 'text-neutral-500'}`}>
    <i className={`fa ${icon} ${active ? 'text-xl' : 'text-lg'}`}></i>
    <span className="text-[10px] font-bold">{label}</span>
  </button>
);

const MovieCard: React.FC<{ movie: Movie; onClick: () => void }> = ({ movie, onClick }) => (
  <div 
    onClick={onClick}
    className="flex-none w-32 h-48 rounded-md overflow-hidden bg-neutral-900 active:scale-95 transition shadow-lg border border-neutral-800"
  >
    <img src={movie.thumbnailUrl} className="w-full h-full object-cover" alt={movie.title} />
  </div>
);

export default Home;
