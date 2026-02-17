
import { GoogleGenAI, Type } from "@google/genai";
import { Movie } from "../types";

export class GeminiService {
  private static ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  static async getRecommendationsByHumor(humor: string, movies: Movie[]): Promise<string[]> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analise o humor do usuário: "${humor}". Com base nisso, escolha os IDs dos filmes mais adequados desta lista: ${JSON.stringify(movies.map(m => ({ id: m.id, title: m.title, category: m.category })))}. Retorne APENAS um array JSON de IDs.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        }
      });
      return JSON.parse(response.text || "[]");
    } catch (error) {
      console.error("Erro nas recomendações:", error);
      return movies.slice(0, 3).map(m => m.id);
    }
  }

  static async getChatReply(userMessage: string, movieTitle: string, timestamp: string): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Você é um entusiasta de cinema assistindo "${movieTitle}" com um amigo. No segundo ${timestamp} do filme, ele disse: "${userMessage}". Responda de forma curta, natural e empolgada em português.`,
      });
      return response.text || "Caramba, essa cena é épica!";
    } catch (error) {
      return "Estou sem palavras para essa cena!";
    }
  }

  static async getSmartDescription(movie: Movie): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Crie uma frase de impacto (hook) curta e viciante no estilo Netflix para o filme "${movie.title}". Descrição original: ${movie.description}`,
      });
      return response.text || movie.description;
    } catch (error) {
      return movie.description;
    }
  }
}
