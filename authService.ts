
import { User, SubscriptionStatus } from '../types';

export class AuthService {
  private static STORAGE_KEY = 'gemini_stream_user';

  static async login(email: string): Promise<User> {
    // Simulate API delay
    await new Promise(r => setTimeout(r, 1000));
    
    const existing = localStorage.getItem(this.STORAGE_KEY);
    if (existing) {
      return JSON.parse(existing);
    }

    const newUser: User = {
      id: Math.random().toString(36).substring(7),
      email,
      subscriptionStatus: SubscriptionStatus.FREE,
      profiles: [
        { id: 'p1', name: 'Admin', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin', points: 0 },
        { id: 'p2', name: 'Kids', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kids', points: 10 }
      ]
    };

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newUser));
    return newUser;
  }

  static async updateTrialStatus(user: User): Promise<User> {
    if (user.subscriptionStatus === SubscriptionStatus.FREE) {
      user.subscriptionStatus = SubscriptionStatus.TRIAL;
      user.trialStartedAt = Date.now();
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    }
    return user;
  }

  static logout() {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  static getCurrentUser(): User | null {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }
}
