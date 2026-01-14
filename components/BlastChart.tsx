import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { BlastAnalysis } from '../types';

interface BlastChartProps {
  data: BlastAnalysis['scores'];
}

const BlastChart: React.FC<BlastChartProps> = ({ data }) => {
  const chartData = [
    { subject: 'Business', A: data.businessCriticality.score, fullMark: 5 },
    { subject: 'Legal', A: data.legalExposure.score, fullMark: 5 },
    { subject: 'Amplification', A: data.amplificationSpeed.score, fullMark: 5 },
    { subject: 'Reversibility', A: data.stateReversibility.score, fullMark: 5 },
    { subject: 'Trust', A: data.trustImpact.score, fullMark: 5 },
  ];

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} />
          <PolarRadiusAxis angle={30} domain={[0, 5]} tick={false} axisLine={false} />
          <Radar
            name="Risk Score"
            dataKey="A"
            stroke="#ef4444"
            fill="#ef4444"
            fillOpacity={0.5}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
            itemStyle={{ color: '#fff' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BlastChart;
