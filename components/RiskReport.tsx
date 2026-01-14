import React from 'react';
import { BlastAnalysis, BlastDimension } from '../types';
import BlastChart from './BlastChart';
import { AlertTriangle, ShieldAlert, Activity, CheckCircle2, Lock, FileText, RotateCcw } from 'lucide-react';

interface RiskReportProps {
  analysis: BlastAnalysis;
  onReset: () => void;
}

const RiskBadge: React.FC<{ level: string }> = ({ level }) => {
  const colors = {
    Low: 'bg-green-100 text-green-800 border-green-200',
    Moderate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    High: 'bg-orange-100 text-orange-800 border-orange-200',
    Critical: 'bg-red-100 text-red-800 border-red-200',
  };

  const colorClass = colors[level as keyof typeof colors] || colors.Moderate;

  return (
    <span className={`px-4 py-1.5 rounded-full text-sm font-bold border ${colorClass} uppercase tracking-wide`}>
      {level} Risk
    </span>
  );
};

const ScoreRow: React.FC<{ label: string; data: BlastDimension; letter: string }> = ({ label, data, letter }) => (
  <div className="border-b border-gray-100 py-4 last:border-0">
    <div className="flex justify-between items-start mb-2">
      <div className="flex items-center gap-2">
        <span className="flex items-center justify-center w-6 h-6 rounded bg-slate-100 text-slate-600 font-bold text-xs">{letter}</span>
        <h4 className="font-semibold text-slate-800">{label}</h4>
      </div>
      <div className="flex items-center gap-2">
         <span className={`font-bold ${data.score >= 4 ? 'text-red-600' : data.score >= 3 ? 'text-orange-500' : 'text-slate-600'}`}>
           {data.score}/5
         </span>
      </div>
    </div>
    <p className="text-sm text-slate-600 mb-1">{data.justification}</p>
    <p className="text-xs font-medium text-red-600/80 uppercase tracking-wide">Risk Factor: {data.riskFactor}</p>
  </div>
);

const RiskReport: React.FC<RiskReportProps> = ({ analysis, onReset }) => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-slate-700" />
            BLAST Risk Assessment
          </h2>
          <p className="text-slate-500 mt-1">Enterprise Risk Architect Analysis</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden md:block">
            <p className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Total Score</p>
            <p className="text-2xl font-bold text-slate-900">{analysis.totalScore} / 25</p>
          </div>
          <RiskBadge level={analysis.overallRiskLevel} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Visualization & Summary */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Chart Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Risk Profile</h3>
            <BlastChart data={analysis.scores} />
          </div>

          {/* Summary Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-600" />
              Systemic Risk Narrative
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {analysis.riskSummary}
            </p>
          </div>

        </div>

        {/* Middle Column: Detailed Scores */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <h3 className="font-semibold text-slate-800">BLAST Analysis Breakdown</h3>
            </div>
            <div className="p-6">
              <ScoreRow letter="B" label="Business Criticality" data={analysis.scores.businessCriticality} />
              <ScoreRow letter="L" label="Legal & Regulatory Exposure" data={analysis.scores.legalExposure} />
              <ScoreRow letter="A" label="Amplification Speed" data={analysis.scores.amplificationSpeed} />
              <ScoreRow letter="S" label="State Reversibility" data={analysis.scores.stateReversibility} />
              <ScoreRow letter="T" label="Trust Impact" data={analysis.scores.trustImpact} />
            </div>
          </div>
        </div>
      </div>

      {/* Full Width Sections: Protocols */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Containment */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5 text-emerald-600" />
            Containment Strategy
          </h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-bold text-slate-700 mb-2">Guardrails</h4>
              <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                {analysis.containmentStrategy.guardrails.map((g, i) => <li key={i}>{g}</li>)}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-700 mb-2">Stop Conditions</h4>
              <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                {analysis.containmentStrategy.stopConditions.map((s, i) => <li key={i} className="text-red-600/80">{s}</li>)}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-700 mb-2">Human-in-the-Loop</h4>
              <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                {analysis.containmentStrategy.humanInTheLoop.map((h, i) => <li key={i}>{h}</li>)}
              </ul>
            </div>
            <div className="pt-2 border-t border-slate-100">
                <div className="flex gap-2 items-start mt-2">
                    <RotateCcw className="w-4 h-4 text-slate-400 mt-0.5" />
                    <div>
                        <span className="text-xs font-bold text-slate-500 uppercase">Rollback Strategy</span>
                        <p className="text-sm text-slate-600 mt-1">{analysis.containmentStrategy.rollbackStrategy}</p>
                    </div>
                </div>
            </div>
          </div>
        </div>

        {/* Readiness & Failure Modes */}
        <div className="space-y-6">
            {/* Failure Modes */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                Failure Modes
                </h3>
                <ul className="space-y-2">
                    {analysis.failureModes.map((mode, i) => (
                        <li key={i} className="flex gap-3 text-sm text-slate-700 bg-orange-50 p-3 rounded-lg border border-orange-100">
                            <span className="font-bold text-orange-400">{i+1}.</span>
                            {mode}
                        </li>
                    ))}
                </ul>
            </div>

             {/* Checklist */}
             <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex-grow">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
                Launch Readiness Checklist
                </h3>
                <ul className="space-y-3">
                    {analysis.launchReadinessChecklist.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                            <div className="w-5 h-5 rounded border border-slate-300 flex-shrink-0 mt-0.5" />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
      </div>

      <div className="flex justify-center pt-8 pb-12">
        <button 
          onClick={onReset}
          className="px-6 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors shadow-lg flex items-center gap-2"
        >
            <FileText className="w-4 h-4" />
            Evaluate New Feature
        </button>
      </div>

    </div>
  );
};

export default RiskReport;
