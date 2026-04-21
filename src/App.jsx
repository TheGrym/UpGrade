// ═══════════════════════════════════════════════════════════════════════════
//  IRON — Fitness tracker premium
//  Single-file React · localStorage · Vite + React 18 + recharts
//  v1.0 — 2026
// ═══════════════════════════════════════════════════════════════════════════

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid } from "recharts";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const T = {
  bg:"#0B0B0D", bgSoft:"#0F0F12", surface:"#151518", surface2:"#1C1C21", surface3:"#25252C",
  border:"rgba(255,255,255,0.06)", borderMid:"rgba(255,255,255,0.10)", borderStrong:"rgba(255,255,255,0.18)",
  text:"#F4F3F1", textMuted:"#A1A1A6", textDim:"#6F6F75", textSubtle:"#4A4A50",
  accent:"#F97316", accentLight:"#FB923C", accentDeep:"#C2410C", accentGlow:"rgba(249,115,22,0.28)",
  accentG:"linear-gradient(135deg,#F97316,#FB923C)",
  success:"#10B981", successG:"linear-gradient(135deg,#10B981,#059669)",
  warning:"#F59E0B", danger:"#EF4444",
  s1:"#F59E0B", s1G:"linear-gradient(135deg,#F59E0B,#FBBF24)",
  s2:"#F97316", s2G:"linear-gradient(135deg,#F97316,#FB923C)",
  s3:"#DC2626", s3G:"linear-gradient(135deg,#DC2626,#F87171)",
};
const FF_DISPLAY = "'Fraunces', serif";
const FF_SANS = "'Instrument Sans', -apple-system, sans-serif";
const FF_MONO = "'JetBrains Mono', ui-monospace, monospace";
const FONTS_URL = "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT@9..144,400..900,100&family=Instrument+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap";

// ─── ICÔNES SVG ───────────────────────────────────────────────────────────────
const I = ({d,s=18,c="currentColor",f="none",w=1.8})=>(<svg width={s} height={s} viewBox="0 0 24 24" fill={f} stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}><path d={d}/></svg>);
const ICO = {
  home:"M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1V10.5Z",
  dumbbell:"M6.5 6.5 17.5 17.5M4 8v8M8 4v16M16 4v16M20 8v8",
  chart:"M3 20h18M6 16v-5M11 16V6M16 16v-8",
  more:"M12 6h.01M12 12h.01M12 18h.01",
  play:"M6 4l14 8-14 8V4z",
  check:"M4 12l5 5L20 6",
  plus:"M12 5v14M5 12h14",
  minus:"M5 12h14",
  close:"M6 6l12 12M18 6L6 18",
  chevR:"M9 6l6 6-6 6",
  chevD:"M6 9l6 6 6-6",
  flame:"M12 2c1 3 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 1-5 2 1 3 0 4-5z",
  timer:"M12 8v5l3 2M12 3v2M4 6l1.5 1.5M20 6l-1.5 1.5M12 21a8 8 0 100-16 8 8 0 000 16z",
  edit:"M16 3l5 5-11 11H5v-5L16 3z",
  trash:"M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3",
  info:"M12 9v5M12 17h.01M12 22a10 10 0 100-20 10 10 0 000 20z",
  dl:"M12 3v12M7 10l5 5 5-5M4 21h16",
  up:"M12 15V3M7 8l5-5 5 5M4 21h16",
  bolt:"M13 2 4 14h7l-1 8 9-12h-7l1-8z",
  cog:"M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 01-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 01-4 0v-.1a1.7 1.7 0 00-1.1-1.6 1.7 1.7 0 00-1.8.4l-.1.1a2 2 0 01-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 010-4h.1a1.7 1.7 0 001.6-1.1 1.7 1.7 0 00-.4-1.8l-.1-.1a2 2 0 012.8-2.8l.1.1a1.7 1.7 0 001.8.3h.1a1.7 1.7 0 001-1.5V3a2 2 0 014 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 012.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8v.1a1.7 1.7 0 001.5 1H21a2 2 0 010 4h-.1a1.7 1.7 0 00-1.5 1z",
  arrowR:"M5 12h14M13 5l7 7-7 7",
  undo:"M3 7v6h6M3 13a9 9 0 1 0 3-7.7L3 8",
  note:"M21 14a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9z",
  trophy:"M8 21h8M12 17v4M17 4h3v4a5 5 0 0 1-5 5M7 4H4v4a5 5 0 0 0 5 5M7 4h10v9a5 5 0 0 1-10 0V4z",
  book:"M4 4v16a2 2 0 0 0 2 2h14V4H6a2 2 0 0 0-2 2z",
};

// ─── PROGRAMMES PRÉFABRIQUÉS ─────────────────────────────────────────────────
// Format flexible : chaque programme contient des séances, chaque séance contient des exercices.
// Les exos peuvent être normaux, supersets (2 exos couplés), ou "montée en gamme" (hack squat alterné).

