export interface AnalysisResult {
  painPoints: string[];
  hooksAndCTAs: string[];
  sentimentScore: number;
  trendingKeywords: string[];
  competitors: {
    name: string;
    hookScore: number;
    ctaScore: number;
  }[];
  recommendations: {
    adStyles: string[];
    sampleCTAs: string[];
    painPointSolutions: string[];
  };
  references: {
    type: 'youtube' | 'reddit' | 'quora' | 'review';
    title: string;
    url: string;
    rating?: number;
  }[];
}

export interface AnalysisInput {
  topic: string;
  targetAudience: string;
  brandTone: string;
  sources: string[];
}