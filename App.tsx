import React, { useState } from 'react';
import RiskForm from './components/RiskForm';
import RiskReport from './components/RiskReport';
import { analyzeRisk } from './services/geminiService';
import { RiskInput, BlastAnalysis } from './types';
import { AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [analysis, setAnalysis] = useState<BlastAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = async (input: RiskInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await analyzeRisk(input);
      setAnalysis(result);
    } catch (err: any) {
      console.error(err);
      setError("Failed to generate risk analysis. Please ensure your API key is configured correctly and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetAnalysis = () => {
    setAnalysis(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-slate-200 flex flex-col">
      
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">R</span>
                </div>
                <span className="font-bold text-xl tracking-tight text-slate-900">Risk Architect</span>
            </div>
            <div className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                Authorized Use Only
            </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex-grow">
        {error && (
            <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 text-red-800">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm">{error}</p>
            </div>
        )}

        {!analysis ? (
          <RiskForm onSubmit={handleAnalysis} isLoading={isLoading} />
        ) : (
          <RiskReport analysis={analysis} onReset={resetAnalysis} />
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-slate-500 font-medium">
                    &copy; {new Date().getFullYear()} Enterprise Risk Architect. Designed by - Sourabh (Product Leader).
                </p>
                <div className="flex gap-6 text-sm text-slate-400">
                    <span>Confidential</span>
                    <span>Audit Log Active</span>
                    <span>v1.1.0</span>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;