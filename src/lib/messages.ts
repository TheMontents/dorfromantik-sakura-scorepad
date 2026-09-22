/**
 * Messages per language, per game.
 *
 * German and English use the official terminology of the score pads and
 * rulebooks published by Pegasus Spiele; French, Italian, Spanish and Polish
 * are our own translations and may differ from the wording printed by the
 * local publisher.
 */
import type { GameId } from './games'

/** Languages the games were published in */
export const LOCALES = ['de', 'en', 'fr', 'it', 'es', 'pl'] as const
export type Locale = (typeof LOCALES)[number]

/** Endonym per language, used in the switcher */
export const LOCALE_NAMES: Record<Locale, string> = {
  de: 'Deutsch',
  en: 'English',
  fr: 'Français',
  it: 'Italiano',
  es: 'Español',
  pl: 'Polski',
}

export interface CategoryText {
  label: string
  /** Label of the bonus row; absent where the cell is hatched */
  bonus?: string
  bonusHint?: string
}

export interface UnlockText {
  label: string
  /** Rule text as printed on the sheet */
  hint: string
  /** Label per input field */
  fields: string[]
}

export interface GameText {
  /** Short name in the game switcher */
  name: string
  /** Headline of the sheet */
  title: string
  categories: Record<string, CategoryText>
  unlocks: Record<string, UnlockText>
  /** Labels of the campaign options, by option id */
  options: Record<string, string>
}

export interface Messages {
  ui: {
    tasks: string
    bonusRow: string
    unlocked: string
    subtotals: string
    result: string
    newGame: string
    confirmReset: string
    points: string
    pointsShort: string
    amount: string
    completedTasks: string
    noScore: string
    decrease: string
    increase: string
    /** {points} = value of the task marker */
    taskCard: string
    /** {category} = name of the category */
    taskGroup: string
    language: string
    cancel: string
    clear: string
    game: string
    /** Marker state for screen readers */
    onBuilding: string
    /** Explains the third state of a task marker */
    doublingHint: string
    /** Explains why a building has no input field */
    computedFromTasks: string
    disclaimer: string
  }
  games: Record<GameId, GameText>
}

