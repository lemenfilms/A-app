
import React, { useState, useRef, useEffect } from 'react';
import { Movie, Profile, Comment } from '../types';
import { GeminiService } from '../services/geminiService';

interface PlayerProps {
  movie: Movie;
  profile: Profile;
  onBack: () => void;
}

const Player: React.FC<PlayerProps> = ({ movie, profile, onBack }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setComments([
      { id: '1', profileId: 'ai', profileName: 'Gemini AI', profileAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Gemini', text: `Oi ${profile.name}! Sou o Gemini. Vou assistir "${movie.title}" com você!`, timestamp: 0, createdAt: Date.now() }
    ]);
  }, [movie]);

  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [comments, isTyping]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const userMsg = newComment;
    setNewComment('');

    const msg: Comment = {
      id: Math.random().toString(),
      profileId: profile.id,
      profileName: profile.name,
      profileAvatar: profile.avatarUrl,
      text: userMsg,
      timestamp: Math.floor(currentTime),
      createdAt: Date.now()
    };

    setComments(prev => [...prev, msg]);
    setIsTyping(true);

    const reply = await GeminiService.getChatReply(userMsg, movie.title, Math.floor(currentTime).toString());
    
    setIsTyping(false);
    setComments(prev => [...prev, {
      id: Math.random().toString(),
      profileId: 'ai',
      profileName: 'Gemini AI',
      profileAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Gemini',
      text: reply,
      timestamp: Math.floor(currentTime),
      createdAt: Date.now()
    }]);
  };

  const formatTime = (time: number) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black overflow-hidden flex flex-col md:flex-row">
      {/* Viewport do Vídeo */}
      <div className={`relative flex-1 bg-black group transition-all duration-500`}>
        <video 
          ref={videoRef}
          src={movie.videoUrl}
          className="w-full h-full object-contain"
          autoPlay
          onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime || 0)}
          onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
          onClick={() => setShowControls(!showControls)}
        />

        {/* Controles Overlay */}
        <div className={`absolute inset-0 bg-black/40 flex flex-col justify-between p-6 transition-opacity duration-300 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="flex justify-between items-center">
            <button onClick={onBack} className="text-3xl p-2 drop-shadow-md active:scale-90 transition"><i className="fa fa-arrow-left"></i></button>
            <div className="text-center flex flex-col items-center">
               <h4 className="text-sm font-bold opacity-80 uppercase tracking-widest">Watching Now</h4>
               <h3 className="text-lg font-black">{movie.title}</h3>
            </div>
            <button onClick={() => setShowChat(!showChat)} className={`text-3xl p-2 transition ${showChat ? 'text-red-600 animate-pulse' : 'text-white'}`}>
              <i className="fa fa-comments"></i>
            </button>
          </div>

          <div className="flex items-center justify-center space-x-12">
            <button className="text-4xl opacity-80 hover:opacity-100"><i className="fa fa-rotate-left"></i></button>
            <button onClick={togglePlay} className="text-8xl text-white/95 hover:scale-105 transition active:scale-90">
              <i className={`fa ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
            </button>
            <button className="text-4xl opacity-80 hover:opacity-100"><i className="fa fa-rotate-right"></i></button>
          </div>

          <div className="space-y-4 px-4 pb-8">
             <div className="h-1.5 bg-neutral-600 rounded-full relative overflow-hidden">
                <div className="h-full bg-red-600 transition-all duration-100" style={{ width: `${(currentTime/duration)*100}%` }}></div>
             </div>
             <div className="flex justify-between text-xs font-bold font-mono tracking-tighter">
                <span>{formatTime(currentTime)}</span>
                <span className="text-neutral-500">{formatTime(duration)}</span>
             </div>
          </div>
        </div>
      </div>

      {/* Chat Lateral de Cena */}
      <div className={`bg-[#0a0a0a] border-l border-neutral-900 transition-all duration-500 flex flex-col ${showChat ? 'w-full md:w-96 h-1/2 md:h-full translate-y-0' : 'w-0 h-0 translate-y-full md:translate-y-0 overflow-hidden'}`}>
        <div className="p-6 border-b border-neutral-900 flex justify-between items-center bg-neutral-900/20">
          <div>
            <span className="font-black text-sm uppercase tracking-widest text-red-600">Scene Chat</span>
            <p className="text-[10px] text-neutral-500 font-bold">GEMINI CO-VIEWER ACTIVE</p>
          </div>
          <button onClick={() => setShowChat(false)} className="text-neutral-500 hover:text-white transition"><i className="fa fa-times text-xl"></i></button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
          {comments.map(c => (
            <div key={c.id} className={`flex items-start space-x-3 ${c.profileId === profile.id ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <img src={c.profileAvatar} className="w-8 h-8 rounded-lg shadow-lg border border-neutral-800" />
              <div className="flex flex-col max-w-[75%]">
                <div className={`px-4 py-3 rounded-2xl text-xs font-medium shadow-md ${c.profileId === profile.id ? 'bg-red-600 text-white rounded-tr-none' : 'bg-neutral-800 text-neutral-200 rounded-tl-none'}`}>
                  {c.text}
                </div>
                <span className={`text-[9px] mt-1 text-neutral-500 font-bold ${c.profileId === profile.id ? 'text-right' : 'text-left'}`}>
                  SINC {formatTime(c.timestamp)}
                </span>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center space-x-2 text-[10px] text-neutral-500 animate-pulse italic">
              <div className="flex space-x-1">
                <span className="w-1 h-1 bg-neutral-500 rounded-full"></span>
                <span className="w-1 h-1 bg-neutral-500 rounded-full"></span>
              </div>
              <span>Gemini está analisando a cena...</span>
            </div>
          )}
          <div ref={chatEndRef}></div>
        </div>

        <form onSubmit={handleAddComment} className="p-6 bg-neutral-900/40 border-t border-neutral-900 flex items-center space-x-3">
          <input 
            type="text" 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="O que achou disso?..." 
            className="flex-1 bg-neutral-800 border-none rounded-xl px-5 py-3 text-xs focus:ring-2 focus:ring-red-600 transition placeholder:text-neutral-500"
          />
          <button type="submit" disabled={!newComment.trim()} className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white disabled:opacity-50 active:scale-90 transition">
            <i className="fa fa-paper-plane text-sm"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Player;
