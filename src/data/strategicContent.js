// Strategic content for Alexion Pharmaceuticals Medical Affairs Demo
// Last updated: 2026-02-23

export const STRATEGIC_IMPERATIVES = [
  {
    id: 'si-001',
    name: 'Patient Access & Diagnosis Optimization',
    category: 'Patient-Related',
    description:
      'Reduce the diagnostic delay in PNH (currently averaging 1–2 years) and aHUS by expanding flow cytometry screening programs, supporting genomic newborn screening initiatives such as BeginNGS, and strengthening referral pathways from community hematologists to rare disease centers of excellence. Early identification and rapid referral remain the most impactful levers for improving patient outcomes in ultra-rare complement-mediated diseases.',
    successMetrics: [
      'Median time from symptom onset to confirmed diagnosis (target: reduce by 30%)',
      'Flow cytometry and genomic screening program enrollment rates',
      'Referral conversion rate from community hematology to rare disease centers',
      'Net new patient identification rate per quarter'
    ],
    keyActions: [
      'Partner with reference laboratories to embed high-sensitivity PNH flow cytometry panels into routine cytopenia workups',
      'Support BeginNGS and analogous genomic screening programs for early complement disorder detection',
      'Deploy digital disease awareness campaigns targeting community hematologists and nephrologists',
      'Establish rapid-referral pathways with top 50 rare disease centers in the US and EU'
    ]
  },
  {
    id: 'si-002',
    name: 'Treatment Optimization & Adherence',
    category: 'Patient-Related',
    description:
      'Accelerate the conversion of Soliris (eculizumab) patients to Ultomiris (ravulizumab) ahead of biosimilar erosion from Bkemv and Epysqli, both launched in 2025. Position the Ultomiris subcutaneous formulation as a patient-convenience differentiator, reduce breakthrough hemolysis through optimized dosing, and generate robust patient-reported outcome and quality-of-life evidence to support value-based contracting.',
    successMetrics: [
      'Soliris-to-Ultomiris conversion rate (target: >85% of eligible patients)',
      'Medication possession ratio and infusion adherence score',
      'Breakthrough hemolysis incidence (target: <5% of treated patients)',
      'PRO/QoL data completeness in registries and post-marketing studies'
    ],
    keyActions: [
      'Launch targeted HCP education on Ultomiris pharmacokinetic advantages (Q8W IV, Q4W SC vs. Q2W Soliris)',
      'Implement nurse-navigator programs to support infusion-to-SC transition and reduce treatment burden',
      'Generate real-world evidence on Ultomiris SC formulation outcomes and patient preference',
      'Develop PRO-enriched registries capturing FACIT-Fatigue, EORTC QLQ-C30, and PNH-specific instruments'
    ]
  },
  {
    id: 'si-003',
    name: 'Clinical & Scientific Leadership',
    category: 'Differentiation',
    description:
      'Establish and maintain Alexion as the definitive authority in complement biology through strategic publication planning, systematic KOL engagement, and high-impact congress presence at ASH, EHA, and ISTH. Advance the gefurulimab clinical program and proactively generate head-to-head evidence versus emerging oral and proximal complement inhibitors to anchor the scientific narrative.',
    successMetrics: [
      'Peer-reviewed publication count in top-tier hematology and nephrology journals',
      'KOL engagement score across tiered advocacy network',
      'Congress share of voice at ASH, EHA, and ISTH (target: >30% of complement sessions)',
      'Manuscript acceptance rate in target journals (target: >70%)'
    ],
    keyActions: [
      'Execute a 24-month publication plan covering Ultomiris long-term data, Voydeya combination evidence, and complement biology reviews',
      'Build a tiered KOL network of 150+ global thought leaders across PNH, aHUS, gMG, and NMOSD',
      'Sponsor and shape complement-focused symposia at major hematology and nephrology congresses',
      'Commission investigator-initiated studies comparing terminal vs. proximal complement inhibition outcomes'
    ]
  },
  {
    id: 'si-004',
    name: 'Competitive Positioning & Franchise Defense',
    category: 'Differentiation',
    description:
      'Defend the complement franchise against the dual threat of oral competitors (iptacopan/Fabhalta, pegcetacoplan/Empaveli) and biosimilar Soliris erosion. Position Voydeya (danicopan) as a synergistic oral Factor D add-on that creates a differentiated "complement platform" when combined with Ultomiris, and counter biosimilar switching with robust Ultomiris clinical and economic superiority data.',
    successMetrics: [
      'Market share retention in PNH and aHUS (target: >65% value share)',
      'Biosimilar switch-back rate to branded Alexion therapies',
      'Voydeya awareness and trial consideration among treating hematologists',
      'HCP preference score for Alexion complement platform vs. single-agent competitors'
    ],
    keyActions: [
      'Develop and disseminate Ultomiris vs. biosimilar eculizumab switching data emphasizing dosing convenience and immunogenicity advantages',
      'Position Voydeya + Ultomiris combination as the only dual-pathway complement blockade option',
      'Create competitive response playbooks addressing oral Factor B inhibitor and C3 inhibitor market entry',
      'Engage managed care with pharmacoeconomic models demonstrating Ultomiris total cost-of-care advantages over fragmented competitor regimens'
    ]
  }
];

