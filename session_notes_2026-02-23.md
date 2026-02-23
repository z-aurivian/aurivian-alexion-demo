# Alexion Demo — Session Notes 2026-02-23

## What Was Built
Full Alexion Pharmaceuticals Medical Affairs Intelligence demo at `z-aurivian/aurivian-alexion-demo`.

**Live URL:** https://aurivian-alexion-demo.vercel.app
**GitHub:** https://github.com/z-aurivian/aurivian-alexion-demo
**Vercel Team:** zees-projects-c44340b7 / project: aurivian-alexion-demo

## Architecture
- React 19 + CRA + Tailwind 3.4 + react-router-dom + Recharts + Lucide React
- Anthropic SDK + OpenAI SDK + react-markdown + remark-gfm
- Dark theme, Aurivian branding (Michroma font, #00A8FF blue, #111111 dark)
- CI=false in build script, vercel.json SPA rewrites

## 3 Routes
| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | MedicalInsights.js | Survey & Analytics — 5 sub-dashboards |
| `/auri` | AuriChat.js | Auri Intelligence — AI chat with LLM fallback chain |
| `/kol` | KOLManagement.js | KOL list with filters, detail cards, summary stats |

## Global Product Selector
Soliris (eculizumab) vs Ultomiris (ravulizumab) — all tabs filter by selected product.

## 5 Sub-Dashboards (MedicalInsights.js)
1. KIT Performance & Evolution — scorecard table, AI insight cards, emerging themes
2. Field Intelligence Alignment — strategic alignment matrix, data source quality heatmap
3. Competitive Intelligence — competitor mentions, AI summaries, market access
4. Predictive Signals — momentum indicators, weak signals, sentiment velocity
5. Insight ROI & Effectiveness — source value matrix, insight-to-impact tracking, relevance decay curve (Recharts)

## Data Layer
- `src/data/demoData.js` — All mock data keyed by product ID (KITs, competitors, KOLs, signals, etc.)
- `src/data/strategicContent.js` — Strategic imperatives, competitive landscape, complement biology, pipeline intel
- 18 real KOLs across hematology, nephrology, neurology
- 5 competitors: Piasky, Fabhalta, Empaveli, Zilbrysq, Biosimilar Soliris
- 5 KITs: Biosimilar Switching, Complement Pathway Education, Breakthrough Hemolysis, Oral Competitors, Diagnosis Pathways

## API Layer
- `src/api/auriApi.js` — Main entry, Claude → OpenAI → keyword fallback
- `src/api/claudeApi.js` — Anthropic SDK (claude-sonnet-4-5)
- `src/api/openaiApi.js` — OpenAI SDK (gpt-4o-mini)
- `src/api/promptBuilder.js` — System prompt with Alexion context
- `src/api/rag.js` — Keyword-based RAG retrieval from mock data

## Key Design Decisions
- Soliris data reflects mature product under biosimilar/oral competitor pressure (declining sentiment)
- Ultomiris data reflects growth product benefiting from conversion tailwinds (improving sentiment)
- Biosimilar Soliris: negative sentiment for Soliris, positive for Ultomiris (conversion catalyst)
- KOL productAlignment: hematologists/nephrologists → both; some neurologists → Soliris only

## Vercel
- Connected to GitHub via Vercel CLI (`npx vercel --yes`)
- Auto-deploys on push to master
- No env vars set yet (keyword fallback works without API keys)

## Pending / Future Improvements
- Add env vars on Vercel for Claude/OpenAI API keys
- Polish UI, responsive design
- Add to demo-landing page
- Consider pulling KOL components from aurivian-kol-demo repo
- Session notes reference: user mentioned https://github.com/z-aurivian/aurivian-kol-demo as potential source for KOL patterns