const PROGRAMS = {
  uplowup: {
    id: "uplowup", name: "UP / LOW / UP", subtitle: "Hypertrophie · 3 séances", author: "Julien",
    description: "Split haut/bas/haut avec supersets. Surcharge progressive hebdomadaire.",
    sessions: [
      { id:"u1", key:"u1", label:"UP 1", title:"Upper Body A", muscles:"Poitrine · Épaules · Triceps · Biceps · Dos", color:T.s1, grad:T.s1G, num:"01", exercises:[
        { id:"dc_halt", name:"DC Haltère", sets:2, min:6, max:10,
          tips:["Rétracte et abaisse les omoplates — garde-les serrées tout au long.","Descends lentement en 3 temps, coudes à 45° du buste.","En bas, cherche l'étirement maximal des pectoraux avant de pousser.","Pousse vers le haut en ramenant légèrement les mains l'une vers l'autre."]},
        { id:"di_halt", name:"DI Haltère", sets:2, min:6, max:10,
          tips:["Banc incliné 30-45° max — au-delà ce sont les épaules qui prennent.","Descends avec contrôle, coudes stables et légèrement fléchis.","Évite que les épaules montent en cours de mouvement.","Contraction nette en haut sans claquer les haltères."]},
        { id:"ecarte", name:"Écarté Poulie/Haltère", sets:2, min:10, max:15,
          tips:["Mouvement en arc — imagine que tu enlaces quelqu'un.","Léger fléchi permanent des coudes.","Charge légère : l'étirement prime sur le poids.","Ralentis la descente pour maximiser le stimulus."]},
        { id:"curl_marteau_poulie", superset:true, nameA:"Curl Marteau Poulie", nameB:"Curl Incliné Haltère", sets:3, min:8, max:12,
          tipsA:["Coudes parfaitement fixes contre le corps.","Poignet neutre tout au long.","Descends en 3-4 secondes sur la phase excentrique."],
          tipsB:["Banc incliné : étirement maximal du biceps en bas.","Coudes fixes, ne les avance pas en montant.","Enchaîne directement, sans repos."]},
        { id:"tirage_menton", superset:true, nameA:"Tirage Menton 2 Temps", nameB:"Élévation Latérale", sets:3, min:8, max:12,
          tipsA:["1er temps : coudes à hauteur d'épaule. 2e temps : mains au menton.","Coudes toujours au-dessus des mains.","Mouvement lent et contrôlé."],
          tipsB:["Légère inclinaison avant du buste.","Pouce légèrement vers le bas, ne dépasse pas l'horizontale.","Enchaîne directement, sans repos."]},
      ]},
      { id:"lo", key:"lo", label:"LOW", title:"Lower Body", muscles:"Quadriceps · Ischio · Fessiers · Mollets · Adducteurs", color:T.s2, grad:T.s2G, num:"02", exercises:[
        { id:"hack_squat", name:"Hack Squat", sets:3, alternating:true, special:"Montée en gamme à l'échec",
          tips:["Commence léger — échauffement des genoux obligatoire.","Pieds hauts = fessiers/ischio | Pieds bas = quadriceps.","Montée en gamme : charge plus lourde à chaque série, échec sur la 3e.","Alterne chaque semaine : 3 reps (charge max) vs 5 reps (volume)."]},
        { id:"sdl", name:"SDL — Soulevé de Terre Roumain", sets:2, min:6, max:10,
          tips:["Barre ou haltères qui glissent le long des cuisses.","Recule les hanches, fléchis très peu les genoux — charnière de hanche.","Cherche l'étirement des ischio en bas, dos toujours droit."]},
        { id:"squat_smith", name:"Squat Focus Quad Smith", sets:2, min:6, max:10,
          tips:["Pieds légèrement avancés devant la barre.","Laisse les genoux avancer pour isoler les quadriceps.","Profondeur complète si la mobilité le permet."]},
        { id:"pointe_smith", name:"Montée de Pointe Smith", sets:3, min:10, max:15,
          tips:["Pause de 2 secondes en bas — étirement complet du mollet.","Monte le plus haut possible, tiens 1 seconde en haut.","Mouvement lent — le mollet répond au temps sous tension."]},
        { id:"adducteur", name:"Adducteur", sets:2, min:8, max:12, degressive:2,
          tips:["Dégressive en 2 paliers : baisse 20-25% à l'échec, sans repos.","Amplitude complète.","Contraction nette en fin de course, tiens 1 seconde."]},
        { id:"leg_curl", name:"Leg Curl", sets:2, min:8, max:12, degressive:3,
          tips:["Dégressive en 3 paliers : échec → -20% → continue → -20% → continue.","Pointe les orteils vers toi pour maximiser les ischio.","Contraction maximale, descends en 3 secondes."]},
        { id:"leg_ext", name:"Leg Extension", sets:2, min:8, max:12, degressive:2,
          tips:["Dégressive en 2 paliers : à l'échec → -20-25% → continue.","Contraction électrique en haut — tiens 2 secondes.","Variation : pied neutre / pied tourné."]},
      ]},
      { id:"u2", key:"u2", label:"UP 2", title:"Upper Body B", muscles:"Dos · Biceps · Épaules · Triceps · Poitrine", color:T.s3, grad:T.s3G, num:"03", exercises:[
        { id:"tirage_vert_b", name:"Tirage Vertical", sets:2, min:6, max:10,
          tips:["Prise légèrement plus large que les épaules.","Tire vers le haut de la poitrine, jamais derrière la nuque.","Pense 'coudes vers les hanches'."]},
        { id:"rowing_coude", name:"Rowing Coude Ouvert", sets:2, min:6, max:10,
          tips:["Coudes partent latéralement à 45-90°.","Torse légèrement penché en avant au départ.","Rétracte les omoplates en fin de course — tiens 1 seconde."]},
        { id:"pullover", name:"Pull Over", sets:2, min:10, max:15,
          tips:["Allongé perpendiculairement au banc, hanches basses.","Bras légèrement fléchis — grand dorsal, pas triceps.","Amplitude maximale derrière la tête."]},
        { id:"curl_barre", superset:true, nameA:"Curl Barre", nameB:"Curl Marteau Haltère", sets:3, min:8, max:12,
          tipsA:["Prise supinée légèrement plus large que les épaules.","Coudes absolument fixes — s'ils bougent, c'est trop lourd.","Ne balance pas le dos."],
          tipsB:["Poignet neutre tout au long.","Isole le brachial et le brachioradial.","Enchaîne directement, sans repos."]},
        { id:"tirage_menton_b", superset:true, nameA:"Tirage Menton 2 Temps", nameB:"Élévation Latérale", sets:3, min:8, max:12,
          tipsA:["1er temps : coudes à hauteur d'épaule. 2e temps : mains au menton.","Coudes toujours au-dessus des mains.","Mouvement lent et contrôlé."],
          tipsB:["Légère inclinaison avant du buste.","Pouce légèrement vers le bas.","Enchaîne directement, sans repos."]},
        { id:"ext_poulie_b", superset:true, nameA:"Extension Poulie Basse", nameB:"Extension Poulie Haute", sets:3, min:8, max:12,
          tipsA:["Corde derrière la tête : étirement maximal du triceps long.","Coudes collés aux tempes, fixes tout au long.","Extension totale des bras en haut."],
          tipsB:["Coudes fixes, légèrement devant les oreilles.","Contraction parfaite en extension complète.","Enchaîne directement."]},
        { id:"tirage_horiz", name:"Tirage Horizontal", sets:2, min:6, max:10,
          tips:["Torse droit, légèrement penché en avant au départ.","Ramène les coudes derrière le buste.","Rétracte les omoplates à la contraction — tiens 1 seconde."]},
        { id:"dc_halt_b", name:"DC Haltère", sets:2, min:6, max:10,
          tips:["Rétracte et abaisse les omoplates avant de saisir les haltères.","Descends lentement en 3 temps, coudes à 45° du buste.","En bas, cherche l'étirement maximal des pectoraux."]},
      ]},
    ],
  },

  ppl3: {
    id:"ppl3", name:"Push / Pull / Legs", subtitle:"Hypertrophie · 3 séances", author:"IRON",
    description:"Split classique poussée / tirage / jambes. Polyvalent, éprouvé.",
    sessions:[
      { id:"push", key:"push", label:"PUSH", title:"Poussée", muscles:"Poitrine · Épaules · Triceps", color:T.s1, grad:T.s1G, num:"01", exercises:[
        { id:"dc_barre", name:"Développé Couché Barre", sets:4, min:6, max:10, tips:["Omoplates rétractées et fixées durant toute la série.","Descente contrôlée 2-3s, pause 1s en bas.","Barre touche la poitrine à hauteur des mamelons."]},
        { id:"di_halt_ppl", name:"Développé Incliné Haltère", sets:3, min:8, max:12, tips:["Banc à 30-45° max.","Trajectoire légèrement convergente en haut.","Contrôle la descente."]},
        { id:"dm_halt", name:"Développé Militaire Haltère", sets:3, min:8, max:12, tips:["Assis, dos calé contre le banc incliné presque vertical.","Coudes légèrement devant le buste.","Verrouillage en haut sans claquer les haltères."]},
        { id:"ecarte_ppl", name:"Écarté Poulie", sets:3, min:10, max:15, tips:["Bras légèrement fléchis, verrouillés.","Amène les mains devant la poitrine, contraction 1s.","Étirement contrôlé sur le retour."]},
        { id:"el_lat", name:"Élévation Latérale Haltère", sets:3, min:12, max:15, tips:["Légère inclinaison avant du buste.","Monte jusqu'à l'horizontale, pas au-delà.","Descente lente en 3s."]},
        { id:"ext_poulie_ppl", name:"Extension Triceps Poulie Haute", sets:3, min:10, max:12, tips:["Coudes fixes contre le corps.","Poignets neutres, amplitude complète.","Descente contrôlée."]},
      ]},
      { id:"pull", key:"pull", label:"PULL", title:"Tirage", muscles:"Dos · Biceps · Deltoïdes postérieurs", color:T.s2, grad:T.s2G, num:"02", exercises:[
        { id:"sdt", name:"Soulevé de Terre", sets:4, min:4, max:6, tips:["Barre collée aux tibias au départ.","Dos droit, scapulas engagées.","Extension complète des hanches en haut, puis redescend contrôlé."]},
        { id:"tractions", name:"Tractions (ou Tirage Vertical)", sets:4, min:6, max:10, tips:["Prise pronation, légèrement plus large que les épaules.","Tire les coudes vers les hanches.","Étirement complet en bas."]},
        { id:"rowing_barre", name:"Rowing Barre Buste Penché", sets:3, min:8, max:10, tips:["Buste à 30-45° de l'horizontale.","Tire la barre vers le bas du sternum.","Rétracte les omoplates à chaque rep."]},
        { id:"face_pull", name:"Face Pull Corde", sets:3, min:12, max:15, tips:["Corde à hauteur du front.","Tire en écartant les mains vers les oreilles.","Deltoïdes postérieurs + trapèzes moyens."]},
        { id:"curl_barre_ppl", name:"Curl Barre", sets:3, min:8, max:12, tips:["Coudes collés au corps, fixes.","Montée complète jusqu'au contact avant-bras/biceps.","Descente contrôlée 3s."]},
        { id:"curl_marteau_ppl", name:"Curl Marteau", sets:3, min:10, max:12, tips:["Poignet neutre, paumes face à face.","Coudes immobiles.","Alterne ou simultané."]},
      ]},
      { id:"legs", key:"legs", label:"LEGS", title:"Jambes", muscles:"Quadriceps · Ischio · Fessiers · Mollets", color:T.s3, grad:T.s3G, num:"03", exercises:[
        { id:"squat_barre", name:"Squat Barre", sets:4, min:5, max:8, tips:["Pieds largeur épaules, pointes légèrement ouvertes.","Descente profonde (cuisses parallèles minimum).","Genoux dans l'axe des pointes."]},
        { id:"presse", name:"Presse à Cuisses", sets:3, min:8, max:12, tips:["Pieds hauts sur la plate-forme = fessiers/ischio.","Pieds bas = quadriceps.","Ne verrouille jamais les genoux en haut."]},
        { id:"sdl_ppl", name:"Soulevé de Terre Roumain", sets:3, min:8, max:12, tips:["Barre près des jambes durant tout le mouvement.","Hanches en arrière, très peu de flexion de genoux.","Étirement des ischio en bas."]},
        { id:"fentes", name:"Fentes Marchées Haltère", sets:3, min:10, max:12, tips:["Genou avant jamais devant la pointe du pied.","Descente contrôlée, pousse sur le talon avant.","Corps droit, pas d'inclinaison."]},
        { id:"mollets", name:"Mollets Debout (Smith)", sets:4, min:12, max:15, tips:["Pause 2s en bas, étirement complet.","Monte le plus haut possible, tiens 1s.","Temps sous tension : mouvement lent."]},
      ]},
    ],
  },

  fb3: {
    id:"fb3", name:"Full Body 3j", subtitle:"Équilibré · 3 séances", author:"IRON",
    description:"Chaque séance couvre tout le corps. Idéal pour la polyvalence ou les retours d'entraînement.",
    sessions:[
      { id:"fb_a", key:"fb_a", label:"A", title:"Full Body A", muscles:"Tout le corps · Accent poussée", color:T.s1, grad:T.s1G, num:"01", exercises:[
        { id:"squat_fb", name:"Squat Barre", sets:3, min:5, max:8, tips:["Descente contrôlée, poussée explosive.","Respiration bloquée au point bas."]},
        { id:"dc_fb", name:"Développé Couché Barre", sets:3, min:6, max:10, tips:["Omoplates verrouillées.","Barre touche la poitrine, pas de rebond."]},
        { id:"rowing_fb", name:"Rowing Barre", sets:3, min:6, max:10, tips:["Buste à 30-45°.","Tire vers le bas du sternum."]},
        { id:"dm_fb", name:"Développé Militaire", sets:3, min:8, max:10, tips:["Debout ou assis dossier droit.","Gainage abdominal constant."]},
        { id:"curl_fb_a", name:"Curl Haltère Alterné", sets:3, min:10, max:12, tips:["Coudes fixes.","Contrôle la descente en 3s."]},
      ]},
      { id:"fb_b", key:"fb_b", label:"B", title:"Full Body B", muscles:"Tout le corps · Accent tirage", color:T.s2, grad:T.s2G, num:"02", exercises:[
        { id:"sdt_fb", name:"Soulevé de Terre", sets:3, min:4, max:6, tips:["Barre aux tibias.","Extension complète des hanches."]},
        { id:"tractions_fb", name:"Tractions (ou Tirage)", sets:3, min:6, max:10, tips:["Amplitude complète, menton au-dessus de la barre."]},
        { id:"di_fb", name:"Développé Incliné Haltère", sets:3, min:8, max:10, tips:["Banc à 30-45° max."]},
        { id:"fentes_fb", name:"Fentes Haltère", sets:3, min:10, max:12, tips:["Genou avant dans l'axe du pied.","Descente lente."]},
        { id:"ext_fb", name:"Extension Triceps Poulie", sets:3, min:10, max:12, tips:["Coudes fixes contre le corps."]},
      ]},
      { id:"fb_c", key:"fb_c", label:"C", title:"Full Body C", muscles:"Tout le corps · Volume", color:T.s3, grad:T.s3G, num:"03", exercises:[
        { id:"presse_fb", name:"Presse à Cuisses", sets:3, min:10, max:12, tips:["Pieds adaptés à la zone ciblée."]},
        { id:"sdl_fb", name:"Soulevé de Terre Roumain", sets:3, min:8, max:12, tips:["Hanches en arrière, pas de flexion excessive des genoux."]},
        { id:"dc_halt_fb", name:"DC Haltère", sets:3, min:8, max:12, tips:["Étirement maximal en bas."]},
        { id:"tirage_fb", name:"Tirage Horizontal", sets:3, min:8, max:12, tips:["Rétraction des omoplates."]},
        { id:"el_lat_fb", name:"Élévation Latérale", sets:3, min:12, max:15, tips:["Monte jusqu'à l'horizontale.","Descente lente."]},
        { id:"mollets_fb", name:"Mollets Smith", sets:3, min:12, max:15, tips:["Pause 2s en bas."]},
      ]},
    ],
  },
};

// ─── STORAGE ──────────────────────────────────────────────────────────────────
const SKEY = "iron_v1";
const REST_DEFAULT = 90;

const initialState = () => ({
  version: 1,
  activeProgramId: "uplowup",
  sessions: [],          // séances terminées
  active: null,          // séance en cours
  prefs: { units: "kg", restDefault: REST_DEFAULT, onboarded: false },
  hackRepsHistory: {},   // { "uplowup:lo": [3,5,3,5,...] }
});

const save = d => { try { localStorage.setItem(SKEY, JSON.stringify(d)); } catch(e) {} };
const load = () => { try { const r = localStorage.getItem(SKEY); return r ? JSON.parse(r) : null; } catch(e) { return null; } };

// ─── UTILS ────────────────────────────────────────────────────────────────────
const uid = () => Math.random().toString(36).slice(2, 10);
const fmtDate = ts => new Date(ts).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" });
const fmtDateLong = ts => new Date(ts).toLocaleDateString("fr-FR", { weekday: "short", day: "2-digit", month: "long" });
const fmtDur = sec => { const m = Math.floor(sec/60), s = sec%60; return `${m}m${String(s).padStart(2,"0")}`; };
const fmtClock = sec => `${String(Math.floor(sec/60)).padStart(2,"0")}:${String(sec%60).padStart(2,"0")}`;
const daysAgo = ts => Math.floor((Date.now() - ts) / 86400000);
const fmtAgo = ts => { const d = daysAgo(ts); if (d === 0) return "aujourd'hui"; if (d === 1) return "hier"; if (d < 7) return `il y a ${d}j`; if (d < 30) return `il y a ${Math.floor(d/7)}sem`; return fmtDate(ts); };

// ─── AUDIO + VIBRATION ────────────────────────────────────────────────────────
let _ctx = null;
const getCtx = () => { try { if (!_ctx) _ctx = new (window.AudioContext || window.webkitAudioContext)(); if (_ctx.state === "suspended") _ctx.resume(); return _ctx; } catch(e) { return null; } };
const playBeep = () => {
  const c = getCtx(); if (!c) return;
  try { [[0,880,0.15],[0.2,880,0.15],[0.42,1320,0.35]].forEach(([t,f,d])=>{ const o=c.createOscillator(),g=c.createGain(); o.connect(g);g.connect(c.destination); o.type="sine";o.frequency.value=f; g.gain.setValueAtTime(0.0001,c.currentTime+t); g.gain.exponentialRampToValueAtTime(0.5,c.currentTime+t+0.02); g.gain.exponentialRampToValueAtTime(0.0001,c.currentTime+t+d); o.start(c.currentTime+t);o.stop(c.currentTime+t+d+0.05); }); } catch(e){}
  try { navigator.vibrate && navigator.vibrate([200,100,200,100,400]); } catch(e){}
};
const playTick = () => {
  const c = getCtx(); if (!c) return;
  try { const o=c.createOscillator(),g=c.createGain(); o.connect(g);g.connect(c.destination); o.type="sine";o.frequency.value=720; g.gain.setValueAtTime(0.0001,c.currentTime); g.gain.exponentialRampToValueAtTime(0.3,c.currentTime+0.01); g.gain.exponentialRampToValueAtTime(0.0001,c.currentTime+0.09); o.start(c.currentTime);o.stop(c.currentTime+0.1); } catch(e){}
  try { navigator.vibrate && navigator.vibrate(50); } catch(e){}
};
const haptic = () => { try { navigator.vibrate && navigator.vibrate(12); } catch(e){} };

