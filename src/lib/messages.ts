import type { CategoryKey } from './scoring'

/** Languages the game was published in */
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

/**
 * Messages per language. German and English use the official terminology of the
 * Pegasus score pads; French, Italian, Spanish and Polish are our own
 * translations and may differ from the wording printed by the local publisher.
 */
export interface CategoryText {
  label: string
  /** Label of the bonus row; absent for the "7" column */
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

export interface Messages {
  ui: {
    title: string
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
  }
  categories: Record<CategoryKey, CategoryText>
  unlocks: Record<string, UnlockText>
}

export const MESSAGES: Record<Locale, Messages> = {
  de: {
    ui: {
      title: 'Sakura Wertungsblock',
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
    },
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
      road: { label: 'Wege', bonus: 'längste', bonusHint: 'Anzahl Plättchen der längsten Straße' },
      river: { label: 'Wasser', bonus: 'längste', bonusHint: 'Anzahl Plättchen des längsten Flusses' },
      wraparound: {
        label: 'Rundumaufträge',
        bonus: 'längste = +2',
        bonusHint: '+2 je Rundumauftrag an der längsten Straße / am längsten Fluss',
      },
      seven: { label: '7' },
    },
    unlocks: {
      cherryBlossoms: { label: 'Kirschblüten', hint: 'gesammelt', fields: ['Punkte'] },
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
      bridges: { label: 'Brücken', hint: 'längster Fluss = 5/Brücke', fields: ['Brücken'] },
      gates: { label: 'Tore', hint: 'längste Straße = 5/Tor', fields: ['Tore'] },
      hermit: { label: 'Einsiedler', hint: '3/freier Kante', fields: ['Freie Kanten'] },
      observatory: {
        label: 'Sternwarte',
        hint: 'abgeschlossenes Fahnengebiet (FG) = 3/abgeschlossenes FG',
        fields: ['Abgeschlossene FG'],
      },
      cartographer: { label: 'Kartograph', hint: 'Blickrichtung = 2/Auftrag', fields: ['Aufträge'] },
      sumoWrestler: { label: 'Sumoringer', hint: '1/passender Kante', fields: ['Passende Kanten'] },
      mossCollector: {
        label: 'Moossammlerin',
        hint: '1/passender Kante',
        fields: ['Passende Kanten'],
      },
      riceFarmer: { label: 'Reisbäuerin', hint: '1/passender Kante', fields: ['Passende Kanten'] },
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
      poet: { label: 'Poet', hint: '3/Wiesenkante', fields: ['Wiesenkanten'] },
    },
  },

