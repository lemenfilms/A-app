
import React from 'react';
import { Profile } from '../types';

interface ProfileSelectorProps {
  profiles: Profile[];
  onSelect: (profile: Profile) => void;
}

const ProfileSelector: React.FC<ProfileSelectorProps> = ({ profiles, onSelect }) => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black">
      <h1 className="text-4xl md:text-5xl font-medium mb-10 text-white animate-fade-in">Who's watching?</h1>
      <div className="flex flex-wrap justify-center gap-6 md:gap-10">
        {profiles.map((profile) => (
          <div 
            key={profile.id} 
            className="group flex flex-col items-center cursor-pointer"
            onClick={() => onSelect(profile)}
          >
            <div className="w-24 h-24 md:w-36 md:h-36 mb-4 rounded-md overflow-hidden border-2 border-transparent group-hover:border-white transition-all duration-200 transform group-hover:scale-110">
              <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
            </div>
            <span className="text-neutral-400 text-lg group-hover:text-white transition-colors">{profile.name}</span>
          </div>
        ))}
        <div className="flex flex-col items-center cursor-pointer group">
          <div className="w-24 h-24 md:w-36 md:h-36 mb-4 rounded-md bg-neutral-800 flex items-center justify-center group-hover:bg-neutral-700 transition-all border-2 border-transparent group-hover:border-white">
            <i className="fa fa-plus text-4xl text-neutral-400"></i>
          </div>
          <span className="text-neutral-400 text-lg group-hover:text-white">Add Profile</span>
        </div>
      </div>
      <button className="mt-16 px-8 py-2 border border-neutral-600 text-neutral-400 hover:text-white hover:border-white transition font-medium">
        MANAGE PROFILES
      </button>
    </div>
  );
};

export default ProfileSelector;