// ─── BUSINESS HELPERS ─────────────────────────────────────────────────────────
function initSession(programId, sessionKey, state) {
  const prog = PROGRAMS[programId]; if (!prog) return null;
  const sess = prog.sessions.find(s => s.key === sessionKey); if (!sess) return null;
  const exercises = {};
  sess.exercises.forEach(ex => {
    const n = ex.sets || 2;
    if (ex.superset) exercises[ex.id] = { sets: Array.from({length:n}, () => ({ weightA:"", repsA:"", weightB:"", repsB:"", done:false })) };
    else exercises[ex.id] = { sets: Array.from({length:n}, () => ({ weight:"", reps:"", done:false })) };
  });
  // Alternance hack squat : parité du nombre de séances passées de cette clé
  const pastCount = (state.sessions || []).filter(s => s.programId === programId && s.sessionKey === sessionKey).length;
  const hackReps = pastCount % 2 === 0 ? 3 : 5;
  return { id: uid(), programId, sessionKey, startTime: Date.now(), exercises, rpe: 0, notes: "", hackReps };
}

function getLastSession(sessions, programId, sessionKey) {
  return sessions.filter(s => s.programId === programId && s.sessionKey === sessionKey).sort((a,b)=>b.date-a.date)[0];
}

function getLastMax(sessions, programId, sessionKey, exId, isSuperset) {
  const last = getLastSession(sessions, programId, sessionKey);
  if (!last) return null;
  const d = last.exercises?.[exId]; if (!d?.sets?.length) return null;
  if (isSuperset) {
    const wA = Math.max(0, ...d.sets.map(s=>parseFloat(s.weightA)||0));
    const wB = Math.max(0, ...d.sets.map(s=>parseFloat(s.weightB)||0));
    if (wA<=0 && wB<=0) return null;
    return { wA, wB, date: last.date, isSuperset: true };
  }
  const w = Math.max(0, ...d.sets.map(s=>parseFloat(s.weight)||0));
  if (w<=0) return null;
  return { w, date: last.date };
}

function getSuggestion(sessions, programId, sessionKey, ex) {
  const last = getLastSession(sessions, programId, sessionKey);
  if (!last) return null;
  const data = last.exercises?.[ex.id]; if (!data?.sets?.length) return null;
  if (!data.sets.every(s => s.done)) return null;
  if (ex.superset) {
    const allMaxA = data.sets.every(s => parseInt(s.repsA||0) >= ex.max);
    const allMaxB = data.sets.every(s => parseInt(s.repsB||0) >= ex.max);
    const wA = Math.max(0, ...data.sets.map(s=>parseFloat(s.weightA)||0));
    const wB = Math.max(0, ...data.sets.map(s=>parseFloat(s.weightB)||0));
    return { wA: allMaxA && wA>0 ? wA+2.5 : wA, wB: allMaxB && wB>0 ? wB+2.5 : wB, upA:allMaxA, upB:allMaxB };
  }
  if (!ex.max) return null;
  const allMax = data.sets.every(s => parseInt(s.reps||0) >= ex.max);
  const w = Math.max(0, ...data.sets.map(s=>parseFloat(s.weight)||0));
  return { w: allMax && w>0 ? w+2.5 : w, up: allMax };
}

// Records personnels : pour chaque exercice, max poids × reps ajusté (formule Epley simplifiée pour 1RM estimé)
function getPR(sessions, exId, isSuperset, side="") {
  let prW = 0, pr1RM = 0, prDate = 0;
  sessions.forEach(s => {
    const d = s.exercises?.[exId]; if (!d?.sets) return;
    d.sets.forEach(set => {
      const w = isSuperset ? parseFloat(set[`weight${side}`])||0 : parseFloat(set.weight)||0;
      const r = isSuperset ? parseInt(set[`reps${side}`])||0 : parseInt(set.reps)||0;
      if (w > prW) { prW = w; prDate = s.date; }
      if (w > 0 && r > 0) {
        const est = w * (1 + r/30); // Epley
        if (est > pr1RM) pr1RM = est;
      }
    });
  });
  return { weight: prW, e1rm: Math.round(pr1RM*10)/10, date: prDate };
}

function getTotalVolume(session) {
  let v = 0;
  Object.values(session.exercises || {}).forEach(d => {
    (d.sets||[]).forEach(s => {
      const w = parseFloat(s.weight)||0, r = parseInt(s.reps)||0;
      const wA = parseFloat(s.weightA)||0, rA = parseInt(s.repsA)||0;
      const wB = parseFloat(s.weightB)||0, rB = parseInt(s.repsB)||0;
      v += w*r + wA*rA + wB*rB;
    });
  });
  return Math.round(v);
}

// ─── DESIGN SYSTEM COMPONENTS ────────────────────────────────────────────────

const Btn = ({ children, variant="primary", onClick, disabled, size="md", style={}, ...rest }) => {
  const sizes = { sm:{p:"7px 12px",f:11,r:8}, md:{p:"10px 16px",f:12,r:10}, lg:{p:"13px 22px",f:13,r:12} };
  const S = sizes[size];
  const base = { border:"none", fontFamily:FF_SANS, fontWeight:600, cursor:disabled?"not-allowed":"pointer", padding:S.p, fontSize:S.f, borderRadius:S.r, letterSpacing:"-0.01em", display:"inline-flex", alignItems:"center", justifyContent:"center", gap:7, transition:"transform 0.08s, opacity 0.15s", opacity:disabled?0.4:1, lineHeight:1.2 };
  const variants = {
    primary:{ background:T.accentG, color:"#fff", boxShadow:disabled?"none":`0 4px 14px ${T.accentGlow}` },
    secondary:{ background:T.surface2, color:T.text, border:`1px solid ${T.borderMid}` },
    ghost:{ background:"transparent", color:T.textMuted, border:`1px solid ${T.border}` },
    danger:{ background:"transparent", color:T.danger, border:`1px solid ${T.danger}44` },
    success:{ background:T.successG, color:"#fff" },
  };
  return <button onClick={e=>{haptic();onClick&&onClick(e);}} disabled={disabled} style={{...base,...variants[variant],...style}} {...rest}>{children}</button>;
};

const Pill = ({ children, tone="neutral", size="sm" }) => {
  const tones = { neutral:{bg:T.surface2,c:T.textMuted,b:T.border}, accent:{bg:T.accent+"18",c:T.accentLight,b:T.accent+"33"}, success:{bg:T.success+"18",c:T.success,b:T.success+"33"}, warn:{bg:T.warning+"18",c:T.warning,b:T.warning+"33"}, danger:{bg:T.danger+"18",c:T.danger,b:T.danger+"33"} };
  const t = tones[tone];
  const sz = size==="sm" ? {p:"3px 9px",f:10} : {p:"5px 12px",f:11};
  return <span style={{display:"inline-flex",alignItems:"center",gap:5,background:t.bg,color:t.c,border:`1px solid ${t.b}`,padding:sz.p,fontSize:sz.f,fontWeight:600,letterSpacing:"0.05em",textTransform:"uppercase",borderRadius:999,lineHeight:1,whiteSpace:"nowrap"}}>{children}</span>;
};

const Card = ({ children, style={}, onClick, glow=false, accentColor=null }) => (
  <div onClick={onClick} style={{background:T.surface, border:`1px solid ${T.border}`, borderRadius:16, overflow:"hidden", cursor:onClick?"pointer":"default", transition:"border-color 0.2s, transform 0.15s", boxShadow: glow ? `0 8px 24px ${T.accentGlow}` : "0 2px 8px rgba(0,0,0,0.25)", ...style}}>{children}</div>
);

const SectionHeader = ({ eyebrow, title, subtitle, right }) => (
  <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:18,gap:14}}>
    <div style={{minWidth:0,flex:1}}>
      {eyebrow && <p style={{fontSize:10,color:T.accent,fontFamily:FF_SANS,fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:6}}>{eyebrow}</p>}
      <h1 style={{fontFamily:FF_DISPLAY,fontSize:34,fontWeight:500,fontVariationSettings:`"opsz" 144, "SOFT" 50`,color:T.text,letterSpacing:"-0.035em",lineHeight:0.95,margin:0}}>{title}</h1>
      {subtitle && <p style={{fontSize:13,color:T.textMuted,marginTop:8,fontFamily:FF_SANS,lineHeight:1.4}}>{subtitle}</p>}
    </div>
    {right}
  </div>
);

const Modal = ({ open, onClose, children, maxWidth=380 }) => {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.75)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2000,padding:20,animation:"fadeIn 0.2s"}}>
      <div onClick={e=>e.stopPropagation()} style={{background:T.surface,border:`1px solid ${T.borderMid}`,borderRadius:20,padding:22,width:"100%",maxWidth,animation:"slideUp 0.25s cubic-bezier(0.16,1,0.3,1)",boxShadow:"0 24px 64px rgba(0,0,0,0.6)"}}>{children}</div>
    </div>
  );
};

