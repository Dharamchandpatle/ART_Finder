import React, { useState } from 'react';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { InsightsDashboard } from './components/InsightsDashboard';
import { mockAnalysisResult } from './mockData';
import type { AnalysisResult } from './types';

function App() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = (inputData: any) => {
    // In a real application, this would make an API call
    // For now, we'll use mock data
    console.log('Analysis input:', inputData);
    setAnalysisResult(mockAnalysisResult);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto py-8">
        <InputSection onAnalyze={handleAnalyze} />
        {analysisResult && <InsightsDashboard data={analysisResult} />}
      </main>
    </div>
  );
}

export default App;