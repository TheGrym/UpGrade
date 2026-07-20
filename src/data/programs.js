// programs.js — UpGrade · Programme UP/LOW/UP
// Rotation Bloc A/B automatique via blockManager.js (15 séances par bloc)
// Mise à jour : avant-bras 2x/sem, mollets renforcés, fentes, variantes complètes

export const PROGRAMS = {
  uplowup: {
    id: "uplowup",
    name: "UP / LOW / UP",
    subtitle: "HYPERTROPHIE · 3 SESSIONS",
    author: "JULIEN",
    description: "Split haut/bas/haut. Surcharge progressive. Rotation automatique Bloc A/B toutes les 5 semaines.",
    sessions: [

      // ═══════════════════════════════════════════════════════════════
      // UP A — Push dominant · Haut pec priorité · Core · Avant-bras
      // ═══════════════════════════════════════════════════════════════
      {
        id: "u1", key: "u1", label: "UP 1", code: "A-01",
        title: "UPPER BODY A", num: "01",
        muscles: "PEC (HAUT) · ÉPAULES · TRICEPS · BICEPS · DOS · AVANT-BRAS · MOLLETS",
        priority: "Commencer par DI Haltère — priorité haut pec quand tu es frais.",
        exercises: [

          {
            id: "di_halt", name: "DI Haltère",
            sets: 4, min: 8, max: 12,
            muscles: "Chef claviculaire pec · Deltoïde ant. · Triceps",
            placement: "Banc à 30° exactement. Coudes à 45-70° du buste.",
            tips: [
              "Banc à 30° — au-delà de 45° les épaules prennent le relais.",
              "Omoplates rétractées et abaissées, maintenues pendant toute la série.",
              "Descente en 3 secondes, cherche l'étirement maximal du haut du pec.",
              "Pense 'écraser avec le haut du pec', pas 'pousser avec les épaules'.",
            ],
          },

          {
            id: "dc_halt", name: "DC Haltère",
            sets: 3, min: 6, max: 10,
            muscles: "Chef sternal pec · Deltoïde ant. · Triceps",
            placement: "Banc plat. Omoplates rétractées avant de saisir.",
            tips: [
              "Omoplates rétractées et verrouillées — ne les relâche pas.",
              "Descente contrôlée en 3 temps, coudes à 45° du buste.",
              "Étirement maximal en bas, pause 1 seconde avant de pousser.",
            ],
          },

          {
            id: "ecarte_incline", name: "Écarté Poulie Incliné",
            sets: 2, min: 10, max: 15,
            muscles: "Chef claviculaire pec · Isolation haut pec",
            placement: "Câbles positionnés BAS (hanches). Mains qui montent vers le haut.",
            tips: [
              "Câbles bas = trajectoire du faisceau claviculaire = isolation haut pec.",
              "Bras légèrement fléchis, verrouillés. Charge légère — l'étirement prime.",
              "Descente en 4 secondes. Contraction 1 seconde en haut.",
            ],
            variant: {
              name: "Écarté Haltère Incliné",
              muscles: "Chef claviculaire pec · Isolation (courbe de tension différente)",
              placement: "Banc incliné 30°. Haltères légers. Amplitude maximale en bas.",
              tips: [
                "Amplitude maximale en bas — plus d'étirement qu'avec les câbles.",
                "Charge légère : l'étirement et la contraction priment sur le poids.",
                "Pince les pectoraux en haut — tiens 1 seconde.",
              ],
            },
          },

          {
            id: "curl_ss_u1", superset: true,
            nameA: "Curl Marteau Poulie", nameB: "Curl Incliné Haltère",
            sets: 3, min: 8, max: 12,
            musclesA: "Brachial · Brachioradial · Biceps",
            musclesB: "Biceps longue portion — étirement maximal",
            placementA: "Poulie basse. Coudes fixes contre le corps. Poignet neutre.",
            placementB: "Banc 45-60°. Coudes fixes, ne les avance pas en montant.",
            tipsA: [
              "Coudes parfaitement fixes, poignet neutre tout au long.",
              "Descente excentrique en 3-4 secondes.",
            ],
            tipsB: [
              "L'inclinaison = étirement complet du biceps dès le bas.",
              "Enchaîne directement après le curl marteau, sans repos.",
            ],
            variant: {
              nameA: "Curl Barre EZ",
              nameB: "Curl Concentré",
              min: 10, max: 15,
              musclesA: "Biceps brachial (chef long + court) · Brachial",
              musclesB: "Biceps — isolation maximale, contraction de pointe",
              placementA: "Barre EZ, prise intermédiaire. Coudes absolument fixes.",
              placementB: "Assis, coude contre la face interne de la cuisse.",
              tipsA: [
                "Prise EZ réduit le stress sur les poignets vs barre droite.",
                "Coudes ABSOLUMENT fixes. Ne balance pas le dos.",
              ],
              tipsB: [
                "Montée complète, contraction maximale — tiens 1 seconde.",
                "Descente contrôlée. Enchaîne directement.",
              ],
            },
          },

          {
            id: "epaules_ss_u1", superset: true,
            nameA: "Tirage Menton 2 Temps", nameB: "Élévation Latérale",
            sets: 3, min: 8, max: 12,
            musclesA: "Deltoïde ant. · Trapèze sup. · Biceps",
            musclesB: "Deltoïde moyen · Supra-épineux",
            placementA: "Poulie haute, prise large. Coudes AU-DESSUS des mains à tout moment.",
            placementB: "Légère inclinaison avant du buste (15°). Pouce légèrement vers le bas.",
            tipsA: [
              "1er temps : coudes à hauteur d'épaule. 2e temps : mains au menton.",
              "Coudes TOUJOURS au-dessus des mains — sinon impingement coiffe.",
            ],
            tipsB: [
              "Monte jusqu'à l'horizontale uniquement — ne dépasse pas.",
              "Descente lente 3 secondes. Enchaîne directement.",
            ],
          },

          {
            id: "triceps_ss_u1", superset: true,
            nameA: "Extension Poulie Basse", nameB: "Extension Poulie Haute",
            sets: 3, min: 8, max: 12,
            musclesA: "Triceps long — étirement maximal bras au-dessus",
            musclesB: "Triceps latéral · Triceps médial",
            placementA: "DOS à la machine. Corde derrière la nuque. Coudes aux tempes, pointés vers le plafond.",
            placementB: "FACE à la machine. Poulie haute. Coudes fixes légèrement devant les oreilles.",
            tipsA: [
              "La longue portion ne s'étire que bras au-dessus — irremplaçable.",
              "Coudes collés aux tempes, fixes. Extension totale + contraction 1 seconde.",
            ],
            tipsB: [
              "Coudes fixes, ne les laisse pas partir vers l'extérieur.",
              "Contraction parfaite en extension complète. Enchaîne directement.",
            ],
            variant: {
              nameA: "Dips",
              nameB: "Extension Haltère Unilatérale",
              musclesA: "Triceps · Pectoraux · Deltoïde ant. (fonctionnel)",
              musclesB: "Triceps long — isolation + étirement maximal",
              placementA: "Barres parallèles ou bord de banc. Corps légèrement penché en avant.",
              placementB: "Debout ou assis. Un haltère, bras derrière la tête, coude pointé vers le plafond.",
              tipsA: [
                "Descente contrôlée jusqu'aux coudes à 90°. Extension complète en haut.",
                "Corps légèrement penché en avant — focus triceps plutôt que pectoraux.",
                "Si trop facile : ajouter du lest.",
              ],
              tipsB: [
                "Coude fixe et pointé vers le plafond — ne le laisse pas partir sur le côté.",
                "Extension complète en haut, contraction maximale. Enchaîne directement.",
              ],
            },
          },

          {
            id: "tv_large_u1", name: "Tirage Vertical Prise Large",
            sets: 4, min: 6, max: 10,
            muscles: "Grand dorsal (largeur) · Trapèze · Biceps",
            placement: "Prise pronation NETTEMENT plus large que les épaules (15-20 cm de chaque côté).",
            tips: [
              "Prise large = étirement en abduction du dorsal = largeur = effet V.",
              "Initie par la DÉPRESSION des omoplates AVANT de plier les bras.",
              "Tire vers le HAUT de la poitrine — jamais derrière la nuque.",
              "Étirement COMPLET en haut à chaque rep.",
            ],
          },

          {
            id: "th_u1", name: "Tirage Horizontal",
            sets: 2, min: 8, max: 12,
            muscles: "Grand dorsal (épaisseur) · Trapèze moyen · Rhomboïdes",
            placement: "Poulie basse. Torse droit, légèrement penché en avant.",
            tips: [
              "Ramène les coudes DERRIÈRE le buste — amplitude complète.",
              "Rétracte les omoplates à la contraction — TIENS 1 seconde.",
            ],
          },

          {
            id: "mollets_u1", name: "Mollets Debout Haltères",
            sets: 3, min: 15, max: 20,
            muscles: "Gastrocnémien · Soléaire",
            placement: "Haltères dans les mains, debout sur une marche ou plaque.",
            tips: [
              "Pause OBLIGATOIRE 2 secondes en bas — étirement complet.",
              "Monte le plus haut possible, tiens 1 seconde en haut.",
              "Mouvement LENT — temps sous tension prime sur la vitesse.",
            ],
            variant: {
              name: "Mollets Unijambiste",
              muscles: "Gastrocnémien — isolation + correction asymétrie",
              placement: "Un pied sur une marche, l'autre croissé derrière. Main pour l'équilibre.",
              tips: [
                "Un pied à la fois = amplitude et isolation supérieures.",
                "Commence par la jambe la plus faible.",
                "Pause 2 secondes en bas, tiens 1 seconde en haut.",
              ],
            },
          },

          {
            id: "avant_bras_ss_u1", superset: true,
            nameA: "Curl Poignet Supination", nameB: "Curl Poignet Pronation",
            sets: 2, min: 15, max: 20,
            musclesA: "Fléchisseurs de l'avant-bras (face palmaire)",
            musclesB: "Extenseurs de l'avant-bras (face dorsale)",
            placementA: "Assis, avant-bras posé sur la cuisse, paume vers le haut. Haltère léger.",
            placementB: "Même position, paume vers le bas.",
            tipsA: [
              "Amplitude complète — descends le poignet au maximum.",
              "Charge très légère : 5-10 kg max.",
            ],
            tipsB: [
              "Mouvement lent et contrôlé — les extenseurs sont plus faibles.",
              "Enchaîne directement après la supination.",
            ],
            variant: {
              nameA: "Farmer's Walk",
              nameB: "Pince Haltère (Grip)",
              musclesA: "Avant-bras complet · Grip fonctionnel · Trapèzes",
              musclesB: "Fléchisseurs des doigts · Grip de précision",
              placementA: "Haltères lourds dans chaque main. Marche 20-30 mètres.",
              placementB: "Pincer une extrémité d'haltère avec les doigts (pas la paume). Tenir.",
              tipsA: [
                "Dos droit, épaules basses. Grip serré pendant toute la marche.",
                "Augmente la charge progressivement.",
              ],
              tipsB: [
                "Tenir 30-45 secondes. 3 séries par main.",
                "Excellent pour renforcer le grip sur tous les tirages.",
              ],
            },
          },

          {
            id: "crunch_u1", name: "Crunch",
            sets: 3, min: 15, max: 20,
            muscles: "Abdominaux",
            placement: "Sol ou banc décliné. Mains derrière la nuque, coudes ouverts.",
            tips: [
              "Exhale en montant, contraction maximale.",
              "Ne tire pas sur la nuque.",
            ],
          },

          {
            id: "gainage_u1", name: "Gainage",
            sets: 3, min: 30, max: 60,
            muscles: "Abdominaux · Obliques · Érecteurs spinaux",
            placement: "Avant-bras au sol, corps en ligne droite de la tête aux talons.",
            tips: [
              "Core contracté, respiration régulière.",
              "Progression : +5 secondes chaque semaine.",
            ],
          },
        ],
      },

      // ═══════════════════════════════════════════════════════════════
      // LOW — Chaîne postérieure · Fentes · Mollets renforcés
      // ═══════════════════════════════════════════════════════════════
      {
        id: "lo", key: "lo", label: "LOW", code: "B-02",
        title: "LOWER BODY", num: "02",
        muscles: "QUAD · ISCHIO · FESSIERS · ADDUCTEURS · ABDUCTEURS · MOLLETS",
        priority: "Hack Squat en premier. SDL Roumain en 2e — charges lourdes.",
        exercises: [

          {
            id: "hack_squat", name: "Hack Squat",
            sets: 3, alternating: true,
            special: "Montée en gamme — échec sur la 3e série",
            muscles: "Quadriceps · Fessiers · Ischios (selon placement)",
            placement: "Voir toggle — le placement change les muscles ciblés.",
            hackPlacement: {
              quad: {
                label: "QUAD / FESSIERS",
                feet: "Pieds BAS sur le plateau",
                width: "Largeur épaules",
                toes: "Pointes 15-20° ext.",
                note: "Genoux avancent sur les pointes. Descente cuisses aux mollets.",
              },
              post: {
                label: "ISCHIOS / POST.",
                feet: "Pieds HAUTS sur le plateau",
                width: "Légèrement + large",
                toes: "Pointes 20-30° ext.",
                note: "Extension de hanche quasi-complète en haut. Hanches reculent en descente.",
              },
            },
            tips: [
              "Semaine IMPAIRE = 3 reps charge max. Semaine PAIRE = 5 reps volume.",
              "Échauffement genoux obligatoire avant la 1ère série.",
              "Montée en gamme : chaque série plus lourde, échec sur la 3e.",
            ],
          },

          {
            id: "sdl_roumain", name: "SDL Roumain",
            sets: 3, min: 8, max: 12,
            muscles: "Ischio-jambiers · Grand fessier · Érecteurs spinaux",
            placement: "Pieds largeur de hanches. Barre ou haltères glissent le long des jambes.",
            tips: [
              "CHARNIÈRE DE HANCHE — hanches reculent, genoux très peu fléchis.",
              "Descends jusqu'à sentir l'étirement des ischios (mi-tibia environ).",
              "DOS DROIT absolu — si tu arrondis, tu es descendu trop bas.",
              "Montée : extension des hanches, fessiers contractés en haut.",
              "Si douleur lombaire : réduis la charge 30-40% et filme-toi de profil.",
            ],
          },

          {
            id: "fentes", name: "Fentes Haltère",
            sets: 3, min: 10, max: 12,
            muscles: "Quadriceps · Fessiers · Ischio-jambiers",
            placement: "Haltères dans les mains. Pas large, descente verticale.",
            tips: [
              "Genou avant jamais devant la pointe du pied.",
              "Descente contrôlée, pousse sur le talon avant pour remonter.",
              "Corps droit, pas d'inclinaison du buste.",
              "Alterne jambe gauche/droite à chaque rep.",
            ],
            variant: {
              name: "Fentes Bulgares (Split Squat)",
              muscles: "Quadriceps · Fessiers (activation supérieure) · Ischios",
              placement: "Pied arrière posé sur un banc. Haltères dans les mains.",
              tips: [
                "Descente verticale — genou arrière vers le sol.",
                "Pousse sur le talon avant pour remonter — activation fessiers ++.",
                "Commence par la jambe la plus faible. Amplitude complète.",
              ],
            },
          },

          {
            id: "leg_curl", name: "Leg Curl",
            sets: 3, min: 10, max: 12,
            degressive: 3,
            muscles: "Ischio-jambiers (biceps fémoral · semi-tendineux)",
            placement: "Machine allongée ou assise. Cheville bien calée.",
            tips: [
              "Pointe les orteils vers toi : activation ischios supérieure.",
              "Contraction maximale en haut — tiens 1 seconde.",
              "Descente LENTE en 3 secondes.",
              "Dégressive × 3 : échec → -20% → continue → -20% → continue.",
            ],
            variant: {
              name: "Leg Curl Unilatéral",
              muscles: "Ischio-jambiers — isolation maximale + correction asymétrie",
              placement: "Machine allongée. Une jambe à la fois.",
              tips: [
                "Un membre à la fois = isolation supérieure.",
                "Commence toujours par la jambe la plus faible.",
                "Contraction maximale, descente lente en 3 secondes.",
              ],
            },
          },

          {
            id: "leg_ext", name: "Leg Extension",
            sets: 2, min: 10, max: 15,
            degressive: 2,
            muscles: "Quadriceps (vaste médial · vaste latéral · rectus femoris)",
            placement: "Dos calé, genou dans l'axe de la machine.",
            tips: [
              "Contraction électrique en haut — TIENS 2 secondes.",
              "Dégressive × 2 : à l'échec → -20-25% → continue.",
            ],
          },

          {
            id: "adducteur", name: "Adducteur",
            sets: 2, min: 8, max: 12,
            degressive: 2,
            muscles: "Adducteurs (face interne cuisse)",
            placement: "Machine adducteur. Amplitude complète.",
            tips: [
              "Amplitude complète. Contraction 1 seconde en fin de course.",
              "Dégressive × 2 : -20% à l'échec, sans repos.",
              "Enchaîne directement avec l'abducteur.",
            ],
          },

          {
            id: "abducteur", name: "Abducteur",
            sets: 2, min: 12, max: 15,
            muscles: "Abducteurs · Fessier moyen",
            placement: "Machine abducteur.",
            tips: [
              "Amplitude complète vers l'extérieur. Mouvement contrôlé.",
              "Repos 1 min après avoir fini adducteur + abducteur.",
            ],
          },

          {
            id: "mollets_smith", name: "Montée de Pointe Smith",
            sets: 4, min: 12, max: 15,
            muscles: "Gastrocnémien · Soléaire",
            placement: "Barre sur épaules. Pointe du pied sur une plaque.",
            tips: [
              "Pause OBLIGATOIRE 2 secondes en bas — étirement complet.",
              "Monte le plus haut possible, tiens 1 seconde en haut.",
              "Mouvement LENT — le mollet répond au temps sous tension.",
            ],
          },

          {
            id: "mollets_assis", name: "Mollets Assis Machine",
            sets: 3, min: 15, max: 20,
            muscles: "Soléaire (portion inférieure mollet — souvent négligée)",
            placement: "Machine mollets assis. Genoux à 90°, coussinets sur les cuisses.",
            tips: [
              "Le soléaire est mieux ciblé genou fléchi — d'où la position assise.",
              "Amplitude complète en bas, pause 2 secondes.",
              "Temps sous tension long : mouvement très lent.",
            ],
            variant: {
              name: "Mollets Assis Haltères",
              muscles: "Soléaire · Gastrocnémien",
              placement: "Assis sur banc, haltères posés sur les cuisses, pieds sur une plaque.",
              tips: [
                "Même logique que la machine — genou fléchi = soléaire ciblé.",
                "Amplitude maximale en bas, pause 2 secondes.",
              ],
            },
          },
        ],
      },

      // ═══════════════════════════════════════════════════════════════
      // UP B — Pull dominant · Dos en V · Core · Avant-bras
      // ═══════════════════════════════════════════════════════════════
      {
        id: "u2", key: "u2", label: "UP 2", code: "C-03",
        title: "UPPER BODY B", num: "03",
        muscles: "DOS (LARGEUR) · DOS (ÉPAISSEUR) · BICEPS · ÉPAULES · TRICEPS · PEC · AVANT-BRAS",
        priority: "Tirage Vertical Prise Large en premier — séance construction du V.",
        exercises: [

          {
            id: "tv_large_u2", name: "Tirage Vertical Prise Large",
            sets: 3, min: 6, max: 10,
            muscles: "Grand dorsal (largeur) · Trapèze · Biceps",
            placement: "Prise pronation NETTEMENT plus large que les épaules.",
            tips: [
              "Prise large = abduction du dorsal = largeur = effet V.",
              "Initie par la DÉPRESSION des omoplates AVANT de plier les bras.",
              "Tire vers le HAUT de la poitrine — jamais derrière la nuque.",
              "Étirement COMPLET en haut à chaque rep.",
            ],
          },

          {
            id: "tv_unilateral", name: "Tirage Vertical Unilatéral",
            sets: 3, min: 8, max: 12,
            muscles: "Grand dorsal (largeur amplifiée) · Dentelé antérieur",
            placement: "Poulie haute, poignée simple. Un bras à la fois.",
            tips: [
              "Amplitude d'étirement latéral supérieure au tirage à deux bras.",
              "Légère rotation du buste du côté qui tire — sans excès.",
              "Étirement complet en haut, contraction nette en bas — tiens 1 seconde.",
              "Alterne les bras à chaque série.",
            ],
          },

          {
            id: "rowing_coude_ouvert", name: "Rowing Coude Ouvert",
            sets: 3, min: 8, max: 12,
            muscles: "Deltoïde post. · Trapèze moyen (épaisseur) · Rhomboïdes",
            placement: "Poulie ou barre. Torse penché 30°. Coudes latéraux à 45-90°.",
            tips: [
              "Coudes partent latéralement — distingue cet exercice du rowing classique.",
              "Rétracte les omoplates en fin de course — TIENS 1 seconde.",
            ],
          },

          {
            id: "curl_ss_u2", superset: true,
            nameA: "Curl Barre", nameB: "Curl Marteau Haltère",
            sets: 3, min: 8, max: 12,
            musclesA: "Biceps brachial (chef long + court) · Brachial",
            musclesB: "Brachial · Brachioradial · Biceps",
            placementA: "Prise supinée légèrement + large que les épaules. Coudes fixes.",
            placementB: "Haltères, poignet neutre. Debout ou assis.",
            tipsA: [
              "Coudes ABSOLUMENT fixes. S'ils partent vers l'avant, c'est trop lourd.",
              "Ne balance pas le dos.",
            ],
            tipsB: [
              "Poignet neutre tout au long.",
              "Enchaîne directement.",
            ],
            variant: {
              nameA: "Curl Poulie Basse",
              nameB: "Curl Concentré",
              min: 10, max: 15,
              musclesA: "Biceps — tension constante sur toute l'amplitude",
              musclesB: "Biceps — isolation maximale, contraction de pointe",
              placementA: "Poulie basse, prise supinée. Coudes fixes.",
              placementB: "Assis, coude contre la face interne de la cuisse.",
              tipsA: [
                "Tension constante du bas jusqu'en haut — avantage vs haltère.",
                "Descente excentrique lente en 3-4 secondes.",
              ],
              tipsB: [
                "Montée complète, contraction maximale — tiens 1 seconde.",
                "Enchaîne directement.",
              ],
            },
          },

          {
            id: "epaules_ss_u2", superset: true,
            nameA: "Développé Militaire", nameB: "Face Pull",
            sets: 3, min: 10, max: 15,
            musclesA: "Deltoïde ant. · Triceps · Trapèze sup.",
            musclesB: "Deltoïde post. · Trapèze moyen · Coiffe des rotateurs",
            placementA: "Assis ou debout. Dos droit, core engagé. Coudes légèrement devant.",
            placementB: "Corde à hauteur du front. Poulie haute. Face à la machine.",
            tipsA: [
              "Coudes légèrement DEVANT le buste au départ.",
              "Extension complète en haut sans claquer. Descente contrôlée.",
            ],
            tipsB: [
              "Tire en ÉCARTANT les mains vers les oreilles (rotation externe).",
              "Remplace l'Oiseau — sans contrainte sur l'épaule. Enchaîne directement.",
            ],
          },

          {
            id: "triceps_ss_u2", superset: true,
            nameA: "Extension Poulie Basse", nameB: "Kickback",
            sets: 3, min: 8, max: 12,
            musclesA: "Triceps long — étirement maximal",
            musclesB: "Triceps — contraction maximale en fin de course",
            placementA: "DOS à la machine. Corde derrière la nuque. Coudes collés aux tempes.",
            placementB: "Buste parallèle au sol (90°). Bras plaqué contre le corps.",
            tipsA: [
              "Étirement maximal. Coudes fixes, extension totale + 1 seconde.",
            ],
            tipsB: [
              "Extension complète du coude en arrière — contraction maximale.",
              "Charge légère, mouvement strict. Enchaîne directement.",
            ],
            variant: {
              nameA: "Skull Crusher Barre EZ",
              nameB: "Kickback",
              musclesA: "Triceps long + latéral — exercice de masse",
              musclesB: "Triceps — contraction maximale",
              placementA: "Allongé sur banc plat. Barre EZ. Coudes fixes, pointés vers le plafond.",
              placementB: "Buste parallèle au sol (90°). Bras plaqué contre le corps.",
              tipsA: [
                "Coudes fixes et pointés vers le plafond — ne les laisse pas s'écarter.",
                "Descente contrôlée en 3 secondes. Barre EZ = moins de stress poignets.",
              ],
              tipsB: [
                "Extension complète du coude en arrière. Charge légère. Enchaîne directement.",
              ],
            },
          },

          {
            id: "dc_halt_u2", name: "DC Haltère",
            sets: 3, min: 6, max: 10,
            muscles: "Chef sternal pec · Triceps (secondaire)",
            placement: "Banc plat. Omoplates rétractées.",
            tips: [
              "Descends lentement en 3 temps, coudes à 45° du buste.",
              "Étirement maximal des pectoraux en bas.",
            ],
          },

          {
            id: "avant_bras_ss_u2", superset: true,
            nameA: "Curl Poignet Supination", nameB: "Curl Poignet Pronation",
            sets: 3, min: 15, max: 20,
            musclesA: "Fléchisseurs avant-bras (face palmaire)",
            musclesB: "Extenseurs avant-bras (face dorsale)",
            placementA: "Assis, avant-bras sur la cuisse, paume vers le haut. Haltère léger.",
            placementB: "Même position, paume vers le bas.",
            tipsA: [
              "Amplitude complète — descends le poignet au maximum.",
              "Charge très légère : 5-10 kg max.",
            ],
            tipsB: [
              "Mouvement lent et contrôlé — les extenseurs sont plus faibles.",
              "Enchaîne directement après la supination.",
            ],
            variant: {
              nameA: "Curl Marteau Barre EZ",
              nameB: "Gainage Poignet (Wrist Roller)",
              musclesA: "Brachioradial · Avant-bras (face latérale)",
              musclesB: "Avant-bras complet · Grip endurance",
              placementA: "Barre EZ, prise neutre (marteau). Coudes fixes.",
              placementB: "Barre avec corde et poids. Enroule et dérouleau niveau de la poitrine.",
              tipsA: [
                "Prise neutre = brachioradial et avant-bras latéral très ciblés.",
                "Descente excentrique lente en 3-4 secondes.",
              ],
              tipsB: [
                "3 allers-retours = 1 série. Commence léger.",
                "Excellent pour le grip et l'endurance des avant-bras.",
              ],
            },
          },

          {
            id: "crunch_u2", name: "Crunch",
            sets: 3, min: 15, max: 20,
            muscles: "Abdominaux",
            placement: "Sol ou banc décliné.",
            tips: [
              "Exhale en montant, contraction maximale.",
              "Ne tire pas sur la nuque.",
            ],
          },

          {
            id: "gainage_u2", name: "Gainage",
            sets: 3, min: 30, max: 60,
            muscles: "Abdominaux · Obliques · Érecteurs spinaux",
            placement: "Avant-bras au sol.",
            tips: [
              "Ligne droite tête-talons. Core contracté.",
              "Progression : +5 secondes chaque semaine.",
            ],
          },
        ],
      },
    ],
  },

  ppl3: {
    id:"ppl3", name:"PUSH / PULL / LEGS", subtitle:"HYPERTROPHIE · 3 SESSIONS", author:"UPGRADE",
    description:"Split classique poussée / tirage / jambes. Polyvalent, éprouvé.",
    sessions:[
      { id:"push", key:"push", label:"PUSH", code:"A-01", title:"POUSSÉE", muscles:"PEC · ÉPAULES · TRICEPS", num:"01", exercises:[
        { id:"dc_barre", name:"Développé Couché Barre", sets:4, min:6, max:10, tips:["Omoplates rétractées et fixées.","Descente contrôlée 2-3s.","Barre touche la poitrine à hauteur des mamelons."]},
        { id:"di_halt_ppl", name:"Développé Incliné Haltère", sets:3, min:8, max:12, tips:["Banc à 30-45° max.","Trajectoire légèrement convergente en haut."]},
        { id:"dm_halt", name:"Développé Militaire Haltère", sets:3, min:8, max:12, tips:["Coudes légèrement devant le buste.","Verrouillage en haut sans claquer."]},
        { id:"ecarte_ppl", name:"Écarté Poulie", sets:3, min:10, max:15, tips:["Bras légèrement fléchis.","Contraction 1s en haut."]},
        { id:"el_lat", name:"Élévation Latérale Haltère", sets:3, min:12, max:15, tips:["Monte jusqu'à l'horizontale.","Descente lente en 3s."]},
        { id:"ext_poulie_ppl", name:"Extension Triceps Poulie Haute", sets:3, min:10, max:12, tips:["Coudes fixes.","Amplitude complète."]},
      ]},
      { id:"pull", key:"pull", label:"PULL", code:"B-02", title:"TIRAGE", muscles:"DOS · BICEPS · DELTOÏDES POSTÉRIEURS", num:"02", exercises:[
        { id:"sdt", name:"Soulevé de Terre", sets:4, min:4, max:6, tips:["Barre collée aux tibias.","Dos droit, scapulas engagées."]},
        { id:"tractions", name:"Tractions (ou Tirage Vertical)", sets:4, min:6, max:10, tips:["Prise pronation large.","Tire les coudes vers les hanches."]},
        { id:"rowing_barre", name:"Rowing Barre Buste Penché", sets:3, min:8, max:10, tips:["Buste à 30-45°.","Tire vers le bas du sternum."]},
        { id:"face_pull", name:"Face Pull Corde", sets:3, min:12, max:15, tips:["Corde à hauteur du front.","Tire en écartant les mains vers les oreilles."]},
        { id:"curl_barre_ppl", name:"Curl Barre", sets:3, min:8, max:12, tips:["Coudes collés au corps.","Descente contrôlée 3s."]},
        { id:"curl_marteau_ppl", name:"Curl Marteau", sets:3, min:10, max:12, tips:["Poignet neutre.","Coudes immobiles."]},
      ]},
      { id:"legs", key:"legs", label:"LEGS", code:"C-03", title:"JAMBES", muscles:"QUADRICEPS · ISCHIO · FESSIERS · MOLLETS", num:"03", exercises:[
        { id:"squat_barre", name:"Squat Barre", sets:4, min:5, max:8, tips:["Pieds largeur épaules.","Descente profonde."]},
        { id:"presse", name:"Presse à Cuisses", sets:3, min:8, max:12, tips:["Pieds hauts = fessiers/ischio.","Ne verrouille jamais les genoux."]},
        { id:"sdl_ppl", name:"Soulevé de Terre Roumain", sets:3, min:8, max:12, tips:["Hanches en arrière.","Étirement des ischio en bas."]},
        { id:"fentes", name:"Fentes Marchées Haltère", sets:3, min:10, max:12, tips:["Genou avant dans l'axe.","Pousse sur le talon avant."]},
        { id:"mollets", name:"Mollets Debout (Smith)", sets:4, min:12, max:15, tips:["Pause 2s en bas.","Monte le plus haut possible."]},
      ]},
    ],
  },

  fb3: {
    id:"fb3", name:"FULL BODY · 3J", subtitle:"ÉQUILIBRÉ · 3 SESSIONS", author:"UPGRADE",
    description:"Chaque séance couvre tout le corps. Idéal pour la polyvalence.",
    sessions:[
      { id:"fb_a", key:"fb_a", label:"A", code:"A-01", title:"FULL BODY A", muscles:"TOUT LE CORPS · ACCENT POUSSÉE", num:"01", exercises:[
        { id:"squat_fb", name:"Squat Barre", sets:3, min:5, max:8, tips:["Descente contrôlée."]},
        { id:"dc_fb", name:"Développé Couché Barre", sets:3, min:6, max:10, tips:["Omoplates verrouillées."]},
        { id:"rowing_fb", name:"Rowing Barre", sets:3, min:6, max:10, tips:["Buste à 30-45°."]},
        { id:"dm_fb", name:"Développé Militaire", sets:3, min:8, max:10, tips:["Gainage abdominal constant."]},
        { id:"curl_fb_a", name:"Curl Haltère Alterné", sets:3, min:10, max:12, tips:["Coudes fixes."]},
      ]},
      { id:"fb_b", key:"fb_b", label:"B", code:"B-02", title:"FULL BODY B", muscles:"TOUT LE CORPS · ACCENT TIRAGE", num:"02", exercises:[
        { id:"sdt_fb", name:"Soulevé de Terre", sets:3, min:4, max:6, tips:["Extension complète des hanches."]},
        { id:"tractions_fb", name:"Tractions (ou Tirage)", sets:3, min:6, max:10, tips:["Amplitude complète."]},
        { id:"di_fb", name:"Développé Incliné Haltère", sets:3, min:8, max:10, tips:["Banc à 30-45° max."]},
        { id:"fentes_fb", name:"Fentes Haltère", sets:3, min:10, max:12, tips:["Descente lente."]},
        { id:"ext_fb", name:"Extension Triceps Poulie", sets:3, min:10, max:12, tips:["Coudes fixes."]},
      ]},
      { id:"fb_c", key:"fb_c", label:"C", code:"C-03", title:"FULL BODY C", muscles:"TOUT LE CORPS · VOLUME", num:"03", exercises:[
        { id:"presse_fb", name:"Presse à Cuisses", sets:3, min:10, max:12, tips:["Pieds adaptés."]},
        { id:"sdl_fb", name:"Soulevé de Terre Roumain", sets:3, min:8, max:12, tips:["Hanches en arrière."]},
        { id:"dc_halt_fb", name:"DC Haltère", sets:3, min:8, max:12, tips:["Étirement maximal en bas."]},
        { id:"tirage_fb", name:"Tirage Horizontal", sets:3, min:8, max:12, tips:["Rétraction des omoplates."]},
        { id:"el_lat_fb", name:"Élévation Latérale", sets:3, min:12, max:15, tips:["Descente lente."]},
        { id:"mollets_fb", name:"Mollets Smith", sets:3, min:12, max:15, tips:["Pause 2s en bas."]},
      ]},
    ],
  },
};
