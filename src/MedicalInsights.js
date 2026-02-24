import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts';
import {
  TrendingUp, TrendingDown, AlertTriangle, CheckCircle,
  ChevronDown, ChevronUp, Activity, Target, Shield, Eye, Brain, Zap
} from 'lucide-react';
import {
  KIT_SCORECARDS, EMERGING_THEMES, STRATEGIC_ALIGNMENT, DATA_SOURCE_QUALITY,
  COMPETITOR_DATA, MOMENTUM_INDICATORS, WEAK_SIGNALS, SENTIMENT_VELOCITY,
  INSIGHT_SOURCES, INSIGHT_IMPACTS, KIT_RELEVANCE_TREND
} from './data/demoData';
import { MARKET_ACCESS_INTELLIGENCE } from './data/strategicContent';

const TABS = [
  { label: 'KIT Performance & Evolution', icon: Activity },
  { label: 'Field Intelligence Alignment', icon: Target },
  { label: 'Competitive Intelligence', icon: Shield },
  { label: 'Predictive Signals', icon: Eye },
  { label: 'Insight ROI & Effectiveness', icon: Brain },
];

const KIT_LINE_COLORS = ['#00A8FF', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

function StatusBadge({ status }) {
  const colorMap = {
    Active: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    Monitor: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    Alert: 'bg-red-500/20 text-red-400 border-red-500/30',
    Declining: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorMap[status] || colorMap.Monitor}`}>
      {status}
    </span>
  );
}

function sentimentLabel(val) {
  if (typeof val === 'string') return val;
  if (typeof val !== 'number') return 'N/A';
  if (val >= 0.7) return 'Very Positive';
  if (val >= 0.5) return 'Positive';
  if (val >= 0.35) return 'Mixed';
  if (val >= 0.2) return 'Negative';
  return 'Very Negative';
}

function SentimentBadge({ sentiment }) {
  const label = sentimentLabel(sentiment);
  const s = label.toLowerCase();
  if (s.includes('very positive'))
    return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">{label}</span>;
  if (s.includes('positive'))
    return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">{label}</span>;
  if (s.includes('very negative'))
    return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30">{label}</span>;
  if (s.includes('negative'))
    return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30">{label}</span>;
  if (s.includes('mixed'))
    return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">{label}</span>;
  return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-auri-gray/20 text-auri-gray border border-auri-gray/30">{label}</span>;
}

function ConfidenceBadge({ confidence }) {
  const c = (confidence || '').toLowerCase();
  if (c === 'high')
    return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">{confidence}</span>;
  if (c === 'medium')
    return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">{confidence}</span>;
  if (c === 'low')
    return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30">{confidence}</span>;
  return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-auri-gray/20 text-auri-gray">{confidence}</span>;
}

function DirectionBadge({ direction }) {
  const d = (direction || '').toLowerCase();
  if (d === 'accelerating' || d === 'increasing' || d === 'positive')
    return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1"><TrendingUp size={12} />{direction}</span>;
  if (d === 'decelerating' || d === 'decreasing' || d === 'negative')
    return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30 flex items-center gap-1"><TrendingDown size={12} />{direction}</span>;
  return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 flex items-center gap-1"><Activity size={12} />{direction}</span>;
}

function QualityCell({ score }) {
  let color = 'bg-red-500/30 text-red-400';
  if (score >= 80) color = 'bg-emerald-500/30 text-emerald-400';
  else if (score >= 60) color = 'bg-yellow-500/30 text-yellow-400';
  return (
    <td className={`px-4 py-3 text-center text-sm font-semibold rounded ${color}`}>
      {score}
    </td>
  );
}

function ExpandableCard({ title, icon: Icon, isExpanded, onToggle, children }) {
  return (
    <div className="bg-auri-dark border border-auri-gray/20 rounded-xl overflow-hidden transition-all duration-200">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-auri-black/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon size={18} className="text-auri-blue" />}
          <span className="font-semibold text-auri-white text-sm">{title}</span>
        </div>
        {isExpanded ? <ChevronUp size={16} className="text-auri-gray" /> : <ChevronDown size={16} className="text-auri-gray" />}
      </button>
      {isExpanded && (
        <div className="px-5 pb-5 border-t border-auri-gray/10 animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
}

// ─── Dashboard 1: KIT Performance & Evolution ────────────────────────
function KITPerformance({ data, themes, expandedItems, toggleExpand }) {
  const scorecards = data || [];
  const emergingThemes = themes || [];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* KIT Scorecard Table */}
      <section>
        <h3 className="text-lg font-semibold text-auri-white mb-4 flex items-center gap-2">
          <Activity size={20} className="text-auri-blue" />
          KIT Scorecard
        </h3>
        <div className="bg-auri-dark border border-auri-gray/20 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-auri-black/50 text-auri-gray text-left">
                  <th className="px-4 py-3 font-medium">KIT Name</th>
                  <th className="px-4 py-3 font-medium">Mentions</th>
                  <th className="px-4 py-3 font-medium">% Change</th>
                  <th className="px-4 py-3 font-medium">Sentiment</th>
                  <th className="px-4 py-3 font-medium">Relevance</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-auri-gray/10">
                {scorecards.map((kit, i) => (
                  <tr key={i} className="hover:bg-auri-black/20 transition-colors">
                    <td className="px-4 py-3 font-medium text-auri-white">{kit.name}</td>
                    <td className="px-4 py-3 text-auri-light">{kit.mentions}</td>
                    <td className="px-4 py-3">
                      <span className={`flex items-center gap-1 ${kit.percentChange >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {kit.percentChange >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                        {kit.percentChange >= 0 ? '+' : ''}{kit.percentChange}%
                      </span>
                    </td>
                    <td className="px-4 py-3"><SentimentBadge sentiment={kit.currentSentiment} /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-auri-black rounded-full overflow-hidden">
                          <div className="h-full bg-auri-blue rounded-full" style={{ width: `${kit.relevanceScore}%` }} />
                        </div>
                        <span className="text-auri-light text-xs">{kit.relevanceScore}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3"><StatusBadge status={kit.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* AI Insight Cards */}
      <section>
        <h3 className="text-lg font-semibold text-auri-white mb-4 flex items-center gap-2">
          <Brain size={20} className="text-auri-blue" />
          AI Insight Analysis
        </h3>
        <div className="space-y-3">
          {scorecards.map((kit, i) => (
            <ExpandableCard
              key={i}
              title={kit.name}
              icon={Zap}
              isExpanded={!!expandedItems[`kit-${i}`]}
              onToggle={() => toggleExpand(`kit-${i}`)}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="bg-auri-black/40 rounded-lg p-4">
                  <div className="text-xs font-medium text-auri-blue mb-2 uppercase tracking-wider">Current Month</div>
                  <p className="text-sm text-auri-light leading-relaxed">{kit.aiSummaryCurrent}</p>
                </div>
                <div className="bg-auri-black/40 rounded-lg p-4">
                  <div className="text-xs font-medium text-auri-gray mb-2 uppercase tracking-wider">Prior Month</div>
                  <p className="text-sm text-auri-gray leading-relaxed">{kit.aiSummaryPrior}</p>
                </div>
              </div>
            </ExpandableCard>
          ))}
        </div>
      </section>

      {/* Emerging Themes */}
      <section>
        <h3 className="text-lg font-semibold text-auri-white mb-4 flex items-center gap-2">
          <TrendingUp size={20} className="text-auri-blue" />
          Emerging Themes
        </h3>
        <div className="bg-auri-dark border border-auri-gray/20 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-auri-black/50 text-auri-gray text-left">
                  <th className="px-4 py-3 font-medium">Theme</th>
                  <th className="px-4 py-3 font-medium">Growth Rate</th>
                  <th className="px-4 py-3 font-medium">First Detected</th>
                  <th className="px-4 py-3 font-medium">Related KIT</th>
                  <th className="px-4 py-3 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-auri-gray/10">
                {emergingThemes.map((theme, i) => (
                  <tr key={i} className="hover:bg-auri-black/20 transition-colors">
                    <td className="px-4 py-3 font-medium text-auri-white">{theme.theme}</td>
                    <td className="px-4 py-3">
                      <span className={`font-semibold ${
                        parseFloat(theme.growthRate) > 20 ? 'text-emerald-400' :
                        parseFloat(theme.growthRate) > 10 ? 'text-yellow-400' : 'text-auri-light'
                      }`}>
                        +{theme.growthRate}%
                      </span>
                    </td>
                    <td className="px-4 py-3 text-auri-gray">{theme.firstDetected}</td>
                    <td className="px-4 py-3 text-auri-blue">{theme.relatedKIT}</td>
                    <td className="px-4 py-3 text-auri-gray max-w-xs truncate">{theme.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Dashboard 2: Field Intelligence Alignment ───────────────────────
function FieldIntelligence({ alignment, quality }) {
  const strategicAlignment = alignment || [];
  const dataSourceQuality = quality || [];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Strategic Alignment Matrix */}
      <section>
        <h3 className="text-lg font-semibold text-auri-white mb-4 flex items-center gap-2">
          <Target size={20} className="text-auri-blue" />
          Strategic Alignment Matrix
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {strategicAlignment.map((item, i) => (
            <div key={i} className="bg-auri-dark border border-auri-gray/20 rounded-xl p-5">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-semibold text-auri-white text-sm">{item.imperative}</h4>
                <span className="text-xs text-auri-gray bg-auri-black/40 px-2 py-1 rounded-full">
                  {item.fieldInsightVolume} insights
                </span>
              </div>
              <div className="mb-3">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-auri-gray">Alignment Score</span>
                  <span className="text-auri-blue font-semibold">{item.alignmentScore}%</span>
                </div>
                <div className="w-full h-2 bg-auri-black rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      item.alignmentScore >= 80 ? 'bg-emerald-500' :
                      item.alignmentScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${item.alignmentScore}%` }}
                  />
                </div>
              </div>
              <div className="bg-auri-black/40 rounded-lg p-3">
                <div className="text-xs font-medium text-auri-gray mb-1 uppercase tracking-wider">Gap Analysis</div>
                <p className="text-sm text-auri-light leading-relaxed">{item.gapAnalysis}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Information Quality Heatmap */}
      <section>
        <h3 className="text-lg font-semibold text-auri-white mb-4 flex items-center gap-2">
          <CheckCircle size={20} className="text-auri-blue" />
          Information Quality Heatmap
        </h3>
        <div className="bg-auri-dark border border-auri-gray/20 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-auri-black/50 text-auri-gray text-left">
                  <th className="px-4 py-3 font-medium">Source</th>
                  <th className="px-4 py-3 font-medium">Volume</th>
                  <th className="px-4 py-3 font-medium text-center">Detail Score</th>
                  <th className="px-4 py-3 font-medium text-center">Sentiment Score</th>
                  <th className="px-4 py-3 font-medium text-center">Actionability</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-auri-gray/10">
                {dataSourceQuality.map((source, i) => (
                  <tr key={i} className="hover:bg-auri-black/20 transition-colors">
                    <td className="px-4 py-3 font-medium text-auri-white">{source.source}</td>
                    <td className="px-4 py-3 text-auri-light">{source.volume}</td>
                    <QualityCell score={source.detailScore} />
                    <QualityCell score={source.sentimentScore} />
                    <QualityCell score={source.actionabilityScore} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Dashboard 3: Competitive Intelligence ───────────────────────────
function CompetitiveIntelligence({ competitors, expandedItems, toggleExpand }) {
  const competitorData = competitors || [];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Competitor Mention Table */}
      <section>
        <h3 className="text-lg font-semibold text-auri-white mb-4 flex items-center gap-2">
          <Shield size={20} className="text-auri-blue" />
          Competitor Mention Tracker
        </h3>
        <div className="bg-auri-dark border border-auri-gray/20 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-auri-black/50 text-auri-gray text-left">
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Company</th>
                  <th className="px-4 py-3 font-medium">Mentions</th>
                  <th className="px-4 py-3 font-medium">Sentiment</th>
                  <th className="px-4 py-3 font-medium">Discussion Context</th>
                  <th className="px-4 py-3 font-medium">Strategic Implication</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-auri-gray/10">
                {competitorData.map((comp, i) => (
                  <tr key={i} className="hover:bg-auri-black/20 transition-colors">
                    <td className="px-4 py-3 font-medium text-auri-white">{comp.name}</td>
                    <td className="px-4 py-3 text-auri-light">{comp.company}</td>
                    <td className="px-4 py-3 text-auri-light">{comp.mentions}</td>
                    <td className="px-4 py-3"><SentimentBadge sentiment={comp.sentiment} /></td>
                    <td className="px-4 py-3 text-auri-gray max-w-xs truncate">{comp.discussionContext}</td>
                    <td className="px-4 py-3 text-auri-gray max-w-xs truncate">{comp.strategicImplication}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* AI-Generated Intelligence */}
      <section>
        <h3 className="text-lg font-semibold text-auri-white mb-4 flex items-center gap-2">
          <Brain size={20} className="text-auri-blue" />
          AI-Generated Intelligence
        </h3>
        <div className="space-y-3">
          {competitorData.map((comp, i) => (
            <ExpandableCard
              key={i}
              title={`${comp.name} — ${comp.company}`}
              icon={Eye}
              isExpanded={!!expandedItems[`comp-${i}`]}
              onToggle={() => toggleExpand(`comp-${i}`)}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="bg-auri-black/40 rounded-lg p-4">
                  <div className="text-xs font-medium text-auri-blue mb-2 uppercase tracking-wider">Current Month</div>
                  <p className="text-sm text-auri-light leading-relaxed">{comp.aiSummaryCurrent}</p>
                </div>
                <div className="bg-auri-black/40 rounded-lg p-4">
                  <div className="text-xs font-medium text-auri-gray mb-2 uppercase tracking-wider">Prior Month</div>
                  <p className="text-sm text-auri-gray leading-relaxed">{comp.aiSummaryPrior}</p>
                </div>
              </div>
            </ExpandableCard>
          ))}
        </div>
      </section>

      {/* Market Access Intelligence */}
      <section>
        <h3 className="text-lg font-semibold text-auri-white mb-4 flex items-center gap-2">
          <AlertTriangle size={20} className="text-auri-blue" />
          Market Access Intelligence
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-auri-dark border border-auri-gray/20 rounded-xl p-5">
            <h4 className="text-xs font-semibold text-auri-blue uppercase tracking-wider mb-3">Pricing Context</h4>
            <p className="text-sm text-auri-gray leading-relaxed">{MARKET_ACCESS_INTELLIGENCE.pricingContext}</p>
          </div>
          <div className="bg-auri-dark border border-auri-gray/20 rounded-xl p-5">
            <h4 className="text-xs font-semibold text-auri-blue uppercase tracking-wider mb-3">REMS Program</h4>
            <p className="text-sm text-auri-gray leading-relaxed">{MARKET_ACCESS_INTELLIGENCE.remsProgram}</p>
          </div>
          <div className="bg-auri-dark border border-auri-gray/20 rounded-xl p-5">
            <h4 className="text-xs font-semibold text-auri-blue uppercase tracking-wider mb-3">Payer Challenges</h4>
            <ul className="space-y-2">
              {MARKET_ACCESS_INTELLIGENCE.payerChallenges.map((c, i) => (
                <li key={i} className="text-sm text-auri-gray leading-relaxed flex items-start gap-2">
                  <span className="text-auri-blue mt-1.5 flex-shrink-0">&#8226;</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-auri-dark border border-auri-gray/20 rounded-xl p-5">
            <h4 className="text-xs font-semibold text-auri-blue uppercase tracking-wider mb-3">Orphan Drug Dynamics</h4>
            <p className="text-sm text-auri-gray leading-relaxed">{MARKET_ACCESS_INTELLIGENCE.orphanDrugDynamics}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Dashboard 4: Predictive Signals ─────────────────────────────────
function PredictiveSignals({ momentum, weakSignals, sentimentVelocity }) {
  const momentumData = momentum || [];
  const weakSignalData = weakSignals || [];
  const velocityData = sentimentVelocity || [];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Momentum Indicators */}
      <section>
        <h3 className="text-lg font-semibold text-auri-white mb-4 flex items-center gap-2">
          <Zap size={20} className="text-auri-blue" />
          Momentum Indicators
        </h3>
        <div className="bg-auri-dark border border-auri-gray/20 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-auri-black/50 text-auri-gray text-left">
                  <th className="px-4 py-3 font-medium">Signal</th>
                  <th className="px-4 py-3 font-medium">Current State</th>
                  <th className="px-4 py-3 font-medium">Trajectory</th>
                  <th className="px-4 py-3 font-medium">Time to Impact</th>
                  <th className="px-4 py-3 font-medium">Confidence</th>
                  <th className="px-4 py-3 font-medium">Required Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-auri-gray/10">
                {momentumData.map((item, i) => (
                  <tr key={i} className="hover:bg-auri-black/20 transition-colors">
                    <td className="px-4 py-3 font-medium text-auri-white">{item.signal}</td>
                    <td className="px-4 py-3 text-auri-light">{item.currentState}</td>
                    <td className="px-4 py-3">
                      <span className={`flex items-center gap-1 text-sm ${
                        (item.trajectory || '').toLowerCase() === 'up' || (item.trajectory || '').toLowerCase() === 'rising'
                          ? 'text-emerald-400' :
                        (item.trajectory || '').toLowerCase() === 'down' || (item.trajectory || '').toLowerCase() === 'declining'
                          ? 'text-red-400' : 'text-yellow-400'
                      }`}>
                        {(item.trajectory || '').toLowerCase() === 'up' || (item.trajectory || '').toLowerCase() === 'rising'
                          ? <TrendingUp size={14} /> :
                        (item.trajectory || '').toLowerCase() === 'down' || (item.trajectory || '').toLowerCase() === 'declining'
                          ? <TrendingDown size={14} /> : <Activity size={14} />}
                        {item.trajectory}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-auri-gray">{item.timeToImpact}</td>
                    <td className="px-4 py-3"><ConfidenceBadge confidence={item.confidence} /></td>
                    <td className="px-4 py-3 text-auri-gray max-w-xs truncate">{item.requiredAction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Weak Signals */}
      <section>
        <h3 className="text-lg font-semibold text-auri-white mb-4 flex items-center gap-2">
          <AlertTriangle size={20} className="text-yellow-400" />
          Weak Signals
        </h3>
        <div className="bg-auri-dark border border-auri-gray/20 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-auri-black/50 text-auri-gray text-left">
                  <th className="px-4 py-3 font-medium">Signal</th>
                  <th className="px-4 py-3 font-medium">Occurrences</th>
                  <th className="px-4 py-3 font-medium">Trend</th>
                  <th className="px-4 py-3 font-medium">First Detected</th>
                  <th className="px-4 py-3 font-medium">Potential Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-auri-gray/10">
                {weakSignalData.map((item, i) => (
                  <tr key={i} className="hover:bg-auri-black/20 transition-colors">
                    <td className="px-4 py-3 font-medium text-auri-white">{item.signal}</td>
                    <td className="px-4 py-3 text-auri-light">{item.occurrences}</td>
                    <td className="px-4 py-3">
                      <span className={`text-sm ${
                        (item.trend || '').toLowerCase() === 'increasing' ? 'text-emerald-400' :
                        (item.trend || '').toLowerCase() === 'decreasing' ? 'text-red-400' : 'text-yellow-400'
                      }`}>
                        {item.trend}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-auri-gray">{item.firstDetected}</td>
                    <td className="px-4 py-3 text-auri-gray max-w-xs truncate">{item.potentialImpact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Sentiment Velocity */}
      <section>
        <h3 className="text-lg font-semibold text-auri-white mb-4 flex items-center gap-2">
          <Activity size={20} className="text-auri-blue" />
          Sentiment Velocity
        </h3>
        <div className="bg-auri-dark border border-auri-gray/20 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-auri-black/50 text-auri-gray text-left">
                  <th className="px-4 py-3 font-medium">Associated KIT</th>
                  <th className="px-4 py-3 font-medium text-center">Velocity Score</th>
                  <th className="px-4 py-3 font-medium text-center">Direction</th>
                  <th className="px-4 py-3 font-medium text-center">Latest WoW</th>
                  <th className="px-4 py-3 font-medium">Interpretation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-auri-gray/10">
                {velocityData.map((item, i) => {
                  const latestWoW = Array.isArray(item.weekOverWeek)
                    ? item.weekOverWeek[item.weekOverWeek.length - 1]
                    : item.weekOverWeek;
                  const score = item.velocityScore;
                  let interpretation = '';
                  if (Math.abs(score) < 1) interpretation = 'Sentiment is stable with minimal movement. No immediate action required.';
                  else if (score >= 3) interpretation = 'Strong positive momentum. Capitalize on favorable sentiment with proactive KOL engagement.';
                  else if (score >= 1) interpretation = 'Moderately improving sentiment. Monitor for sustained trend before escalating resources.';
                  else if (score <= -3) interpretation = 'Rapidly deteriorating sentiment. Requires urgent strategic response and field team alignment.';
                  else interpretation = 'Negative sentiment drift detected. Investigate root causes and prepare mitigation messaging.';

                  return (
                    <tr key={i} className="hover:bg-auri-black/20 transition-colors">
                      <td className="px-4 py-3 font-medium text-auri-white">{item.kitName}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`font-semibold ${score > 0 ? 'text-emerald-400' : score < 0 ? 'text-red-400' : 'text-auri-blue'}`}>{score > 0 ? '+' : ''}{score}</span>
                      </td>
                      <td className="px-4 py-3 text-center"><DirectionBadge direction={item.direction} /></td>
                      <td className="px-4 py-3 text-center">
                        <span className={`flex items-center justify-center gap-1 ${
                          latestWoW >= 0 ? 'text-emerald-400' : 'text-red-400'
                        }`}>
                          {latestWoW >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                          {latestWoW >= 0 ? '+' : ''}{latestWoW}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-auri-gray text-xs leading-relaxed max-w-xs">{interpretation}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Dashboard 5: Insight ROI & Field Effectiveness ──────────────────
function InsightROI({ sources, impacts, trendData }) {
  const insightSources = sources || [];
  const insightImpacts = impacts || [];
  const relevanceTrend = trendData || [];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Insight Source Value Matrix */}
      <section>
        <h3 className="text-lg font-semibold text-auri-white mb-4 flex items-center gap-2">
          <Target size={20} className="text-auri-blue" />
          Insight Source Value Matrix
        </h3>
        <div className="bg-auri-dark border border-auri-gray/20 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-auri-black/50 text-auri-gray text-left">
                  <th className="px-4 py-3 font-medium">Source</th>
                  <th className="px-4 py-3 font-medium">Volume</th>
                  <th className="px-4 py-3 font-medium">Quality Score</th>
                  <th className="px-4 py-3 font-medium">Leads to Action %</th>
                  <th className="px-4 py-3 font-medium">Cost/Insight</th>
                  <th className="px-4 py-3 font-medium">ROI Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-auri-gray/10">
                {insightSources.map((source, i) => (
                  <tr key={i} className="hover:bg-auri-black/20 transition-colors">
                    <td className="px-4 py-3 font-medium text-auri-white">{source.source}</td>
                    <td className="px-4 py-3 text-auri-light">{source.volume}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-1.5 bg-auri-black rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${
                            source.qualityScore >= 80 ? 'bg-emerald-500' :
                            source.qualityScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                          }`} style={{ width: `${source.qualityScore}%` }} />
                        </div>
                        <span className="text-auri-light text-xs">{source.qualityScore}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-auri-light">{source.leadsToAction}%</td>
                    <td className="px-4 py-3 text-auri-gray">${source.costPerInsight}</td>
                    <td className="px-4 py-3">
                      <span className={`font-semibold ${
                        source.roiScore >= 8 ? 'text-emerald-400' :
                        source.roiScore >= 5 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {source.roiScore}/10
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Insight-to-Impact Tracking */}
      <section>
        <h3 className="text-lg font-semibold text-auri-white mb-4 flex items-center gap-2">
          <Zap size={20} className="text-auri-blue" />
          Insight-to-Impact Tracking
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {insightImpacts.map((item, i) => (
            <div key={i} className="bg-auri-dark border border-auri-gray/20 rounded-xl p-5">
              <div className="space-y-3">
                <div className="bg-auri-blue/10 border border-auri-blue/20 rounded-lg p-3">
                  <div className="text-xs font-medium text-auri-blue mb-1 uppercase tracking-wider">Insight</div>
                  <p className="text-sm text-auri-white">{item.insight}</p>
                </div>
                <div className="flex justify-center">
                  <ChevronDown size={16} className="text-auri-gray" />
                </div>
                <div className="bg-auri-black/40 rounded-lg p-3">
                  <div className="text-xs font-medium text-yellow-400 mb-1 uppercase tracking-wider">Action</div>
                  <p className="text-sm text-auri-light">{item.action}</p>
                </div>
                <div className="flex justify-center">
                  <ChevronDown size={16} className="text-auri-gray" />
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                  <div className="text-xs font-medium text-emerald-400 mb-1 uppercase tracking-wider">Outcome</div>
                  <p className="text-sm text-auri-light">{item.outcome}</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-auri-gray/10">
                  <span className="text-xs text-auri-gray">{item.timeframe}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    item.impactScore >= 8 ? 'bg-emerald-500/20 text-emerald-400' :
                    item.impactScore >= 5 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    Impact: {item.impactScore}/10
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* KIT Relevance Decay Curve */}
      <section>
        <h3 className="text-lg font-semibold text-auri-white mb-4 flex items-center gap-2">
          <TrendingDown size={20} className="text-auri-blue" />
          KIT Relevance Trend (6 Months)
        </h3>
        <div className="bg-auri-dark border border-auri-gray/20 rounded-xl p-5">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={relevanceTrend} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2D2C2C" />
              <XAxis dataKey="month" stroke="#8D8C8C" tick={{ fill: '#8D8C8C', fontSize: 12 }} />
              <YAxis stroke="#8D8C8C" tick={{ fill: '#8D8C8C', fontSize: 12 }} domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#2D2C2C',
                  border: '1px solid rgba(141,140,140,0.2)',
                  borderRadius: '8px',
                  color: '#FAFAFA',
                  fontSize: '12px',
                }}
                labelStyle={{ color: '#FAFAFA' }}
              />
              <Legend
                wrapperStyle={{ color: '#8D8C8C', fontSize: '12px' }}
              />
              {relevanceTrend.length > 0 &&
                Object.keys(relevanceTrend[0])
                  .filter(key => key !== 'month')
                  .map((key, i) => (
                    <Line
                      key={key}
                      type="monotone"
                      dataKey={key}
                      stroke={KIT_LINE_COLORS[i % KIT_LINE_COLORS.length]}
                      strokeWidth={2}
                      dot={{ r: 4, fill: KIT_LINE_COLORS[i % KIT_LINE_COLORS.length] }}
                      activeDot={{ r: 6 }}
                    />
                  ))
              }
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────
function MedicalInsights({ selectedProduct }) {
  const [activeTab, setActiveTab] = useState(0);
  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpand = (key) => {
    setExpandedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <KITPerformance
            data={KIT_SCORECARDS[selectedProduct]}
            themes={EMERGING_THEMES[selectedProduct]}
            expandedItems={expandedItems}
            toggleExpand={toggleExpand}
          />
        );
      case 1:
        return (
          <FieldIntelligence
            alignment={STRATEGIC_ALIGNMENT[selectedProduct]}
            quality={DATA_SOURCE_QUALITY[selectedProduct]}
          />
        );
      case 2:
        return (
          <CompetitiveIntelligence
            competitors={COMPETITOR_DATA[selectedProduct]}
            expandedItems={expandedItems}
            toggleExpand={toggleExpand}
          />
        );
      case 3:
        return (
          <PredictiveSignals
            momentum={MOMENTUM_INDICATORS[selectedProduct]}
            weakSignals={WEAK_SIGNALS[selectedProduct]}
            sentimentVelocity={SENTIMENT_VELOCITY[selectedProduct]}
          />
        );
      case 4:
        return (
          <InsightROI
            sources={INSIGHT_SOURCES[selectedProduct]}
            impacts={INSIGHT_IMPACTS[selectedProduct]}
            trendData={KIT_RELEVANCE_TREND[selectedProduct]}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 bg-auri-dark border border-auri-gray/20 rounded-xl p-2">
        {TABS.map((tab, i) => {
          const Icon = tab.icon;
          return (
            <button
              key={i}
              onClick={() => {
                setActiveTab(i);
                setExpandedItems({});
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === i
                  ? 'bg-auri-blue/15 text-auri-blue shadow-sm'
                  : 'text-auri-gray hover:text-auri-white hover:bg-auri-black/30'
              }`}
            >
              <Icon size={16} />
              <span className="hidden lg:inline">{tab.label}</span>
              <span className="lg:hidden">{tab.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div key={`${activeTab}-${selectedProduct}`}>
        {renderTabContent()}
      </div>
    </div>
  );
}

export default MedicalInsights;