export const MESSAGES: Record<Locale, Messages> = {
  de: {
    ui: {
      tasks: 'Aufträge',
      bonusRow: 'Fahnen & Längste',
      unlocked: 'Freigespielt',
      subtotals: 'Zwischensummen',
      result: 'Ergebnis',
      newGame: 'Neue Partie',
      confirmReset: 'Bogen wirklich leeren und neue Partie starten?',
      points: 'Punkte',
      pointsShort: 'Pkt',
      amount: 'Anzahl',
      completedTasks: 'Erfüllte Aufträge',
      noScore: 'keine Wertung',
      decrease: 'verringern',
      increase: 'erhöhen',
      taskCard: 'Auftrag über {points} Punkte',
      taskGroup: 'Aufträge {category}',
      language: 'Sprache',
      cancel: 'Abbrechen',
      clear: 'Leeren',
      game: 'Spiel',
      onBuilding: 'liegt auf dem Gebäude',
      doublingHint: 'Zweimal tippen: der Auftrag liegt auf dem Gebäude und zählt noch einmal',
      computedFromTasks: 'Ergibt sich aus den Aufträgen, die oben zweimal angetippt sind',
      disclaimer: 'Inoffizielles Fan-Projekt, nicht mit Pegasus Spiele verbunden. Dorfromantik ist eine Marke von Pegasus Spiele.',
    },
    games: {
      classic: {
        name: 'Klassisch',
        title: 'Dorfromantik Wertungsblock',
        categories: {
          forest: {
            label: 'Wald',
            bonus: 'Fahnen',
            bonusHint: 'Grüne Fahne: Plättchen des Gebiets, aber nur wenn es abgeschlossen ist',
          },
          grain: {
            label: 'Getreide',
            bonus: 'Fahnen',
            bonusHint: 'Gelbe Fahne: Plättchen des Gebiets, aber nur wenn es abgeschlossen ist',
          },
          village: {
            label: 'Dorf',
            bonus: 'Fahnen',
            bonusHint: 'Rote Fahne: Plättchen des Gebiets, aber nur wenn es abgeschlossen ist',
          },
          rail: {
            label: 'Gleise',
            bonus: 'längstes',
            bonusHint: 'Anzahl Plättchen des längsten Gleises',
          },
          river: {
            label: 'Fluss',
            bonus: 'längster',
            bonusHint: 'Anzahl Plättchen des längsten Flusses',
          },
        },
        unlocks: {
          forestCabin: {
            label: 'Waldhütte',
            hint: 'Wald-Aufträge',
            fields: [],
          },
          harvestFestival: {
            label: 'Erntefest',
            hint: 'Getreide-Aufträge',
            fields: [],
          },
          watchtower: {
            label: 'Wachturm',
            hint: 'Dorf-Aufträge',
            fields: [],
          },
          locomotive: {
            label: 'Lokomotive',
            hint: 'Gleis-Aufträge',
            fields: [],
          },
          ship: {
            label: 'Schiff',
            hint: 'Fluss-Aufträge',
            fields: [],
          },
          trainStation: {
            label: 'Bahnhof',
            hint: 'beendet = 1/Plättchen',
            fields: ['Plättchen'],
          },
          harbour: {
            label: 'Hafen',
            hint: 'beendet = 1/Plättchen',
            fields: ['Plättchen'],
          },
          redHearts: {
            label: 'Rote Herzen',
            hint: '1/passender Kante',
            fields: ['Passende Kanten'],
          },
          circus: {
            label: 'Zirkus',
            hint: 'umschlossen = 10',
            fields: ['Umschlossene Zirkusse'],
          },
          signalman: {
            label: 'Bahnwärter',
            hint: '2/Bahnübergang',
            fields: ['Bahnübergänge'],
          },
          shepherdess: {
            label: 'Schäferin',
            hint: '1/Schaf',
            fields: ['Schafe'],
          },
          hill: {
            label: 'Hügel',
            hint: 'im Abstand 2 = 2/Auftrag',
            fields: ['Aufträge'],
          },
          constructionSite: {
            label: 'Baustelle',
            hint: 'pro Gebiet 7+ = 7',
            fields: ['Gebiete mit 7+'],
          },
          balloonLaunchSite: {
            label: 'Ballon-Startplatz',
            hint: '2/Entfernung',
            fields: ['Entfernung'],
          },
          goldenHeart: {
            label: 'Goldenes Herz',
            hint: '2/passender Kante',
            fields: ['Passende Kanten'],
          },
          adolfturm: {
            label: 'Adolfturm',
            hint: '1/passender Kante',
            fields: ['Passende Kanten'],
          },
          tvTower: {
            label: 'Fernsehturm',
            hint: '1/passender Kante',
            fields: ['Passende Kanten'],
          },
          pegasus: {
            label: 'Pegasus',
            hint: '1/passender Kante',
            fields: ['Passende Kanten'],
          },
          greatMill: {
            label: 'Große Mühle',
            hint: '2/Auftrag + Bonus',
            fields: ['Punkte'],
          },
          photographer: {
            label: 'Fotograf',
            hint: '1/Kameramarke',
            fields: ['Kameramarken'],
          },
          oldOak: {
            label: 'Alte Eiche',
            hint: 'im Abstand 2 = 1/Wald',
            fields: ['Waldplättchen'],
          },
          granary: {
            label: 'Kornspeicher',
            hint: 'im Abstand 2 = 1/Getreide',
            fields: ['Getreideplättchen'],
          },
          school: {
            label: 'Schule',
            hint: 'im Abstand 2 = 1/Dorf',
            fields: ['Dorfplättchen'],
          },
        },
        options: {
          secondFour: '2. 4er-Auftrag je Farbe (Schachtel 1)',
          tunnels: 'Tunnel: 7er-Aufträge für Wald, Getreide, Dorf (Schachtel 3)',
          miniExpansions: 'Mini-Erweiterungen',
        },
      },
      sakura: {
        name: 'Sakura',
        title: 'Sakura Wertungsblock',
        categories: {
          cherry: {
            label: 'Kirschblüten',
            bonus: 'Fahnen',
            bonusHint: 'Rosa Fahne: Plättchen des Gebiets, aber nur wenn es abgeschlossen ist',
          },
          rice: {
            label: 'Reisfelder',
            bonus: 'Fahnen',
            bonusHint: 'Grüne Fahne: Plättchen des Gebiets, aber nur wenn es abgeschlossen ist',
          },
          village: {
            label: 'Dorf',
            bonus: 'Fahnen',
            bonusHint: 'Rote Fahne: Plättchen des Gebiets, aber nur wenn es abgeschlossen ist',
          },
          road: {
            label: 'Wege',
            bonus: 'längste',
            bonusHint: 'Anzahl Plättchen der längsten Straße',
          },
          river: {
            label: 'Wasser',
            bonus: 'längste',
            bonusHint: 'Anzahl Plättchen des längsten Flusses',
          },
          wraparound: {
            label: 'Rundumaufträge',
            bonus: 'längste = +2',
            bonusHint: '+2 je Rundumauftrag an der längsten Straße / am längsten Fluss',
          },
          seven: {
            label: '7',
          },
        },
        unlocks: {
          cherryBlossoms: {
            label: 'Kirschblüten',
            hint: 'gesammelt',
            fields: ['Punkte'],
          },
          temples: {
            label: 'Tempel',
            hint: 'passend umschlossen = 6',
            fields: ['Umschlossene Tempel'],
          },
          hotSprings: {
            label: 'Heiße Quellen',
            hint: 'abgeschlossen = 3 · 3/Rundumauftrag',
            fields: ['Abgeschlossene Quellen', 'Rundumaufträge'],
          },
          bridges: {
            label: 'Brücken',
            hint: 'längster Fluss = 5/Brücke',
            fields: ['Brücken'],
          },
          gates: {
            label: 'Tore',
            hint: 'längste Straße = 5/Tor',
            fields: ['Tore'],
          },
          hermit: {
            label: 'Einsiedler',
            hint: '3/freier Kante',
            fields: ['Freie Kanten'],
          },
          observatory: {
            label: 'Sternwarte',
            hint: 'abgeschlossenes Fahnengebiet (FG) = 3/abgeschlossenes FG',
            fields: ['Abgeschlossene FG'],
          },
          cartographer: {
            label: 'Kartograph',
            hint: 'Blickrichtung = 2/Auftrag',
            fields: ['Aufträge'],
          },
          sumoWrestler: {
            label: 'Sumoringer',
            hint: '1/passender Kante',
            fields: ['Passende Kanten'],
          },
          mossCollector: {
            label: 'Moossammlerin',
            hint: '1/passender Kante',
            fields: ['Passende Kanten'],
          },
          riceFarmer: {
            label: 'Reisbäuerin',
            hint: '1/passender Kante',
            fields: ['Passende Kanten'],
          },
          shipPier: {
            label: 'Schiff-Anlegestelle',
            hint: '1/Plättchen dazwischen',
            fields: ['Plättchen dazwischen'],
          },
          oxCart: {
            label: 'Ochsenkarren-Handelsposten',
            hint: '1/Plättchen dazwischen',
            fields: ['Plättchen dazwischen'],
          },
          poet: {
            label: 'Poet',
            hint: '3/Wiesenkante',
            fields: ['Wiesenkanten'],
          },
        },
        options: {},
      },
    },
  },

  en: {
    ui: {
      tasks: 'Tasks',
      bonusRow: 'Flags & Longest',
      unlocked: 'Unlocked',
      subtotals: 'Subtotals',
      result: 'Result',
      newGame: 'New game',
      confirmReset: 'Clear the sheet and start a new game?',
      points: 'points',
      pointsShort: 'pts',
      amount: 'Amount',
      completedTasks: 'Completed Tasks',
      noScore: 'no score',
      decrease: 'decrease',
      increase: 'increase',
      taskCard: 'Task worth {points} points',
      taskGroup: '{category} Tasks',
      language: 'Language',
      cancel: 'Cancel',
      clear: 'Clear',
      game: 'Game',
      onBuilding: 'on its building',
      doublingHint: 'Tap twice: the task lies on its building and scores again',
      computedFromTasks: 'Adds up from the tasks tapped twice above',
      disclaimer: 'Unofficial fan project, not affiliated with Pegasus Spiele. Dorfromantik is a trademark of Pegasus Spiele.',
    },
    games: {
      classic: {
        name: 'Classic',
        title: 'Dorfromantik Score Pad',
        categories: {
          forest: {
            label: 'Forest',
            bonus: 'Flags',
            bonusHint: 'Green Flag: tiles of the territory, but only if it is complete',
          },
          grain: {
            label: 'Grain',
            bonus: 'Flags',
            bonusHint: 'Yellow Flag: tiles of the territory, but only if it is complete',
          },
          village: {
            label: 'Village',
            bonus: 'Flags',
            bonusHint: 'Red Flag: tiles of the territory, but only if it is complete',
          },
          rail: {
            label: 'Track',
            bonus: 'Longest',
            bonusHint: 'Number of tiles in the longest Track',
          },
          river: {
            label: 'Stream',
            bonus: 'Longest',
            bonusHint: 'Number of tiles in the longest Stream',
          },
        },
        unlocks: {
          forestCabin: {
            label: 'Forest Cabin',
            hint: 'Forest Tasks',
            fields: [],
          },
          harvestFestival: {
            label: 'Harvest Festival',
            hint: 'Grain Tasks',
            fields: [],
          },
          watchtower: {
            label: 'Watchtower',
            hint: 'Village Tasks',
            fields: [],
          },
          locomotive: {
            label: 'Locomotive',
            hint: 'Track Tasks',
            fields: [],
          },
          ship: {
            label: 'Ship',
            hint: 'Stream Tasks',
            fields: [],
          },
          trainStation: {
            label: 'Train Station',
            hint: 'finished = 1/tile',
            fields: ['Tiles'],
          },
          harbour: {
            label: 'Harbour',
            hint: 'finished = 1/tile',
            fields: ['Tiles'],
          },
          redHearts: {
            label: 'Red Hearts',
            hint: '1/matching edge',
            fields: ['Matching edges'],
          },
          circus: {
            label: 'Circus',
            hint: 'completely surrounded = 10',
            fields: ['Surrounded circuses'],
          },
          signalman: {
            label: 'Signalman',
            hint: '2/Grade Crossing',
            fields: ['Grade crossings'],
          },
          shepherdess: {
            label: 'Shepherdess',
            hint: '1/Sheep',
            fields: ['Sheep'],
          },
          hill: {
            label: 'Hill',
            hint: 'at distance 2 = 2/Task tile',
            fields: ['Task tiles'],
          },
          constructionSite: {
            label: 'Construction Site',
            hint: 'per territory 7+ = 7',
            fields: ['Territories with 7+'],
          },
          balloonLaunchSite: {
            label: 'Balloon Launch Site',
            hint: '2/distance',
            fields: ['Distance'],
          },
          goldenHeart: {
            label: 'Golden Heart',
            hint: '2/matching edge',
            fields: ['Matching edges'],
          },
          adolfturm: {
            label: 'Adolfturm',
            hint: '1/matching edge',
            fields: ['Matching edges'],
          },
          tvTower: {
            label: 'TV Tower',
            hint: '1/matching edge',
            fields: ['Matching edges'],
          },
          pegasus: {
            label: 'Pegasus',
            hint: '1/matching edge',
            fields: ['Matching edges'],
          },
          greatMill: {
            label: 'Great Mill',
            hint: '2/Task + bonus',
            fields: ['Points'],
          },
          photographer: {
            label: 'Photographer',
            hint: '1/camera marker',
            fields: ['Camera markers'],
          },
          oldOak: {
            label: 'Old Oak',
            hint: 'at distance 2 = 1/Forest',
            fields: ['Forest tiles'],
          },
          granary: {
            label: 'Granary',
            hint: 'at distance 2 = 1/Grain',
            fields: ['Grain tiles'],
          },
          school: {
            label: 'School',
            hint: 'at distance 2 = 1/Village',
            fields: ['Village tiles'],
          },
        },
        options: {
          secondFour: 'Second 4 Task per colour (box 1)',
          tunnels: 'Tunnels: 7 Tasks for Forest, Grain, Village (box 3)',
          miniExpansions: 'Mini expansions',
        },
      },
      sakura: {
        name: 'Sakura',
        title: 'Sakura Score Pad',
        categories: {
          cherry: {
            label: 'Cherry trees',
            bonus: 'Flags',
            bonusHint: 'Pink Flag: tiles of the territory, but only if it is complete',
          },
          rice: {
            label: 'Rice fields',
            bonus: 'Flags',
            bonusHint: 'Green Flag: tiles of the territory, but only if it is complete',
          },
          village: {
            label: 'Villages',
            bonus: 'Flags',
            bonusHint: 'Red Flag: tiles of the territory, but only if it is complete',
          },
          road: {
            label: 'Roads',
            bonus: 'Longest',
            bonusHint: 'Number of tiles in the longest Road',
          },
          river: {
            label: 'Rivers',
            bonus: 'Longest',
            bonusHint: 'Number of tiles in the longest River',
          },
          wraparound: {
            label: 'Wraparound Tasks',
            bonus: 'Longest = +2',
            bonusHint: '+2 per Wraparound Task on the longest Road / River',
          },
          seven: {
            label: '7',
          },
        },
        unlocks: {
          cherryBlossoms: {
            label: 'Cherry blossoms',
            hint: 'collected',
            fields: ['Points'],
          },
          temples: {
            label: 'Temples',
            hint: 'enclosed with matching edges = 6',
            fields: ['Enclosed Temples'],
          },
          hotSprings: {
            label: 'Hot springs',
            hint: 'completed = 3 · 3/Wraparound Task',
            fields: ['Completed springs', 'Wraparound Tasks'],
          },
          bridges: {
            label: 'Bridges',
            hint: 'longest River = 5/Bridge',
            fields: ['Bridges'],
          },
          gates: {
            label: 'Gates',
            hint: 'longest Road = 5/Gate',
            fields: ['Gates'],
          },
          hermit: {
            label: 'Hermit',
            hint: '3/free edge',
            fields: ['Free edges'],
          },
          observatory: {
            label: 'Observatory',
            hint: 'completed Flag territory (FT) = 3/completed FT',
            fields: ['Completed FTs'],
          },
          cartographer: {
            label: 'Cartographer',
            hint: 'line of sight = 2/Task',
            fields: ['Tasks'],
          },
          sumoWrestler: {
            label: 'Sumo wrestler',
            hint: '1/matching edge',
            fields: ['Matching edges'],
          },
          mossCollector: {
            label: 'Moss collector',
            hint: '1/matching edge',
            fields: ['Matching edges'],
          },
          riceFarmer: {
            label: 'Rice farmer',
            hint: '1/matching edge',
            fields: ['Matching edges'],
          },
          shipPier: {
            label: 'Ship & Pier',
            hint: '1/tile in between',
            fields: ['Tiles in between'],
          },
          oxCart: {
            label: 'Ox cart & Trading post',
            hint: '1/tile in between',
            fields: ['Tiles in between'],
          },
          poet: {
            label: 'Poet',
            hint: '3/meadow edge',
            fields: ['Meadow edges'],
          },
        },
        options: {},
      },
    },
  },

  fr: {
    ui: {
      tasks: 'Missions',
      bonusRow: 'Drapeaux & plus long',
      unlocked: 'Débloqué',
      subtotals: 'Sous-totaux',
      result: 'Résultat',
      newGame: 'Nouvelle partie',
      confirmReset: 'Vider la feuille et commencer une nouvelle partie ?',
      points: 'points',
      pointsShort: 'pts',
      amount: 'Nombre',
      completedTasks: 'Missions accomplies',
      noScore: 'pas de score',
      decrease: 'diminuer',
      increase: 'augmenter',
      taskCard: 'Mission à {points} points',
      taskGroup: 'Missions {category}',
      language: 'Langue',
      cancel: 'Annuler',
      clear: 'Vider',
      game: 'Jeu',
      onBuilding: 'posée sur le bâtiment',
      doublingHint: 'Appuyer deux fois : la mission est posée sur le bâtiment et compte une seconde fois',
      computedFromTasks: 'Se calcule à partir des missions appuyées deux fois ci-dessus',
      disclaimer: 'Projet de fan non officiel, sans lien avec Pegasus Spiele. Dorfromantik est une marque de Pegasus Spiele.',
    },
    games: {
      classic: {
        name: 'Classique',
        title: 'Bloc de score Dorfromantik',
        categories: {
          forest: {
            label: 'Forêt',
            bonus: 'Drapeaux',
            bonusHint: "Drapeau vert : tuiles du territoire, mais seulement s'il est fermé",
          },
          grain: {
            label: 'Céréales',
            bonus: 'Drapeaux',
            bonusHint: "Drapeau jaune : tuiles du territoire, mais seulement s'il est fermé",
          },
          village: {
            label: 'Village',
            bonus: 'Drapeaux',
            bonusHint: "Drapeau rouge : tuiles du territoire, mais seulement s'il est fermé",
          },
          rail: {
            label: 'Voie ferrée',
            bonus: 'la plus longue',
            bonusHint: 'Nombre de tuiles de la plus longue voie ferrée',
          },
          river: {
            label: 'Rivière',
            bonus: 'la plus longue',
            bonusHint: 'Nombre de tuiles de la plus longue rivière',
          },
        },
        unlocks: {
          forestCabin: {
            label: 'Cabane forestière',
            hint: 'missions Forêt',
            fields: [],
          },
          harvestFestival: {
            label: 'Fête des moissons',
            hint: 'missions Céréales',
            fields: [],
          },
          watchtower: {
            label: 'Tour de guet',
            hint: 'missions Village',
            fields: [],
          },
          locomotive: {
            label: 'Locomotive',
            hint: 'missions Voie ferrée',
            fields: [],
          },
          ship: {
            label: 'Bateau',
            hint: 'missions Rivière',
            fields: [],
          },
          trainStation: {
            label: 'Gare',
            hint: 'terminée = 1/tuile',
            fields: ['Tuiles'],
          },
          harbour: {
            label: 'Port',
            hint: 'terminé = 1/tuile',
            fields: ['Tuiles'],
          },
          redHearts: {
            label: 'Cœurs rouges',
            hint: '1/bord correspondant',
            fields: ['Bords correspondants'],
          },
          circus: {
            label: 'Cirque',
            hint: 'entièrement entouré = 10',
            fields: ['Cirques entourés'],
          },
          signalman: {
            label: 'Garde-barrière',
            hint: '2/passage à niveau',
            fields: ['Passages à niveau'],
          },
          shepherdess: {
            label: 'Bergère',
            hint: '1/mouton',
            fields: ['Moutons'],
          },
          hill: {
            label: 'Colline',
            hint: 'à distance 2 = 2/mission',
            fields: ['Missions'],
          },
          constructionSite: {
            label: 'Chantier',
            hint: 'par territoire 7+ = 7',
            fields: ['Territoires de 7+'],
          },
          balloonLaunchSite: {
            label: 'Aire de montgolfière',
            hint: '2/distance',
            fields: ['Distance'],
          },
          goldenHeart: {
            label: 'Cœur doré',
            hint: '2/bord correspondant',
            fields: ['Bords correspondants'],
          },
          adolfturm: {
            label: 'Adolfturm',
            hint: '1/bord correspondant',
            fields: ['Bords correspondants'],
          },
          tvTower: {
            label: 'Tour de télévision',
            hint: '1/bord correspondant',
            fields: ['Bords correspondants'],
          },
          pegasus: {
            label: 'Pégase',
            hint: '1/bord correspondant',
            fields: ['Bords correspondants'],
          },
          greatMill: {
            label: 'Grand moulin',
            hint: '2/mission + bonus',
            fields: ['Points'],
          },
          photographer: {
            label: 'Photographe',
            hint: '1/marqueur appareil photo',
            fields: ['Marqueurs appareil photo'],
          },
          oldOak: {
            label: 'Vieux chêne',
            hint: 'à distance 2 = 1/forêt',
            fields: ['Tuiles forêt'],
          },
          granary: {
            label: 'Grenier',
            hint: 'à distance 2 = 1/céréales',
            fields: ['Tuiles céréales'],
          },
          school: {
            label: 'École',
            hint: 'à distance 2 = 1/village',
            fields: ['Tuiles village'],
          },
        },
        options: {
          secondFour: '2e mission à 4 par couleur (boîte 1)',
          tunnels: 'Tunnels : missions à 7 pour Forêt, Céréales, Village (boîte 3)',
          miniExpansions: 'Mini-extensions',
        },
      },
      sakura: {
        name: 'Sakura',
        title: 'Bloc de score Sakura',
        categories: {
          cherry: {
            label: 'Cerisiers',
            bonus: 'Drapeaux',
            bonusHint: "Drapeau rose : tuiles du territoire, mais seulement s'il est fermé",
          },
          rice: {
            label: 'Rizières',
            bonus: 'Drapeaux',
            bonusHint: "Drapeau vert : tuiles du territoire, mais seulement s'il est fermé",
          },
          village: {
            label: 'Villages',
            bonus: 'Drapeaux',
            bonusHint: "Drapeau rouge : tuiles du territoire, mais seulement s'il est fermé",
          },
          road: {
            label: 'Routes',
            bonus: 'la plus longue',
            bonusHint: 'Nombre de tuiles de la plus longue route',
          },
          river: {
            label: 'Rivières',
            bonus: 'la plus longue',
            bonusHint: 'Nombre de tuiles de la plus longue rivière',
          },
          wraparound: {
            label: 'Missions circulaires',
            bonus: 'la plus longue = +2',
            bonusHint: '+2 par mission circulaire le long de la plus longue route / rivière',
          },
          seven: {
            label: '7',
          },
        },
        unlocks: {
          cherryBlossoms: {
            label: 'Fleurs de cerisier',
            hint: 'collectées',
            fields: ['Points'],
          },
          temples: {
            label: 'Temples',
            hint: 'entouré de bords correspondants = 6',
            fields: ['Temples entourés'],
          },
          hotSprings: {
            label: 'Sources chaudes',
            hint: 'terminée = 3 · 3/mission circulaire',
            fields: ['Sources terminées', 'Missions circulaires'],
          },
          bridges: {
            label: 'Ponts',
            hint: 'plus longue rivière = 5/pont',
            fields: ['Ponts'],
          },
          gates: {
            label: 'Portails',
            hint: 'plus longue route = 5/portail',
            fields: ['Portails'],
          },
          hermit: {
            label: 'Ermite',
            hint: '3/bord libre',
            fields: ['Bords libres'],
          },
          observatory: {
            label: 'Observatoire',
            hint: 'territoire de drapeau (TD) fermé = 3/TD fermé',
            fields: ['TD fermés'],
          },
          cartographer: {
            label: 'Cartographe',
            hint: 'ligne de vue = 2/mission',
            fields: ['Missions'],
          },
          sumoWrestler: {
            label: 'Lutteur de sumo',
            hint: '1/bord correspondant',
            fields: ['Bords correspondants'],
          },
          mossCollector: {
            label: 'Collectrice de mousse',
            hint: '1/bord correspondant',
            fields: ['Bords correspondants'],
          },
          riceFarmer: {
            label: 'Rizicultrice',
            hint: '1/bord correspondant',
            fields: ['Bords correspondants'],
          },
          shipPier: {
            label: 'Bateau et embarcadère',
            hint: '1/tuile intermédiaire',
            fields: ['Tuiles intermédiaires'],
          },
          oxCart: {
            label: 'Charrette à bœufs et comptoir',
            hint: '1/tuile intermédiaire',
            fields: ['Tuiles intermédiaires'],
          },
          poet: {
            label: 'Poète',
            hint: '3/bord de prairie',
            fields: ['Bords de prairie'],
          },
        },
        options: {},
      },
    },
  },

  it: {
    ui: {
      tasks: 'Incarichi',
      bonusRow: 'Bandiere e più lungo',
      unlocked: 'Sbloccato',
      subtotals: 'Totali parziali',
      result: 'Risultato',
      newGame: 'Nuova partita',
      confirmReset: 'Svuotare il foglio e iniziare una nuova partita?',
      points: 'punti',
      pointsShort: 'pti',
      amount: 'Quantità',
      completedTasks: 'Incarichi completati',
      noScore: 'nessun punteggio',
      decrease: 'diminuisci',
      increase: 'aumenta',
      taskCard: 'Incarico da {points} punti',
      taskGroup: 'Incarichi {category}',
      language: 'Lingua',
      cancel: 'Annulla',
      clear: 'Svuota',
      game: 'Gioco',
      onBuilding: "sull'edificio",
      doublingHint: "Tocca due volte: l'incarico è sull'edificio e conta una seconda volta",
      computedFromTasks: 'Risulta dagli incarichi toccati due volte qui sopra',
      disclaimer: 'Progetto amatoriale non ufficiale, non affiliato a Pegasus Spiele. Dorfromantik è un marchio di Pegasus Spiele.',
    },
    games: {
      classic: {
        name: 'Classico',
        title: 'Blocco punteggi Dorfromantik',
        categories: {
          forest: {
            label: 'Bosco',
            bonus: 'Bandiere',
            bonusHint: 'Bandiera verde: tessere del territorio, ma solo se è completo',
          },
          grain: {
            label: 'Grano',
            bonus: 'Bandiere',
            bonusHint: 'Bandiera gialla: tessere del territorio, ma solo se è completo',
          },
          village: {
            label: 'Villaggio',
            bonus: 'Bandiere',
            bonusHint: 'Bandiera rossa: tessere del territorio, ma solo se è completo',
          },
          rail: {
            label: 'Binari',
            bonus: 'più lunghi',
            bonusHint: 'Numero di tessere dei binari più lunghi',
          },
          river: {
            label: 'Fiume',
            bonus: 'più lungo',
            bonusHint: 'Numero di tessere del fiume più lungo',
          },
        },
        unlocks: {
          forestCabin: {
            label: 'Capanna nel bosco',
            hint: 'incarichi Bosco',
            fields: [],
          },
          harvestFestival: {
            label: 'Festa del raccolto',
            hint: 'incarichi Grano',
            fields: [],
          },
          watchtower: {
            label: 'Torre di guardia',
            hint: 'incarichi Villaggio',
            fields: [],
          },
          locomotive: {
            label: 'Locomotiva',
            hint: 'incarichi Binari',
            fields: [],
          },
          ship: {
            label: 'Nave',
            hint: 'incarichi Fiume',
            fields: [],
          },
          trainStation: {
            label: 'Stazione',
            hint: 'completata = 1/tessera',
            fields: ['Tessere'],
          },
          harbour: {
            label: 'Porto',
            hint: 'completato = 1/tessera',
            fields: ['Tessere'],
          },
          redHearts: {
            label: 'Cuori rossi',
            hint: '1/bordo corrispondente',
            fields: ['Bordi corrispondenti'],
          },
          circus: {
            label: 'Circo',
            hint: 'completamente circondato = 10',
            fields: ['Circhi circondati'],
          },
          signalman: {
            label: 'Casellante',
            hint: '2/passaggio a livello',
            fields: ['Passaggi a livello'],
          },
          shepherdess: {
            label: 'Pastora',
            hint: '1/pecora',
            fields: ['Pecore'],
          },
          hill: {
            label: 'Collina',
            hint: 'a distanza 2 = 2/incarico',
            fields: ['Incarichi'],
          },
          constructionSite: {
            label: 'Cantiere',
            hint: 'per territorio 7+ = 7',
            fields: ['Territori da 7+'],
          },
          balloonLaunchSite: {
            label: 'Area mongolfiere',
            hint: '2/distanza',
            fields: ['Distanza'],
          },
          goldenHeart: {
            label: 'Cuore dorato',
            hint: '2/bordo corrispondente',
            fields: ['Bordi corrispondenti'],
          },
          adolfturm: {
            label: 'Adolfturm',
            hint: '1/bordo corrispondente',
            fields: ['Bordi corrispondenti'],
          },
          tvTower: {
            label: 'Torre della TV',
            hint: '1/bordo corrispondente',
            fields: ['Bordi corrispondenti'],
          },
          pegasus: {
            label: 'Pegaso',
            hint: '1/bordo corrispondente',
            fields: ['Bordi corrispondenti'],
          },
          greatMill: {
            label: 'Grande mulino',
            hint: '2/incarico + bonus',
            fields: ['Punti'],
          },
          photographer: {
            label: 'Fotografo',
            hint: '1/segnalino fotocamera',
            fields: ['Segnalini fotocamera'],
          },
          oldOak: {
            label: 'Vecchia quercia',
            hint: 'a distanza 2 = 1/bosco',
            fields: ['Tessere bosco'],
          },
          granary: {
            label: 'Granaio',
            hint: 'a distanza 2 = 1/grano',
            fields: ['Tessere grano'],
          },
          school: {
            label: 'Scuola',
            hint: 'a distanza 2 = 1/villaggio',
            fields: ['Tessere villaggio'],
          },
        },
        options: {
          secondFour: '2° incarico da 4 per colore (scatola 1)',
          tunnels: 'Tunnel: incarichi da 7 per Bosco, Grano, Villaggio (scatola 3)',
          miniExpansions: 'Mini espansioni',
        },
      },
      sakura: {
        name: 'Sakura',
        title: 'Blocco punteggi Sakura',
        categories: {
          cherry: {
            label: 'Ciliegi',
            bonus: 'Bandiere',
            bonusHint: 'Bandiera rosa: tessere del territorio, ma solo se è completo',
          },
          rice: {
            label: 'Risaie',
            bonus: 'Bandiere',
            bonusHint: 'Bandiera verde: tessere del territorio, ma solo se è completo',
          },
          village: {
            label: 'Villaggi',
            bonus: 'Bandiere',
            bonusHint: 'Bandiera rossa: tessere del territorio, ma solo se è completo',
          },
          road: {
            label: 'Strade',
            bonus: 'più lunga',
            bonusHint: 'Numero di tessere della strada più lunga',
          },
          river: {
            label: 'Fiumi',
            bonus: 'più lungo',
            bonusHint: 'Numero di tessere del fiume più lungo',
          },
          wraparound: {
            label: 'Incarichi circolari',
            bonus: 'più lungo = +2',
            bonusHint: '+2 per ogni incarico circolare lungo la strada / il fiume più lungo',
          },
          seven: {
            label: '7',
          },
        },
        unlocks: {
          cherryBlossoms: {
            label: 'Fiori di ciliegio',
            hint: 'raccolti',
            fields: ['Punti'],
          },
          temples: {
            label: 'Templi',
            hint: 'racchiuso con bordi corrispondenti = 6',
            fields: ['Templi racchiusi'],
          },
          hotSprings: {
            label: 'Sorgenti termali',
            hint: 'completata = 3 · 3/incarico circolare',
            fields: ['Sorgenti completate', 'Incarichi circolari'],
          },
          bridges: {
            label: 'Ponti',
            hint: 'fiume più lungo = 5/ponte',
            fields: ['Ponti'],
          },
          gates: {
            label: 'Porte',
            hint: 'strada più lunga = 5/porta',
            fields: ['Porte'],
          },
          hermit: {
            label: 'Eremita',
            hint: '3/bordo libero',
            fields: ['Bordi liberi'],
          },
          observatory: {
            label: 'Osservatorio',
            hint: 'territorio bandiera (TB) completato = 3/TB completato',
            fields: ['TB completati'],
          },
          cartographer: {
            label: 'Cartografo',
            hint: 'linea di vista = 2/incarico',
            fields: ['Incarichi'],
          },
          sumoWrestler: {
            label: 'Lottatore di sumo',
            hint: '1/bordo corrispondente',
            fields: ['Bordi corrispondenti'],
          },
          mossCollector: {
            label: 'Raccoglitrice di muschio',
            hint: '1/bordo corrispondente',
            fields: ['Bordi corrispondenti'],
          },
          riceFarmer: {
            label: 'Risicoltrice',
            hint: '1/bordo corrispondente',
            fields: ['Bordi corrispondenti'],
          },
          shipPier: {
            label: 'Nave e molo',
            hint: '1/tessera in mezzo',
            fields: ['Tessere in mezzo'],
          },
          oxCart: {
            label: 'Carro di buoi ed emporio',
            hint: '1/tessera in mezzo',
            fields: ['Tessere in mezzo'],
          },
          poet: {
            label: 'Poeta',
            hint: '3/bordo di prato',
            fields: ['Bordi di prato'],
          },
        },
        options: {},
      },
    },
  },

  es: {
    ui: {
      tasks: 'Misiones',
      bonusRow: 'Banderas y más largo',
      unlocked: 'Desbloqueado',
      subtotals: 'Subtotales',
      result: 'Resultado',
      newGame: 'Nueva partida',
      confirmReset: '¿Vaciar la hoja y empezar una nueva partida?',
      points: 'puntos',
      pointsShort: 'ptos',
      amount: 'Cantidad',
      completedTasks: 'Misiones completadas',
      noScore: 'sin puntuación',
      decrease: 'disminuir',
      increase: 'aumentar',
      taskCard: 'Misión de {points} puntos',
      taskGroup: 'Misiones {category}',
      language: 'Idioma',
      cancel: 'Cancelar',
      clear: 'Vaciar',
      game: 'Juego',
      onBuilding: 'sobre el edificio',
      doublingHint: 'Pulsa dos veces: la misión está sobre el edificio y puntúa otra vez',
      computedFromTasks: 'Resulta de las misiones pulsadas dos veces arriba',
      disclaimer: 'Proyecto de fans no oficial, sin vinculación con Pegasus Spiele. Dorfromantik es una marca de Pegasus Spiele.',
    },
    games: {
      classic: {
        name: 'Clásico',
        title: 'Bloc de puntuación Dorfromantik',
        categories: {
          forest: {
            label: 'Bosque',
            bonus: 'Banderas',
            bonusHint: 'Bandera verde: losetas del territorio, pero solo si está completo',
          },
          grain: {
            label: 'Cereal',
            bonus: 'Banderas',
            bonusHint: 'Bandera amarilla: losetas del territorio, pero solo si está completo',
          },
          village: {
            label: 'Pueblo',
            bonus: 'Banderas',
            bonusHint: 'Bandera roja: losetas del territorio, pero solo si está completo',
          },
          rail: {
            label: 'Vía férrea',
            bonus: 'más larga',
            bonusHint: 'Número de losetas de la vía férrea más larga',
          },
          river: {
            label: 'Río',
            bonus: 'más largo',
            bonusHint: 'Número de losetas del río más largo',
          },
        },
        unlocks: {
          forestCabin: {
            label: 'Cabaña forestal',
            hint: 'misiones de Bosque',
            fields: [],
          },
          harvestFestival: {
            label: 'Fiesta de la cosecha',
            hint: 'misiones de Cereal',
            fields: [],
          },
          watchtower: {
            label: 'Torre de vigilancia',
            hint: 'misiones de Pueblo',
            fields: [],
          },
          locomotive: {
            label: 'Locomotora',
            hint: 'misiones de Vía férrea',
            fields: [],
          },
          ship: {
            label: 'Barco',
            hint: 'misiones de Río',
            fields: [],
          },
          trainStation: {
            label: 'Estación',
            hint: 'terminada = 1/loseta',
            fields: ['Losetas'],
          },
          harbour: {
            label: 'Puerto',
            hint: 'terminado = 1/loseta',
            fields: ['Losetas'],
          },
          redHearts: {
            label: 'Corazones rojos',
            hint: '1/borde coincidente',
            fields: ['Bordes coincidentes'],
          },
          circus: {
            label: 'Circo',
            hint: 'completamente rodeado = 10',
            fields: ['Circos rodeados'],
          },
          signalman: {
            label: 'Guardabarrera',
            hint: '2/paso a nivel',
            fields: ['Pasos a nivel'],
          },
          shepherdess: {
            label: 'Pastora',
            hint: '1/oveja',
            fields: ['Ovejas'],
          },
          hill: {
            label: 'Colina',
            hint: 'a distancia 2 = 2/misión',
            fields: ['Misiones'],
          },
          constructionSite: {
            label: 'Obra',
            hint: 'por territorio 7+ = 7',
            fields: ['Territorios de 7+'],
          },
          balloonLaunchSite: {
            label: 'Base de globos',
            hint: '2/distancia',
            fields: ['Distancia'],
          },
          goldenHeart: {
            label: 'Corazón dorado',
            hint: '2/borde coincidente',
            fields: ['Bordes coincidentes'],
          },
          adolfturm: {
            label: 'Adolfturm',
            hint: '1/borde coincidente',
            fields: ['Bordes coincidentes'],
          },
          tvTower: {
            label: 'Torre de televisión',
            hint: '1/borde coincidente',
            fields: ['Bordes coincidentes'],
          },
          pegasus: {
            label: 'Pegaso',
            hint: '1/borde coincidente',
            fields: ['Bordes coincidentes'],
          },
          greatMill: {
            label: 'Gran molino',
            hint: '2/misión + bonus',
            fields: ['Puntos'],
          },
          photographer: {
            label: 'Fotógrafo',
            hint: '1/marcador de cámara',
            fields: ['Marcadores de cámara'],
          },
          oldOak: {
            label: 'Roble viejo',
            hint: 'a distancia 2 = 1/bosque',
            fields: ['Losetas de bosque'],
          },
          granary: {
            label: 'Granero',
            hint: 'a distancia 2 = 1/cereal',
            fields: ['Losetas de cereal'],
          },
          school: {
            label: 'Escuela',
            hint: 'a distancia 2 = 1/pueblo',
            fields: ['Losetas de pueblo'],
          },
        },
        options: {
          secondFour: '2.ª misión de 4 por color (caja 1)',
          tunnels: 'Túneles: misiones de 7 para Bosque, Cereal, Pueblo (caja 3)',
          miniExpansions: 'Miniexpansiones',
        },
      },
      sakura: {
        name: 'Sakura',
        title: 'Bloc de puntuación Sakura',
        categories: {
          cherry: {
            label: 'Cerezos',
            bonus: 'Banderas',
            bonusHint: 'Bandera rosa: losetas del territorio, pero solo si está completo',
          },
          rice: {
            label: 'Arrozales',
            bonus: 'Banderas',
            bonusHint: 'Bandera verde: losetas del territorio, pero solo si está completo',
          },
          village: {
            label: 'Pueblos',
            bonus: 'Banderas',
            bonusHint: 'Bandera roja: losetas del territorio, pero solo si está completo',
          },
          road: {
            label: 'Caminos',
            bonus: 'más largo',
            bonusHint: 'Número de losetas del camino más largo',
          },
          river: {
            label: 'Ríos',
            bonus: 'más largo',
            bonusHint: 'Número de losetas del río más largo',
          },
          wraparound: {
            label: 'Misiones circulares',
            bonus: 'más largo = +2',
            bonusHint: '+2 por cada misión circular junto al camino / río más largo',
          },
          seven: {
            label: '7',
          },
        },
        unlocks: {
          cherryBlossoms: {
            label: 'Flores de cerezo',
            hint: 'recogidas',
            fields: ['Puntos'],
          },
          temples: {
            label: 'Templos',
            hint: 'rodeado con bordes coincidentes = 6',
            fields: ['Templos rodeados'],
          },
          hotSprings: {
            label: 'Aguas termales',
            hint: 'completada = 3 · 3/misión circular',
            fields: ['Termas completadas', 'Misiones circulares'],
          },
          bridges: {
            label: 'Puentes',
            hint: 'río más largo = 5/puente',
            fields: ['Puentes'],
          },
          gates: {
            label: 'Puertas',
            hint: 'camino más largo = 5/puerta',
            fields: ['Puertas'],
          },
          hermit: {
            label: 'Ermitaño',
            hint: '3/borde libre',
            fields: ['Bordes libres'],
          },
          observatory: {
            label: 'Observatorio',
            hint: 'territorio de bandera (TB) completado = 3/TB completado',
            fields: ['TB completados'],
          },
          cartographer: {
            label: 'Cartógrafo',
            hint: 'línea de visión = 2/misión',
            fields: ['Misiones'],
          },
          sumoWrestler: {
            label: 'Luchador de sumo',
            hint: '1/borde coincidente',
            fields: ['Bordes coincidentes'],
          },
          mossCollector: {
            label: 'Recolectora de musgo',
            hint: '1/borde coincidente',
            fields: ['Bordes coincidentes'],
          },
          riceFarmer: {
            label: 'Arrocera',
            hint: '1/borde coincidente',
            fields: ['Bordes coincidentes'],
          },
          shipPier: {
            label: 'Barco y embarcadero',
            hint: '1/loseta intermedia',
            fields: ['Losetas intermedias'],
          },
          oxCart: {
            label: 'Carreta de bueyes y puesto comercial',
            hint: '1/loseta intermedia',
            fields: ['Losetas intermedias'],
          },
          poet: {
            label: 'Poeta',
            hint: '3/borde de pradera',
            fields: ['Bordes de pradera'],
          },
        },
        options: {},
      },
    },
  },

  pl: {
    ui: {
      tasks: 'Zlecenia',
      bonusRow: 'Flagi i najdłuższe',
      unlocked: 'Odblokowane',
      subtotals: 'Sumy częściowe',
      result: 'Wynik',
      newGame: 'Nowa partia',
      confirmReset: 'Wyczyścić arkusz i rozpocząć nową partię?',
      points: 'punktów',
      pointsShort: 'pkt',
      amount: 'Liczba',
      completedTasks: 'Ukończone zlecenia',
      noScore: 'brak punktacji',
      decrease: 'zmniejsz',
      increase: 'zwiększ',
      taskCard: 'Zlecenie za {points} punktów',
      taskGroup: 'Zlecenia: {category}',
      language: 'Język',
      cancel: 'Anuluj',
      clear: 'Wyczyść',
      game: 'Gra',
      onBuilding: 'leży na budynku',
      doublingHint: 'Dotknij dwa razy: zlecenie leży na budynku i liczy się ponownie',
      computedFromTasks: 'Wynika ze zleceń dotkniętych dwukrotnie powyżej',
      disclaimer: 'Nieoficjalny projekt fanowski, niezwiązany z Pegasus Spiele. Dorfromantik jest znakiem towarowym Pegasus Spiele.',
    },
    games: {
      classic: {
        name: 'Klasyczny',
        title: 'Blok punktacji Dorfromantik',
        categories: {
          forest: {
            label: 'Las',
            bonus: 'Flagi',
            bonusHint: 'Zielona flaga: płytki obszaru, ale tylko jeśli jest zamknięty',
          },
          grain: {
            label: 'Zboże',
            bonus: 'Flagi',
            bonusHint: 'Żółta flaga: płytki obszaru, ale tylko jeśli jest zamknięty',
          },
          village: {
            label: 'Wioska',
            bonus: 'Flagi',
            bonusHint: 'Czerwona flaga: płytki obszaru, ale tylko jeśli jest zamknięty',
          },
          rail: {
            label: 'Tory',
            bonus: 'najdłuższe',
            bonusHint: 'Liczba płytek najdłuższych torów',
          },
          river: {
            label: 'Rzeka',
            bonus: 'najdłuższa',
            bonusHint: 'Liczba płytek najdłuższej rzeki',
          },
        },
        unlocks: {
          forestCabin: {
            label: 'Leśniczówka',
            hint: 'zlecenia leśne',
            fields: [],
          },
          harvestFestival: {
            label: 'Dożynki',
            hint: 'zlecenia zbożowe',
            fields: [],
          },
          watchtower: {
            label: 'Wieża strażnicza',
            hint: 'zlecenia wioskowe',
            fields: [],
          },
          locomotive: {
            label: 'Lokomotywa',
            hint: 'zlecenia torowe',
            fields: [],
          },
          ship: {
            label: 'Statek',
            hint: 'zlecenia rzeczne',
            fields: [],
          },
          trainStation: {
            label: 'Dworzec',
            hint: 'ukończony = 1/płytka',
            fields: ['Płytki'],
          },
          harbour: {
            label: 'Port',
            hint: 'ukończony = 1/płytka',
            fields: ['Płytki'],
          },
          redHearts: {
            label: 'Czerwone serca',
            hint: '1/pasująca krawędź',
            fields: ['Pasujące krawędzie'],
          },
          circus: {
            label: 'Cyrk',
            hint: 'całkowicie otoczony = 10',
            fields: ['Otoczone cyrki'],
          },
          signalman: {
            label: 'Dróżnik',
            hint: '2/przejazd kolejowy',
            fields: ['Przejazdy kolejowe'],
          },
          shepherdess: {
            label: 'Pasterka',
            hint: '1/owca',
            fields: ['Owce'],
          },
          hill: {
            label: 'Wzgórze',
            hint: 'w odległości 2 = 2/zlecenie',
            fields: ['Zlecenia'],
          },
          constructionSite: {
            label: 'Plac budowy',
            hint: 'za obszar 7+ = 7',
            fields: ['Obszary 7+'],
          },
          balloonLaunchSite: {
            label: 'Lądowisko balonów',
            hint: '2/odległość',
            fields: ['Odległość'],
          },
          goldenHeart: {
            label: 'Złote serce',
            hint: '2/pasująca krawędź',
            fields: ['Pasujące krawędzie'],
          },
          adolfturm: {
            label: 'Adolfturm',
            hint: '1/pasująca krawędź',
            fields: ['Pasujące krawędzie'],
          },
          tvTower: {
            label: 'Wieża telewizyjna',
            hint: '1/pasująca krawędź',
            fields: ['Pasujące krawędzie'],
          },
          pegasus: {
            label: 'Pegaz',
            hint: '1/pasująca krawędź',
            fields: ['Pasujące krawędzie'],
          },
          greatMill: {
            label: 'Wielki młyn',
            hint: '2/zlecenie + bonus',
            fields: ['Punkty'],
          },
          photographer: {
            label: 'Fotograf',
            hint: '1/znacznik aparatu',
            fields: ['Znaczniki aparatu'],
          },
          oldOak: {
            label: 'Stary dąb',
            hint: 'w odległości 2 = 1/las',
            fields: ['Płytki lasu'],
          },
          granary: {
            label: 'Spichlerz',
            hint: 'w odległości 2 = 1/zboże',
            fields: ['Płytki zboża'],
          },
          school: {
            label: 'Szkoła',
            hint: 'w odległości 2 = 1/wioska',
            fields: ['Płytki wioski'],
          },
        },
        options: {
          secondFour: 'Drugie zlecenie za 4 na kolor (pudełko 1)',
          tunnels: 'Tunele: zlecenia za 7 dla Lasu, Zboża, Wioski (pudełko 3)',
          miniExpansions: 'Mini dodatki',
        },
      },
      sakura: {
        name: 'Sakura',
        title: 'Blok punktacji Sakura',
        categories: {
          cherry: {
            label: 'Wiśnie',
            bonus: 'Flagi',
            bonusHint: 'Różowa flaga: płytki obszaru, ale tylko jeśli jest zamknięty',
          },
          rice: {
            label: 'Pola ryżowe',
            bonus: 'Flagi',
            bonusHint: 'Zielona flaga: płytki obszaru, ale tylko jeśli jest zamknięty',
          },
          village: {
            label: 'Wioski',
            bonus: 'Flagi',
            bonusHint: 'Czerwona flaga: płytki obszaru, ale tylko jeśli jest zamknięty',
          },
          road: {
            label: 'Drogi',
            bonus: 'najdłuższa',
            bonusHint: 'Liczba płytek najdłuższej drogi',
          },
          river: {
            label: 'Rzeki',
            bonus: 'najdłuższa',
            bonusHint: 'Liczba płytek najdłuższej rzeki',
          },
          wraparound: {
            label: 'Zlecenia okrężne',
            bonus: 'najdłuższa = +2',
            bonusHint: '+2 za każde zlecenie okrężne przy najdłuższej drodze / rzece',
          },
          seven: {
            label: '7',
          },
        },
        unlocks: {
          cherryBlossoms: {
            label: 'Kwiaty wiśni',
            hint: 'zebrane',
            fields: ['Punkty'],
          },
          temples: {
            label: 'Świątynie',
            hint: 'otoczona pasującymi krawędziami = 6',
            fields: ['Otoczone świątynie'],
          },
          hotSprings: {
            label: 'Gorące źródła',
            hint: 'ukończone = 3 · 3/zlecenie okrężne',
            fields: ['Ukończone źródła', 'Zlecenia okrężne'],
          },
          bridges: {
            label: 'Mosty',
            hint: 'najdłuższa rzeka = 5/most',
            fields: ['Mosty'],
          },
          gates: {
            label: 'Bramy',
            hint: 'najdłuższa droga = 5/brama',
            fields: ['Bramy'],
          },
          hermit: {
            label: 'Pustelnik',
            hint: '3/wolna krawędź',
            fields: ['Wolne krawędzie'],
          },
          observatory: {
            label: 'Obserwatorium',
            hint: 'ukończony obszar flagi (OF) = 3/ukończony OF',
            fields: ['Ukończone OF'],
          },
          cartographer: {
            label: 'Kartograf',
            hint: 'linia wzroku = 2/zlecenie',
            fields: ['Zlecenia'],
          },
          sumoWrestler: {
            label: 'Zapaśnik sumo',
            hint: '1/pasująca krawędź',
            fields: ['Pasujące krawędzie'],
          },
          mossCollector: {
            label: 'Zbieraczka mchu',
            hint: '1/pasująca krawędź',
            fields: ['Pasujące krawędzie'],
          },
          riceFarmer: {
            label: 'Rolniczka ryżu',
            hint: '1/pasująca krawędź',
            fields: ['Pasujące krawędzie'],
          },
          shipPier: {
            label: 'Statek i przystań',
            hint: '1/płytka pomiędzy',
            fields: ['Płytki pomiędzy'],
          },
          oxCart: {
            label: 'Wóz z wołami i faktoria',
            hint: '1/płytka pomiędzy',
            fields: ['Płytki pomiędzy'],
          },
          poet: {
            label: 'Poeta',
            hint: '3/krawędź łąki',
            fields: ['Krawędzie łąki'],
          },
        },
        options: {},
      },
    },
  },

}
