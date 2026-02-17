
export enum SubscriptionStatus {
  FREE = 'FREE',
  TRIAL = 'TRIAL',
  PREMIUM = 'PREMIUM',
  EXPIRED = 'EXPIRED'
}

export interface Profile {
  id: string;
  name: string;
  avatarUrl: string;
  points: number;
}

export interface User {
  id: string;
  email: string;
  subscriptionStatus: SubscriptionStatus;
  trialStartedAt?: number; // timestamp
  profiles: Profile[];
  currentProfileId?: string;
}

export interface Movie {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string; // Cloudflare/Mux Signed URL Simulation
  category: string;
  year: number;
  duration: string;
  rating: number;
}

export interface Comment {
  id: string;
  profileId: string;
  profileName: string;
  profileAvatar: string;
  text: string;
  timestamp: number; // video current time in seconds
  createdAt: number;
}

export interface RankingItem {
  profileId: string;
  name: string;
  avatar: string;
  points: number;
}