export const COMPETITIVE_LANDSCAPE = [
  {
    id: 'comp-001',
    name: 'Piasky',
    genericName: 'crovalimab',
    company: 'Roche / Chugai',
    mechanism: 'Anti-C5 recycling antibody (sequential two-arm binding with antibody recycling technology)',
    approvedIndications: [
      'PNH in adults and adolescents (Japan, 2024)',
      'PNH in adults (EU, 2024)'
    ],
    keyTrials: [
      'COMMODORE 1 — Phase III, treatment-naïve PNH, demonstrated non-inferiority to eculizumab in LDH control',
      'COMMODORE 2 — Phase III, C5i-experienced PNH, maintained hemolysis control after switch from eculizumab/ravulizumab',
      'COMMODORE 3 — open-label extension confirming durable efficacy and safety'
    ],
    strengths: [
      'Subcutaneous monthly dosing after loading (reduced treatment burden vs. IV C5 inhibitors)',
      'Antibody recycling technology enables low-volume SC injection despite high target coverage',
      'Backed by Roche global commercial infrastructure and market access capabilities',
      'Non-inferior efficacy to eculizumab with potential convenience advantage'
    ],
    weaknesses: [
      'Limited long-term safety data relative to eculizumab/ravulizumab (decades of experience)',
      'No approved indications beyond PNH; narrower franchise than Alexion',
      'C5 polymorphism susceptibility similar to other anti-C5 agents (R885H/C)',
      'US approval still pending — regulatory timeline uncertain'
    ],
    strategicThreatLevel: 'Medium',
    marketStatus: 'Approved in Japan and EU; US filing anticipated',
    summary:
      'Piasky is a direct C5 competitor with a differentiated subcutaneous monthly dosing regimen enabled by antibody recycling technology. While it offers convenience advantages over IV-administered C5 inhibitors, it lacks the breadth of indication coverage and long-term safety track record that Alexion holds with Ultomiris. Its primary threat is in PNH markets where SC convenience may sway treatment-naïve patients and their physicians.'
  },
  {
    id: 'comp-002',
    name: 'Fabhalta',
    genericName: 'iptacopan',
    company: 'Novartis',
    mechanism: 'Oral Factor B inhibitor (selective, reversible inhibitor of complement alternative pathway)',
    approvedIndications: [
      'PNH in adults with inadequate response to C5 inhibitors (US, 2023)',
      'PNH in adults — monotherapy and C5i-inadequate response (EU, 2024)'
    ],
    keyTrials: [
      'APPLY-PNH — Phase III, C5i-inadequate response PNH, significant improvement in hemoglobin and transfusion avoidance vs. continued C5i',
      'APPOINT-PNH — Phase III, treatment-naïve PNH monotherapy, demonstrated hemoglobin improvement and LDH normalization',
      'APPLY-PNH-301 — open-label extension confirming sustained efficacy'
    ],
    strengths: [
      'First-in-class oral complement inhibitor — transformational convenience advantage over all injectable therapies',
      'Addresses extravascular hemolysis (C3-opsonization) that C5 inhibitors cannot prevent',
      'Strong efficacy in C5i-inadequate response patients — directly targets Alexion treatment failures',
      'Twice-daily oral dosing eliminates infusion burden, clinic visits, and port-related complications'
    ],
    weaknesses: [
      'Twice-daily dosing requires consistent patient adherence without clinic-based monitoring',
      'Proximal alternative pathway inhibition raises theoretical infection risk (encapsulated organisms)',
      'Limited long-term safety data; hepatotoxicity monitoring required',
      'No approved indications beyond PNH (aHUS, gMG franchise breadth absent)'
    ],
    strategicThreatLevel: 'High',
    marketStatus: 'Approved and launched in US and EU for PNH',
    summary:
      'Fabhalta represents the most significant competitive threat to the Alexion complement franchise. As the first oral complement inhibitor, it fundamentally shifts the convenience paradigm and directly addresses C3-mediated extravascular hemolysis — a known limitation of C5 blockade. Its positioning in C5i-inadequate response patients directly targets Alexion treatment failures, and its monotherapy expansion broadens the threat to treatment-naïve patients.'
  },
  {
    id: 'comp-003',
    name: 'Empaveli',
    genericName: 'pegcetacoplan',
    company: 'Apellis Pharmaceuticals',
    mechanism: 'PEGylated C3 inhibitor (targeted peptide binding C3 and C3b, blocking all three complement pathways)',
    approvedIndications: [
      'PNH in adults (US, 2021)',
      'PNH in adults (EU, 2023)',
      'Geographic atrophy secondary to AMD (as Syfovre, intravitreal formulation)'
    ],
    keyTrials: [
      'PEGASUS — Phase III, PNH patients on eculizumab, superior hemoglobin improvement vs. continued eculizumab',
      'PRINCE — Phase III, complement-inhibitor-naïve PNH, hemoglobin improvement as monotherapy',
      'PHAROAH — Phase II in C3 glomerulopathy (C3G), exploratory efficacy signals'
    ],
    strengths: [
      'Proximal C3 inhibition addresses both intravascular and extravascular hemolysis',
      'Demonstrated superiority over eculizumab in hemoglobin improvement in PEGASUS trial',
      'Subcutaneous self-administration (infusion pump or syringe) enables home-based therapy',
      'Potential expansion into C3 glomerulopathy and other complement-driven diseases'
    ],
    weaknesses: [
      'Subcutaneous infusion pump administration is cumbersome (20-minute infusion, injection site reactions common)',
      'Increased risk of serious infections from C3 depletion (encapsulated bacteria, particularly Neisseria)',
      'Breakthrough hemolysis reported during dose titration and in high-disease-activity patients',
      'Limited market uptake relative to expectations; commercial execution challenges'
    ],
    strategicThreatLevel: 'Medium',
    marketStatus: 'Approved and launched in US and EU for PNH',
    summary:
      'Empaveli offers a differentiated proximal mechanism via C3 inhibition that addresses extravascular hemolysis — a limitation of terminal C5 blockade. However, its subcutaneous infusion pump delivery, injection site reactions, and heightened infection risk have tempered market adoption. It remains a meaningful competitor in C5i-inadequate responders but has not achieved the commercial traction needed to fundamentally reshape the PNH treatment landscape.'
  },
  {
    id: 'comp-004',
    name: 'Zilbrysq',
    genericName: 'zilucoplan',
    company: 'UCB',
    mechanism: 'Subcutaneous macrocyclic peptide C5 inhibitor (binds C5 to prevent cleavage into C5a and C5b)',
    approvedIndications: [
      'Generalized myasthenia gravis (gMG) in AChR-antibody-positive adults (US, 2023)',
      'Generalized myasthenia gravis (gMG) in AChR-antibody-positive adults (EU, 2023)'
    ],
    keyTrials: [
      'RAISE — Phase III, AChR+ gMG, significant improvement in MG-ADL score vs. placebo at 12 weeks',
      'RAISE-XT — open-label extension demonstrating sustained MG-ADL and QMG improvement',
      'RAISE-2 — Phase III in broader gMG population (ongoing)'
    ],
    strengths: [
      'Daily subcutaneous self-injection offers convenience over IV Soliris in gMG',
      'Small peptide with low immunogenicity and consistent pharmacokinetics',
      'UCB neurology franchise provides strong commercial presence in myasthenia gravis',
      'REMS-aligned meningococcal vaccination protocol already familiar to treating neurologists'
    ],
    weaknesses: [
      'Daily injection frequency is a burden relative to Q8W Ultomiris IV or monthly Piasky',
      'No approved PNH or aHUS indication — limited to gMG franchise competition',
      'Peptide-based mechanism may face durability questions vs. monoclonal antibody C5 inhibitors',
      'Small molecule and oral competitors emerging in gMG (e.g., FcRn inhibitors, BTK inhibitors)'
    ],
    strategicThreatLevel: 'Medium',
    marketStatus: 'Approved and launched in US and EU for gMG',
    summary:
      'Zilbrysq competes primarily against Soliris in the gMG indication, offering self-administered daily SC dosing as a convenience alternative to biweekly IV infusion. Its threat is confined to the gMG franchise and does not extend to PNH or aHUS, where Alexion\'s core revenue resides. The broader gMG competitive landscape, including FcRn inhibitors like Vyvgart, represents a more significant challenge than Zilbrysq alone.'
  },
  {
    id: 'comp-005',
    name: 'Biosimilar Soliris',
    genericName: 'eculizumab biosimilars',
    company: 'Samsung Bioepis (Bkemv) / Amgen (Epysqli) / Teva',
    mechanism: 'Biosimilar anti-C5 monoclonal antibody (same mechanism as originator eculizumab)',
    approvedIndications: [
      'PNH in adults (biosimilar to Soliris across all approved indications)',
      'aHUS in adults and pediatric patients',
      'Generalized myasthenia gravis (AChR+)',
      'NMOSD (AQP4+ patients)'
    ],
    keyTrials: [
      'SB12-G31-PNH — Phase III, Bkemv (Samsung Bioepis) demonstrated biosimilarity to Soliris in PNH patients',
      'ABP 959 studies — Phase III, Epysqli (Amgen) demonstrated equivalent PK, efficacy, and safety to Soliris',
      'Teva eculizumab biosimilar — regulatory submissions based on totality of evidence for biosimilarity'
    ],
    strengths: [
      'Significant price discount (15–30% below branded Soliris) attractive to payers and PBMs',
      'Identical mechanism and indication coverage enables seamless formulary substitution',
      'Multiple manufacturers ensure competitive pricing pressure and reliable supply',
      'Familiar eculizumab prescribing experience reduces HCP switching hesitation'
    ],
    weaknesses: [
      'Same biweekly IV dosing burden as originator Soliris — no convenience improvement',
      'No differentiated clinical data; perceived as commodity product',
      'Interchangeability designation timelines vary — some payers await formal designation before auto-substitution',
      'Immunogenicity uncertainty during switches may concern risk-averse prescribers'
    ],
    strategicThreatLevel: 'High',
    marketStatus: 'Bkemv and Epysqli launched in US (2025); EU launches ongoing',
    summary:
      'Biosimilar eculizumab products represent an immediate and direct threat to residual Soliris revenue through 15–30% price discounts and formulary-driven substitution. Their launch in 2025 has created urgent pressure to complete Soliris-to-Ultomiris conversions, as patients remaining on Soliris are vulnerable to payer-mandated biosimilar switches. The strategic response is to accelerate Ultomiris adoption, positioning its extended dosing interval and SC formulation as clinically superior differentiators that justify the branded premium.'
  }
];

