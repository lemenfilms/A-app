
import React, { useState, useEffect, useCallback } from 'react';
import { User, SubscriptionStatus, Profile, Movie } from './types';
import { AuthService } from './services/authService';
import Splash from './views/Splash';
import Login from './views/Login';
import ProfileSelector from './views/ProfileSelector';
import Home from './views/Home';
import MovieDetail from './views/MovieDetail';
import Player from './views/Player';

const App: React.FC = () => {
  const [view, setView] = useState<'splash' | 'login' | 'profiles' | 'home' | 'detail' | 'player'>('splash');
  const [user, setUser] = useState<User | null>(null);
  const [activeProfile, setActiveProfile] = useState<Profile | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const savedUser = AuthService.getCurrentUser();
      if (savedUser) {
        setUser(savedUser);
        setView('profiles');
      } else {
        setView('login');
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async (email: string) => {
    const loggedUser = await AuthService.login(email);
    setUser(loggedUser);
    setView('profiles');
  };

  const handleSelectProfile = (profile: Profile) => {
    setActiveProfile(profile);
    setView('home');
  };

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    setView('detail');
  };

  const handleStartPlay = () => {
    if (user && user.subscriptionStatus === SubscriptionStatus.FREE) {
       AuthService.updateTrialStatus(user).then(updated => {
         setUser(updated);
         setView('player');
       });
    } else {
      setView('player');
    }
  };

  // Check trial expiration (Simulated Cloud Function Logic)
  useEffect(() => {
    if (user && user.trialStartedAt && user.subscriptionStatus === SubscriptionStatus.TRIAL) {
      const interval = setInterval(() => {
        const elapsedSeconds = (Date.now() - user.trialStartedAt!) / 1000;
        const oneHour = 3600;
        if (elapsedSeconds > oneHour) {
          const expiredUser = { ...user, subscriptionStatus: SubscriptionStatus.EXPIRED };
          setUser(expiredUser);
          localStorage.setItem('gemini_stream_user', JSON.stringify(expiredUser));
          if (view === 'player') setView('detail');
          alert("Your trial has expired. Please subscribe to continue watching.");
        }
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [user, view]);

  return (
    <div className="bg-black min-h-screen text-white">
      {view === 'splash' && <Splash />}
      {view === 'login' && <Login onLogin={handleLogin} />}
      {view === 'profiles' && user && (
        <ProfileSelector profiles={user.profiles} onSelect={handleSelectProfile} />
      )}
      {view === 'home' && activeProfile && (
        <Home 
          profile={activeProfile} 
          onSelectMovie={handleSelectMovie} 
          onLogout={() => { AuthService.logout(); setView('login'); }}
          onSwitchProfile={() => setView('profiles')}
        />
      )}
      {view === 'detail' && selectedMovie && (
        <MovieDetail 
          movie={selectedMovie} 
          userStatus={user?.subscriptionStatus || SubscriptionStatus.FREE}
          onBack={() => setView('home')} 
          onPlay={handleStartPlay}
        />
      )}
      {view === 'player' && selectedMovie && activeProfile && (
        <Player 
          movie={selectedMovie} 
          profile={activeProfile}
          onBack={() => setView('detail')} 
        />
      )}
    </div>
  );
};

export default App;