  en: {
    ui: {
      title: 'Sakura Score Pad',
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
    },
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
      road: { label: 'Roads', bonus: 'Longest', bonusHint: 'Number of tiles in the longest Road' },
      river: { label: 'Rivers', bonus: 'Longest', bonusHint: 'Number of tiles in the longest River' },
      wraparound: {
        label: 'Wraparound Tasks',
        bonus: 'Longest = +2',
        bonusHint: '+2 per Wraparound Task on the longest Road / River',
      },
      seven: { label: '7' },
    },
    unlocks: {
      cherryBlossoms: { label: 'Cherry blossoms', hint: 'collected', fields: ['Points'] },
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
      bridges: { label: 'Bridges', hint: 'longest River = 5/Bridge', fields: ['Bridges'] },
      gates: { label: 'Gates', hint: 'longest Road = 5/Gate', fields: ['Gates'] },
      hermit: { label: 'Hermit', hint: '3/free edge', fields: ['Free edges'] },
      observatory: {
        label: 'Observatory',
        hint: 'completed Flag territory (FT) = 3/completed FT',
        fields: ['Completed FTs'],
      },
      cartographer: { label: 'Cartographer', hint: 'line of sight = 2/Task', fields: ['Tasks'] },
      sumoWrestler: { label: 'Sumo wrestler', hint: '1/matching edge', fields: ['Matching edges'] },
      mossCollector: { label: 'Moss collector', hint: '1/matching edge', fields: ['Matching edges'] },
      riceFarmer: { label: 'Rice farmer', hint: '1/matching edge', fields: ['Matching edges'] },
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
      poet: { label: 'Poet', hint: '3/meadow edge', fields: ['Meadow edges'] },
    },
  },

  fr: {
    ui: {
      title: 'Bloc de score Sakura',
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
    },
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
      seven: { label: '7' },
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
      bridges: { label: 'Ponts', hint: 'plus longue rivière = 5/pont', fields: ['Ponts'] },
      gates: { label: 'Portails', hint: 'plus longue route = 5/portail', fields: ['Portails'] },
      hermit: { label: 'Ermite', hint: '3/bord libre', fields: ['Bords libres'] },
      observatory: {
        label: 'Observatoire',
        hint: 'territoire de drapeau (TD) fermé = 3/TD fermé',
        fields: ['TD fermés'],
      },
      cartographer: { label: 'Cartographe', hint: 'ligne de vue = 2/mission', fields: ['Missions'] },
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
      poet: { label: 'Poète', hint: '3/bord de prairie', fields: ['Bords de prairie'] },
    },
  },

  it: {
    ui: {
      title: 'Blocco punteggi Sakura',
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
    },
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
      seven: { label: '7' },
    },
    unlocks: {
      cherryBlossoms: { label: 'Fiori di ciliegio', hint: 'raccolti', fields: ['Punti'] },
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
      bridges: { label: 'Ponti', hint: 'fiume più lungo = 5/ponte', fields: ['Ponti'] },
      gates: { label: 'Porte', hint: 'strada più lunga = 5/porta', fields: ['Porte'] },
      hermit: { label: 'Eremita', hint: '3/bordo libero', fields: ['Bordi liberi'] },
      observatory: {
        label: 'Osservatorio',
        hint: 'territorio bandiera (TB) completato = 3/TB completato',
        fields: ['TB completati'],
      },
      cartographer: { label: 'Cartografo', hint: 'linea di vista = 2/incarico', fields: ['Incarichi'] },
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
      poet: { label: 'Poeta', hint: '3/bordo di prato', fields: ['Bordi di prato'] },
    },
  },

  es: {
    ui: {
      title: 'Bloc de puntuación Sakura',
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
    },
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
      river: { label: 'Ríos', bonus: 'más largo', bonusHint: 'Número de losetas del río más largo' },
      wraparound: {
        label: 'Misiones circulares',
        bonus: 'más largo = +2',
        bonusHint: '+2 por cada misión circular junto al camino / río más largo',
      },
      seven: { label: '7' },
    },
    unlocks: {
      cherryBlossoms: { label: 'Flores de cerezo', hint: 'recogidas', fields: ['Puntos'] },
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
      bridges: { label: 'Puentes', hint: 'río más largo = 5/puente', fields: ['Puentes'] },
      gates: { label: 'Puertas', hint: 'camino más largo = 5/puerta', fields: ['Puertas'] },
      hermit: { label: 'Ermitaño', hint: '3/borde libre', fields: ['Bordes libres'] },
      observatory: {
        label: 'Observatorio',
        hint: 'territorio de bandera (TB) completado = 3/TB completado',
        fields: ['TB completados'],
      },
      cartographer: { label: 'Cartógrafo', hint: 'línea de visión = 2/misión', fields: ['Misiones'] },
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
      poet: { label: 'Poeta', hint: '3/borde de pradera', fields: ['Bordes de pradera'] },
    },
  },

  pl: {
    ui: {
      title: 'Blok punktacji Sakura',
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
    },
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
      seven: { label: '7' },
    },
    unlocks: {
      cherryBlossoms: { label: 'Kwiaty wiśni', hint: 'zebrane', fields: ['Punkty'] },
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
      bridges: { label: 'Mosty', hint: 'najdłuższa rzeka = 5/most', fields: ['Mosty'] },
      gates: { label: 'Bramy', hint: 'najdłuższa droga = 5/brama', fields: ['Bramy'] },
      hermit: { label: 'Pustelnik', hint: '3/wolna krawędź', fields: ['Wolne krawędzie'] },
      observatory: {
        label: 'Obserwatorium',
        hint: 'ukończony obszar flagi (OF) = 3/ukończony OF',
        fields: ['Ukończone OF'],
      },
      cartographer: { label: 'Kartograf', hint: 'linia wzroku = 2/zlecenie', fields: ['Zlecenia'] },
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
      poet: { label: 'Poeta', hint: '3/krawędź łąki', fields: ['Krawędzie łąki'] },
    },
  },
}