export const MARKET_ACCESS_INTELLIGENCE = {
  pricingContext:
    'Soliris carries a wholesale acquisition cost of approximately $500,000 per year, making it one of the most expensive therapies globally, while Ultomiris is priced comparably at approximately $480,000 per year with value justified through extended dosing intervals (Q8W vs. Q2W). Biosimilar eculizumab entrants (Bkemv, Epysqli) have launched at 15–30% discounts to Soliris WAC, creating significant payer pressure for formulary-level substitution and accelerating the strategic urgency of Ultomiris conversion before patients are switched to lower-cost biosimilars.',
  remsProgram:
    'All C5 complement inhibitors (eculizumab, ravulizumab, crovalimab, zilucoplan) carry a REMS requirement for meningococcal vaccination due to the increased risk of Neisseria meningitidis infection associated with terminal complement blockade. While not a competitive differentiator, the REMS program creates operational burden for prescribers and institutions, requiring patient counseling, vaccination verification, and ongoing monitoring — factors that favor established centers of excellence with existing REMS infrastructure.',
  payerChallenges: [
    'Step-therapy and prior authorization requirements increasingly mandate trial of biosimilar eculizumab before branded Soliris or Ultomiris in new PNH patients',
    'Specialty pharmacy consolidation and site-of-care optimization are shifting infusions from hospital outpatient to lower-cost home infusion and ambulatory settings',
    'Outcomes-based and indication-specific contracting models are emerging for ultra-orphan therapies, requiring robust real-world evidence generation',
    'International reference pricing pressure and ICER value assessments are challenging the sustainability of $400K–$500K annual therapy costs in rare disease'
  ],
  orphanDrugDynamics:
    'Orphan drug designation provides 7 years of market exclusivity in the US and 10 years in the EU, historically shielding ultra-rare disease therapies from competition. However, the approval of biosimilar eculizumab following orphan exclusivity expiration demonstrates that this protection is time-limited. Ultomiris retains orphan exclusivity through the late 2020s across most indications, and Voydeya (danicopan) as an add-on therapy may qualify for independent orphan designation, creating layered exclusivity protection for the complement platform.'
};