// ─── SUBCOMPONENT : Rest Timer Bar ───────────────────────────────────────────
function RestBar({ timer, onSkip, onAdd }) {
  if (!timer.active) return null;
  const pct = (timer.remaining / timer.duration) * 100;
  const urgent = timer.remaining <= 5;
  return (
    <div style={{position:"fixed",top:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:520,zIndex:1000,background:`linear-gradient(180deg,${T.surface}F8,${T.bg}F0)`,backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",borderBottom:`1px solid ${urgent?T.danger+"55":T.border}`,padding:"14px 18px 16px",boxSizing:"border-box",boxShadow:"0 8px 24px rgba(0,0,0,0.5)"}}>
      <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:10}}>
        <Pill tone={urgent?"danger":"accent"}>{urgent?"⚡":""} Repos</Pill>
        <span style={{flex:1,fontFamily:FF_MONO,fontSize:urgent?32:28,fontWeight:700,color:urgent?T.danger:T.text,fontVariantNumeric:"tabular-nums",textAlign:"center",letterSpacing:"-0.03em",animation:urgent?"pulse 0.6s ease-in-out infinite":"none",lineHeight:1}}>{fmtClock(timer.remaining)}</span>
        <button onClick={onAdd} style={{background:T.surface2,border:`1px solid ${T.borderMid}`,color:T.textMuted,padding:"5px 11px",borderRadius:8,fontSize:11,cursor:"pointer",fontFamily:FF_SANS,fontWeight:600}}>+30s</button>
        <button onClick={onSkip} style={{background:T.surface2,border:`1px solid ${T.borderMid}`,color:T.textMuted,padding:"5px 11px",borderRadius:8,fontSize:11,cursor:"pointer",fontFamily:FF_SANS,fontWeight:600}}>Passer</button>
      </div>
      <div style={{height:5,background:T.surface3,borderRadius:999,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${pct}%`,background:urgent?T.danger:T.accentG,borderRadius:999,transition:"width 1s linear",boxShadow:urgent?"none":`0 0 12px ${T.accentGlow}`}}/>
      </div>
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════════════════
//  VIEWS — Accueil, Séance, Stats, Plus
// ═══════════════════════════════════════════════════════════════════════════

// ─── VUE ACCUEIL ──────────────────────────────────────────────────────────────
function HomeView({ state, onStartSession, onSwitchProgram }) {
  const prog = PROGRAMS[state.activeProgramId];
  const recent = [...state.sessions].sort((a,b)=>b.date-a.date).slice(0,1)[0];
  const totalSessions = state.sessions.length;
  const weekSessions = state.sessions.filter(s => Date.now() - s.date < 7*86400000).length;
  const totalVolume = state.sessions.slice(-10).reduce((a,s) => a + (s.totalVolume||getTotalVolume(s)), 0);

  // Séance suggérée : celle qui a été faite le moins récemment / le moins souvent
  const suggestSessionKey = useMemo(() => {
    const counts = {};
    prog.sessions.forEach(s => counts[s.key] = 0);
    state.sessions.filter(s => s.programId === prog.id).forEach(s => { counts[s.sessionKey] = (counts[s.sessionKey]||0) + 1; });
    // Suggère la séance qui a été faite le moins de fois ; en cas d'égalité, la plus anciennement faite
    const lastDates = {};
    prog.sessions.forEach(s => { const last = getLastSession(state.sessions, prog.id, s.key); lastDates[s.key] = last ? last.date : 0; });
    const sorted = prog.sessions.slice().sort((a,b) => counts[a.key] - counts[b.key] || lastDates[a.key] - lastDates[b.key]);
    return sorted[0].key;
  }, [state.sessions, prog]);

  return (
    <div className="fade-in">
      <SectionHeader eyebrow="Aujourd'hui" title="Bienvenue." subtitle={`${totalSessions} séance${totalSessions>1?"s":""} enregistrée${totalSessions>1?"s":""} · ${weekSessions} cette semaine`} />

      {/* Programme actif + bascule */}
      <Card style={{marginBottom:14,padding:"16px 18px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-40,right:-30,width:180,height:180,background:`radial-gradient(circle, ${T.accentGlow} 0%, transparent 70%)`,pointerEvents:"none"}}/>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",position:"relative"}}>
          <div style={{minWidth:0,flex:1}}>
            <p style={{fontSize:9,color:T.textDim,fontFamily:FF_SANS,fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:6}}>Programme actif</p>
            <h2 style={{fontFamily:FF_DISPLAY,fontSize:22,fontWeight:500,fontVariationSettings:`"opsz" 144`,color:T.text,letterSpacing:"-0.025em",lineHeight:1.1,margin:0}}>{prog.name}</h2>
            <p style={{fontSize:12,color:T.textMuted,marginTop:4,fontFamily:FF_SANS}}>{prog.subtitle}</p>
          </div>
          <button onClick={onSwitchProgram} style={{background:"transparent",border:`1px solid ${T.borderMid}`,color:T.textMuted,padding:"6px 10px",borderRadius:8,fontSize:11,cursor:"pointer",fontFamily:FF_SANS,fontWeight:600,flexShrink:0}}>Changer</button>
        </div>
      </Card>

      {/* Séances du programme */}
      <div style={{marginBottom:24}}>
        <p style={{fontSize:10,color:T.textDim,fontFamily:FF_SANS,fontWeight:700,letterSpacing:"0.16em",textTransform:"uppercase",marginBottom:10,paddingLeft:2}}>Les séances</p>
        {prog.sessions.map(sess => {
          const isActive = state.active?.programId===prog.id && state.active?.sessionKey===sess.key;
          const last = getLastSession(state.sessions, prog.id, sess.key);
          const suggested = sess.key === suggestSessionKey && !state.active;
          return (
            <div key={sess.key} style={{background:T.surface,border:`1px solid ${isActive?sess.color:(suggested?T.borderMid:T.border)}`,borderRadius:16,marginBottom:12,overflow:"hidden",boxShadow:isActive?`0 8px 24px ${sess.color}30`:"0 2px 8px rgba(0,0,0,0.25)",position:"relative"}}>
              <div style={{height:3,background:sess.grad}}/>
              <div style={{padding:"16px 18px"}}>
                <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:10}}>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6,flexWrap:"wrap"}}>
                      <span style={{fontFamily:FF_DISPLAY,fontSize:22,fontWeight:500,fontVariationSettings:`"opsz" 144`,color:sess.color,letterSpacing:"-0.03em",lineHeight:1}}>{sess.label}</span>
                      {isActive && <Pill tone="accent">● En cours</Pill>}
                      {suggested && !isActive && <Pill tone="neutral">Suggérée</Pill>}
                    </div>
                    <p style={{fontSize:14,fontWeight:600,color:T.text,fontFamily:FF_SANS,letterSpacing:"-0.01em"}}>{sess.title}</p>
                    <p style={{fontSize:11,color:T.textMuted,marginTop:3,fontFamily:FF_SANS,lineHeight:1.4}}>{sess.muscles}</p>
                  </div>
                  <span style={{fontFamily:FF_MONO,fontSize:36,fontWeight:700,color:sess.color,opacity:0.1,letterSpacing:"-0.04em",lineHeight:1,flexShrink:0,marginLeft:10}}>{sess.num}</span>
                </div>

                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:12,paddingTop:12,borderTop:`1px solid ${T.border}`}}>
                  <span style={{fontSize:11,color:T.textDim,fontFamily:FF_SANS}}>{last ? `Dernière : ${fmtAgo(last.date)}` : "Jamais fait"}</span>
                  <Btn onClick={()=>!state.active && onStartSession(prog.id, sess.key)} disabled={!!state.active && !isActive} size="sm" variant={isActive?"success":(suggested?"primary":"secondary")}>
                    {isActive ? <>{I({d:ICO.play,s:13,c:"#fff",f:"#fff"})} En cours</> : <>{I({d:ICO.play,s:12,c:"#fff",f:"#fff"})} Démarrer</>}
                  </Btn>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stats rapides */}
      {totalSessions > 0 && (
        <div style={{marginBottom:10}}>
          <p style={{fontSize:10,color:T.textDim,fontFamily:FF_SANS,fontWeight:700,letterSpacing:"0.16em",textTransform:"uppercase",marginBottom:10,paddingLeft:2}}>Aperçu</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <Card style={{padding:"14px 16px"}}>
              <p style={{fontSize:10,color:T.textDim,fontFamily:FF_SANS,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase"}}>Total</p>
              <p style={{fontFamily:FF_DISPLAY,fontSize:32,fontWeight:500,fontVariationSettings:`"opsz" 144`,color:T.text,letterSpacing:"-0.03em",lineHeight:1,marginTop:6}}>{totalSessions}</p>
              <p style={{fontSize:11,color:T.textMuted,marginTop:4,fontFamily:FF_SANS}}>séance{totalSessions>1?"s":""}</p>
            </Card>
            <Card style={{padding:"14px 16px"}}>
              <p style={{fontSize:10,color:T.textDim,fontFamily:FF_SANS,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase"}}>Volume récent</p>
              <p style={{fontFamily:FF_DISPLAY,fontSize:32,fontWeight:500,fontVariationSettings:`"opsz" 144`,color:T.text,letterSpacing:"-0.03em",lineHeight:1,marginTop:6}}>{(totalVolume/1000).toFixed(1)}<span style={{fontSize:18,color:T.textMuted,fontFamily:FF_MONO,marginLeft:3}}>t</span></p>
              <p style={{fontSize:11,color:T.textMuted,marginTop:4,fontFamily:FF_SANS}}>10 dernières séances</p>
            </Card>
          </div>
          {recent && (
            <Card style={{marginTop:10,padding:"14px 16px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <p style={{fontSize:10,color:T.textDim,fontFamily:FF_SANS,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase"}}>Dernière séance</p>
                  <p style={{fontSize:14,color:T.text,marginTop:4,fontFamily:FF_SANS,fontWeight:600}}>{PROGRAMS[recent.programId]?.sessions.find(s=>s.key===recent.sessionKey)?.title || recent.sessionKey}</p>
                  <p style={{fontSize:11,color:T.textMuted,marginTop:2,fontFamily:FF_SANS}}>{fmtAgo(recent.date)} · {fmtDur(recent.duration||0)}</p>
                </div>
                {recent.rpe > 0 && <span style={{fontSize:28}}>{["","😵","😓","😐","💪","🔥"][recent.rpe]}</span>}
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}

// ─── COMPOSANT : Ligne de série ──────────────────────────────────────────────
function SetRow({ idx, data, ex, suggestion, targetReps, color, onUpdate, onComplete }) {
  const done = data.done;
  const inpStyle = {
    background: done ? "transparent" : T.surface3,
    border: `1px solid ${done ? "transparent" : T.borderMid}`,
    borderRadius: 8, padding: "9px 10px",
    color: done ? T.textMuted : T.text, fontSize: 14, fontFamily: FF_MONO, fontWeight: 500,
    width: "100%", textAlign: "center", outline: "none", boxSizing: "border-box",
    fontVariantNumeric: "tabular-nums",
  };
  return (
    <div style={{display:"flex",alignItems:"flex-start",gap:10,padding:"10px 0",borderBottom:`1px solid ${T.border}`,opacity:done?0.65:1}}>
      <span style={{fontFamily:FF_MONO,fontSize:12,color:T.textDim,fontWeight:700,minWidth:20,paddingTop:12,textAlign:"center",fontVariantNumeric:"tabular-nums"}}>{String(idx+1).padStart(2,"0")}</span>
      {ex.superset ? (
        <>
          <div style={{flex:1,display:"flex",flexDirection:"column",gap:4}}>
            <div style={{display:"flex",gap:5}}>
              <input placeholder="kg" inputMode="decimal" value={data.weightA||""} onChange={e=>onUpdate({weightA:e.target.value})} style={{...inpStyle,flex:1}} disabled={done}/>
              <input placeholder="reps" inputMode="numeric" value={data.repsA||""} onChange={e=>onUpdate({repsA:e.target.value})} style={{...inpStyle,flex:1}} disabled={done}/>
            </div>
            {suggestion?.wA>0 && !done && (
              <button onClick={()=>onUpdate({weightA:String(suggestion.wA)})} style={{background:"transparent",border:"none",fontSize:10,color:suggestion.upA?T.success:T.textDim,cursor:"pointer",textAlign:"left",padding:0,fontFamily:FF_SANS,fontWeight:500}}>
                {suggestion.upA?"↑ +2.5kg → ":"○ "}<span style={{fontFamily:FF_MONO}}>{suggestion.wA}kg</span>
              </button>
            )}
          </div>
          <span style={{color:color,fontSize:14,fontWeight:700,paddingTop:10,fontFamily:FF_MONO}}>→</span>
          <div style={{flex:1,display:"flex",flexDirection:"column",gap:4}}>
            <div style={{display:"flex",gap:5}}>
              <input placeholder="kg" inputMode="decimal" value={data.weightB||""} onChange={e=>onUpdate({weightB:e.target.value})} style={{...inpStyle,flex:1}} disabled={done}/>
              <input placeholder="reps" inputMode="numeric" value={data.repsB||""} onChange={e=>onUpdate({repsB:e.target.value})} style={{...inpStyle,flex:1}} disabled={done}/>
            </div>
            {suggestion?.wB>0 && !done && (
              <button onClick={()=>onUpdate({weightB:String(suggestion.wB)})} style={{background:"transparent",border:"none",fontSize:10,color:suggestion.upB?T.success:T.textDim,cursor:"pointer",textAlign:"left",padding:0,fontFamily:FF_SANS,fontWeight:500}}>
                {suggestion.upB?"↑ +2.5kg → ":"○ "}<span style={{fontFamily:FF_MONO}}>{suggestion.wB}kg</span>
              </button>
            )}
          </div>
        </>
      ) : (
        <div style={{flex:1,display:"flex",flexDirection:"column",gap:4}}>
          <div style={{display:"flex",gap:6}}>
            <input placeholder="kg" inputMode="decimal" value={data.weight||""} onChange={e=>onUpdate({weight:e.target.value})} style={{...inpStyle,flex:1}} disabled={done}/>
            <input placeholder={targetReps||"reps"} inputMode="numeric" value={data.reps||""} onChange={e=>onUpdate({reps:e.target.value})} style={{...inpStyle,flex:1}} disabled={done}/>
          </div>
          {suggestion?.w>0 && !done && (
            <button onClick={()=>onUpdate({weight:String(suggestion.w)})} style={{background:"transparent",border:"none",fontSize:10,color:suggestion.up?T.success:T.textDim,cursor:"pointer",textAlign:"left",padding:0,fontFamily:FF_SANS,fontWeight:500}}>
              {suggestion.up ? "↑ Progression +2.5kg → " : "○ Dernière fois "}<span style={{fontFamily:FF_MONO}}>{suggestion.w}kg</span>
            </button>
          )}
        </div>
      )}
      {done ? (
        <button onClick={()=>{haptic();onUpdate({done:false});}} title="Modifier"
          style={{background:`${T.success}18`,border:`1px solid ${T.success}55`,color:T.success,padding:"7px 10px",borderRadius:8,cursor:"pointer",minWidth:34,display:"flex",alignItems:"center",justifyContent:"center",marginTop:2}}>
          {I({d:ICO.check,s:16,c:T.success,w:2.5})}
        </button>
      ) : (
        <button onClick={()=>onComplete(idx)}
          style={{background:`${T.success}22`,border:`1px solid ${T.success}55`,color:T.success,padding:"7px 10px",borderRadius:8,cursor:"pointer",minWidth:34,display:"flex",alignItems:"center",justifyContent:"center",marginTop:2}}>
          {I({d:ICO.check,s:16,c:T.success,w:2.5})}
        </button>
      )}
    </div>
  );
}

// ─── COMPOSANT : Carte exercice ──────────────────────────────────────────────
function ExCard({ ex, exData, sessions, programId, sessionKey, color, session, onUpdate, onComplete }) {
  const [open, setOpen] = useState(true);
  const [tips, setTips] = useState(false);
  const sugg = getSuggestion(sessions, programId, sessionKey, ex);
  const lastMax = getLastMax(sessions, programId, sessionKey, ex.id, !!ex.superset);
  const done = exData.sets.filter(s=>s.done).length;
  const allDone = done === exData.sets.length;

  let subtitle;
  if (ex.alternating && session?.hackReps) subtitle = `${ex.sets}×${session.hackReps} reps à l'échec · ${ex.special||""}`;
  else if (ex.alternating) subtitle = `${ex.sets}×3-5 reps à l'échec · ${ex.special||""}`;
  else subtitle = `${ex.sets}×${ex.min}-${ex.max} reps${ex.special?" · "+ex.special:""}${ex.degressive?" · Dégressive ×"+ex.degressive:""}`;

  return (
    <div style={{background:T.surface,borderRadius:14,marginBottom:10,border:`1px solid ${allDone?color+"55":T.border}`,overflow:"hidden",transition:"border-color 0.3s",boxShadow:"0 2px 6px rgba(0,0,0,0.25)"}}>
      <div onClick={()=>{haptic();setOpen(o=>!o);}} style={{display:"flex",alignItems:"center",gap:11,padding:"13px 14px",cursor:"pointer",background:allDone?color+"08":"transparent",transition:"background 0.3s"}}>
        <div style={{width:3,alignSelf:"stretch",borderRadius:2,background:allDone?T.success:color,minHeight:36,flexShrink:0}}/>
        <div style={{flex:1,minWidth:0}}>
          {ex.superset ? (
            <div>
              <p style={{fontSize:9,color:color,fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:3,fontFamily:FF_SANS,display:"flex",alignItems:"center",gap:4}}>{I({d:ICO.bolt,s:10,c:color,f:color})} Superset</p>
              <p style={{fontSize:13,fontWeight:600,color:T.text,fontFamily:FF_SANS,letterSpacing:"-0.01em",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{ex.nameA}</p>
              <p style={{fontSize:13,fontWeight:600,color:T.text,fontFamily:FF_SANS,letterSpacing:"-0.01em",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{ex.nameB}</p>
            </div>
          ) : (
            <p style={{fontSize:15,fontWeight:600,color:T.text,fontFamily:FF_SANS,letterSpacing:"-0.015em"}}>{ex.name}</p>
          )}
          <p style={{fontSize:11,color:T.textDim,marginTop:3,fontFamily:FF_SANS}}>{subtitle}</p>
          {lastMax && (
            <div style={{display:"inline-flex",alignItems:"center",gap:7,marginTop:8,background:`${color}15`,border:`1px solid ${color}33`,borderRadius:8,padding:"4px 9px"}}>
              <span style={{fontSize:9,color:color,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",fontFamily:FF_SANS}}>Dernière</span>
              <span style={{fontSize:12,color:T.text,fontWeight:600,fontFamily:FF_MONO,fontVariantNumeric:"tabular-nums"}}>
                {lastMax.isSuperset?`${lastMax.wA||"—"}·${lastMax.wB||"—"}kg`:`${lastMax.w}kg`}
              </span>
              <span style={{fontSize:10,color:T.textDim,fontFamily:FF_SANS}}>· {fmtDate(lastMax.date)}</span>
            </div>
          )}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
          <span style={{fontSize:13,color:allDone?T.success:color,fontWeight:800,fontFamily:FF_MONO,fontVariantNumeric:"tabular-nums"}}>{done}/{exData.sets.length}</span>
          <span style={{color:T.textDim,transform:open?"rotate(180deg)":"none",transition:"transform 0.2s"}}>{I({d:ICO.chevD,s:14,c:T.textDim})}</span>
        </div>
      </div>

      {open && (
        <div style={{padding:"0 14px 14px"}}>
          <button onClick={e=>{e.stopPropagation();haptic();setTips(t=>!t);}} style={{background:"transparent",border:`1px solid ${color}33`,color:color,padding:"6px 12px",borderRadius:8,fontSize:11,cursor:"pointer",marginBottom:10,fontFamily:FF_SANS,fontWeight:600,display:"inline-flex",alignItems:"center",gap:6}}>
            {I({d:ICO.info,s:12,c:color})} {tips?"Masquer":"Tips technique"}
          </button>

          {tips && (
            <div style={{background:T.surface2,borderRadius:10,padding:12,marginBottom:10,fontSize:12,color:T.textMuted,fontFamily:FF_SANS,lineHeight:1.5,border:`1px solid ${T.border}`}}>
              {ex.superset ? (
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                  <div><p style={{color:color,fontWeight:700,marginBottom:6,fontSize:11}}>{ex.nameA}</p>{ex.tipsA.map((t,i)=><p key={i} style={{marginBottom:4,paddingLeft:10,textIndent:-10}}>· {t}</p>)}</div>
                  <div><p style={{color:color,fontWeight:700,marginBottom:6,fontSize:11}}>{ex.nameB}</p>{ex.tipsB.map((t,i)=><p key={i} style={{marginBottom:4,paddingLeft:10,textIndent:-10}}>· {t}</p>)}</div>
                </div>
              ) : (
                <div>{ex.tips.map((t,i)=><p key={i} style={{marginBottom:4,paddingLeft:10,textIndent:-10}}>· {t}</p>)}</div>
              )}
            </div>
          )}

          {ex.superset && (
            <div style={{display:"flex",gap:10,padding:"0 0 6px 30px",marginBottom:2}}>
              <div style={{flex:1,textAlign:"center"}}><span style={{fontSize:9,color:color,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",fontFamily:FF_SANS}}>{ex.nameA.slice(0,14)}</span></div>
              <div style={{width:18}}/>
              <div style={{flex:1,textAlign:"center"}}><span style={{fontSize:9,color:color,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",fontFamily:FF_SANS}}>{ex.nameB.slice(0,14)}</span></div>
              <div style={{width:42}}/>
            </div>
          )}

          {exData.sets.map((s,i) => (
            <SetRow key={i} idx={i} data={s} ex={ex} suggestion={sugg}
              targetReps={ex.alternating && session?.hackReps ? session.hackReps : ""}
              color={color}
              onUpdate={p => onUpdate(ex.id, i, p)}
              onComplete={() => onComplete(ex.id, i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── VUE SÉANCE ──────────────────────────────────────────────────────────────
function SessionView({ session, sessions, onUpdate, onFinish, onAbandon, onRest }) {
  const [endModal, setEndModal] = useState(false);
  const [stopModal, setStopModal] = useState(false);
  const prog = PROGRAMS[session.programId];
  const sess = prog?.sessions.find(s => s.key === session.sessionKey);
  if (!prog || !sess) return null;

  const updateSet = (exId, idx, patch) => {
    const exs = { ...session.exercises };
    const sets = [...exs[exId].sets];
    sets[idx] = { ...sets[idx], ...patch };
    exs[exId] = { ...exs[exId], sets };
    onUpdate({ ...session, exercises: exs });
  };
  const completeSet = (exId, idx) => { updateSet(exId, idx, { done:true }); onRest(); };

  const totalSets = sess.exercises.reduce((a,ex) => a + (session.exercises[ex.id]?.sets?.length||0), 0);
  const doneSets = sess.exercises.reduce((a,ex) => a + (session.exercises[ex.id]?.sets?.filter(s=>s.done).length||0), 0);
  const allDone = doneSets === totalSets;
  const pct = totalSets>0 ? Math.round((doneSets/totalSets)*100) : 0;

  return (
    <div className="fade-in">
      {/* Header dramatique */}
      <div style={{position:"relative",background:`linear-gradient(135deg,${sess.color}22,${sess.color}08 60%,transparent)`,border:`1px solid ${sess.color}55`,borderRadius:20,padding:"22px 20px 20px",marginBottom:16,overflow:"hidden"}}>
        <div style={{position:"absolute",top:-50,right:-40,fontFamily:FF_MONO,fontSize:180,fontWeight:700,color:sess.color,opacity:0.05,letterSpacing:"-0.06em",lineHeight:1,pointerEvents:"none",userSelect:"none"}}>{sess.num}</div>
        <Pill tone="accent" size="md">● Séance en cours · {prog.name}</Pill>
        <h1 style={{fontFamily:FF_DISPLAY,fontSize:36,fontWeight:500,fontVariationSettings:`"opsz" 144, "SOFT" 50`,color:T.text,letterSpacing:"-0.035em",lineHeight:0.95,margin:"12px 0 4px"}}>{sess.label} · {sess.title}</h1>
        <p style={{fontSize:12,color:T.textMuted,fontFamily:FF_SANS,lineHeight:1.4,marginBottom:16}}>{sess.muscles}</p>
        <div style={{background:`${T.surface3}`,borderRadius:999,height:7,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${pct}%`,background:sess.grad,borderRadius:999,transition:"width 0.5s cubic-bezier(0.16,1,0.3,1)",boxShadow:`0 0 12px ${sess.color}AA`}}/>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginTop:8}}>
          <p style={{fontSize:11,color:T.textMuted,fontFamily:FF_SANS,fontWeight:600}}>Progression</p>
          <p style={{fontFamily:FF_MONO,fontSize:14,fontWeight:700,color:sess.color,fontVariantNumeric:"tabular-nums"}}>{doneSets}<span style={{color:T.textDim}}>/{totalSets}</span> · {pct}%</p>
        </div>
      </div>

      {/* Interrompre */}
      <button onClick={()=>setStopModal(true)} style={{width:"100%",background:"transparent",border:`1px solid ${T.danger}33`,color:T.danger,padding:"10px",borderRadius:10,fontSize:12,cursor:"pointer",marginBottom:14,fontFamily:FF_SANS,fontWeight:600,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
        {I({d:ICO.close,s:14,c:T.danger})} Interrompre la séance
      </button>

      {/* Exercices */}
      {sess.exercises.map(ex => (
        <ExCard key={ex.id} ex={ex} exData={session.exercises[ex.id]}
          sessions={sessions} programId={session.programId} sessionKey={session.sessionKey} color={sess.color} session={session}
          onUpdate={updateSet} onComplete={completeSet}
        />
      ))}

      {/* Terminer */}
      <button onClick={()=>setEndModal(true)} disabled={!allDone}
        style={{width:"100%",background:allDone?sess.grad:T.surface3,border:"none",color:allDone?"#fff":T.textDim,padding:"16px",borderRadius:14,fontSize:14,fontFamily:FF_SANS,fontWeight:700,cursor:allDone?"pointer":"default",marginTop:6,marginBottom:30,letterSpacing:"0.02em",boxShadow:allDone?`0 12px 32px ${sess.color}44`:"none",transition:"background 0.3s",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
        {allDone ? <>{I({d:ICO.check,s:16,c:"#fff",w:2.5})} Terminer la séance</> : `Complète toutes les séries (${doneSets}/${totalSets})`}
      </button>

      {/* Modal fin */}
      <Modal open={endModal} onClose={()=>setEndModal(false)}>
        <h3 style={{fontFamily:FF_DISPLAY,fontSize:24,fontWeight:500,fontVariationSettings:`"opsz" 144`,color:T.text,letterSpacing:"-0.025em",margin:"0 0 4px"}}>Bilan</h3>
        <p style={{fontSize:12,color:T.textMuted,fontFamily:FF_SANS,marginBottom:18}}>Comment tu t'es senti ?</p>
        <div style={{display:"flex",justifyContent:"space-between",gap:6,marginBottom:18}}>
          {["😵","😓","😐","💪","🔥"].map((e,i)=>(
            <button key={i} onClick={()=>{haptic();onUpdate({...session,rpe:i+1});}}
              style={{fontSize:26,background:session.rpe===i+1?sess.color+"22":T.surface2,border:`2px solid ${session.rpe===i+1?sess.color:T.border}`,borderRadius:12,padding:"10px 4px",cursor:"pointer",flex:1,transition:"transform 0.1s, background 0.2s",transform:session.rpe===i+1?"scale(1.05)":"scale(1)"}}>
              {e}
            </button>
          ))}
        </div>
        <textarea placeholder="Notes (PR, douleurs, observations…)" value={session.notes||""} onChange={e=>onUpdate({...session,notes:e.target.value})}
          style={{width:"100%",background:T.surface2,border:`1px solid ${T.border}`,borderRadius:10,padding:12,color:T.text,fontSize:13,fontFamily:FF_SANS,resize:"none",height:80,outline:"none",marginBottom:16,boxSizing:"border-box"}}/>
        <div style={{display:"flex",gap:10}}>
          <Btn variant="ghost" onClick={()=>setEndModal(false)} style={{flex:1}}>Annuler</Btn>
          <Btn variant="primary" onClick={()=>{setEndModal(false);onFinish(session);}} style={{flex:2}}>Sauvegarder</Btn>
        </div>
      </Modal>

      {/* Modal abandon */}
      <Modal open={stopModal} onClose={()=>setStopModal(false)} maxWidth={340}>
        <h3 style={{fontFamily:FF_DISPLAY,fontSize:22,fontWeight:500,fontVariationSettings:`"opsz" 144`,color:T.danger,letterSpacing:"-0.025em",margin:"0 0 8px"}}>Interrompre ?</h3>
        <p style={{fontSize:13,color:T.textMuted,fontFamily:FF_SANS,marginBottom:20,lineHeight:1.5}}>Toutes les données saisies dans cette séance seront effacées. Cette action est irréversible.</p>
        <div style={{display:"flex",gap:10}}>
          <Btn variant="ghost" onClick={()=>setStopModal(false)} style={{flex:1}}>Annuler</Btn>
          <Btn variant="danger" onClick={()=>{setStopModal(false);onAbandon();}} style={{flex:1,background:`${T.danger}22`}}>Interrompre</Btn>
        </div>
      </Modal>
    </div>
  );
}

// ─── VUE STATS ──────────────────────────────────────────────────────────────
function StatsView({ state }) {
  const [tab, setTab] = useState("hist"); // hist | pr | chart
  const sorted = [...state.sessions].sort((a,b)=>b.date-a.date);

  return (
    <div className="fade-in">
      <SectionHeader eyebrow="Analyse" title="Progression" subtitle={`${sorted.length} séance${sorted.length>1?"s":""} · ${sorted.length>0?fmtAgo(sorted[0].date):"—"}`}/>

      <div style={{display:"flex",gap:6,marginBottom:16,background:T.surface2,padding:4,borderRadius:12,border:`1px solid ${T.border}`}}>
        {[{id:"hist",l:"Historique"},{id:"pr",l:"Records"},{id:"chart",l:"Courbes"}].map(t=>(
          <button key={t.id} onClick={()=>{haptic();setTab(t.id);}}
            style={{flex:1,padding:"9px",borderRadius:8,border:"none",background:tab===t.id?T.surface:"transparent",color:tab===t.id?T.text:T.textMuted,fontFamily:FF_SANS,fontSize:12,fontWeight:600,cursor:"pointer",transition:"background 0.2s"}}>
            {t.l}
          </button>
        ))}
      </div>

      {tab === "hist" && <StatsHistory sessions={sorted}/>}
      {tab === "pr" && <StatsPR state={state}/>}
      {tab === "chart" && <StatsChart state={state}/>}
    </div>
  );
}

function StatsHistory({ sessions }) {
  const RPE = ["","😵","😓","😐","💪","🔥"];
  if (!sessions.length) return (
    <div style={{textAlign:"center",padding:"60px 20px",color:T.textMuted}}>
      <p style={{fontSize:36,marginBottom:10,opacity:0.3}}>📅</p>
      <p style={{fontSize:14,fontFamily:FF_SANS,fontWeight:500}}>Aucune séance encore</p>
      <p style={{fontSize:12,color:T.textDim,marginTop:6,fontFamily:FF_SANS}}>Commence ta première depuis l'accueil</p>
    </div>
  );
  return (
    <div>
      {sessions.map(s => {
        const p = PROGRAMS[s.programId];
        const sess = p?.sessions.find(x => x.key === s.sessionKey);
        if (!sess) return null;
        return (
          <Card key={s.id} style={{marginBottom:10,padding:"14px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:14}}>
            <div style={{width:4,alignSelf:"stretch",borderRadius:2,background:sess.grad,minHeight:40,flexShrink:0}}/>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4,flexWrap:"wrap"}}>
                <span style={{fontFamily:FF_DISPLAY,fontSize:18,fontWeight:500,fontVariationSettings:`"opsz" 144`,color:sess.color,letterSpacing:"-0.02em",lineHeight:1}}>{sess.label}</span>
                <span style={{fontSize:12,color:T.text,fontFamily:FF_SANS,fontWeight:600}}>{sess.title}</span>
              </div>
              <p style={{fontSize:11,color:T.textMuted,fontFamily:FF_SANS,marginBottom:2}}>{fmtDateLong(s.date)}</p>
              {s.notes && <p style={{fontSize:11,color:T.textDim,fontStyle:"italic",fontFamily:FF_SANS,lineHeight:1.4,marginTop:4}}>« {s.notes} »</p>}
            </div>
            <div style={{textAlign:"right",display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4,flexShrink:0}}>
              {s.rpe > 0 && <span style={{fontSize:22,lineHeight:1}}>{RPE[s.rpe]}</span>}
              {s.duration && <span style={{fontSize:11,color:T.textDim,fontFamily:FF_MONO,fontVariantNumeric:"tabular-nums",fontWeight:500}}>{fmtDur(s.duration)}</span>}
            </div>
          </Card>
        );
      })}
    </div>
  );
}

function StatsPR({ state }) {
  // Récupère tous les exercices de tous les programmes et calcule le PR
  const allExercises = useMemo(() => {
    const m = new Map();
    Object.values(PROGRAMS).forEach(prog => {
      prog.sessions.forEach(sess => {
        sess.exercises.forEach(ex => {
          if (!m.has(ex.id)) m.set(ex.id, { ex, color: sess.color });
        });
      });
    });
    return Array.from(m.values());
  }, []);

  const prs = allExercises.map(({ ex, color }) => {
    if (ex.superset) {
      const prA = getPR(state.sessions, ex.id, true, "A");
      const prB = getPR(state.sessions, ex.id, true, "B");
      return { ex, color, prA, prB, isSuperset: true };
    }
    return { ex, color, pr: getPR(state.sessions, ex.id, false) };
  }).filter(p => p.isSuperset ? (p.prA.weight>0 || p.prB.weight>0) : p.pr.weight>0)
    .sort((a,b) => {
      const va = a.isSuperset ? Math.max(a.prA.e1rm, a.prB.e1rm) : a.pr.e1rm;
      const vb = b.isSuperset ? Math.max(b.prA.e1rm, b.prB.e1rm) : b.pr.e1rm;
      return vb - va;
    });

  if (!prs.length) return (
    <div style={{textAlign:"center",padding:"60px 20px",color:T.textMuted}}>
      <p style={{fontSize:36,marginBottom:10,opacity:0.3}}>🏆</p>
      <p style={{fontSize:14,fontFamily:FF_SANS,fontWeight:500}}>Pas encore de records</p>
      <p style={{fontSize:12,color:T.textDim,marginTop:6,fontFamily:FF_SANS}}>Termine une séance pour les voir apparaître</p>
    </div>
  );
  return (
    <div>
      {prs.map(({ ex, color, pr, prA, prB, isSuperset }) => (
        <Card key={ex.id} style={{marginBottom:10,padding:"13px 16px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:12}}>
            <div style={{flex:1,minWidth:0}}>
              <p style={{fontSize:13,fontWeight:600,color:T.text,fontFamily:FF_SANS,letterSpacing:"-0.01em",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{isSuperset ? `${ex.nameA} / ${ex.nameB}` : ex.name}</p>
              <p style={{fontSize:10,color:T.textDim,fontFamily:FF_SANS,marginTop:2}}>{isSuperset ? "Superset" : `${ex.sets||"—"}×${ex.min||"?"}-${ex.max||"?"} reps`}</p>
            </div>
            <div style={{textAlign:"right",flexShrink:0}}>
              {isSuperset ? (
                <>
                  {prA.weight>0 && <p style={{fontFamily:FF_MONO,fontSize:14,fontWeight:700,color:color,letterSpacing:"-0.02em",fontVariantNumeric:"tabular-nums",lineHeight:1.1}}>A · {prA.weight}kg</p>}
                  {prB.weight>0 && <p style={{fontFamily:FF_MONO,fontSize:14,fontWeight:700,color:color,letterSpacing:"-0.02em",fontVariantNumeric:"tabular-nums",marginTop:2,lineHeight:1.1}}>B · {prB.weight}kg</p>}
                </>
              ) : (
                <>
                  <p style={{fontFamily:FF_MONO,fontSize:20,fontWeight:700,color:color,letterSpacing:"-0.03em",fontVariantNumeric:"tabular-nums",lineHeight:1}}>{pr.weight}<span style={{fontSize:11,color:T.textMuted,marginLeft:2}}>kg</span></p>
                  <p style={{fontSize:9,color:T.textDim,fontFamily:FF_SANS,marginTop:4,fontWeight:600,letterSpacing:"0.05em",textTransform:"uppercase"}}>1RM est. {pr.e1rm}kg</p>
                </>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function StatsChart({ state }) {
  const [progId, setProgId] = useState(state.activeProgramId);
  const [exId, setExId] = useState(null);
  const prog = PROGRAMS[progId];

  const allEx = useMemo(() => {
    const list = [];
    prog.sessions.forEach(sess => { sess.exercises.forEach(ex => list.push({ ex, sess })); });
    return list;
  }, [prog]);

  const ex = exId ? allEx.find(e => e.ex.id === exId) : null;
  const chartData = useMemo(() => {
    if (!ex) return [];
    return state.sessions
      .filter(s => s.programId === progId && s.sessionKey === ex.sess.key)
      .sort((a,b)=>a.date-b.date)
      .map(s => {
        const d = s.exercises?.[ex.ex.id]; if (!d?.sets?.length) return null;
        let w = 0;
        d.sets.forEach(set => { w = Math.max(w, ...(ex.ex.superset ? [parseFloat(set.weightA)||0, parseFloat(set.weightB)||0] : [parseFloat(set.weight)||0])); });
        return w > 0 ? { date: fmtDate(s.date), kg: w } : null;
      }).filter(Boolean);
  }, [ex, state.sessions, progId]);

  return (
    <div>
      {/* Sélecteur programme */}
      <div style={{display:"flex",gap:6,marginBottom:12,overflowX:"auto",paddingBottom:2}}>
        {Object.values(PROGRAMS).map(p => (
          <button key={p.id} onClick={()=>{setProgId(p.id);setExId(null);}}
            style={{padding:"8px 14px",borderRadius:10,border:`1px solid ${progId===p.id?T.accent:T.border}`,background:progId===p.id?T.accent+"18":T.surface2,color:progId===p.id?T.accentLight:T.textMuted,fontFamily:FF_SANS,fontSize:11,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>
            {p.name}
          </button>
        ))}
      </div>

      {/* Liste exercices */}
      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:16}}>
        {allEx.map(({ ex: e, sess }) => (
          <button key={e.id+sess.key} onClick={()=>{haptic();setExId(e.id);}}
            style={{background:exId===e.id?sess.color+"15":T.surface,border:`1px solid ${exId===e.id?sess.color:T.border}`,color:exId===e.id?T.text:T.textMuted,padding:"11px 14px",borderRadius:10,textAlign:"left",cursor:"pointer",fontSize:12,fontFamily:FF_SANS,fontWeight:exId===e.id?700:500,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <span>{e.superset ? `⚡ ${e.nameA} / ${e.nameB}` : e.name}</span>
            <span style={{fontSize:9,color:sess.color,fontFamily:FF_SANS,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase"}}>{sess.label}</span>
          </button>
        ))}
      </div>

      {ex && (
        <Card style={{padding:"16px 10px"}}>
          <p style={{fontSize:13,fontWeight:700,color:T.text,fontFamily:FF_SANS,letterSpacing:"-0.01em",marginBottom:12,paddingLeft:10}}>{ex.ex.superset ? `${ex.ex.nameA} / ${ex.ex.nameB}` : ex.ex.name} <span style={{color:T.textDim,fontWeight:500}}>— charge max (kg)</span></p>
          {chartData.length >= 2 ? (
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={chartData} margin={{top:10,right:16,left:-10,bottom:5}}>
                <XAxis dataKey="date" tick={{fontSize:10,fill:T.textDim,fontFamily:FF_MONO}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fontSize:10,fill:T.textDim,fontFamily:FF_MONO}} axisLine={false} tickLine={false} domain={["auto","auto"]}/>
                <Tooltip contentStyle={{background:T.surface2,border:`1px solid ${T.borderMid}`,borderRadius:10,fontSize:11,fontFamily:FF_SANS}} labelStyle={{color:T.textMuted}} itemStyle={{color:ex.sess.color}}/>
                <Line type="monotone" dataKey="kg" stroke={ex.sess.color} strokeWidth={3} dot={{fill:ex.sess.color,r:4,strokeWidth:2,stroke:T.bg}} activeDot={{r:7,strokeWidth:3,stroke:T.bg}}/>
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p style={{textAlign:"center",color:T.textMuted,padding:"40px 20px",fontSize:12,fontFamily:FF_SANS}}>Au moins 2 séances nécessaires pour voir la courbe</p>
          )}
        </Card>
      )}
    </div>
  );
}

// ─── VUE PLUS (réglages + export + info) ─────────────────────────────────────
function MoreView({ state, setState }) {
  const [resetModal, setResetModal] = useState(false);
  const fileInputRef = useRef(null);

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `iron-backup-${new Date().toISOString().slice(0,10)}.json`;
    a.click(); URL.revokeObjectURL(url); haptic();
  };

  const handleImport = (e) => {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const data = JSON.parse(ev.target.result);
        if (data.version && data.sessions !== undefined) {
          if (confirm("Remplacer toutes tes données par celles du fichier ? Cette action est irréversible.")) {
            setState(data); alert("Import réussi.");
          }
        } else alert("Fichier invalide.");
      } catch { alert("Impossible de lire le fichier."); }
    };
    reader.readAsText(file); e.target.value = "";
  };

  const totalSessions = state.sessions.length;
  const totalVolume = state.sessions.reduce((a,s) => a + (s.totalVolume||getTotalVolume(s)), 0);

  return (
    <div className="fade-in">
      <SectionHeader eyebrow="Réglages" title="Plus" subtitle="Préférences, données et informations"/>

      {/* Stats globales */}
      <Card style={{padding:"16px 18px",marginBottom:14,background:`linear-gradient(135deg, ${T.surface}, ${T.surface2})`}}>
        <p style={{fontSize:10,color:T.textDim,fontFamily:FF_SANS,fontWeight:700,letterSpacing:"0.16em",textTransform:"uppercase",marginBottom:10}}>Tes statistiques</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
          <div>
            <p style={{fontFamily:FF_DISPLAY,fontSize:30,fontWeight:500,fontVariationSettings:`"opsz" 144`,color:T.text,letterSpacing:"-0.03em",lineHeight:1}}>{totalSessions}</p>
            <p style={{fontSize:11,color:T.textMuted,marginTop:3,fontFamily:FF_SANS}}>séances totales</p>
          </div>
          <div>
            <p style={{fontFamily:FF_DISPLAY,fontSize:30,fontWeight:500,fontVariationSettings:`"opsz" 144`,color:T.text,letterSpacing:"-0.03em",lineHeight:1}}>{(totalVolume/1000).toFixed(1)}<span style={{fontSize:16,color:T.textMuted,fontFamily:FF_MONO,marginLeft:3}}>t</span></p>
            <p style={{fontSize:11,color:T.textMuted,marginTop:3,fontFamily:FF_SANS}}>volume total soulevé</p>
          </div>
        </div>
      </Card>

      {/* Préférences */}
      <p style={{fontSize:10,color:T.textDim,fontFamily:FF_SANS,fontWeight:700,letterSpacing:"0.16em",textTransform:"uppercase",marginBottom:10,marginTop:6,paddingLeft:2}}>Préférences</p>
      <Card style={{marginBottom:14,overflow:"hidden"}}>
        <div style={{padding:"14px 18px",borderBottom:`1px solid ${T.border}`,display:"flex",justifyContent:"space-between",alignItems:"center",gap:14}}>
          <div><p style={{fontSize:13,color:T.text,fontFamily:FF_SANS,fontWeight:600}}>Durée de repos par défaut</p><p style={{fontSize:11,color:T.textMuted,fontFamily:FF_SANS,marginTop:2}}>Entre chaque série</p></div>
          <select value={state.prefs.restDefault} onChange={e=>{haptic();setState(st=>({...st,prefs:{...st.prefs,restDefault:parseInt(e.target.value)}}));}}
            style={{background:T.surface2,color:T.text,border:`1px solid ${T.borderMid}`,padding:"7px 12px",borderRadius:8,fontFamily:FF_SANS,fontSize:12,fontWeight:600,cursor:"pointer"}}>
            {[60,75,90,120,150,180].map(s=><option key={s} value={s}>{s<60?s+"s":Math.floor(s/60)+"m"+(s%60?s%60:"")}</option>)}
          </select>
        </div>
        <div style={{padding:"14px 18px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:14}}>
          <div><p style={{fontSize:13,color:T.text,fontFamily:FF_SANS,fontWeight:600}}>Unité de poids</p><p style={{fontSize:11,color:T.textMuted,fontFamily:FF_SANS,marginTop:2}}>Uniquement kg pour l'instant</p></div>
          <Pill tone="neutral">kg</Pill>
        </div>
      </Card>

      {/* Données */}
      <p style={{fontSize:10,color:T.textDim,fontFamily:FF_SANS,fontWeight:700,letterSpacing:"0.16em",textTransform:"uppercase",marginBottom:10,paddingLeft:2}}>Données</p>
      <Card style={{marginBottom:14}}>
        <button onClick={handleExport} style={{width:"100%",background:"transparent",border:"none",padding:"14px 18px",display:"flex",alignItems:"center",gap:14,cursor:"pointer",borderBottom:`1px solid ${T.border}`,textAlign:"left"}}>
          <div style={{width:36,height:36,background:T.surface2,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",color:T.accent,flexShrink:0}}>{I({d:ICO.dl,s:18,c:T.accent})}</div>
          <div style={{flex:1}}><p style={{fontSize:13,color:T.text,fontFamily:FF_SANS,fontWeight:600}}>Exporter mes données</p><p style={{fontSize:11,color:T.textMuted,fontFamily:FF_SANS,marginTop:2}}>Télécharge un backup JSON</p></div>
          <span style={{color:T.textDim}}>{I({d:ICO.chevR,s:14,c:T.textDim})}</span>
        </button>
        <input type="file" accept=".json" ref={fileInputRef} onChange={handleImport} style={{display:"none"}}/>
        <button onClick={()=>fileInputRef.current?.click()} style={{width:"100%",background:"transparent",border:"none",padding:"14px 18px",display:"flex",alignItems:"center",gap:14,cursor:"pointer",borderBottom:`1px solid ${T.border}`,textAlign:"left"}}>
          <div style={{width:36,height:36,background:T.surface2,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",color:T.accent,flexShrink:0}}>{I({d:ICO.up,s:18,c:T.accent})}</div>
          <div style={{flex:1}}><p style={{fontSize:13,color:T.text,fontFamily:FF_SANS,fontWeight:600}}>Importer des données</p><p style={{fontSize:11,color:T.textMuted,fontFamily:FF_SANS,marginTop:2}}>Restaure un backup JSON</p></div>
          <span style={{color:T.textDim}}>{I({d:ICO.chevR,s:14,c:T.textDim})}</span>
        </button>
        <button onClick={()=>setResetModal(true)} style={{width:"100%",background:"transparent",border:"none",padding:"14px 18px",display:"flex",alignItems:"center",gap:14,cursor:"pointer",textAlign:"left"}}>
          <div style={{width:36,height:36,background:T.danger+"18",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",color:T.danger,flexShrink:0}}>{I({d:ICO.trash,s:18,c:T.danger})}</div>
          <div style={{flex:1}}><p style={{fontSize:13,color:T.danger,fontFamily:FF_SANS,fontWeight:600}}>Tout réinitialiser</p><p style={{fontSize:11,color:T.textMuted,fontFamily:FF_SANS,marginTop:2}}>Efface toutes les données locales</p></div>
          <span style={{color:T.textDim}}>{I({d:ICO.chevR,s:14,c:T.textDim})}</span>
        </button>
      </Card>

      {/* V1.1 — à venir */}
      <p style={{fontSize:10,color:T.textDim,fontFamily:FF_SANS,fontWeight:700,letterSpacing:"0.16em",textTransform:"uppercase",marginBottom:10,paddingLeft:2}}>À venir</p>
      <Card style={{padding:"14px 18px",marginBottom:14,background:T.surface2,border:`1px dashed ${T.borderMid}`}}>
        <p style={{fontSize:12,color:T.textMuted,fontFamily:FF_SANS,lineHeight:1.6}}>
          <span style={{color:T.text,fontWeight:600}}>v1.1</span> — Éditeur de programme personnalisé · Bibliothèque d'exercices autonome · Volume par groupe musculaire · Streaks
        </p>
      </Card>

      {/* À propos */}
      <Card style={{padding:"14px 18px",marginBottom:40,background:"transparent",border:`1px dashed ${T.border}`}}>
        <p style={{fontSize:11,color:T.textDim,fontFamily:FF_SANS,lineHeight:1.6}}>
          <span style={{fontFamily:FF_DISPLAY,fontSize:15,fontWeight:500,fontVariationSettings:`"opsz" 144`,color:T.text,letterSpacing:"-0.02em"}}>IRON</span> v1.0 · Tracker local, 100% offline. Toutes tes données restent sur ton téléphone. Pense à exporter régulièrement un backup.
        </p>
      </Card>

      <Modal open={resetModal} onClose={()=>setResetModal(false)} maxWidth={340}>
        <h3 style={{fontFamily:FF_DISPLAY,fontSize:22,fontWeight:500,fontVariationSettings:`"opsz" 144`,color:T.danger,letterSpacing:"-0.025em",margin:"0 0 8px"}}>Tout effacer ?</h3>
        <p style={{fontSize:13,color:T.textMuted,fontFamily:FF_SANS,marginBottom:20,lineHeight:1.5}}>Toutes tes séances, records, réglages et la séance en cours seront définitivement supprimés. Cette action est irréversible. Pense à exporter un backup avant.</p>
        <div style={{display:"flex",gap:10}}>
          <Btn variant="ghost" onClick={()=>setResetModal(false)} style={{flex:1}}>Annuler</Btn>
          <Btn variant="danger" onClick={()=>{setState(initialState());setResetModal(false);}} style={{flex:1,background:`${T.danger}22`}}>Effacer tout</Btn>
        </div>
      </Modal>
    </div>
  );
}

// ─── VUE : Choix du programme actif ──────────────────────────────────────────
function ProgramPicker({ currentId, onPick, onClose }) {
  return (
    <Modal open={true} onClose={onClose} maxWidth={440}>
      <h3 style={{fontFamily:FF_DISPLAY,fontSize:26,fontWeight:500,fontVariationSettings:`"opsz" 144, "SOFT" 50`,color:T.text,letterSpacing:"-0.03em",margin:"0 0 6px"}}>Choisir un programme</h3>
      <p style={{fontSize:12,color:T.textMuted,fontFamily:FF_SANS,marginBottom:18}}>Ton historique et tes records sont préservés.</p>
      {Object.values(PROGRAMS).map(p => (
        <button key={p.id} onClick={()=>{haptic();onPick(p.id);}} style={{width:"100%",background:currentId===p.id?T.accent+"15":T.surface2,border:`1px solid ${currentId===p.id?T.accent:T.border}`,borderRadius:12,padding:"14px 16px",marginBottom:8,cursor:"pointer",textAlign:"left",display:"flex",alignItems:"center",gap:12}}>
          <div style={{flex:1,minWidth:0}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4,flexWrap:"wrap"}}>
              <p style={{fontFamily:FF_DISPLAY,fontSize:17,fontWeight:500,fontVariationSettings:`"opsz" 144`,color:T.text,letterSpacing:"-0.02em",lineHeight:1}}>{p.name}</p>
              {currentId===p.id && <Pill tone="accent">● Actif</Pill>}
            </div>
            <p style={{fontSize:11,color:T.textMuted,fontFamily:FF_SANS}}>{p.subtitle}</p>
            <p style={{fontSize:11,color:T.textDim,fontFamily:FF_SANS,marginTop:4,lineHeight:1.4}}>{p.description}</p>
          </div>
          <span style={{color:T.textDim}}>{I({d:ICO.chevR,s:16,c:T.textDim})}</span>
        </button>
      ))}
    </Modal>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  MAIN APP — orchestration, navigation, styles globaux
// ═══════════════════════════════════════════════════════════════════════════

export default function App() {
  const [state, setStateRaw] = useState(() => {
    const loaded = load();
    if (!loaded) return initialState();
    // Migration-safe : fusionne avec l'état initial en cas de champ manquant
    return { ...initialState(), ...loaded, prefs: { ...initialState().prefs, ...(loaded.prefs||{}) } };
  });
  const [tab, setTab] = useState("home");
  const [progPicker, setProgPicker] = useState(false);
  const [timer, setTimer] = useState({ active:false, remaining:0, duration:0 });
  const timerIntervalRef = useRef(null);
  const setState = useCallback(updater => {
    setStateRaw(prev => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      save(next); return next;
    });
  }, []);

  // ─── Timer de repos ─────────────────────────────────────────────────
  const startRest = useCallback(() => {
    const dur = state.prefs.restDefault || REST_DEFAULT;
    setTimer({ active:true, remaining:dur, duration:dur });
  }, [state.prefs.restDefault]);

  useEffect(() => {
    if (!timer.active) { if (timerIntervalRef.current) { clearInterval(timerIntervalRef.current); timerIntervalRef.current = null; } return; }
    timerIntervalRef.current = setInterval(() => {
      setTimer(t => {
        const r = t.remaining - 1;
        if (r <= 5 && r > 0) playTick();
        if (r <= 0) { playBeep(); clearInterval(timerIntervalRef.current); timerIntervalRef.current = null; return { active:false, remaining:0, duration:t.duration }; }
        return { ...t, remaining:r };
      });
    }, 1000);
    return () => { if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); };
  }, [timer.active]);

  const skipRest = () => setTimer({ active:false, remaining:0, duration:0 });
  const addTime = () => setTimer(t => ({ ...t, remaining: t.remaining + 30, duration: t.duration + 30 }));

  // ─── Handlers séance ────────────────────────────────────────────────
  const handleStartSession = useCallback((programId, sessionKey) => {
    const s = initSession(programId, sessionKey, state);
    if (s) { setState(st => ({ ...st, active: s })); setTab("session"); }
  }, [state, setState]);

  const handleFinish = useCallback(sess => {
    const finished = { ...sess, date: Date.now(), duration: Math.floor((Date.now() - sess.startTime)/1000), totalVolume: getTotalVolume(sess) };
    setState(st => ({ ...st, sessions: [...st.sessions, finished], active: null }));
    skipRest(); setTab("home");
  }, [setState]);

  const handleAbandon = useCallback(() => {
    setState(st => ({ ...st, active: null })); skipRest(); setTab("home");
  }, [setState]);

  const handleUpdateSession = useCallback(sess => setState(st => ({ ...st, active: sess })), [setState]);
  const handleSwitchProgram = useCallback(pid => { setState(st => ({ ...st, activeProgramId: pid })); setProgPicker(false); }, [setState]);

  // Si une séance est en cours, force l'onglet "session"
  useEffect(() => { if (state.active && tab !== "session") setTab("session"); }, [state.active]);

  const NAV = [
    { id:"home", l:"Accueil", icon:ICO.home },
    { id:"session", l:"Séance", icon:ICO.dumbbell },
    { id:"stats", l:"Stats", icon:ICO.chart },
    { id:"more", l:"Plus", icon:ICO.more },
  ];

  return (
    <>
      <GlobalStyles/>
      <div style={{minHeight:"100vh",background:T.bg,position:"relative"}}>
        {/* Grain subtil en fond */}
        <div style={{position:"fixed",inset:0,opacity:0.015,pointerEvents:"none",zIndex:0,backgroundImage:`url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='120' height='120' filter='url(%23n)'/></svg>")`}}/>

        <RestBar timer={timer} onSkip={skipRest} onAdd={addTime}/>

        <div style={{maxWidth:520,margin:"0 auto",padding:"18px 18px 100px",paddingTop:timer.active?110:18,position:"relative",zIndex:1,transition:"padding-top 0.3s"}}>
          {/* Header logo */}
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:18}}>
            <div style={{width:32,height:32,borderRadius:9,background:T.accentG,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 4px 14px ${T.accentGlow}`}}>
              <span style={{fontFamily:FF_DISPLAY,fontSize:15,fontWeight:700,fontVariationSettings:`"opsz" 144`,color:"#fff",letterSpacing:"-0.04em"}}>I</span>
            </div>
            <span style={{fontFamily:FF_DISPLAY,fontSize:18,fontWeight:500,fontVariationSettings:`"opsz" 144, "SOFT" 50`,color:T.text,letterSpacing:"0.3em"}}>IRON</span>
            <span style={{marginLeft:"auto",fontSize:10,color:T.textDim,fontFamily:FF_MONO,letterSpacing:"0.1em"}}>v1.0</span>
          </div>

          {tab === "home" && <HomeView state={state} onStartSession={handleStartSession} onSwitchProgram={()=>setProgPicker(true)}/>}
          {tab === "session" && (state.active
            ? <SessionView session={state.active} sessions={state.sessions} onUpdate={handleUpdateSession} onFinish={handleFinish} onAbandon={handleAbandon} onRest={startRest}/>
            : <NoSession onGoHome={()=>setTab("home")}/>
          )}
          {tab === "stats" && <StatsView state={state}/>}
          {tab === "more" && <MoreView state={state} setState={setState}/>}
        </div>

        {progPicker && <ProgramPicker currentId={state.activeProgramId} onPick={handleSwitchProgram} onClose={()=>setProgPicker(false)}/>}

        {/* Bottom nav */}
        <nav style={{position:"fixed",bottom:0,left:0,right:0,background:`${T.bg}E8`,backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",borderTop:`1px solid ${T.border}`,padding:"8px 0 calc(8px + env(safe-area-inset-bottom))",zIndex:900}}>
          <div style={{maxWidth:520,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:4,padding:"0 10px"}}>
            {NAV.map(n => {
              const active = tab === n.id;
              return (
                <button key={n.id} onClick={()=>{haptic();setTab(n.id);}}
                  style={{background:"transparent",border:"none",padding:"9px 6px",borderRadius:12,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:4,color:active?T.accent:T.textDim,transition:"color 0.2s",position:"relative"}}>
                  {active && <div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:24,height:2,background:T.accentG,borderRadius:2,boxShadow:`0 0 8px ${T.accentGlow}`}}/>}
                  {I({d:n.icon,s:20,c:"currentColor",w:active?2.2:1.7})}
                  <span style={{fontSize:10,fontFamily:FF_SANS,fontWeight:active?700:500,letterSpacing:"0.02em"}}>{n.l}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
}

// ─── ÉTAT : "Aucune séance en cours" ─────────────────────────────────────────
function NoSession({ onGoHome }) {
  return (
    <div className="fade-in" style={{textAlign:"center",padding:"80px 20px"}}>
      <div style={{width:72,height:72,borderRadius:20,background:T.surface,border:`1px solid ${T.border}`,margin:"0 auto 18px",display:"flex",alignItems:"center",justifyContent:"center",color:T.textDim}}>{I({d:ICO.dumbbell,s:32,c:T.textDim})}</div>
      <h2 style={{fontFamily:FF_DISPLAY,fontSize:26,fontWeight:500,fontVariationSettings:`"opsz" 144`,color:T.text,letterSpacing:"-0.03em",margin:"0 0 6px"}}>Aucune séance en cours</h2>
      <p style={{fontSize:13,color:T.textMuted,fontFamily:FF_SANS,marginBottom:22,lineHeight:1.5}}>Démarre une séance depuis l'accueil<br/>pour commencer le suivi.</p>
      <Btn variant="primary" onClick={onGoHome} size="lg">{I({d:ICO.arrowR,s:14,c:"#fff"})} Aller à l'accueil</Btn>
    </div>
  );
}

// ─── STYLES GLOBAUX ──────────────────────────────────────────────────────────
function GlobalStyles() {
  return (
    <style>{`
      @import url('${FONTS_URL}');
      *,*::before,*::after { box-sizing: border-box; }
      html,body,#root { margin:0; padding:0; background:${T.bg}; color:${T.text}; font-family:${FF_SANS}; -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale; text-rendering:optimizeLegibility; }
      body { overscroll-behavior-y: none; }
      input,textarea,button,select { font-family: inherit; }
      input:focus,textarea:focus,select:focus { border-color: ${T.accent} !important; box-shadow: 0 0 0 3px ${T.accentGlow}; }
      button { font-family: inherit; -webkit-tap-highlight-color: transparent; transition: transform 0.08s, opacity 0.15s, background 0.2s, border-color 0.2s; }
      button:active:not(:disabled) { transform: scale(0.97); }
      input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
      input[type=number] { -moz-appearance: textfield; }
      @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes pulse { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.7; transform: scale(1.03); } }
      .fade-in { animation: fadeIn 0.35s cubic-bezier(0.16,1,0.3,1); }
      ::selection { background: ${T.accent}55; color: ${T.text}; }
      ::-webkit-scrollbar { width: 6px; height: 6px; }
      ::-webkit-scrollbar-thumb { background: ${T.surface3}; border-radius: 3px; }
      ::-webkit-scrollbar-track { background: transparent; }
    `}</style>
  );
}
