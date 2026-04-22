// ═══════════════════════════════════════════════════════════════════════════
//  UPGRADE — Fitness tracker · V2 Brutalist Luxe
//  Single-file React · localStorage · Vite + React 18 + recharts
//  v2.0 — 2026
// ═══════════════════════════════════════════════════════════════════════════

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// ─── DESIGN TOKENS ─────────────────────────────────────────────────────────────
const T = {
  bg: "#18181C",
  bgOff: "#1F1F24",
  surface: "#222228",
  surface2: "#2A2A31",
  surface3: "#32323A",
  hairline: "rgba(255,255,255,0.09)",
  hairlineMid: "rgba(255,255,255,0.16)",
  hairlineStrong: "rgba(255,255,255,0.32)",
  text: "#FAFAF7",
  textMid: "#A3A39D",
  textDim: "#6B6B70",
  textFaint: "#3A3A40",
  accent: "#E05900",
  accentBright: "#FF7020",
  success: "#5E9E4E",
  danger: "#D13F37",
};

const FF_DISPLAY = "'Archivo', 'Helvetica Neue', sans-serif";
const FF_SANS = "'Inter', -apple-system, system-ui, sans-serif";
const FF_MONO = "'JetBrains Mono', ui-monospace, monospace";
const FONTS_URL = "https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&family=Archivo+Narrow:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap";

// ─── ICÔNES MONOLINE 1PX — style plan d'architecte ────────────────────────────
const Ico = ({ d, s = 16, c = "currentColor" }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter" style={{ flexShrink: 0, display: "block" }}>
    <path d={d} />
  </svg>
);

const IC = {
  // Nav bas — icônes minimalistes, géométriques
  nav_home: "M3 11L12 4L21 11V20H14V14H10V20H3V11Z",
  nav_train: "M3 9H6V15H3ZM7 7H9V17H7ZM15 7H17V17H15ZM18 9H21V15H18ZM9 12H15",
  nav_stats: "M3 21H21M7 21V11M12 21V5M17 21V14",
  nav_more: "M5 12H5.01M12 12H12.01M19 12H19.01",
  // Actions
  check: "M4 12L9 17L20 6",
  close: "M5 5L19 19M19 5L5 19",
  plus: "M12 4V20M4 12H20",
  minus: "M4 12H20",
  chevR: "M9 6L15 12L9 18",
  chevD: "M6 9L12 15L18 9",
  chevU: "M6 15L12 9L18 15",
  arrowR: "M4 12H20M14 6L20 12L14 18",
  // Meta
  play: "M6 4V20L20 12Z",
  circle: "M12 21A9 9 0 1 0 12 3A9 9 0 1 0 12 21Z",
  ring: "M12 3V6M12 18V21M3 12H6M18 12H21M5.6 5.6L7.7 7.7M16.3 16.3L18.4 18.4M5.6 18.4L7.7 16.3M16.3 7.7L18.4 5.6",
  info: "M12 21A9 9 0 1 0 12 3A9 9 0 1 0 12 21ZM12 8V8.01M11 12H12V16H13",
  note: "M4 4H20V20L16 20L12 20L8 20L4 20V4Z",
  dl: "M12 4V16M6 10L12 16L18 10M4 20H20",
  up: "M12 20V4M6 10L12 4L18 10M4 20H20",
  trash: "M4 7H20M9 7V4H15V7M10 11V17M14 11V17M6 7L7 21H17L18 7",
  edit: "M4 20L4 16L16 4L20 8L8 20L4 20Z",
  trophy: "M7 4H17V10A5 5 0 0 1 7 10V4ZM4 4H7V7A3 3 0 0 1 4 7V4ZM17 4H20V7A3 3 0 0 1 17 7V4ZM12 15V19M9 21H15",
};