export const COMPLEMENT_BIOLOGY = {
  overview:
    'The complement system is a critical arm of innate immunity comprising over 50 plasma and membrane-bound proteins organized into three activation pathways: the classical pathway (antibody-mediated), the lectin pathway (pattern recognition), and the alternative pathway (spontaneous C3 tick-over). All three pathways converge at C3 and ultimately generate the terminal membrane attack complex (MAC, C5b-9) that lyses target cells, along with the potent anaphylatoxins C3a and C5a that drive inflammation. Dysregulation of complement — whether through genetic mutations, autoantibodies, or acquired defects in regulatory proteins — underlies a spectrum of rare diseases including PNH, aHUS, gMG, and NMOSD.',
  c5Inhibition:
    'Eculizumab (Soliris) and ravulizumab (Ultomiris) are humanized monoclonal antibodies that bind complement protein C5, preventing its cleavage by C5 convertases into C5a (a pro-inflammatory anaphylatoxin) and C5b (the initiating component of the membrane attack complex). By blocking terminal pathway activation at C5, these agents prevent MAC-mediated intravascular hemolysis in PNH, thrombotic microangiopathy in aHUS, and complement-dependent damage at the neuromuscular junction in gMG. Ravulizumab was engineered with a modified Fc region that exploits pH-dependent FcRn recycling, extending its half-life to approximately 50 days and enabling Q8W IV or Q4W SC dosing versus eculizumab\'s Q2W IV requirement. Importantly, C5 inhibition preserves upstream complement opsonization (C3b deposition), which means extravascular hemolysis via reticuloendothelial phagocytosis remains an unaddressed mechanism in approximately 10–20% of PNH patients.',
  proximalInhibition:
    'Proximal complement inhibitors target the cascade upstream of C5, addressing limitations of terminal blockade. Factor B inhibitors (e.g., iptacopan/Fabhalta) selectively block the alternative pathway C3 convertase, reducing both C3-mediated opsonization and downstream MAC formation. Factor D inhibitors (e.g., danicopan/Voydeya) similarly target the alternative pathway amplification loop at the rate-limiting serine protease Factor D. C3 inhibitors (e.g., pegcetacoplan/Empaveli) bind C3 directly, blocking all three pathway convergence points and preventing both C3b opsonization and MAC formation. While proximal inhibition theoretically provides more complete complement blockade, it also carries greater immunological risk due to broader suppression of complement-mediated pathogen defense, particularly against encapsulated bacteria.',
  diseaseConnections: {
    PNH:
      'Paroxysmal nocturnal hemoglobinuria (PNH) is an acquired clonal hematopoietic stem cell disorder caused by somatic mutations in the PIGA gene, which is required for glycosylphosphatidylinositol (GPI) anchor biosynthesis. Loss of GPI-anchored complement regulatory proteins CD55 (decay-accelerating factor) and CD59 (MAC inhibitory protein) on affected red blood cells renders them susceptible to complement-mediated intravascular hemolysis, resulting in chronic anemia, hemoglobinuria, fatigue, thrombosis, and end-organ damage. PNH affects approximately 1–1.5 per million people, and untreated patients face a median survival of 10–15 years with thrombosis as the leading cause of mortality.',
    aHUS:
      'Atypical hemolytic uremic syndrome (aHUS) is a rare thrombotic microangiopathy caused by uncontrolled complement activation on endothelial surfaces, most commonly due to inherited or acquired defects in complement regulatory proteins (Factor H, Factor I, MCP/CD46) or gain-of-function mutations in complement effectors (C3, Factor B). Unregulated complement activation triggers endothelial injury, platelet activation, and fibrin deposition in renal and systemic microvasculature, leading to microangiopathic hemolytic anemia, thrombocytopenia, and acute kidney injury. Without complement inhibition, aHUS carries a mortality rate of up to 25% and progression to end-stage renal disease in over 50% of patients within the first year.',
    gMG:
      'Generalized myasthenia gravis (gMG) is an autoimmune disorder in which antibodies — most commonly against the acetylcholine receptor (AChR) — activate complement at the neuromuscular junction, generating MAC-mediated destruction of the postsynaptic membrane and reducing acetylcholine receptor density. This complement-dependent pathology results in fluctuating skeletal muscle weakness affecting ocular, bulbar, limb, and respiratory muscles. C5 inhibition with eculizumab or ravulizumab blocks MAC formation at the neuromuscular junction, improving muscle function in AChR-antibody-positive patients who remain symptomatic despite conventional immunosuppressive therapy.',
    NMOSD:
      'Neuromyelitis optica spectrum disorder (NMOSD) is a severe autoimmune astrocytopathy driven by pathogenic IgG antibodies against aquaporin-4 (AQP4), the predominant water channel on astrocytic foot processes in the central nervous system. Anti-AQP4 antibody binding activates the classical complement pathway, leading to MAC formation, astrocyte destruction, secondary oligodendrocyte injury, and demyelination predominantly affecting the optic nerves and spinal cord. Complement inhibition with eculizumab significantly reduces relapse rates in AQP4-seropositive NMOSD, as demonstrated in the PREVENT trial, which showed a 94% relative reduction in adjudicated relapses versus placebo.'
  }
};

