import type { AnalysisResult } from './types';

export const mockAnalysisResult: AnalysisResult = {
  painPoints: [
    "Limited workout customization",
    "Lack of progress tracking",
    "Poor integration with wearables",
    "Confusing subscription model"
  ],
  hooksAndCTAs: [
    "Start Your Fitness Journey Today",
    "Transform Your Workouts",
    "Join 1M+ Active Users",
    "Free 30-Day Trial"
  ],
  sentimentScore: 0.75,
  trendingKeywords: [
    "personalized workouts",
    "AI trainer",
    "progress tracking",
    "community challenges"
  ],
  competitors: [
    { name: "FitPro", hookScore: 85, ctaScore: 92 },
    { name: "GymBuddy", hookScore: 78, ctaScore: 88 },
    { name: "WorkoutAI", hookScore: 90, ctaScore: 85 }
  ],
  recommendations: {
    adStyles: ["Video testimonials", "Before/After showcases", "Feature demos"],
    sampleCTAs: ["Start Free Trial", "Join the Community", "Get Personal Plan"],
    painPointSolutions: [
      "Highlight AI-powered customization",
      "Show progress tracking features",
      "Demonstrate device integrations"
    ]
  },
  references: [
    {
      type: "youtube",
      title: "Why FitPro's Ad Campaign Succeeded",
      url: "https://youtube.com/watch?v=example1"
    },
    {
      type: "reddit",
      title: "Fitness App Users Discussion Thread",
      url: "https://reddit.com/r/fitness/comments/example"
    },
    {
      type: "quora",
      title: "What makes a fitness app successful?",
      url: "https://quora.com/q/example"
    },
    {
      type: "review",
      title: "FitPro App Store Review Analysis",
      url: "https://example.com/reviews",
      rating: 4.5
    }
  ]
};