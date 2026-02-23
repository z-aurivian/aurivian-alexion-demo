import { queryClaudeAPI } from './claudeApi';
import { queryOpenAIAPI } from './openaiApi';
import { buildSystemPrompt } from './promptBuilder';
import { retrieveContext } from './rag';
import { KIT_SCORECARDS, COMPETITOR_DATA, KOL_DATA } from '../data/demoData';
import { STRATEGIC_IMPERATIVES, COMPETITIVE_LANDSCAPE, PIPELINE_INTELLIGENCE } from '../data/strategicContent';

function keywordFallback(query, selectedProduct) {
  const q = query.toLowerCase();
  const kits = KIT_SCORECARDS[selectedProduct] || [];
  const competitors = COMPETITOR_DATA[selectedProduct] || [];
  const kols = KOL_DATA.filter(k => k.productAlignment.includes(selectedProduct));

  if (q.includes('biosimilar') || q.includes('switching')) {
    const kit = kits.find(k => k.name.toLowerCase().includes('biosimilar'));
    return `## Biosimilar Switching Readiness\n\n${kit ? kit.aiSummaryCurrent : 'Biosimilar eculizumab products (Bkemv by Samsung Bioepis, Epysqli by Amgen) launched in 2025, creating significant pressure on the Soliris franchise.'}\n\n**Key Metrics:**\n- Mentions: ${kit?.currentMentions || 'N/A'} (${kit?.percentChange > 0 ? '+' : ''}${kit?.percentChange || 'N/A'}% vs prior month)\n- Sentiment: ${kit?.currentSentiment || 'N/A'}\n- Status: ${kit?.status || 'N/A'}\n\nThe urgency of Soliris→Ultomiris conversion is a top priority for franchise defense. MSL teams report increasing HCP inquiries about biosimilar interchangeability and switching protocols.`;
  }

  if (q.includes('compet') || q.includes('oral') || q.includes('threat')) {
    let response = '## Competitive Landscape Overview\n\n';
    if (COMPETITIVE_LANDSCAPE) {
      response += COMPETITIVE_LANDSCAPE.map(c =>
        `### ${c.name} (${c.genericName}) — ${c.company}\n${c.summary}\n- **Threat Level:** ${c.strategicThreatLevel}\n- **Approved:** ${c.approvedIndications?.join(', ') || 'Varies by market'}`
      ).join('\n\n');
    } else {
      response += competitors.map(c =>
        `### ${c.name} (${c.genericName}) — ${c.company}\n${c.aiSummaryCurrent}\n- Mentions: ${c.mentions}, Sentiment: ${c.sentiment}`
      ).join('\n\n');
    }
    return response;
  }

  if (q.includes('kol') || q.includes('opinion leader') || q.includes('expert')) {
    const topKols = kols.filter(k => k.engagementTier === 'Tier 1').slice(0, 5);
    return `## Top KOLs for ${selectedProduct === 'soliris' ? 'Soliris' : 'Ultomiris'}\n\n${topKols.map(k =>
      `### ${k.name}\n- **Institution:** ${k.institution}, ${k.country}\n- **Specialty:** ${k.specialty}\n- **Influence Score:** ${k.influenceScore}/100\n- **Focus Areas:** ${k.focusAreas.join(', ')}\n- **Recommended Strategy:** ${k.recommendedStrategy}`
    ).join('\n\n')}\n\n*${kols.length} total KOLs tracked for this product.*`;
  }

  if (q.includes('sentiment') || q.includes('trend')) {
    return `## Sentiment & Trend Analysis\n\n${kits.map(k =>
      `- **${k.name}**: Sentiment ${k.currentSentiment} (was ${k.priorSentiment}), ${k.percentChange > 0 ? '↑' : k.percentChange < 0 ? '↓' : '→'} ${Math.abs(k.percentChange)}% change. ${k.aiSummaryCurrent}`
    ).join('\n\n')}`;
  }

  if (q.includes('pipeline') || q.includes('gefurulimab') || q.includes('danicopan') || q.includes('voydeya')) {
    if (PIPELINE_INTELLIGENCE) {
      return `## Pipeline Intelligence\n\n${PIPELINE_INTELLIGENCE.map(p =>
        `### ${p.name}\n- **Mechanism:** ${p.mechanism}\n- **Stage:** ${p.stage}\n- **Indication:** ${p.indication}\n- **Timeline:** ${p.expectedTimeline}\n- **Significance:** ${p.significance}`
      ).join('\n\n')}`;
    }
  }

  if (q.includes('strateg') || q.includes('imperative') || q.includes('priority')) {
    if (STRATEGIC_IMPERATIVES) {
      return `## Strategic Imperatives\n\n${STRATEGIC_IMPERATIVES.map(s =>
        `### ${s.name} (${s.category})\n${s.description}\n\n**Success Metrics:** ${s.successMetrics?.join(', ')}`
      ).join('\n\n')}`;
    }
  }

  // Default response
  return `## Auri Intelligence Summary\n\nI can help you with intelligence about Alexion's complement inhibitor franchise. Here are some areas I can address:\n\n- **KIT Performance** — ${kits.length} Key Insight Themes tracked this month\n- **Competitive Intelligence** — ${competitors.length} competitors monitored\n- **KOL Management** — ${kols.length} KOLs aligned with current product\n- **Strategic Imperatives** — 4 strategic priorities with field alignment data\n- **Pipeline Updates** — Gefurulimab, Voydeya (danicopan), and competitor pipelines\n\nTry asking about biosimilar switching readiness, oral competitor threats, KOL engagement strategies, or complement pathway education.`;
}

export async function queryAuri(messages, selectedProduct) {
  const lastMessage = messages[messages.length - 1]?.content || '';
  const ragContext = retrieveContext(lastMessage, selectedProduct);
  const systemPrompt = buildSystemPrompt(selectedProduct, ragContext);

  // Claude → OpenAI → Keyword fallback
  try {
    return await queryClaudeAPI(messages, systemPrompt);
  } catch (e) {
    console.log('Claude API unavailable, trying OpenAI:', e.message);
  }

  try {
    return await queryOpenAIAPI(messages, systemPrompt);
  } catch (e) {
    console.log('OpenAI API unavailable, using keyword fallback:', e.message);
  }

  return keywordFallback(lastMessage, selectedProduct);
}
