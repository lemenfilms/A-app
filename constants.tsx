
import { Movie } from './types';

export const COLORS = {
  PRIMARY: '#e50914',
  SECONDARY: '#221f1f',
  BACKGROUND: '#000000',
  TEXT: '#ffffff',
  GRAY: '#808080'
};

export const MOCK_MOVIES: Movie[] = [
  {
    id: '1',
    title: 'The AI Revolution',
    description: 'A deep dive into how Gemini is changing the world of engineering and creativity.',
    thumbnailUrl: 'https://picsum.photos/seed/ai1/800/450',
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    category: 'Sci-Fi',
    year: 2024,
    duration: '1h 24m',
    rating: 4.8
  },
  {
    id: '2',
    title: 'Midnight in Tokyo',
    description: 'Experience the vibrant life of Tokyo under the neon lights in this cinematic journey.',
    thumbnailUrl: 'https://picsum.photos/seed/tokyo/800/450',
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    category: 'Documentary',
    year: 2023,
    duration: '1h 10m',
    rating: 4.5
  },
  {
    id: '3',
    title: 'Code Breakers',
    description: 'The story of a team of developers racing against time to fix a global system failure.',
    thumbnailUrl: 'https://picsum.photos/seed/code/800/450',
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    category: 'Thriller',
    year: 2024,
    duration: '1h 45m',
    rating: 4.9
  },
  {
    id: '4',
    title: 'Nature Unleashed',
    description: 'Spectacular 4K footage of the most remote places on Earth.',
    thumbnailUrl: 'https://picsum.photos/seed/nature/800/450',
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    category: 'Nature',
    year: 2022,
    duration: '50m',
    rating: 4.7
  },
  {
    id: '5',
    title: 'Retro Wave',
    description: 'An exploration of the 80s aesthetic and its influence on modern tech.',
    thumbnailUrl: 'https://picsum.photos/seed/retro/800/450',
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    category: 'Culture',
    year: 2023,
    duration: '1h 15m',
    rating: 4.2
  }
];