export const PIPELINE_INTELLIGENCE = [
  {
    id: 'pipe-001',
    name: 'Gefurulimab',
    mechanism:
      'Long-acting anti-C5 monoclonal antibody engineered for subcutaneous self-administration with extended dosing interval (monthly SC)',
    stage: 'Phase III',
    indication: 'Generalized myasthenia gravis (gMG), with potential expansion to PNH and NMOSD',
    expectedTimeline:
      'Phase III PREVAIL study in gMG ongoing; regulatory submission anticipated 2026–2027 pending pivotal data readout',
    significance:
      'Gefurulimab is designed to be the next-generation evolution of the Alexion C5 franchise, combining the proven efficacy of terminal complement blockade with the convenience of monthly subcutaneous self-administration. If approved, it would directly counter the convenience positioning of oral competitors like Fabhalta while retaining the well-characterized safety profile of anti-C5 therapy. Success in gMG would also expand the Ultomiris-to-gefurulimab lifecycle management strategy across complement indications.'
  },
  {
    id: 'pipe-002',
    name: 'Danicopan (Voydeya)',
    mechanism:
      'Oral first-in-class Factor D inhibitor that blocks the alternative pathway amplification loop; approved as add-on to C5 inhibitors in PNH',
    stage: 'Approved (add-on); Phase III monotherapy trials ongoing',
    indication:
      'PNH as add-on therapy to C5 inhibitors (approved US 2024); PNH monotherapy and potential expansion to C3 glomerulopathy and IgA nephropathy under investigation',
    expectedTimeline:
      'Monotherapy PNH data expected 2026; C3G and IgAN Phase II/III data anticipated 2027',
    significance:
      'Voydeya is the cornerstone of Alexion\'s "complement platform" strategy, providing an oral add-on that addresses residual extravascular hemolysis in C5i-treated PNH patients. As the only approved oral complement inhibitor designed for combination with C5 blockade, it creates a differentiated dual-pathway regimen that competitors cannot replicate with single-agent therapy. Monotherapy development, if successful, would position Alexion to compete directly with Fabhalta in the oral complement inhibitor space while maintaining franchise continuity.'
  },
  {
    id: 'pipe-003',
    name: 'ALXN1720',
    mechanism:
      'Anti-C5 albumin-binding single-domain antibody (nanobody) designed for subcutaneous administration with ultra-long dosing intervals via albumin half-life extension',
    stage: 'Phase II/III',
    indication: 'PNH and other complement-mediated diseases',
    expectedTimeline:
      'Phase II PNH data readouts expected mid-2026; Phase III design anticipated based on dose-optimization results',
    significance:
      'ALXN1720 represents a next-generation approach to C5 inhibition using a small albumin-binding nanobody format that leverages endogenous albumin recycling for extended half-life. Its compact molecular size enables high-concentration subcutaneous formulation with potential for monthly or less frequent dosing, and its differentiated format may offer advantages in tissue penetration and manufacturing scalability. This program provides pipeline depth to the C5 franchise and a potential succession asset beyond ravulizumab and gefurulimab.'
  },
  {
    id: 'pipe-004',
    name: 'Pozelimab',
    mechanism:
      'Fully human anti-C5 monoclonal antibody co-administered with cemdisiran (RNAi targeting hepatic C5 production) for dual pharmacologic and genetic C5 suppression',
    stage: 'Phase III',
    indication:
      'CD55-deficient protein-losing enteropathy (CHAPLE disease); PNH under investigation with cemdisiran combination',
    expectedTimeline:
      'CHAPLE disease Phase III ongoing (Regeneron-led); PNH combination studies with cemdisiran in Phase II with data anticipated 2026–2027',
    significance:
      'Pozelimab, developed by Regeneron, targets an ultra-rare complement disorder (CHAPLE disease) where CD55 deficiency leads to uncontrolled complement activation on intestinal epithelium. While its CHAPLE indication has minimal commercial overlap with Alexion, the pozelimab + cemdisiran combination in PNH represents a novel dual-mechanism approach (antibody blockade + RNAi-mediated C5 synthesis reduction) that could achieve more complete and sustained C5 suppression than monoclonal antibody therapy alone. This program warrants competitive monitoring as a potential long-term threat to C5 antibody monotherapy.'
  }
];