// ─── PROGRAMMES — identiques V1 ──────────────────────────────────────────────
const PROGRAMS = {
  uplowup: {
    id: "uplowup", name: "UP / LOW / UP", subtitle: "HYPERTROPHIE · 3 SESSIONS", author: "JULIEN",
    description: "Split haut/bas/haut avec supersets. Surcharge progressive hebdomadaire.",
    sessions: [
      { id:"u1", key:"u1", label:"UP 1", code:"A-01", title:"UPPER BODY A", muscles:"PEC · ÉPAULES · TRICEPS · BICEPS · DOS", num:"01", exercises:[
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
        { id:"tirage_vert_u1", name:"Tirage Vertical", sets:2, min:6, max:10,
          tips:["Prise légèrement plus large que les épaules.","Tire vers le haut de la poitrine, jamais derrière la nuque.","Pense 'coudes vers les hanches'."]},
        { id:"tirage_horiz_u1", name:"Tirage Horizontal", sets:2, min:6, max:10,
          tips:["Torse droit, légèrement penché en avant au départ.","Ramène les coudes derrière le buste.","Rétracte les omoplates à la contraction — tiens 1 seconde."]},
      ]},
      { id:"lo", key:"lo", label:"LOW", code:"B-02", title:"LOWER BODY", muscles:"QUADRICEPS · ISCHIO · FESSIERS · MOLLETS · ADDUCTEURS", num:"02", exercises:[
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
      { id:"u2", key:"u2", label:"UP 2", code:"C-03", title:"UPPER BODY B", muscles:"DOS · BICEPS · ÉPAULES · TRICEPS · PEC", num:"03", exercises:[
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
    id:"ppl3", name:"PUSH / PULL / LEGS", subtitle:"HYPERTROPHIE · 3 SESSIONS", author:"UPGRADE",
    description:"Split classique poussée / tirage / jambes. Polyvalent, éprouvé.",
    sessions:[
      { id:"push", key:"push", label:"PUSH", code:"A-01", title:"POUSSÉE", muscles:"PEC · ÉPAULES · TRICEPS", num:"01", exercises:[
        { id:"dc_barre", name:"Développé Couché Barre", sets:4, min:6, max:10, tips:["Omoplates rétractées et fixées durant toute la série.","Descente contrôlée 2-3s, pause 1s en bas.","Barre touche la poitrine à hauteur des mamelons."]},
        { id:"di_halt_ppl", name:"Développé Incliné Haltère", sets:3, min:8, max:12, tips:["Banc à 30-45° max.","Trajectoire légèrement convergente en haut.","Contrôle la descente."]},
        { id:"dm_halt", name:"Développé Militaire Haltère", sets:3, min:8, max:12, tips:["Assis, dos calé contre le banc incliné presque vertical.","Coudes légèrement devant le buste.","Verrouillage en haut sans claquer les haltères."]},
        { id:"ecarte_ppl", name:"Écarté Poulie", sets:3, min:10, max:15, tips:["Bras légèrement fléchis, verrouillés.","Amène les mains devant la poitrine, contraction 1s.","Étirement contrôlé sur le retour."]},
        { id:"el_lat", name:"Élévation Latérale Haltère", sets:3, min:12, max:15, tips:["Légère inclinaison avant du buste.","Monte jusqu'à l'horizontale, pas au-delà.","Descente lente en 3s."]},
        { id:"ext_poulie_ppl", name:"Extension Triceps Poulie Haute", sets:3, min:10, max:12, tips:["Coudes fixes contre le corps.","Poignets neutres, amplitude complète.","Descente contrôlée."]},
      ]},
      { id:"pull", key:"pull", label:"PULL", code:"B-02", title:"TIRAGE", muscles:"DOS · BICEPS · DELTOÏDES POSTÉRIEURS", num:"02", exercises:[
        { id:"sdt", name:"Soulevé de Terre", sets:4, min:4, max:6, tips:["Barre collée aux tibias au départ.","Dos droit, scapulas engagées.","Extension complète des hanches en haut, puis redescend contrôlé."]},
        { id:"tractions", name:"Tractions (ou Tirage Vertical)", sets:4, min:6, max:10, tips:["Prise pronation, légèrement plus large que les épaules.","Tire les coudes vers les hanches.","Étirement complet en bas."]},
        { id:"rowing_barre", name:"Rowing Barre Buste Penché", sets:3, min:8, max:10, tips:["Buste à 30-45° de l'horizontale.","Tire la barre vers le bas du sternum.","Rétracte les omoplates à chaque rep."]},
        { id:"face_pull", name:"Face Pull Corde", sets:3, min:12, max:15, tips:["Corde à hauteur du front.","Tire en écartant les mains vers les oreilles.","Deltoïdes postérieurs + trapèzes moyens."]},
        { id:"curl_barre_ppl", name:"Curl Barre", sets:3, min:8, max:12, tips:["Coudes collés au corps, fixes.","Montée complète jusqu'au contact avant-bras/biceps.","Descente contrôlée 3s."]},
        { id:"curl_marteau_ppl", name:"Curl Marteau", sets:3, min:10, max:12, tips:["Poignet neutre, paumes face à face.","Coudes immobiles.","Alterne ou simultané."]},
      ]},
      { id:"legs", key:"legs", label:"LEGS", code:"C-03", title:"JAMBES", muscles:"QUADRICEPS · ISCHIO · FESSIERS · MOLLETS", num:"03", exercises:[
        { id:"squat_barre", name:"Squat Barre", sets:4, min:5, max:8, tips:["Pieds largeur épaules, pointes légèrement ouvertes.","Descente profonde (cuisses parallèles minimum).","Genoux dans l'axe des pointes."]},
        { id:"presse", name:"Presse à Cuisses", sets:3, min:8, max:12, tips:["Pieds hauts sur la plate-forme = fessiers/ischio.","Pieds bas = quadriceps.","Ne verrouille jamais les genoux en haut."]},
        { id:"sdl_ppl", name:"Soulevé de Terre Roumain", sets:3, min:8, max:12, tips:["Barre près des jambes durant tout le mouvement.","Hanches en arrière, très peu de flexion de genoux.","Étirement des ischio en bas."]},
        { id:"fentes", name:"Fentes Marchées Haltère", sets:3, min:10, max:12, tips:["Genou avant jamais devant la pointe du pied.","Descente contrôlée, pousse sur le talon avant.","Corps droit, pas d'inclinaison."]},
        { id:"mollets", name:"Mollets Debout (Smith)", sets:4, min:12, max:15, tips:["Pause 2s en bas, étirement complet.","Monte le plus haut possible, tiens 1s.","Temps sous tension : mouvement lent."]},
      ]},
    ],
  },
  fb3: {
    id:"fb3", name:"FULL BODY · 3J", subtitle:"ÉQUILIBRÉ · 3 SESSIONS", author:"UPGRADE",
    description:"Chaque séance couvre tout le corps. Idéal pour la polyvalence.",
    sessions:[
      { id:"fb_a", key:"fb_a", label:"A", code:"A-01", title:"FULL BODY A", muscles:"TOUT LE CORPS · ACCENT POUSSÉE", num:"01", exercises:[
        { id:"squat_fb", name:"Squat Barre", sets:3, min:5, max:8, tips:["Descente contrôlée, poussée explosive.","Respiration bloquée au point bas."]},
        { id:"dc_fb", name:"Développé Couché Barre", sets:3, min:6, max:10, tips:["Omoplates verrouillées.","Barre touche la poitrine, pas de rebond."]},
        { id:"rowing_fb", name:"Rowing Barre", sets:3, min:6, max:10, tips:["Buste à 30-45°.","Tire vers le bas du sternum."]},
        { id:"dm_fb", name:"Développé Militaire", sets:3, min:8, max:10, tips:["Debout ou assis dossier droit.","Gainage abdominal constant."]},
        { id:"curl_fb_a", name:"Curl Haltère Alterné", sets:3, min:10, max:12, tips:["Coudes fixes.","Contrôle la descente en 3s."]},
      ]},
      { id:"fb_b", key:"fb_b", label:"B", code:"B-02", title:"FULL BODY B", muscles:"TOUT LE CORPS · ACCENT TIRAGE", num:"02", exercises:[
        { id:"sdt_fb", name:"Soulevé de Terre", sets:3, min:4, max:6, tips:["Barre aux tibias.","Extension complète des hanches."]},
        { id:"tractions_fb", name:"Tractions (ou Tirage)", sets:3, min:6, max:10, tips:["Amplitude complète, menton au-dessus de la barre."]},
        { id:"di_fb", name:"Développé Incliné Haltère", sets:3, min:8, max:10, tips:["Banc à 30-45° max."]},
        { id:"fentes_fb", name:"Fentes Haltère", sets:3, min:10, max:12, tips:["Genou avant dans l'axe du pied.","Descente lente."]},
        { id:"ext_fb", name:"Extension Triceps Poulie", sets:3, min:10, max:12, tips:["Coudes fixes contre le corps."]},
      ]},
      { id:"fb_c", key:"fb_c", label:"C", code:"C-03", title:"FULL BODY C", muscles:"TOUT LE CORPS · VOLUME", num:"03", exercises:[
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

// ─── STORAGE ───────────────────────────────────────────────────────────────────
const SKEY = "upgrade_v2";
const REST_DEFAULT = 90;

const initialState = () => ({
  version: 2,
  activeProgramId: "uplowup",
  sessions: [],
  active: null,
  prefs: { units: "kg", restDefault: REST_DEFAULT },
});

const save = d => { try { localStorage.setItem(SKEY, JSON.stringify(d)); } catch(e) {} };
const load = () => {
  try {
    const r = localStorage.getItem(SKEY);
    if (r) return JSON.parse(r);
    // Migration éventuelle depuis iron_v1
    const old = localStorage.getItem("iron_v1");
    if (old) { const parsed = JSON.parse(old); return { ...parsed, version: 2 }; }
    return null;
  } catch(e) { return null; }
};

// ─── UTILS ─────────────────────────────────────────────────────────────────────
const uid = () => Math.random().toString(36).slice(2, 10);
const fmtDate = ts => new Date(ts).toLocaleDateString("fr-FR", { day:"2-digit", month:"2-digit", year:"2-digit" });
const fmtDateLong = ts => new Date(ts).toLocaleDateString("fr-FR", { weekday:"short", day:"2-digit", month:"long" }).toUpperCase();
const fmtDur = sec => { const m = Math.floor(sec/60), s = sec%60; return `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`; };
const fmtClock = sec => `${String(Math.floor(sec/60)).padStart(2,"0")}:${String(sec%60).padStart(2,"0")}`;
const daysAgo = ts => Math.floor((Date.now() - ts) / 86400000);
const fmtAgo = ts => { const d = daysAgo(ts); if (d === 0) return "AUJOURD'HUI"; if (d === 1) return "HIER"; if (d < 7) return `J-${d}`; if (d < 30) return `S-${Math.floor(d/7)}`; return fmtDate(ts); };
const pad2 = n => String(n).padStart(2,"0");
const pad3 = n => String(n).padStart(3,"0");

// ─── AUDIO + VIBRATION ─────────────────────────────────────────────────────────
let _ctx = null;
const getCtx = () => { try { if (!_ctx) _ctx = new (window.AudioContext || window.webkitAudioContext)(); if (_ctx.state === "suspended") _ctx.resume(); return _ctx; } catch(e) { return null; } };
const playBeep = () => {
  const c = getCtx(); if (!c) return;
  try { [[0,880,0.15],[0.2,880,0.15],[0.42,1320,0.35]].forEach(([t,f,d])=>{ const o=c.createOscillator(),g=c.createGain(); o.connect(g);g.connect(c.destination); o.type="square";o.frequency.value=f; g.gain.setValueAtTime(0.0001,c.currentTime+t); g.gain.exponentialRampToValueAtTime(0.4,c.currentTime+t+0.02); g.gain.exponentialRampToValueAtTime(0.0001,c.currentTime+t+d); o.start(c.currentTime+t);o.stop(c.currentTime+t+d+0.05); }); } catch(e){}
  try { navigator.vibrate && navigator.vibrate([200,100,200,100,400]); } catch(e){}
};
const playTick = () => {
  const c = getCtx(); if (!c) return;
  try { const o=c.createOscillator(),g=c.createGain(); o.connect(g);g.connect(c.destination); o.type="square";o.frequency.value=720; g.gain.setValueAtTime(0.0001,c.currentTime); g.gain.exponentialRampToValueAtTime(0.22,c.currentTime+0.01); g.gain.exponentialRampToValueAtTime(0.0001,c.currentTime+0.07); o.start(c.currentTime);o.stop(c.currentTime+0.08); } catch(e){}
  try { navigator.vibrate && navigator.vibrate(40); } catch(e){}
};
const haptic = () => { try { navigator.vibrate && navigator.vibrate(10); } catch(e){} };

// ─── BUSINESS HELPERS ──────────────────────────────────────────────────────────
function initSession(programId, sessionKey, state) {
  const prog = PROGRAMS[programId]; if (!prog) return null;
  const sess = prog.sessions.find(s => s.key === sessionKey); if (!sess) return null;
  const exercises = {};
  sess.exercises.forEach(ex => {
    const n = ex.sets || 2;
    if (ex.superset) exercises[ex.id] = { sets: Array.from({length:n}, () => ({ weightA:"", repsA:"", weightB:"", repsB:"", done:false })) };
    else exercises[ex.id] = { sets: Array.from({length:n}, () => ({ weight:"", reps:"", done:false })) };
  });
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

// Charge max historique TOUTES sessions confondues pour un exercice
function getAllTimeMax(sessions, exId, isSuperset) {
  let prW = 0, prReps = 0, prDate = 0;
  let prWA = 0, prRepsA = 0, prWB = 0, prRepsB = 0;
  sessions.forEach(s => {
    const d = s.exercises?.[exId];
    if (!d?.sets) return;
    d.sets.forEach(set => {
      if (isSuperset) {
        const wA = parseFloat(set.weightA) || 0, rA = parseInt(set.repsA) || 0;
        const wB = parseFloat(set.weightB) || 0, rB = parseInt(set.repsB) || 0;
        if (wA > prWA) { prWA = wA; prRepsA = rA; prDate = s.date; }
        if (wB > prWB) { prWB = wB; prRepsB = rB; prDate = s.date; }
      } else {
        const w = parseFloat(set.weight) || 0, r = parseInt(set.reps) || 0;
        if (w > prW) { prW = w; prReps = r; prDate = s.date; }
      }
    });
  });
  if (isSuperset) {
    if (prWA <= 0 && prWB <= 0) return null;
    return { wA: prWA, repsA: prRepsA, wB: prWB, repsB: prRepsB, date: prDate, isSuperset: true };
  }
  if (prW <= 0) return null;
  return { w: prW, reps: prReps, date: prDate };
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

function getPR(sessions, exId, isSuperset, side="") {
  let prW = 0, pr1RM = 0, prDate = 0;
  sessions.forEach(s => {
    const d = s.exercises?.[exId]; if (!d?.sets) return;
    d.sets.forEach(set => {
      const w = isSuperset ? parseFloat(set[`weight${side}`])||0 : parseFloat(set.weight)||0;
      const r = isSuperset ? parseInt(set[`reps${side}`])||0 : parseInt(set.reps)||0;
      if (w > prW) { prW = w; prDate = s.date; }
      if (w > 0 && r > 0) {
        const est = w * (1 + r/30);
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

// ═══════════════════════════════════════════════════════════════════════════════
//  DESIGN SYSTEM COMPONENTS — Brutalist Luxe
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Label monospace en caps, style indexation archive ────────────────────────
const Label = ({ children, style={}, color=T.textMid, size=10, mono=true }) => (
  <span style={{fontFamily: mono?FF_MONO:FF_SANS, fontSize:size, fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase", color, lineHeight:1, ...style}}>{children}</span>
);

// ─── Titre display en caps, très affirmé ──────────────────────────────────────
const Display = ({ children, size=40, weight=800, style={} }) => (
  <span style={{fontFamily:FF_DISPLAY, fontSize:size, fontWeight:weight, letterSpacing:"-0.02em", textTransform:"uppercase", color:T.text, lineHeight:0.92, display:"block", width:"100%", overflow:"hidden", wordBreak:"break-word", ...style}}>{children}</span>
);

// ─── Rule : ligne horizontale fine ────────────────────────────────────────────
const Rule = ({ color=T.hairline, style={}, weight=1 }) => <div style={{height:weight, background:color, width:"100%", ...style}}/>;

// ─── Métrique : un bloc chiffre + label ───────────────────────────────────────
const Metric = ({ label, value, unit, align="left", size=44, color=T.text }) => (
  <div style={{textAlign:align, minWidth:0}}>
    <Label>{label}</Label>
    <div style={{display:"flex",alignItems:"baseline",gap:4,marginTop:8,justifyContent:align==="right"?"flex-end":"flex-start"}}>
      <span style={{fontFamily:FF_DISPLAY, fontSize:size, fontWeight:700, letterSpacing:"-0.03em", color, lineHeight:0.9, fontVariantNumeric:"tabular-nums"}}>{value}</span>
      {unit && <span style={{fontFamily:FF_MONO, fontSize:11, fontWeight:500, color:T.textMid, letterSpacing:"0.08em", textTransform:"uppercase"}}>{unit}</span>}
    </div>
  </div>
);

// ─── Bouton carré brutaliste ──────────────────────────────────────────────────
const Btn = ({ children, variant="primary", onClick, disabled, size="md", style={}, as="button", block=false, ...rest }) => {
  const sizes = { sm:{p:"9px 14px",f:10}, md:{p:"13px 20px",f:11}, lg:{p:"18px 26px",f:12} };
  const S = sizes[size];
  const base = {
    border:"none", fontFamily:FF_MONO, fontWeight:600, cursor:disabled?"not-allowed":"pointer",
    padding:S.p, fontSize:S.f, borderRadius:0, letterSpacing:"0.12em", textTransform:"uppercase",
    display:block?"flex":"inline-flex", alignItems:"center", justifyContent:"center", gap:10,
    transition:"background 0.12s, color 0.12s, border-color 0.12s, transform 0.06s",
    opacity:disabled?0.35:1, lineHeight:1, width:block?"100%":"auto", boxSizing:"border-box"
  };
  const variants = {
    primary: { background:T.text, color:T.bg },
    secondary: { background:"transparent", color:T.text, border:`1px solid ${T.hairlineMid}` },
    accent: { background:T.accent, color:T.text },
    ghost: { background:"transparent", color:T.textMid, border:`1px solid ${T.hairline}` },
    danger: { background:"transparent", color:T.danger, border:`1px solid ${T.danger}66` },
    tick: { background:T.text, color:T.bg, borderRadius:0 },
  };
  const Tag = as;
  return <Tag onClick={e=>{if(!disabled){haptic();onClick&&onClick(e);}}} disabled={disabled} style={{...base,...variants[variant],...style}} {...rest}>{children}</Tag>;
};

// ─── Input brutaliste ─────────────────────────────────────────────────────────
const Input = ({ style={}, ...rest }) => (
  <input {...rest} style={{
    background: T.surface, border:`1px solid ${T.hairlineMid}`,
    padding:"14px 10px", color:T.text, fontSize:18, fontFamily:FF_MONO, fontWeight:600,
    width:"100%", textAlign:"center", outline:"none", boxSizing:"border-box",
    fontVariantNumeric:"tabular-nums", letterSpacing:"0.02em", borderRadius:0,
    ...style
  }}/>
);

// ─── Section : bloc avec header catalogue ─────────────────────────────────────
const Section = ({ code, title, right, children, style={} }) => (
  <div style={{marginBottom:36, ...style}}>
    <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:18,gap:14}}>
      <div style={{display:"flex",alignItems:"center",gap:14,minWidth:0,flex:1}}>
        {code && <Label>{code}</Label>}
        {code && <Rule style={{flex:1,maxWidth:30}}/>}
        <Label color={T.text}>{title}</Label>
      </div>
      {right}
    </div>
    {children}
  </div>
);

// ─── Modal brutaliste plein écran ─────────────────────────────────────────────
const Modal = ({ open, onClose, children, title, code }) => {
  if (!open) return null;
  return (
    <div style={{position:"fixed",inset:0,background:T.bg,zIndex:2000,display:"flex",flexDirection:"column",animation:"fadeIn 0.18s"}}>
      <div style={{maxWidth:520,margin:"0 auto",padding:"20px 20px 40px",paddingTop:"calc(20px + env(safe-area-inset-top))",width:"100%",boxSizing:"border-box",flex:1,overflowY:"auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24,paddingTop:10}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            {code && <Label>{code}</Label>}
            {code && <Rule style={{width:24}}/>}
            <Label color={T.text}>{title}</Label>
          </div>
          <button onClick={onClose} style={{background:"transparent",border:"none",color:T.text,cursor:"pointer",padding:4,display:"flex"}}>
            <Ico d={IC.close} s={22}/>
          </button>
        </div>
        <Rule color={T.hairlineMid} style={{marginBottom:28}}/>
        {children}
      </div>
    </div>
  );
};

// ─── Barre de repos ───────────────────────────────────────────────────────────
function RestBar({ timer, onSkip, onAdd }) {
  if (!timer.active) return null;
  const pct = (timer.remaining / timer.duration) * 100;
  const urgent = timer.remaining <= 5 && timer.remaining > 0;
  const finished = timer.remaining === 0;
  return (
    <div style={{position:"fixed",top:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:520,zIndex:1000,background:T.bg,borderBottom:`1px solid ${(urgent||finished)?T.accent:T.hairlineMid}`,padding:"12px 20px 10px",paddingTop:"calc(12px + env(safe-area-inset-top))",boxSizing:"border-box"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
        <Label color={(urgent||finished)?T.accentBright:T.textMid}>
          {finished ? "REPOS · TERMINÉ" : urgent ? "REPOS · FIN" : "REPOS"}
        </Label>
        <div style={{display:"flex",gap:14}}>
          {!finished && <button onClick={onAdd} style={{background:"transparent",border:"none",color:T.textMid,cursor:"pointer",padding:0,fontFamily:FF_MONO,fontSize:10,fontWeight:600,letterSpacing:"0.12em",textTransform:"uppercase"}}>+30S</button>}
          <button onClick={onSkip} style={{background:"transparent",border:"none",color:finished?T.accentBright:T.textMid,cursor:"pointer",padding:0,fontFamily:FF_MONO,fontSize:10,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase"}}>
            {finished ? "FERMER" : "PASSER"}
          </button>
        </div>
      </div>
      <div style={{fontFamily:FF_DISPLAY,fontSize:(urgent||finished)?44:36,fontWeight:700,color:(urgent||finished)?T.accentBright:T.text,letterSpacing:"-0.03em",fontVariantNumeric:"tabular-nums",lineHeight:0.9,marginBottom:8,transition:"color 0.2s, font-size 0.2s",animation:finished?"pulse 1.4s ease-in-out infinite":"none"}}>
        {fmtClock(timer.remaining)}
      </div>
      <div style={{height:2,background:T.surface2,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,width:`${finished?100:pct}%`,background:(urgent||finished)?T.accent:T.text,transition:"width 1s linear"}}/>
      </div>
    </div>
  );
}
// ═══════════════════════════════════════════════════════════════════════════════
//  VIEWS — Accueil · Séance · Stats · Plus
// ═══════════════════════════════════════════════════════════════════════════════

// ─── ACCUEIL ──────────────────────────────────────────────────────────────────
function HomeView({ state, onStartSession, onSwitchProgram }) {
  const prog = PROGRAMS[state.activeProgramId];
  const totalSessions = state.sessions.length;
  const weekSessions = state.sessions.filter(s => Date.now() - s.date < 7*86400000).length;
  const totalVolumeKg = state.sessions.slice(-10).reduce((a,s) => a + (s.totalVolume||getTotalVolume(s)), 0);

  const suggestSessionKey = useMemo(() => {
    const counts = {};
    prog.sessions.forEach(s => counts[s.key] = 0);
    state.sessions.filter(s => s.programId === prog.id).forEach(s => { counts[s.sessionKey] = (counts[s.sessionKey]||0) + 1; });
    const lastDates = {};
    prog.sessions.forEach(s => { const last = getLastSession(state.sessions, prog.id, s.key); lastDates[s.key] = last ? last.date : 0; });
    const sorted = prog.sessions.slice().sort((a,b) => counts[a.key] - counts[b.key] || lastDates[a.key] - lastDates[b.key]);
    return sorted[0].key;
  }, [state.sessions, prog]);

  return (
    <div className="fade-in">
      {/* HERO massif : le titre de la journée */}
      <div style={{padding:"20px 0 36px",borderBottom:`1px solid ${T.hairlineMid}`,marginBottom:36}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
          <Label>INDEX · {pad3(totalSessions)}</Label>
          <Label>{new Date().toLocaleDateString("fr-FR",{day:"2-digit",month:"2-digit",year:"numeric"}).replace(/\//g,".")}</Label>
        </div>
        <Display size={52} weight={900} style={{marginBottom:6}}>PROCHAINE</Display>
        <Display size={52} weight={900} style={{color:T.accent}}>SÉANCE</Display>
      </div>

      {/* Programme actif — ligne simple */}
      <button onClick={onSwitchProgram} style={{width:"100%",background:"transparent",border:"none",padding:"0 0 28px",cursor:"pointer",textAlign:"left",marginBottom:8,display:"block"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:6}}>
          <Label>PROGRAMME ACTIF</Label>
          <Label color={T.textMid}>CHANGER →</Label>
        </div>
        <Display size={22} weight={700}>{prog.name}</Display>
        <Label style={{marginTop:8,display:"block"}} color={T.textDim}>{prog.subtitle}</Label>
      </button>
      <Rule color={T.hairlineMid} style={{marginBottom:40}}/>

      {/* SÉANCES */}
      <Section code="01" title="SESSIONS">
        {prog.sessions.map((sess, idx) => {
          const isActive = state.active?.programId===prog.id && state.active?.sessionKey===sess.key;
          const last = getLastSession(state.sessions, prog.id, sess.key);
          const suggested = sess.key === suggestSessionKey && !state.active;
          const count = state.sessions.filter(s=>s.programId===prog.id && s.sessionKey===sess.key).length;
          const neverDone = !last;

          // Le badge de statut : un vrai bouton orange visible
          let statusBadge = null;
          if (isActive) {
            statusBadge = (
              <span style={{display:"inline-flex",alignItems:"center",gap:6,background:T.accent,color:T.bg,padding:"6px 11px",fontFamily:FF_MONO,fontSize:10,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",borderRadius:0,lineHeight:1}}>
                <span style={{width:6,height:6,background:T.bg,borderRadius:"50%",display:"inline-block",animation:"pulse 1.4s ease-in-out infinite"}}/>
                EN COURS
              </span>
            );
          } else if (suggested) {
            statusBadge = (
              <span style={{display:"inline-flex",alignItems:"center",background:T.accent,color:T.bg,padding:"6px 11px",fontFamily:FF_MONO,fontSize:10,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",borderRadius:0,lineHeight:1}}>
                ▲ SUGGÉRÉE
              </span>
            );
          } else if (neverDone) {
            statusBadge = (
              <span style={{display:"inline-flex",alignItems:"center",background:"transparent",color:T.accent,border:`1px solid ${T.accent}`,padding:"5px 10px",fontFamily:FF_MONO,fontSize:10,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",borderRadius:0,lineHeight:1}}>
                NOUVEAU
              </span>
            );
          }

          return (
            <button key={sess.key}
              onClick={()=>!state.active && onStartSession(prog.id, sess.key)}
              disabled={!!state.active && !isActive}
              style={{width:"100%",background:"transparent",border:"none",padding:"26px 0",borderBottom:`1px solid ${T.hairline}`,cursor:(!state.active||isActive)?"pointer":"not-allowed",textAlign:"left",display:"block",position:"relative",opacity:(!!state.active&&!isActive)?0.35:1}}>
              <div style={{display:"flex",alignItems:"flex-start",gap:18}}>
                <div style={{flexShrink:0,minWidth:56}}>
                  <div style={{fontFamily:FF_MONO,fontSize:10,fontWeight:500,color:T.textDim,letterSpacing:"0.14em",marginBottom:10}}>{sess.code}</div>
                  <Display size={46} weight={900} style={{color:(suggested||isActive)?T.accent:T.text,letterSpacing:"-0.04em"}}>{sess.label}</Display>
                </div>
                <div style={{flex:1,minWidth:0,paddingTop:2}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10,marginBottom:12}}>
                    <Label color={T.text}>{sess.title}</Label>
                    {statusBadge || <Ico d={IC.arrowR} s={18} c={T.textMid}/>}
                  </div>
                  <div style={{fontFamily:FF_SANS,fontSize:11,color:T.textMid,lineHeight:1.5,letterSpacing:"0.03em",marginBottom:14}}>{sess.muscles}</div>
                  <div style={{display:"flex",gap:18,alignItems:"center"}}>
                    <span style={{fontFamily:FF_MONO,fontSize:9,fontWeight:500,color:T.textDim,letterSpacing:"0.12em",textTransform:"uppercase"}}>
                      {last ? `DERN. ${fmtAgo(last.date)}` : "—"}
                    </span>
                    <span style={{fontFamily:FF_MONO,fontSize:9,fontWeight:500,color:T.textDim,letterSpacing:"0.12em",textTransform:"uppercase"}}>
                      × {pad3(count)}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </Section>

      {/* MÉTRIQUES */}
      {totalSessions > 0 && (
        <Section code="02" title="PERFORMANCE">
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:0,border:`1px solid ${T.hairlineMid}`}}>
            <div style={{padding:"20px 16px",borderRight:`1px solid ${T.hairlineMid}`}}>
              <Metric label="TOTAL" value={pad3(totalSessions)} size={38}/>
            </div>
            <div style={{padding:"20px 16px",borderRight:`1px solid ${T.hairlineMid}`}}>
              <Metric label="7 JOURS" value={pad2(weekSessions)} size={38}/>
            </div>
            <div style={{padding:"20px 16px"}}>
              <Metric label="VOLUME · 10" value={(totalVolumeKg/1000).toFixed(1)} unit="TONS" size={38}/>
            </div>
          </div>
        </Section>
      )}
    </div>
  );
}

// ─── LIGNE DE SÉRIE ───────────────────────────────────────────────────────────
function SetRow({ idx, data, ex, suggestion, targetReps, onUpdate, onComplete }) {
  const done = data.done;
  const labelStyle = {fontFamily:FF_MONO,fontSize:11,color:T.textMid,letterSpacing:"0.14em",textTransform:"uppercase",fontWeight:600};

  return (
    <div style={{padding:"20px 0",borderBottom:`1px solid ${T.hairline}`,display:"flex",gap:16,alignItems:"stretch"}}>
      <div style={{fontFamily:FF_MONO,fontSize:12,fontWeight:600,color:T.text,letterSpacing:"0.12em",width:44,paddingTop:22,flexShrink:0}}>
        SET {pad2(idx+1)}
      </div>

      {ex.superset ? (
        <div style={{flex:1,display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
          <div>
            <div style={{...labelStyle,marginBottom:6}}>A · KG × REPS</div>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <Input placeholder="—" inputMode="decimal" value={data.weightA||""} onChange={e=>onUpdate({weightA:e.target.value})} disabled={done} style={{flex:1,textAlign:"center"}}/>
              <span style={{color:T.textMid,fontFamily:FF_MONO,fontSize:14,fontWeight:600}}>×</span>
              <Input placeholder="—" inputMode="numeric" value={data.repsA||""} onChange={e=>onUpdate({repsA:e.target.value})} disabled={done} style={{flex:1,textAlign:"center"}}/>
            </div>
            {suggestion?.wA>0 && !done && (
              <button onClick={()=>onUpdate({weightA:String(suggestion.wA)})} style={{background:"transparent",border:"none",cursor:"pointer",padding:"10px 0 0",textAlign:"left",display:"block"}}>
                <span style={{fontFamily:FF_MONO,fontSize:11,color:suggestion.upA?T.accent:T.textMid,letterSpacing:"0.08em",fontWeight:600}}>
                  {suggestion.upA?"▲ +2.5 → ":"○ "}{suggestion.wA}KG
                </span>
              </button>
            )}
          </div>
          <div>
            <div style={{...labelStyle,marginBottom:6}}>B · KG × REPS</div>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <Input placeholder="—" inputMode="decimal" value={data.weightB||""} onChange={e=>onUpdate({weightB:e.target.value})} disabled={done} style={{flex:1,textAlign:"center"}}/>
              <span style={{color:T.textMid,fontFamily:FF_MONO,fontSize:14,fontWeight:600}}>×</span>
              <Input placeholder="—" inputMode="numeric" value={data.repsB||""} onChange={e=>onUpdate({repsB:e.target.value})} disabled={done} style={{flex:1,textAlign:"center"}}/>
            </div>
            {suggestion?.wB>0 && !done && (
              <button onClick={()=>onUpdate({weightB:String(suggestion.wB)})} style={{background:"transparent",border:"none",cursor:"pointer",padding:"10px 0 0",textAlign:"left",display:"block"}}>
                <span style={{fontFamily:FF_MONO,fontSize:11,color:suggestion.upB?T.accent:T.textMid,letterSpacing:"0.08em",fontWeight:600}}>
                  {suggestion.upB?"▲ +2.5 → ":"○ "}{suggestion.wB}KG
                </span>
              </button>
            )}
          </div>
        </div>
      ) : (
        <div style={{flex:1}}>
          <div style={{...labelStyle,marginBottom:6}}>KG × REPS{targetReps?` · CIBLE ${targetReps}`:""}</div>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            <Input placeholder="—" inputMode="decimal" value={data.weight||""} onChange={e=>onUpdate({weight:e.target.value})} disabled={done} style={{flex:1,textAlign:"center"}}/>
            <span style={{color:T.textMid,fontFamily:FF_MONO,fontSize:16,fontWeight:600}}>×</span>
            <Input placeholder={targetReps||"—"} inputMode="numeric" value={data.reps||""} onChange={e=>onUpdate({reps:e.target.value})} disabled={done} style={{flex:1,textAlign:"center"}}/>
          </div>
          {suggestion?.w>0 && !done && (
            <button onClick={()=>onUpdate({weight:String(suggestion.w)})} style={{background:"transparent",border:"none",cursor:"pointer",padding:"10px 0 0",textAlign:"left",display:"block"}}>
              <span style={{fontFamily:FF_MONO,fontSize:11,color:suggestion.up?T.accent:T.textMid,letterSpacing:"0.08em",fontWeight:600}}>
                {suggestion.up?"▲ PROGRESSION +2.5 → ":"○ DERNIÈRE FOIS "}{suggestion.w}KG
              </span>
            </button>
          )}
        </div>
      )}

      <button
        onClick={()=>done ? onUpdate({done:false}) : onComplete(idx)}
        style={{
          width:54, height:54, border:`1px solid ${done?T.text:T.hairlineMid}`, background:done?T.text:"transparent",
          color:done?T.bg:T.text, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
          flexShrink:0, alignSelf:"center", padding:0, borderRadius:0, transition:"background 0.15s"
        }}>
        {done && <Ico d={IC.check} s={22} c={T.bg}/>}
      </button>
    </div>
  );
}

// ─── CARTE EXERCICE ───────────────────────────────────────────────────────────
function ExCard({ ex, exData, sessions, programId, sessionKey, session, onUpdate, onComplete, index, total }) {
  const [open, setOpen] = useState(true);
  const [tips, setTips] = useState(false);
  const sugg = getSuggestion(sessions, programId, sessionKey, ex);
  const lastMax = getLastMax(sessions, programId, sessionKey, ex.id, !!ex.superset);
  const allMax = getAllTimeMax(sessions, ex.id, !!ex.superset);
  const done = exData.sets.filter(s=>s.done).length;
  const allDone = done === exData.sets.length;

  let volLabel;
  if (ex.alternating && session?.hackReps) volLabel = `${ex.sets}×${session.hackReps} · ÉCHEC`;
  else if (ex.alternating) volLabel = `${ex.sets}×3-5 · ÉCHEC`;
  else volLabel = `${ex.sets}×${ex.min}-${ex.max}`;
  if (ex.degressive) volLabel += ` · DÉG×${ex.degressive}`;

  return (
    <div style={{borderBottom:`1px solid ${T.hairlineMid}`,marginBottom:0}}>
      <button onClick={()=>{haptic();setOpen(o=>!o);}} style={{width:"100%",background:"transparent",border:"none",padding:"22px 0 20px",cursor:"pointer",textAlign:"left",display:"block"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:14,marginBottom:10}}>
          <Label>{pad2(index+1)} / {pad2(total)}</Label>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <span style={{fontFamily:FF_MONO,fontSize:10,fontWeight:600,color:allDone?T.accent:T.text,letterSpacing:"0.12em",fontVariantNumeric:"tabular-nums"}}>
              {pad2(done)}/{pad2(exData.sets.length)}
            </span>
            <Ico d={open?IC.chevU:IC.chevD} s={14} c={T.textMid}/>
          </div>
        </div>

        {ex.superset ? (
          <div>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
              <Label color={T.accent}>SUPERSET</Label>
              <Rule style={{flex:1,maxWidth:30}} color={T.accent}/>
            </div>
            <Display size={22} weight={700} style={{marginBottom:4}}>{ex.nameA}</Display>
            <Display size={22} weight={700} style={{marginBottom:14}}>+ {ex.nameB}</Display>
          </div>
        ) : (
          <Display size={26} weight={700} style={{marginBottom:14}}>{ex.name}</Display>
        )}

        {/* BLOC MAX HISTORIQUE — très visible avec bordure orange */}
        {allMax ? (
          <div style={{borderLeft:`3px solid ${T.accent}`,paddingLeft:14,paddingTop:8,paddingBottom:8,marginBottom:14,background:T.surface}}>
            <Label color={T.accent} style={{display:"block",marginBottom:6}}>MAX HISTORIQUE</Label>
            {allMax.isSuperset ? (
              <div style={{display:"flex",gap:18,alignItems:"baseline",flexWrap:"wrap"}}>
                {allMax.wA > 0 && (
                  <span style={{fontFamily:FF_DISPLAY,fontSize:24,fontWeight:800,color:T.text,letterSpacing:"-0.02em",fontVariantNumeric:"tabular-nums",lineHeight:1}}>
                    A · {allMax.wA}<span style={{fontFamily:FF_MONO,fontSize:11,color:T.textMid,marginLeft:3,letterSpacing:"0.08em"}}>KG{allMax.repsA?`× ${allMax.repsA}`:""}</span>
                  </span>
                )}
                {allMax.wB > 0 && (
                  <span style={{fontFamily:FF_DISPLAY,fontSize:24,fontWeight:800,color:T.text,letterSpacing:"-0.02em",fontVariantNumeric:"tabular-nums",lineHeight:1}}>
                    B · {allMax.wB}<span style={{fontFamily:FF_MONO,fontSize:11,color:T.textMid,marginLeft:3,letterSpacing:"0.08em"}}>KG{allMax.repsB?`× ${allMax.repsB}`:""}</span>
                  </span>
                )}
              </div>
            ) : (
              <div style={{display:"flex",alignItems:"baseline",gap:8}}>
                <span style={{fontFamily:FF_DISPLAY,fontSize:32,fontWeight:800,color:T.text,letterSpacing:"-0.03em",fontVariantNumeric:"tabular-nums",lineHeight:1}}>
                  {allMax.w}<span style={{fontFamily:FF_MONO,fontSize:13,color:T.textMid,marginLeft:4,letterSpacing:"0.08em"}}>KG</span>
                </span>
                {allMax.reps > 0 && (
                  <span style={{fontFamily:FF_MONO,fontSize:13,color:T.textMid,letterSpacing:"0.08em",fontWeight:600}}>
                    × {allMax.reps} REPS
                  </span>
                )}
              </div>
            )}
          </div>
        ) : (
          <div style={{borderLeft:`3px solid ${T.hairlineMid}`,paddingLeft:14,paddingTop:8,paddingBottom:8,marginBottom:14,background:T.surface}}>
            <Label color={T.textDim} style={{display:"block",marginBottom:4}}>MAX HISTORIQUE</Label>
            <span style={{fontFamily:FF_DISPLAY,fontSize:18,fontWeight:700,color:T.textDim,letterSpacing:"-0.02em"}}>JAMAIS RÉALISÉ</span>
          </div>
        )}

        <div style={{display:"flex",gap:20,alignItems:"center",flexWrap:"wrap"}}>
          <Label color={T.textMid}>{volLabel}</Label>
          {lastMax && (
            <Label color={T.textDim}>
              DERN. SÉANCE · {lastMax.isSuperset?`${lastMax.wA||"—"}·${lastMax.wB||"—"}`:lastMax.w}KG
            </Label>
          )}
          {ex.special && <Label color={T.textDim}>{ex.special.toUpperCase()}</Label>}
        </div>
      </button>

      {open && (
        <div style={{padding:"0 0 24px"}}>
          <button onClick={e=>{e.stopPropagation();haptic();setTips(t=>!t);}} style={{background:"transparent",border:"none",padding:"0 0 18px",cursor:"pointer",display:"flex",alignItems:"center",gap:10}}>
            <Ico d={IC.info} s={13} c={T.textMid}/>
            <Label color={T.textMid}>{tips?"MASQUER TIPS":"TIPS TECHNIQUE"}</Label>
          </button>

          {tips && (
            <div style={{padding:"0 0 22px",borderLeft:`1px solid ${T.accent}`,paddingLeft:16,marginBottom:20}}>
              {ex.superset ? (
                <>
                  <Label style={{display:"block",marginBottom:10}} color={T.accent}>A · {ex.nameA.toUpperCase()}</Label>
                  {ex.tipsA.map((t,i)=>(
                    <p key={i} style={{fontFamily:FF_SANS,fontSize:12,color:T.textMid,lineHeight:1.6,marginBottom:6,letterSpacing:"0.01em"}}>— {t}</p>
                  ))}
                  <Label style={{display:"block",marginTop:16,marginBottom:10}} color={T.accent}>B · {ex.nameB.toUpperCase()}</Label>
                  {ex.tipsB.map((t,i)=>(
                    <p key={i} style={{fontFamily:FF_SANS,fontSize:12,color:T.textMid,lineHeight:1.6,marginBottom:6,letterSpacing:"0.01em"}}>— {t}</p>
                  ))}
                </>
              ) : (
                ex.tips.map((t,i)=>(
                  <p key={i} style={{fontFamily:FF_SANS,fontSize:12,color:T.textMid,lineHeight:1.6,marginBottom:6,letterSpacing:"0.01em"}}>— {t}</p>
                ))
              )}
            </div>
          )}

          {exData.sets.map((s,i) => (
            <SetRow key={i} idx={i} data={s} ex={ex} suggestion={sugg}
              targetReps={ex.alternating && session?.hackReps ? session.hackReps : ""}
              onUpdate={p => onUpdate(ex.id, i, p)}
              onComplete={() => onComplete(ex.id, i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── SÉANCE ───────────────────────────────────────────────────────────────────
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
      {/* HERO séance */}
      <div style={{padding:"8px 0 32px",borderBottom:`1px solid ${T.hairlineMid}`,marginBottom:28}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
          <Label color={T.accent}>● EN COURS · {sess.code}</Label>
          <Label>{prog.name}</Label>
        </div>

        <Display size={58} weight={900} style={{letterSpacing:"-0.04em",marginBottom:8}}>{sess.label}</Display>
        <Display size={18} weight={600} style={{color:T.textMid,marginBottom:20}}>{sess.title}</Display>

        <div style={{fontFamily:FF_SANS,fontSize:11,color:T.textMid,lineHeight:1.6,letterSpacing:"0.04em",marginBottom:26}}>{sess.muscles}</div>

        {/* Barre de progression */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:8}}>
          <Label>AVANCEMENT</Label>
          <span style={{fontFamily:FF_MONO,fontSize:13,fontWeight:600,color:T.text,letterSpacing:"0.06em",fontVariantNumeric:"tabular-nums"}}>
            {pad2(doneSets)}/{pad2(totalSets)} · {pct}%
          </span>
        </div>
        <div style={{height:2,background:T.surface2,position:"relative"}}>
          <div style={{position:"absolute",inset:0,width:`${pct}%`,background:T.accent,transition:"width 0.6s cubic-bezier(0.16,1,0.3,1)"}}/>
        </div>
      </div>

      {/* Interrompre — vrai bouton bordé */}
      <button onClick={()=>setStopModal(true)} style={{
        width:"100%", background:"transparent", border:`1px solid ${T.danger}55`,
        padding:"14px 20px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:12,
        marginBottom:32, borderRadius:0, transition:"background 0.15s, border-color 0.15s",
        fontFamily:FF_MONO, fontSize:11, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase",
        color:T.danger
      }}>
        <Ico d={IC.close} s={14} c={T.danger}/>
        INTERROMPRE LA SÉANCE
      </button>

      {/* EXERCICES */}
      <Section code="EX" title={`EXERCICES · ${pad2(sess.exercises.length)}`}>
        {sess.exercises.map((ex, idx) => (
          <ExCard key={ex.id} ex={ex} exData={session.exercises[ex.id]}
            sessions={sessions} programId={session.programId} sessionKey={session.sessionKey} session={session}
            onUpdate={updateSet} onComplete={completeSet}
            index={idx} total={sess.exercises.length}
          />
        ))}
      </Section>

      {/* Terminer */}
      <Btn variant={allDone?"accent":"secondary"} onClick={()=>allDone && setEndModal(true)} disabled={!allDone} size="lg" block style={{marginTop:20,marginBottom:60}}>
        {allDone ? "TERMINER LA SÉANCE" : `${pad2(doneSets)}/${pad2(totalSets)} SÉRIES`}
      </Btn>

      {/* Modal fin */}
      <Modal open={endModal} onClose={()=>setEndModal(false)} code="FIN" title="BILAN DE SÉANCE">
        <Display size={32} weight={800} style={{marginBottom:30}}>INTENSITÉ RESSENTIE</Display>
        <Label style={{display:"block",marginBottom:16}}>RPE · 01 (FACILE) → 05 (ÉCHEC)</Label>

        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:8,marginBottom:36,border:`1px solid ${T.hairlineMid}`}}>
          {[1,2,3,4,5].map(n => {
            const active = session.rpe === n;
            return (
              <button key={n} onClick={()=>{haptic();onUpdate({...session,rpe:n});}}
                style={{background:active?T.text:"transparent",border:"none",borderRight:n<5?`1px solid ${T.hairlineMid}`:"none",padding:"18px 0",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:8,transition:"background 0.15s"}}>
                <span style={{fontFamily:FF_DISPLAY,fontSize:26,fontWeight:800,color:active?T.bg:T.text,letterSpacing:"-0.02em",lineHeight:1}}>{pad2(n)}</span>
                <span style={{fontFamily:FF_MONO,fontSize:8,fontWeight:500,color:active?T.bg:T.textDim,letterSpacing:"0.12em",textTransform:"uppercase"}}>
                  {["FACILE","STABLE","MOYEN","DIFFICILE","ÉCHEC"][n-1]}
                </span>
              </button>
            );
          })}
        </div>

        <Label style={{display:"block",marginBottom:10}}>NOTES DE SÉANCE</Label>
        <textarea placeholder="PR, douleurs, observations…" value={session.notes||""} onChange={e=>onUpdate({...session,notes:e.target.value})}
          style={{width:"100%",background:"transparent",border:`1px solid ${T.hairlineMid}`,padding:14,color:T.text,fontSize:13,fontFamily:FF_SANS,resize:"none",height:100,outline:"none",marginBottom:30,boxSizing:"border-box",borderRadius:0,letterSpacing:"0.01em",lineHeight:1.5}}/>

        <div style={{display:"grid",gridTemplateColumns:"1fr 2fr",gap:12}}>
          <Btn variant="ghost" onClick={()=>setEndModal(false)}>ANNULER</Btn>
          <Btn variant="accent" onClick={()=>{setEndModal(false);onFinish(session);}}>SAUVEGARDER</Btn>
        </div>
      </Modal>

      <Modal open={stopModal} onClose={()=>setStopModal(false)} code="STOP" title="CONFIRMATION">
        <Display size={32} weight={800} style={{color:T.danger,marginBottom:16}}>INTERROMPRE ?</Display>
        <p style={{fontFamily:FF_SANS,fontSize:13,color:T.textMid,lineHeight:1.6,marginBottom:36,letterSpacing:"0.01em"}}>
          Toutes les données saisies dans cette séance seront effacées. Cette action est irréversible.
        </p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <Btn variant="ghost" onClick={()=>setStopModal(false)}>ANNULER</Btn>
          <Btn variant="danger" onClick={()=>{setStopModal(false);onAbandon();}}>INTERROMPRE</Btn>
        </div>
      </Modal>
    </div>
  );
}

// ─── STATS ───────────────────────────────────────────────────────────────────
function StatsView({ state }) {
  const [tab, setTab] = useState("hist");
  const sorted = [...state.sessions].sort((a,b)=>b.date-a.date);

  return (
    <div className="fade-in">
      <div style={{padding:"20px 0 32px",borderBottom:`1px solid ${T.hairlineMid}`,marginBottom:36}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
          <Label>ARCHIVE · {pad3(sorted.length)}</Label>
          <Label>{sorted.length>0?fmtAgo(sorted[0].date):"—"}</Label>
        </div>
        <Display size={52} weight={900} style={{marginBottom:6}}>PROGRES-</Display>
        <Display size={52} weight={900}>SION</Display>
      </div>

      {/* Tabs brutalistes */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",border:`1px solid ${T.hairlineMid}`,marginBottom:32}}>
        {[{id:"hist",l:"HISTORIQUE"},{id:"pr",l:"RECORDS"},{id:"chart",l:"COURBES"}].map((t,i)=>(
          <button key={t.id} onClick={()=>{haptic();setTab(t.id);}}
            style={{padding:"14px 0",border:"none",borderRight:i<2?`1px solid ${T.hairlineMid}`:"none",background:tab===t.id?T.text:"transparent",color:tab===t.id?T.bg:T.textMid,fontFamily:FF_MONO,fontSize:10,fontWeight:600,cursor:"pointer",letterSpacing:"0.14em",textTransform:"uppercase",transition:"background 0.15s"}}>
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
  const RPE_LABELS = ["—","FACILE","STABLE","MOYEN","DIFFICILE","ÉCHEC"];
  if (!sessions.length) return (
    <div style={{padding:"80px 0",textAlign:"center",borderTop:`1px solid ${T.hairline}`,borderBottom:`1px solid ${T.hairline}`}}>
      <Label style={{display:"block",marginBottom:12}} color={T.textDim}>AUCUNE ENTRÉE</Label>
      <p style={{fontFamily:FF_SANS,fontSize:12,color:T.textDim,letterSpacing:"0.02em"}}>Termine une séance pour commencer l'archive.</p>
    </div>
  );
  return (
    <div>
      {sessions.map((s, idx) => {
        const p = PROGRAMS[s.programId];
        const sess = p?.sessions.find(x => x.key === s.sessionKey);
        if (!sess) return null;
        return (
          <div key={s.id} style={{padding:"20px 0",borderBottom:`1px solid ${T.hairline}`,display:"flex",gap:18,alignItems:"flex-start"}}>
            <div style={{flexShrink:0,minWidth:60}}>
              <Label style={{display:"block",marginBottom:6}} color={T.textDim}>№ {pad3(sessions.length-idx)}</Label>
              <Display size={24} weight={800}>{sess.label}</Display>
            </div>
            <div style={{flex:1,minWidth:0,paddingTop:2}}>
              <div style={{fontFamily:FF_SANS,fontSize:13,fontWeight:600,color:T.text,letterSpacing:"0.01em",marginBottom:6}}>{sess.title}</div>
              <div style={{display:"flex",gap:14,flexWrap:"wrap",marginBottom:s.notes?10:0}}>
                <Label color={T.textMid}>{fmtDateLong(s.date)}</Label>
                {s.duration && <Label color={T.textMid}>{fmtDur(s.duration)}</Label>}
                {s.rpe > 0 && <Label color={T.accent}>RPE {pad2(s.rpe)} · {RPE_LABELS[s.rpe]}</Label>}
              </div>
              {s.notes && <p style={{fontFamily:FF_SANS,fontSize:12,color:T.textDim,fontStyle:"italic",lineHeight:1.5,letterSpacing:"0.01em",marginTop:8}}>« {s.notes} »</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function StatsPR({ state }) {
  const allExercises = useMemo(() => {
    const m = new Map();
    Object.values(PROGRAMS).forEach(prog => {
      prog.sessions.forEach(sess => {
        sess.exercises.forEach(ex => {
          if (!m.has(ex.id)) m.set(ex.id, ex);
        });
      });
    });
    return Array.from(m.values());
  }, []);

  const prs = allExercises.map(ex => {
    if (ex.superset) {
      const prA = getPR(state.sessions, ex.id, true, "A");
      const prB = getPR(state.sessions, ex.id, true, "B");
      return { ex, prA, prB, isSuperset: true };
    }
    return { ex, pr: getPR(state.sessions, ex.id, false) };
  }).filter(p => p.isSuperset ? (p.prA.weight>0 || p.prB.weight>0) : p.pr.weight>0)
    .sort((a,b) => {
      const va = a.isSuperset ? Math.max(a.prA.e1rm, a.prB.e1rm) : a.pr.e1rm;
      const vb = b.isSuperset ? Math.max(b.prA.e1rm, b.prB.e1rm) : b.pr.e1rm;
      return vb - va;
    });

  if (!prs.length) return (
    <div style={{padding:"80px 0",textAlign:"center",borderTop:`1px solid ${T.hairline}`,borderBottom:`1px solid ${T.hairline}`}}>
      <Label style={{display:"block",marginBottom:12}} color={T.textDim}>AUCUN RECORD</Label>
      <p style={{fontFamily:FF_SANS,fontSize:12,color:T.textDim,letterSpacing:"0.02em"}}>Les records apparaîtront au fil des séances.</p>
    </div>
  );

  return (
    <div>
      {prs.map(({ ex, pr, prA, prB, isSuperset }, idx) => (
        <div key={ex.id} style={{padding:"20px 0",borderBottom:`1px solid ${T.hairline}`,display:"flex",gap:18,alignItems:"flex-start"}}>
          <Label style={{flexShrink:0,minWidth:32,paddingTop:4}} color={T.textDim}>№{pad2(idx+1)}</Label>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontFamily:FF_SANS,fontSize:14,fontWeight:600,color:T.text,letterSpacing:"0.01em",marginBottom:6,lineHeight:1.3}}>
              {isSuperset ? `${ex.nameA} / ${ex.nameB}` : ex.name}
            </div>
            <Label color={T.textDim}>{isSuperset?"SUPERSET":`${ex.sets||"—"}×${ex.min||"?"}-${ex.max||"?"}`}</Label>
          </div>
          <div style={{textAlign:"right",flexShrink:0}}>
            {isSuperset ? (
              <div>
                {prA.weight>0 && <div style={{fontFamily:FF_DISPLAY,fontSize:16,fontWeight:700,color:T.text,letterSpacing:"-0.02em",fontVariantNumeric:"tabular-nums"}}>A · {prA.weight}<span style={{fontFamily:FF_MONO,fontSize:9,color:T.textMid,marginLeft:3,letterSpacing:"0.1em"}}>KG</span></div>}
                {prB.weight>0 && <div style={{fontFamily:FF_DISPLAY,fontSize:16,fontWeight:700,color:T.text,letterSpacing:"-0.02em",fontVariantNumeric:"tabular-nums",marginTop:2}}>B · {prB.weight}<span style={{fontFamily:FF_MONO,fontSize:9,color:T.textMid,marginLeft:3,letterSpacing:"0.1em"}}>KG</span></div>}
              </div>
            ) : (
              <>
                <Display size={28} weight={800} style={{letterSpacing:"-0.03em",lineHeight:1,fontVariantNumeric:"tabular-nums"}}>{pr.weight}<span style={{fontFamily:FF_MONO,fontSize:11,fontWeight:500,color:T.textMid,marginLeft:4,letterSpacing:"0.1em"}}>KG</span></Display>
                <Label style={{marginTop:6,display:"block"}} color={T.textDim}>1RM EST. {pr.e1rm}</Label>
              </>
            )}
          </div>
        </div>
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
      <Label style={{display:"block",marginBottom:12}}>PROGRAMME</Label>
      <div style={{display:"flex",gap:0,marginBottom:28,border:`1px solid ${T.hairlineMid}`}}>
        {Object.values(PROGRAMS).map((p,i) => (
          <button key={p.id} onClick={()=>{setProgId(p.id);setExId(null);}}
            style={{flex:1,padding:"12px 8px",border:"none",borderRight:i<Object.values(PROGRAMS).length-1?`1px solid ${T.hairlineMid}`:"none",background:progId===p.id?T.text:"transparent",color:progId===p.id?T.bg:T.textMid,fontFamily:FF_MONO,fontSize:9,fontWeight:600,cursor:"pointer",letterSpacing:"0.12em",textTransform:"uppercase",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>
            {p.name}
          </button>
        ))}
      </div>

      <Label style={{display:"block",marginBottom:12}}>EXERCICE</Label>
      <div style={{borderTop:`1px solid ${T.hairline}`,marginBottom:28}}>
        {allEx.map(({ ex: e, sess }) => (
          <button key={e.id+sess.key} onClick={()=>{haptic();setExId(e.id);}}
            style={{width:"100%",padding:"14px 0",background:"transparent",border:"none",borderBottom:`1px solid ${T.hairline}`,cursor:"pointer",textAlign:"left",display:"flex",justifyContent:"space-between",alignItems:"center",gap:12}}>
            <span style={{fontFamily:FF_SANS,fontSize:13,fontWeight:exId===e.id?600:500,color:exId===e.id?T.text:T.textMid,letterSpacing:"0.01em"}}>
              {e.superset ? `${e.nameA} / ${e.nameB}` : e.name}
            </span>
            <div style={{display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
              <Label color={exId===e.id?T.accent:T.textDim}>{sess.label}</Label>
              {exId===e.id && <Ico d={IC.arrowR} s={14} c={T.accent}/>}
            </div>
          </button>
        ))}
      </div>

      {ex && (
        <div style={{padding:"22px 0",borderTop:`1px solid ${T.hairlineMid}`,borderBottom:`1px solid ${T.hairlineMid}`}}>
          <Label style={{display:"block",marginBottom:4}}>COURBE · CHARGE MAX</Label>
          <Display size={20} weight={700} style={{marginBottom:22}}>{ex.ex.superset ? `${ex.ex.nameA} / ${ex.ex.nameB}` : ex.ex.name}</Display>

          {chartData.length >= 2 ? (
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={chartData} margin={{top:10,right:10,left:-20,bottom:5}}>
                <XAxis dataKey="date" tick={{fontSize:9,fill:T.textDim,fontFamily:"'JetBrains Mono', monospace",letterSpacing:"0.08em"}} axisLine={{stroke:T.hairline}} tickLine={false}/>
                <YAxis tick={{fontSize:9,fill:T.textDim,fontFamily:"'JetBrains Mono', monospace",letterSpacing:"0.08em"}} axisLine={false} tickLine={false} domain={["auto","auto"]}/>
                <Tooltip contentStyle={{background:T.bg,border:`1px solid ${T.hairlineMid}`,borderRadius:0,fontSize:11,fontFamily:"'JetBrains Mono', monospace",letterSpacing:"0.08em"}} labelStyle={{color:T.textMid,textTransform:"uppercase"}} itemStyle={{color:T.accent}}/>
                <Line type="linear" dataKey="kg" stroke={T.accent} strokeWidth={1.5} dot={{fill:T.bg,stroke:T.accent,strokeWidth:1.5,r:3}} activeDot={{r:5,strokeWidth:2,fill:T.accent,stroke:T.bg}}/>
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div style={{padding:"40px 0",textAlign:"center"}}>
              <Label color={T.textDim}>AU MOINS 2 SÉANCES REQUISES</Label>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── PLUS ────────────────────────────────────────────────────────────────────
function MoreView({ state, setState }) {
  const [resetModal, setResetModal] = useState(false);
  const fileInputRef = useRef(null);

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `upgrade-backup-${new Date().toISOString().slice(0,10)}.json`;
    a.click(); URL.revokeObjectURL(url); haptic();
  };

  const handleImport = (e) => {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const data = JSON.parse(ev.target.result);
        if (data.sessions !== undefined) {
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

  const Row = ({ code, label, value, onClick, danger, last }) => (
    <button onClick={onClick} style={{width:"100%",background:"transparent",border:"none",padding:"20px 0",borderBottom:last?"none":`1px solid ${T.hairline}`,cursor:"pointer",textAlign:"left",display:"flex",justifyContent:"space-between",alignItems:"center",gap:12}}>
      <div style={{display:"flex",alignItems:"center",gap:16,minWidth:0,flex:1}}>
        <Label color={T.textDim}>{code}</Label>
        <span style={{fontFamily:FF_SANS,fontSize:14,fontWeight:500,color:danger?T.danger:T.text,letterSpacing:"0.01em"}}>{label}</span>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
        {value && <Label color={T.textMid}>{value}</Label>}
        {onClick && <Ico d={IC.arrowR} s={14} c={danger?T.danger:T.textMid}/>}
      </div>
    </button>
  );

  return (
    <div className="fade-in">
      <div style={{padding:"20px 0 32px",borderBottom:`1px solid ${T.hairlineMid}`,marginBottom:36}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
          <Label>SYSTÈME</Label>
          <Label>v2.0</Label>
        </div>
        <Display size={52} weight={900} style={{marginBottom:6}}>RÉGLAGES</Display>
      </div>

      {/* Stats globales */}
      <Section code="00" title="CUMUL">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",border:`1px solid ${T.hairlineMid}`}}>
          <div style={{padding:"24px 18px",borderRight:`1px solid ${T.hairlineMid}`}}>
            <Metric label="SÉANCES TOTALES" value={pad3(totalSessions)} size={44}/>
          </div>
          <div style={{padding:"24px 18px"}}>
            <Metric label="VOLUME SOULEVÉ" value={(totalVolume/1000).toFixed(1)} unit="TONS" size={44}/>
          </div>
        </div>
      </Section>

      {/* Préférences */}
      <Section code="01" title="PRÉFÉRENCES">
        <div style={{borderTop:`1px solid ${T.hairlineMid}`}}>
          <div style={{padding:"18px 0",borderBottom:`1px solid ${T.hairline}`,display:"flex",justifyContent:"space-between",alignItems:"center",gap:12}}>
            <div style={{display:"flex",alignItems:"center",gap:16}}>
              <Label color={T.textDim}>REP.</Label>
              <span style={{fontFamily:FF_SANS,fontSize:14,fontWeight:500,color:T.text,letterSpacing:"0.01em"}}>Temps de repos par défaut</span>
            </div>
            <select value={state.prefs.restDefault} onChange={e=>{haptic();setState(st=>({...st,prefs:{...st.prefs,restDefault:parseInt(e.target.value)}}));}}
              style={{background:"transparent",color:T.text,border:`1px solid ${T.hairlineMid}`,padding:"8px 12px",fontFamily:FF_MONO,fontSize:11,fontWeight:600,cursor:"pointer",borderRadius:0,letterSpacing:"0.08em"}}>
              {[60,75,90,120,150,180].map(s=><option key={s} value={s} style={{background:T.bg}}>{s<60?s+"S":Math.floor(s/60)+"M"+(s%60?s%60:"")}</option>)}
            </select>
          </div>
          <div style={{padding:"18px 0",display:"flex",justifyContent:"space-between",alignItems:"center",gap:12}}>
            <div style={{display:"flex",alignItems:"center",gap:16}}>
              <Label color={T.textDim}>UN.</Label>
              <span style={{fontFamily:FF_SANS,fontSize:14,fontWeight:500,color:T.text,letterSpacing:"0.01em"}}>Unité de poids</span>
            </div>
            <Label color={T.textMid}>KG</Label>
          </div>
        </div>
      </Section>

      {/* Données */}
      <Section code="02" title="DONNÉES">
        <div style={{borderTop:`1px solid ${T.hairlineMid}`}}>
          <Row code="EXP" label="Exporter un backup JSON" value="TÉLÉCHARGER" onClick={handleExport}/>
          <input type="file" accept=".json" ref={fileInputRef} onChange={handleImport} style={{display:"none"}}/>
          <Row code="IMP" label="Importer un backup JSON" value="CHOISIR" onClick={()=>fileInputRef.current?.click()}/>
          <Row code="DEL" label="Effacer toutes les données" value="RESET" onClick={()=>setResetModal(true)} danger last/>
        </div>
      </Section>

      {/* À venir */}
      <Section code="03" title="ROADMAP">
        <div style={{padding:"20px 18px",border:`1px solid ${T.hairlineMid}`,borderLeftWidth:3,borderLeftColor:T.accent}}>
          <Label style={{display:"block",marginBottom:12}}>v2.1 · EN DÉVELOPPEMENT</Label>
          <p style={{fontFamily:FF_SANS,fontSize:12,color:T.textMid,lineHeight:1.7,letterSpacing:"0.01em"}}>
            Éditeur de programme personnalisé. Bibliothèque d'exercices autonome. Volume par groupe musculaire. Streaks hebdomadaires.
          </p>
        </div>
      </Section>

      {/* Colophon */}
      <div style={{padding:"32px 0 40px",borderTop:`1px solid ${T.hairlineMid}`}}>
        <Label style={{display:"block",marginBottom:12}} color={T.textDim}>COLOPHON</Label>
        <p style={{fontFamily:FF_SANS,fontSize:11,color:T.textDim,lineHeight:1.6,letterSpacing:"0.02em"}}>
          UpGrade v2.0 · Tracker personnel, 100% local. Toutes tes données restent sur ton appareil. Pense à exporter régulièrement un backup.
        </p>
      </div>

      <Modal open={resetModal} onClose={()=>setResetModal(false)} code="DEL" title="EFFACEMENT DÉFINITIF">
        <Display size={32} weight={800} style={{color:T.danger,marginBottom:16}}>TOUT EFFACER ?</Display>
        <p style={{fontFamily:FF_SANS,fontSize:13,color:T.textMid,lineHeight:1.6,marginBottom:36,letterSpacing:"0.01em"}}>
          Toutes tes séances, records, réglages et la séance en cours seront définitivement supprimés. Cette action est irréversible. Pense à exporter un backup avant.
        </p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <Btn variant="ghost" onClick={()=>setResetModal(false)}>ANNULER</Btn>
          <Btn variant="danger" onClick={()=>{setState(initialState());setResetModal(false);}}>EFFACER</Btn>
        </div>
      </Modal>
    </div>
  );
}

// ─── SÉLECTEUR DE PROGRAMME ──────────────────────────────────────────────────
function ProgramPicker({ currentId, onPick, onClose }) {
  return (
    <Modal open={true} onClose={onClose} code="PROG" title="SÉLECTION DE PROGRAMME">
      <Display size={36} weight={800} style={{marginBottom:8}}>PROGRAMMES</Display>
      <p style={{fontFamily:FF_SANS,fontSize:12,color:T.textMid,lineHeight:1.6,marginBottom:32,letterSpacing:"0.01em"}}>
        Ton historique et tes records sont toujours préservés.
      </p>
      <div style={{borderTop:`1px solid ${T.hairlineMid}`}}>
        {Object.values(PROGRAMS).map(p => (
          <button key={p.id} onClick={()=>{haptic();onPick(p.id);}}
            style={{width:"100%",background:"transparent",border:"none",padding:"24px 0",borderBottom:`1px solid ${T.hairline}`,cursor:"pointer",textAlign:"left",display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:14}}>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
                <Display size={20} weight={800}>{p.name}</Display>
                {currentId===p.id && <Label color={T.accent}>● ACTIF</Label>}
              </div>
              <Label style={{display:"block",marginBottom:10}} color={T.textMid}>{p.subtitle}</Label>
              <p style={{fontFamily:FF_SANS,fontSize:12,color:T.textDim,lineHeight:1.5,letterSpacing:"0.01em"}}>{p.description}</p>
            </div>
            <Ico d={IC.arrowR} s={16} c={currentId===p.id?T.accent:T.textMid}/>
          </button>
        ))}
      </div>
    </Modal>
  );
}
// ═══════════════════════════════════════════════════════════════════════════════
//  MAIN APP — orchestration, navigation, styles globaux
// ═══════════════════════════════════════════════════════════════════════════════

export default function App() {
  const [state, setStateRaw] = useState(() => {
    const loaded = load();
    if (!loaded) return initialState();
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

  const startRest = useCallback(() => {
    const dur = state.prefs.restDefault || REST_DEFAULT;
    setTimer({ active:true, remaining:dur, duration:dur });
  }, [state.prefs.restDefault]);

  useEffect(() => {
    // Si pas actif → nettoyer
    if (!timer.active) { if (timerIntervalRef.current) { clearInterval(timerIntervalRef.current); timerIntervalRef.current = null; } return; }
    // Si déjà à 0, on n'ajoute pas d'interval (le chrono reste figé à 00:00)
    if (timer.remaining <= 0) { if (timerIntervalRef.current) { clearInterval(timerIntervalRef.current); timerIntervalRef.current = null; } return; }
    timerIntervalRef.current = setInterval(() => {
      setTimer(t => {
        const r = t.remaining - 1;
        if (r <= 5 && r > 0) playTick();
        if (r <= 0) {
          playBeep();
          clearInterval(timerIntervalRef.current);
          timerIntervalRef.current = null;
          // active reste à TRUE → la barre reste affichée à 00:00
          return { active: true, remaining: 0, duration: t.duration };
        }
        return { ...t, remaining:r };
      });
    }, 1000);
    return () => { if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); };
  }, [timer.active, timer.remaining]);

  const skipRest = () => setTimer({ active:false, remaining:0, duration:0 });
  const addTime = () => setTimer(t => ({ ...t, remaining: t.remaining + 30, duration: t.duration + 30 }));

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

  useEffect(() => { if (state.active && tab !== "session") setTab("session"); }, [state.active]);

  const NAV = [
    { id:"home", l:"ACCUEIL", code:"00", icon:IC.nav_home },
    { id:"session", l:"SÉANCE", code:"01", icon:IC.nav_train },
    { id:"stats", l:"STATS", code:"02", icon:IC.nav_stats },
    { id:"more", l:"PLUS", code:"03", icon:IC.nav_more },
  ];

  return (
    <>
      <GlobalStyles/>
      <div style={{minHeight:"100vh",background:T.bg,position:"relative"}}>
        <RestBar timer={timer} onSkip={skipRest} onAdd={addTime}/>

        <div style={{maxWidth:520,margin:"0 auto",padding:"16px 20px 120px",paddingTop:timer.active?"calc(110px + env(safe-area-inset-top))":"calc(16px + env(safe-area-inset-top))",position:"relative",zIndex:1,transition:"padding-top 0.3s"}}>
          {/* Header wordmark */}
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8,paddingTop:10}}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <div style={{width:24,height:24,background:T.text,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <span style={{fontFamily:FF_DISPLAY,fontSize:13,fontWeight:900,color:T.bg,letterSpacing:"-0.04em",lineHeight:1}}>U</span>
              </div>
              <span style={{fontFamily:FF_DISPLAY,fontSize:13,fontWeight:800,color:T.text,letterSpacing:"0.24em"}}>UPGRADE</span>
            </div>
            <Label color={T.textDim}>EST · 2026</Label>
          </div>
          <Rule color={T.hairline} style={{marginBottom:8}}/>

          {tab === "home" && <HomeView state={state} onStartSession={handleStartSession} onSwitchProgram={()=>setProgPicker(true)}/>}
          {tab === "session" && (state.active
            ? <SessionView session={state.active} sessions={state.sessions} onUpdate={handleUpdateSession} onFinish={handleFinish} onAbandon={handleAbandon} onRest={startRest}/>
            : <NoSession onGoHome={()=>setTab("home")}/>
          )}
          {tab === "stats" && <StatsView state={state}/>}
          {tab === "more" && <MoreView state={state} setState={setState}/>}
        </div>

        {progPicker && <ProgramPicker currentId={state.activeProgramId} onPick={handleSwitchProgram} onClose={()=>setProgPicker(false)}/>}

        {/* Bottom nav brutaliste */}
        <nav style={{position:"fixed",bottom:0,left:0,right:0,background:T.bg,borderTop:`1px solid ${T.hairlineMid}`,paddingBottom:"env(safe-area-inset-bottom)",zIndex:900}}>
          <div style={{maxWidth:520,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(4,1fr)"}}>
            {NAV.map((n,i) => {
              const active = tab === n.id;
              return (
                <button key={n.id} onClick={()=>{haptic();setTab(n.id);}}
                  style={{background:active?T.text:"transparent",border:"none",borderRight:i<3?`1px solid ${T.hairlineMid}`:"none",padding:"14px 6px 12px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:6,color:active?T.bg:T.textMid,transition:"background 0.12s, color 0.12s",position:"relative",borderRadius:0}}>
                  <Ico d={n.icon} s={18} c={active?T.bg:T.textMid}/>
                  <span style={{fontFamily:FF_MONO,fontSize:8,fontWeight:600,letterSpacing:"0.16em"}}>{n.l}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
}

// ─── NO SESSION ──────────────────────────────────────────────────────────────
function NoSession({ onGoHome }) {
  return (
    <div className="fade-in" style={{padding:"80px 0"}}>
      <Label style={{display:"block",marginBottom:24}} color={T.textDim}>STATUT · INACTIVE</Label>
      <Display size={52} weight={900} style={{marginBottom:12}}>AUCUNE</Display>
      <Display size={52} weight={900} style={{marginBottom:28}}>SÉANCE</Display>
      <p style={{fontFamily:FF_SANS,fontSize:13,color:T.textMid,lineHeight:1.6,letterSpacing:"0.02em",marginBottom:36,maxWidth:340}}>
        Démarre une nouvelle séance depuis l'accueil pour commencer le suivi en temps réel.
      </p>
      <Btn variant="primary" onClick={onGoHome} size="lg">ALLER À L'ACCUEIL</Btn>
    </div>
  );
}

// ─── STYLES GLOBAUX ──────────────────────────────────────────────────────────
function GlobalStyles() {
  return (
    <style>{`
      @import url('${FONTS_URL}');
      *,*::before,*::after { box-sizing: border-box; }
      html { overflow-x: hidden; overscroll-behavior-x: none; width: 100%; max-width: 100vw; }
      html,body,#root { margin:0; padding:0; background:${T.bg}; color:${T.text}; font-family:${FF_SANS}; -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale; text-rendering:optimizeLegibility; }
      body { overscroll-behavior: none; overflow-x: hidden; width: 100%; max-width: 100vw; position: relative; }
      #root { overflow-x: hidden; width: 100%; max-width: 100vw; }
      input,textarea,button,select { font-family: inherit; color: inherit; max-width: 100%; }
      input:focus,textarea:focus,select:focus { border-color: ${T.accent} !important; outline: none; }
      button { font-family: inherit; -webkit-tap-highlight-color: transparent; }
      button:active:not(:disabled) { transform: scale(0.98); }
      input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
      input[type=number] { -moz-appearance: textfield; }
      input::placeholder, textarea::placeholder { color: ${T.textFaint}; }
      img, svg, video { max-width: 100%; height: auto; }
      @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.55; } }
      .fade-in { animation: fadeIn 0.32s cubic-bezier(0.16,1,0.3,1); }
      ::selection { background: ${T.accent}; color: ${T.bg}; }
      ::-webkit-scrollbar { width: 4px; height: 4px; }
      ::-webkit-scrollbar-thumb { background: ${T.surface3}; }
      ::-webkit-scrollbar-track { background: transparent; }
      select { appearance: none; -webkit-appearance: none; background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%238A8A85' stroke-width='1'><path d='M6 9l6 6 6-6'/></svg>"); background-repeat: no-repeat; background-position: right 6px center; padding-right: 26px !important; }
    `}</style>
  );
}
