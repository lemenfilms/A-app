
import React, { useEffect, useState } from 'react';
import { Movie, SubscriptionStatus } from '../types';
import { GeminiService } from '../services/geminiService';

interface MovieDetailProps {
  movie: Movie;
  userStatus: SubscriptionStatus;
  onBack: () => void;
  onPlay: () => void;
}

const MovieDetail: React.FC<MovieDetailProps> = ({ movie, userStatus, onBack, onPlay }) => {
  const [hook, setHook] = useState('');

  useEffect(() => {
    GeminiService.getSmartDescription(movie).then(setHook);
  }, [movie]);

  const isExpired = userStatus === SubscriptionStatus.EXPIRED;

  return (
    <div className="fixed inset-0 z-[100] bg-black overflow-y-auto pb-20">
      {/* Botão de Fechar Nativo */}
      <button 
        onClick={onBack}
        className="fixed top-6 left-6 w-10 h-10 bg-black/60 rounded-full flex items-center justify-center backdrop-blur-md z-[110] border border-white/10 active:scale-90 transition"
      >
        <i className="fa fa-times text-lg"></i>
      </button>

      {/* Banner Principal */}
      <div className="relative w-full h-[55vh]">
        <img src={movie.thumbnailUrl} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
        <div className="absolute bottom-6 left-6 right-6">
           <h2 className="text-4xl font-black mb-6 tracking-tighter leading-none">{movie.title}</h2>
           <div className="flex flex-col space-y-3">
              {!isExpired ? (
                <button 
                  onClick={onPlay}
                  className="w-full py-4 bg-white text-black font-black rounded-md flex items-center justify-center space-x-3 shadow-xl active:scale-95 transition"
                >
                  <i className="fa fa-play text-xl"></i>
                  <span className="uppercase text-sm tracking-widest">Assistir Agora</span>
                </button>
              ) : (
                <button 
                  className="w-full py-4 bg-red-600 text-white font-black rounded-md flex items-center justify-center space-x-3 animate-pulse"
                >
                  <i className="fa fa-lock"></i>
                  <span className="uppercase text-sm tracking-widest">Renovar Assinatura</span>
                </button>
              )}
              <button className="w-full py-3 bg-neutral-800 text-white font-bold rounded-md flex items-center justify-center space-x-3 active:scale-95 transition">
                <i className="fa fa-download"></i>
                <span className="text-sm">Baixar</span>
              </button>
           </div>
        </div>
      </div>

      {/* Info Content */}
      <div className="p-6 space-y-6">
        <div className="flex items-center space-x-3 text-xs font-bold text-neutral-400">
          <span className="text-green-500 font-black tracking-tighter">98% Relevante</span>
          <span>{movie.year}</span>
          <span className="bg-neutral-800 px-2 py-0.5 rounded text-[10px] border border-neutral-700">18+</span>
          <span>{movie.duration}</span>
          <span className="border border-neutral-700 px-1 rounded-sm text-[8px]">4K</span>
        </div>

        <div className="space-y-4">
          <p className="text-neutral-200 text-lg leading-tight font-bold italic border-l-4 border-red-600 pl-4 py-1">
            {hook || 'Carregando análise do Gemini...'}
          </p>
          <p className="text-neutral-400 text-sm leading-relaxed">{movie.description}</p>
        </div>

        {/* Action Grid */}
        <div className="flex justify-around items-center py-6 border-y border-neutral-900">
           <ActionButton icon="fa-plus" label="Minha Lista" />
           <ActionButton icon="fa-thumbs-up" label="Classificar" />
           <ActionButton icon="fa-share-nodes" label="Compartilhar" />
        </div>

        {/* Similar Movies */}
        <div>
          <h4 className="text-sm font-black uppercase tracking-widest mb-4">Filmes Similares</h4>
          <div className="grid grid-cols-3 gap-3">
             {[1,2,3].map(i => (
               <div key={i} className="aspect-[2/3] bg-neutral-900 rounded-md overflow-hidden border border-neutral-800">
                 <img src={`https://picsum.photos/seed/sim${i}/200/300`} className="w-full h-full object-cover opacity-50" />
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ActionButton = ({ icon, label }: any) => (
  <button className="flex flex-col items-center space-y-2 group">
    <div className="w-10 h-10 flex items-center justify-center text-xl text-neutral-400 group-hover:text-white transition">
      <i className={`fa ${icon}`}></i>
    </div>
    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-tighter group-hover:text-neutral-300">{label}</span>
  </button>
);

export default MovieDetail;
