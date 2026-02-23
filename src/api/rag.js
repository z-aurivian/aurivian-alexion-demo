import { KIT_SCORECARDS, COMPETITOR_DATA, KOL_DATA, PRODUCT_OPTIONS } from '../data/demoData';
import { STRATEGIC_IMPERATIVES, COMPETITIVE_LANDSCAPE, COMPLEMENT_BIOLOGY, PIPELINE_INTELLIGENCE } from '../data/strategicContent';

export function retrieveContext(query, selectedProduct) {
  const q = query.toLowerCase();
  const product = PRODUCT_OPTIONS.find(p => p.id === selectedProduct);
  let context = [];

  context.push(`Current product context: ${product.name} (${product.generic}). Indications: ${product.indications.join(', ')}.`);

  // KIT data
  if (q.includes('kit') || q.includes('insight') || q.includes('theme') || q.includes('biosimilar') || q.includes('switching') || q.includes('hemolysis') || q.includes('competitor') || q.includes('diagnosis') || q.includes('pathway') || q.includes('complement')) {
    const kits = KIT_SCORECARDS[selectedProduct];
    if (kits) {
      context.push('## Key Insight Themes (KITs)\n' + kits.map(k =>
        `- **${k.name}**: ${k.currentMentions} mentions (${k.percentChange > 0 ? '+' : ''}${k.percentChange}%), sentiment: ${k.currentSentiment}, relevance: ${k.relevanceScore}/100, status: ${k.status}. ${k.aiSummaryCurrent}`
      ).join('\n'));
    }
  }

  // Competitor data
  if (q.includes('compet') || q.includes('rival') || q.includes('threat') || q.includes('oral') || q.includes('biosimilar') || q.includes('iptacopan') || q.includes('fabhalta') || q.includes('pegcetacoplan') || q.includes('empaveli') || q.includes('crovalimab') || q.includes('piasky') || q.includes('zilucoplan') || q.includes('zilbrysq')) {
    const comps = COMPETITOR_DATA[selectedProduct];
    if (comps) {
      context.push('## Competitive Intelligence\n' + comps.map(c =>
        `- **${c.name} (${c.genericName})** by ${c.company}: ${c.mentions} mentions, sentiment: ${c.sentiment}. ${c.aiSummaryCurrent}`
      ).join('\n'));
    }
    if (COMPETITIVE_LANDSCAPE) {
      context.push('## Competitive Landscape\n' + COMPETITIVE_LANDSCAPE.map(c =>
        `- **${c.name} (${c.genericName})** — ${c.company}: ${c.summary} Threat: ${c.strategicThreatLevel}.`
      ).join('\n'));
    }
  }

  // KOL data
  if (q.includes('kol') || q.includes('opinion leader') || q.includes('expert') || q.includes('investigator') || q.includes('engagement')) {
    const kols = KOL_DATA.filter(k => k.productAlignment.includes(selectedProduct)).slice(0, 10);
    context.push('## Key Opinion Leaders\n' + kols.map(k =>
      `- **${k.name}** (${k.institution}, ${k.country}): ${k.specialty}, ${k.engagementTier}, influence: ${k.influenceScore}/100, focus: ${k.focusAreas.join(', ')}`
    ).join('\n'));
  }

  // Strategic imperatives
  if (q.includes('strateg') || q.includes('imperative') || q.includes('priority') || q.includes('access') || q.includes('adherence') || q.includes('leadership') || q.includes('franchise')) {
    if (STRATEGIC_IMPERATIVES) {
      context.push('## Strategic Imperatives\n' + STRATEGIC_IMPERATIVES.map(s =>
        `- **${s.name}** (${s.category}): ${s.description}`
      ).join('\n'));
    }
  }

  // Complement biology
  if (q.includes('complement') || q.includes('c5') || q.includes('c3') || q.includes('factor') || q.includes('mechanism') || q.includes('biology') || q.includes('pnh') || q.includes('ahus') || q.includes('gmg') || q.includes('nmosd')) {
    if (COMPLEMENT_BIOLOGY) {
      context.push(`## Complement Biology\n${COMPLEMENT_BIOLOGY.overview}\nC5 Inhibition: ${COMPLEMENT_BIOLOGY.c5Inhibition}\nProximal Inhibition: ${COMPLEMENT_BIOLOGY.proximalInhibition}`);
      Object.entries(COMPLEMENT_BIOLOGY.diseaseConnections).forEach(([disease, desc]) => {
        if (q.includes(disease.toLowerCase())) {
          context.push(`### ${disease}\n${desc}`);
        }
      });
    }
  }

  // Pipeline
  if (q.includes('pipeline') || q.includes('gefurulimab') || q.includes('danicopan') || q.includes('voydeya') || q.includes('alxn') || q.includes('pozelimab') || q.includes('development')) {
    if (PIPELINE_INTELLIGENCE) {
      context.push('## Pipeline Intelligence\n' + PIPELINE_INTELLIGENCE.map(p =>
        `- **${p.name}**: ${p.mechanism}, ${p.stage}, ${p.indication}. ${p.significance}`
      ).join('\n'));
    }
  }

  return context.join('\n\n');
}
