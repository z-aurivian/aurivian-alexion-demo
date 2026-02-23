import { KIT_SCORECARDS, COMPETITOR_DATA, KOL_DATA, PRODUCT_OPTIONS } from '../data/demoData';
import { STRATEGIC_IMPERATIVES, COMPETITIVE_LANDSCAPE, COMPLEMENT_BIOLOGY, PIPELINE_INTELLIGENCE } from '../data/strategicContent';
import { PUBMED_SOLIRIS, PUBMED_ULTOMIRIS, PUBMED_COMPETITORS, PUBMED_KOL } from '../data/pubmedData';
import { TRIALS_SOLIRIS, TRIALS_ULTOMIRIS, TRIALS_COMPETITORS, TRIALS_COMPLETED_LANDMARK } from '../data/clinicalTrialsData';

function formatPub(p) {
  return `"${p.title}" — ${p.authors.slice(0, 3).join(', ')}${p.authors.length > 3 ? ' et al.' : ''}, *${p.journal}* (${p.pubDate})${p.doi ? `, DOI: ${p.doi}` : ''} [PMID: ${p.pmid}]`;
}

function formatTrial(t) {
  return `**${t.nctId}**: "${t.title}" — ${t.status}, ${t.phase || 'N/A'}, Sponsor: ${t.sponsor}, n=${t.enrollment}`;
}

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

  // Real publications (PubMed)
  if (q.includes('publi') || q.includes('paper') || q.includes('journal') || q.includes('evidence') || q.includes('literature') || q.includes('study') || q.includes('research') || q.includes('pubmed')) {
    const pubs = selectedProduct === 'soliris' ? PUBMED_SOLIRIS : PUBMED_ULTOMIRIS;
    context.push('## Recent Publications (PubMed)\n' + pubs.slice(0, 8).map(formatPub).join('\n'));
  }

  // KOL-specific publications
  const kolNames = Object.keys(PUBMED_KOL);
  const matchedKol = kolNames.find(name => q.includes(name));
  if (matchedKol && PUBMED_KOL[matchedKol]) {
    context.push(`## Publications by ${matchedKol.charAt(0).toUpperCase() + matchedKol.slice(1)}\n` + PUBMED_KOL[matchedKol].map(formatPub).join('\n'));
  }

  // Competitor publications
  if (q.includes('compet') && (q.includes('publi') || q.includes('evidence') || q.includes('literature') || q.includes('paper'))) {
    const compPubs = Object.entries(PUBMED_COMPETITORS);
    context.push('## Competitor Publications\n' + compPubs.map(([drug, pubs]) =>
      `### ${drug}\n` + pubs.slice(0, 3).map(formatPub).join('\n')
    ).join('\n'));
  }

  // Clinical trials
  if (q.includes('trial') || q.includes('clinical') || q.includes('study') || q.includes('recruit') || q.includes('phase') || q.includes('nct')) {
    const trials = selectedProduct === 'soliris' ? TRIALS_SOLIRIS : TRIALS_ULTOMIRIS;
    context.push('## Active Clinical Trials\n' + trials.slice(0, 8).map(formatTrial).join('\n'));
  }

  // Landmark trials
  if (q.includes('landmark') || q.includes('pivotal') || q.includes('completed') || q.includes('triumph') || q.includes('champion') || q.includes('medusa') || q.includes('prevent')) {
    context.push('## Landmark Completed Trials\n' + TRIALS_COMPLETED_LANDMARK.slice(0, 8).map(formatTrial).join('\n'));
  }

  // Competitor trials
  if (q.includes('compet') && (q.includes('trial') || q.includes('clinical') || q.includes('study'))) {
    const compTrials = Object.entries(TRIALS_COMPETITORS);
    context.push('## Competitor Clinical Trials\n' + compTrials.map(([drug, trials]) =>
      `### ${drug}\n` + trials.slice(0, 3).map(formatTrial).join('\n')
    ).join('\n'));
  }

  return context.join('\n\n');
}
