import React, { useState } from 'react';
import { RiskInput } from '../types';
import { ChevronRight, Zap, Shield, Activity, Scale, RefreshCw, AlertTriangle } from 'lucide-react';

interface RiskFormProps {
  onSubmit: (data: RiskInput) => void;
  isLoading: boolean;
}

const RiskForm: React.FC<RiskFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<RiskInput>({
    context: '',
    proposedFeature: '',
    intendedOutcome: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isFormValid = formData.context && formData.proposedFeature && formData.intendedOutcome;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start animate-in fade-in duration-700">
      
      {/* Left Column: Context & Framework */}
      <div className="lg:col-span-5 space-y-8">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">Risk Architect</h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            An enterprise-grade risk assessment tool for regulated systems (Finance, Healthcare, Gov).
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
          <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider border-b border-slate-100 pb-2">
            The BLAST Framework
          </h3>
          
          <div className="space-y-5">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600 font-bold border border-blue-100">
                B
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 text-sm">Business Criticality</h4>
                <p className="text-xs text-slate-500 mt-1 leading-snug">How essential is this to core operations or revenue? Does failure stop the business?</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0 text-indigo-600 font-bold border border-indigo-100">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 text-sm">Legal & Regulatory</h4>
                <p className="text-xs text-slate-500 mt-1 leading-snug">Degree of compliance, audit, or legal exposure. Are we breaking the law if this fails?</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0 text-orange-600 font-bold border border-orange-100">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 text-sm">Amplification Speed</h4>
                <p className="text-xs text-slate-500 mt-1 leading-snug">How quickly do errors propagate? Can we stop it before it hits 100% of users?</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0 text-emerald-600 font-bold border border-emerald-100">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 text-sm">State Reversibility</h4>
                <p className="text-xs text-slate-500 mt-1 leading-snug">How hard is it to undo damage? Can we rollback, or is the data permanently corrupted?</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0 text-purple-600 font-bold border border-purple-100">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 text-sm">Trust Impact</h4>
                <p className="text-xs text-slate-500 mt-1 leading-snug">Impact on customer confidence and market credibility. Will this be a headline?</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
           <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-slate-400 flex-shrink-0" />
              <p className="text-xs text-slate-500 leading-relaxed">
                <strong>Note:</strong> This tool assumes drift, misuse, and edge cases. It is designed to prevent invisible systemic harm in high-stakes environments.
              </p>
           </div>
        </div>
      </div>

      {/* Right Column: Form */}
      <div className="lg:col-span-7">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 space-y-6">
          <div>
            <label htmlFor="context" className="block text-sm font-semibold text-slate-700 mb-2">
              Context
            </label>
            <p className="text-xs text-slate-500 mb-2">Describe the company type (e.g., Regional Bank, Healthcare Provider, Gov Agency)</p>
            <textarea
              id="context"
              name="context"
              value={formData.context}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all resize-none h-24 text-sm"
              placeholder="e.g. Tier-1 Investment Bank processing $50B daily volume..."
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="proposedFeature" className="block text-sm font-semibold text-slate-700 mb-2">
              Proposed Feature
            </label>
            <p className="text-xs text-slate-500 mb-2">Paste the PRD, feature description, workflow, or AI use case</p>
            <textarea
              id="proposedFeature"
              name="proposedFeature"
              value={formData.proposedFeature}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all resize-none h-32 text-sm"
              placeholder="e.g. Automated loan approval workflow using GenAI to analyze applicant PDF documents..."
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="intendedOutcome" className="block text-sm font-semibold text-slate-700 mb-2">
              Intended Outcome
            </label>
            <p className="text-xs text-slate-500 mb-2">What does the business want this to achieve?</p>
            <textarea
              id="intendedOutcome"
              name="intendedOutcome"
              value={formData.intendedOutcome}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all resize-none h-24 text-sm"
              placeholder="e.g. Reduce manual review time by 80% and increase approval throughput..."
              disabled={isLoading}
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={!isFormValid || isLoading}
              className={`w-full py-4 px-6 rounded-lg font-bold text-white transition-all flex items-center justify-center gap-2 group
                ${!isFormValid || isLoading ? 'bg-slate-300 cursor-not-allowed' : 'bg-slate-900 hover:bg-slate-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'}`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Running BLAST Analysis...
                </>
              ) : (
                <>
                  Run Risk Assessment
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
              <Zap className="w-3 h-3" />
              <span>Powered by Gemini 2.5 Flash</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RiskForm;