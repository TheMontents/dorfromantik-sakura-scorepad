import type { CategoryKey } from './scoring'

/** Sprachen, in denen das Spiel erschienen ist */
export const LOCALES = ['de', 'en', 'fr', 'it', 'es', 'pl'] as const
export type Locale = (typeof LOCALES)[number]

/** Eigenbezeichnung je Sprache für den Umschalter */
export const LOCALE_NAMES: Record<Locale, string> = {
  de: 'Deutsch',
  en: 'English',
  fr: 'Français',
  it: 'Italiano',
  es: 'Español',
  pl: 'Polski',
}

/**
 * Texte je Sprache. Deutsch und Englisch verwenden die offizielle Terminologie
 * der Pegasus-Wertungsblätter; Französisch, Italienisch, Spanisch und Polnisch
 * sind eigene Übersetzungen und können vom gedruckten Block des jeweiligen
 * Verlags abweichen.
 */
export interface CategoryText {
  label: string
  /** Beschriftung der zweiten Zeile; fehlt bei der 7er-Spalte */
  bonus?: string
  bonusHint?: string
}

export interface UnlockText {
  label: string
  /** Regeltext wie auf dem Bogen */
  hint: string
  /** Beschriftung je Eingabefeld */
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
    /** {points} = Wert der Auftragskarte */
    taskCard: string
    /** {category} = Name der Kategorie */
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
      kirschbluete: {
        label: 'Kirschblüten',
        bonus: 'Fahnen',
        bonusHint: 'Rosa Fahne: Plättchen des Gebiets, aber nur wenn es abgeschlossen ist',
      },
      reisfeld: {
        label: 'Reisfelder',
        bonus: 'Fahnen',
        bonusHint: 'Grüne Fahne: Plättchen des Gebiets, aber nur wenn es abgeschlossen ist',
      },
      dorf: {
        label: 'Dorf',
        bonus: 'Fahnen',
        bonusHint: 'Rote Fahne: Plättchen des Gebiets, aber nur wenn es abgeschlossen ist',
      },
      weg: { label: 'Wege', bonus: 'längste', bonusHint: 'Anzahl Plättchen der längsten Straße' },
      wasser: { label: 'Wasser', bonus: 'längste', bonusHint: 'Anzahl Plättchen des längsten Flusses' },
      rundum: {
        label: 'Rundumaufträge',
        bonus: 'längste = +2',
        bonusHint: '+2 je Rundumauftrag an der längsten Straße / am längsten Fluss',
      },
      sieben: { label: '7' },
    },
    unlocks: {
      kirschbluetenGesammelt: { label: 'Kirschblüten', hint: 'gesammelt', fields: ['Punkte'] },
      tempel: {
        label: 'Tempel',
        hint: 'passend umschlossen = 6',
        fields: ['Umschlossene Tempel'],
      },
      heisseQuellen: {
        label: 'Heiße Quellen',
        hint: 'abgeschlossen = 3 · 3/Rundumauftrag',
        fields: ['Abgeschlossene Quellen', 'Rundumaufträge'],
      },
      bruecken: { label: 'Brücken', hint: 'längster Fluss = 5/Brücke', fields: ['Brücken'] },
      tore: { label: 'Tore', hint: 'längste Straße = 5/Tor', fields: ['Tore'] },
      einsiedler: { label: 'Einsiedler', hint: '3/freier Kante', fields: ['Freie Kanten'] },
      sternwarte: {
        label: 'Sternwarte',
        hint: 'abgeschlossenes Fahnengebiet (FG) = 3/abgeschlossenes FG',
        fields: ['Abgeschlossene FG'],
      },
      kartograph: { label: 'Kartograph', hint: 'Blickrichtung = 2/Auftrag', fields: ['Aufträge'] },
      sumoringer: { label: 'Sumoringer', hint: '1/passender Kante', fields: ['Passende Kanten'] },
      moossammlerin: {
        label: 'Moossammlerin',
        hint: '1/passender Kante',
        fields: ['Passende Kanten'],
      },
      reisbaeuerin: { label: 'Reisbäuerin', hint: '1/passender Kante', fields: ['Passende Kanten'] },
      schiffAnlegestelle: {
        label: 'Schiff-Anlegestelle',
        hint: '1/Plättchen dazwischen',
        fields: ['Plättchen dazwischen'],
      },
      ochsenkarren: {
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
      kirschbluete: {
        label: 'Cherry trees',
        bonus: 'Flags',
        bonusHint: 'Pink Flag: tiles of the territory, but only if it is complete',
      },
      reisfeld: {
        label: 'Rice fields',
        bonus: 'Flags',
        bonusHint: 'Green Flag: tiles of the territory, but only if it is complete',
      },
      dorf: {
        label: 'Villages',
        bonus: 'Flags',
        bonusHint: 'Red Flag: tiles of the territory, but only if it is complete',
      },
      weg: { label: 'Roads', bonus: 'Longest', bonusHint: 'Number of tiles in the longest Road' },
      wasser: { label: 'Rivers', bonus: 'Longest', bonusHint: 'Number of tiles in the longest River' },
      rundum: {
        label: 'Wraparound Tasks',
        bonus: 'Longest = +2',
        bonusHint: '+2 per Wraparound Task on the longest Road / River',
      },
      sieben: { label: '7' },
    },
    unlocks: {
      kirschbluetenGesammelt: { label: 'Cherry blossoms', hint: 'collected', fields: ['Points'] },
      tempel: {
        label: 'Temples',
        hint: 'enclosed with matching edges = 6',
        fields: ['Enclosed Temples'],
      },
      heisseQuellen: {
        label: 'Hot springs',
        hint: 'completed = 3 · 3/Wraparound Task',
        fields: ['Completed springs', 'Wraparound Tasks'],
      },
      bruecken: { label: 'Bridges', hint: 'longest River = 5/Bridge', fields: ['Bridges'] },
      tore: { label: 'Gates', hint: 'longest Road = 5/Gate', fields: ['Gates'] },
      einsiedler: { label: 'Hermit', hint: '3/free edge', fields: ['Free edges'] },
      sternwarte: {
        label: 'Observatory',
        hint: 'completed Flag territory (FT) = 3/completed FT',
        fields: ['Completed FTs'],
      },
      kartograph: { label: 'Cartographer', hint: 'line of sight = 2/Task', fields: ['Tasks'] },
      sumoringer: { label: 'Sumo wrestler', hint: '1/matching edge', fields: ['Matching edges'] },
      moossammlerin: { label: 'Moss collector', hint: '1/matching edge', fields: ['Matching edges'] },
      reisbaeuerin: { label: 'Rice farmer', hint: '1/matching edge', fields: ['Matching edges'] },
      schiffAnlegestelle: {
        label: 'Ship & Pier',
        hint: '1/tile in between',
        fields: ['Tiles in between'],
      },
      ochsenkarren: {
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
      kirschbluete: {
        label: 'Cerisiers',
        bonus: 'Drapeaux',
        bonusHint: "Drapeau rose : tuiles du territoire, mais seulement s'il est fermé",
      },
      reisfeld: {
        label: 'Rizières',
        bonus: 'Drapeaux',
        bonusHint: "Drapeau vert : tuiles du territoire, mais seulement s'il est fermé",
      },
      dorf: {
        label: 'Villages',
        bonus: 'Drapeaux',
        bonusHint: "Drapeau rouge : tuiles du territoire, mais seulement s'il est fermé",
      },
      weg: {
        label: 'Routes',
        bonus: 'la plus longue',
        bonusHint: 'Nombre de tuiles de la plus longue route',
      },
      wasser: {
        label: 'Rivières',
        bonus: 'la plus longue',
        bonusHint: 'Nombre de tuiles de la plus longue rivière',
      },
      rundum: {
        label: 'Missions circulaires',
        bonus: 'la plus longue = +2',
        bonusHint: '+2 par mission circulaire le long de la plus longue route / rivière',
      },
      sieben: { label: '7' },
    },
    unlocks: {
      kirschbluetenGesammelt: {
        label: 'Fleurs de cerisier',
        hint: 'collectées',
        fields: ['Points'],
      },
      tempel: {
        label: 'Temples',
        hint: 'entouré de bords correspondants = 6',
        fields: ['Temples entourés'],
      },
      heisseQuellen: {
        label: 'Sources chaudes',
        hint: 'terminée = 3 · 3/mission circulaire',
        fields: ['Sources terminées', 'Missions circulaires'],
      },
      bruecken: { label: 'Ponts', hint: 'plus longue rivière = 5/pont', fields: ['Ponts'] },
      tore: { label: 'Portails', hint: 'plus longue route = 5/portail', fields: ['Portails'] },
      einsiedler: { label: 'Ermite', hint: '3/bord libre', fields: ['Bords libres'] },
      sternwarte: {
        label: 'Observatoire',
        hint: 'territoire de drapeau (TD) fermé = 3/TD fermé',
        fields: ['TD fermés'],
      },
      kartograph: { label: 'Cartographe', hint: 'ligne de vue = 2/mission', fields: ['Missions'] },
      sumoringer: {
        label: 'Lutteur de sumo',
        hint: '1/bord correspondant',
        fields: ['Bords correspondants'],
      },
      moossammlerin: {
        label: 'Collectrice de mousse',
        hint: '1/bord correspondant',
        fields: ['Bords correspondants'],
      },
      reisbaeuerin: {
        label: 'Rizicultrice',
        hint: '1/bord correspondant',
        fields: ['Bords correspondants'],
      },
      schiffAnlegestelle: {
        label: 'Bateau et embarcadère',
        hint: '1/tuile intermédiaire',
        fields: ['Tuiles intermédiaires'],
      },
      ochsenkarren: {
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
      kirschbluete: {
        label: 'Ciliegi',
        bonus: 'Bandiere',
        bonusHint: 'Bandiera rosa: tessere del territorio, ma solo se è completo',
      },
      reisfeld: {
        label: 'Risaie',
        bonus: 'Bandiere',
        bonusHint: 'Bandiera verde: tessere del territorio, ma solo se è completo',
      },
      dorf: {
        label: 'Villaggi',
        bonus: 'Bandiere',
        bonusHint: 'Bandiera rossa: tessere del territorio, ma solo se è completo',
      },
      weg: {
        label: 'Strade',
        bonus: 'più lunga',
        bonusHint: 'Numero di tessere della strada più lunga',
      },
      wasser: {
        label: 'Fiumi',
        bonus: 'più lungo',
        bonusHint: 'Numero di tessere del fiume più lungo',
      },
      rundum: {
        label: 'Incarichi circolari',
        bonus: 'più lungo = +2',
        bonusHint: '+2 per ogni incarico circolare lungo la strada / il fiume più lungo',
      },
      sieben: { label: '7' },
    },
    unlocks: {
      kirschbluetenGesammelt: { label: 'Fiori di ciliegio', hint: 'raccolti', fields: ['Punti'] },
      tempel: {
        label: 'Templi',
        hint: 'racchiuso con bordi corrispondenti = 6',
        fields: ['Templi racchiusi'],
      },
      heisseQuellen: {
        label: 'Sorgenti termali',
        hint: 'completata = 3 · 3/incarico circolare',
        fields: ['Sorgenti completate', 'Incarichi circolari'],
      },
      bruecken: { label: 'Ponti', hint: 'fiume più lungo = 5/ponte', fields: ['Ponti'] },
      tore: { label: 'Porte', hint: 'strada più lunga = 5/porta', fields: ['Porte'] },
      einsiedler: { label: 'Eremita', hint: '3/bordo libero', fields: ['Bordi liberi'] },
      sternwarte: {
        label: 'Osservatorio',
        hint: 'territorio bandiera (TB) completato = 3/TB completato',
        fields: ['TB completati'],
      },
      kartograph: { label: 'Cartografo', hint: 'linea di vista = 2/incarico', fields: ['Incarichi'] },
      sumoringer: {
        label: 'Lottatore di sumo',
        hint: '1/bordo corrispondente',
        fields: ['Bordi corrispondenti'],
      },
      moossammlerin: {
        label: 'Raccoglitrice di muschio',
        hint: '1/bordo corrispondente',
        fields: ['Bordi corrispondenti'],
      },
      reisbaeuerin: {
        label: 'Risicoltrice',
        hint: '1/bordo corrispondente',
        fields: ['Bordi corrispondenti'],
      },
      schiffAnlegestelle: {
        label: 'Nave e molo',
        hint: '1/tessera in mezzo',
        fields: ['Tessere in mezzo'],
      },
      ochsenkarren: {
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
      kirschbluete: {
        label: 'Cerezos',
        bonus: 'Banderas',
        bonusHint: 'Bandera rosa: losetas del territorio, pero solo si está completo',
      },
      reisfeld: {
        label: 'Arrozales',
        bonus: 'Banderas',
        bonusHint: 'Bandera verde: losetas del territorio, pero solo si está completo',
      },
      dorf: {
        label: 'Pueblos',
        bonus: 'Banderas',
        bonusHint: 'Bandera roja: losetas del territorio, pero solo si está completo',
      },
      weg: {
        label: 'Caminos',
        bonus: 'más largo',
        bonusHint: 'Número de losetas del camino más largo',
      },
      wasser: { label: 'Ríos', bonus: 'más largo', bonusHint: 'Número de losetas del río más largo' },
      rundum: {
        label: 'Misiones circulares',
        bonus: 'más largo = +2',
        bonusHint: '+2 por cada misión circular junto al camino / río más largo',
      },
      sieben: { label: '7' },
    },
    unlocks: {
      kirschbluetenGesammelt: { label: 'Flores de cerezo', hint: 'recogidas', fields: ['Puntos'] },
      tempel: {
        label: 'Templos',
        hint: 'rodeado con bordes coincidentes = 6',
        fields: ['Templos rodeados'],
      },
      heisseQuellen: {
        label: 'Aguas termales',
        hint: 'completada = 3 · 3/misión circular',
        fields: ['Termas completadas', 'Misiones circulares'],
      },
      bruecken: { label: 'Puentes', hint: 'río más largo = 5/puente', fields: ['Puentes'] },
      tore: { label: 'Puertas', hint: 'camino más largo = 5/puerta', fields: ['Puertas'] },
      einsiedler: { label: 'Ermitaño', hint: '3/borde libre', fields: ['Bordes libres'] },
      sternwarte: {
        label: 'Observatorio',
        hint: 'territorio de bandera (TB) completado = 3/TB completado',
        fields: ['TB completados'],
      },
      kartograph: { label: 'Cartógrafo', hint: 'línea de visión = 2/misión', fields: ['Misiones'] },
      sumoringer: {
        label: 'Luchador de sumo',
        hint: '1/borde coincidente',
        fields: ['Bordes coincidentes'],
      },
      moossammlerin: {
        label: 'Recolectora de musgo',
        hint: '1/borde coincidente',
        fields: ['Bordes coincidentes'],
      },
      reisbaeuerin: {
        label: 'Arrocera',
        hint: '1/borde coincidente',
        fields: ['Bordes coincidentes'],
      },
      schiffAnlegestelle: {
        label: 'Barco y embarcadero',
        hint: '1/loseta intermedia',
        fields: ['Losetas intermedias'],
      },
      ochsenkarren: {
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
      kirschbluete: {
        label: 'Wiśnie',
        bonus: 'Flagi',
        bonusHint: 'Różowa flaga: płytki obszaru, ale tylko jeśli jest zamknięty',
      },
      reisfeld: {
        label: 'Pola ryżowe',
        bonus: 'Flagi',
        bonusHint: 'Zielona flaga: płytki obszaru, ale tylko jeśli jest zamknięty',
      },
      dorf: {
        label: 'Wioski',
        bonus: 'Flagi',
        bonusHint: 'Czerwona flaga: płytki obszaru, ale tylko jeśli jest zamknięty',
      },
      weg: {
        label: 'Drogi',
        bonus: 'najdłuższa',
        bonusHint: 'Liczba płytek najdłuższej drogi',
      },
      wasser: {
        label: 'Rzeki',
        bonus: 'najdłuższa',
        bonusHint: 'Liczba płytek najdłuższej rzeki',
      },
      rundum: {
        label: 'Zlecenia okrężne',
        bonus: 'najdłuższa = +2',
        bonusHint: '+2 za każde zlecenie okrężne przy najdłuższej drodze / rzece',
      },
      sieben: { label: '7' },
    },
    unlocks: {
      kirschbluetenGesammelt: { label: 'Kwiaty wiśni', hint: 'zebrane', fields: ['Punkty'] },
      tempel: {
        label: 'Świątynie',
        hint: 'otoczona pasującymi krawędziami = 6',
        fields: ['Otoczone świątynie'],
      },
      heisseQuellen: {
        label: 'Gorące źródła',
        hint: 'ukończone = 3 · 3/zlecenie okrężne',
        fields: ['Ukończone źródła', 'Zlecenia okrężne'],
      },
      bruecken: { label: 'Mosty', hint: 'najdłuższa rzeka = 5/most', fields: ['Mosty'] },
      tore: { label: 'Bramy', hint: 'najdłuższa droga = 5/brama', fields: ['Bramy'] },
      einsiedler: { label: 'Pustelnik', hint: '3/wolna krawędź', fields: ['Wolne krawędzie'] },
      sternwarte: {
        label: 'Obserwatorium',
        hint: 'ukończony obszar flagi (OF) = 3/ukończony OF',
        fields: ['Ukończone OF'],
      },
      kartograph: { label: 'Kartograf', hint: 'linia wzroku = 2/zlecenie', fields: ['Zlecenia'] },
      sumoringer: {
        label: 'Zapaśnik sumo',
        hint: '1/pasująca krawędź',
        fields: ['Pasujące krawędzie'],
      },
      moossammlerin: {
        label: 'Zbieraczka mchu',
        hint: '1/pasująca krawędź',
        fields: ['Pasujące krawędzie'],
      },
      reisbaeuerin: {
        label: 'Rolniczka ryżu',
        hint: '1/pasująca krawędź',
        fields: ['Pasujące krawędzie'],
      },
      schiffAnlegestelle: {
        label: 'Statek i przystań',
        hint: '1/płytka pomiędzy',
        fields: ['Płytki pomiędzy'],
      },
      ochsenkarren: {
        label: 'Wóz z wołami i faktoria',
        hint: '1/płytka pomiędzy',
        fields: ['Płytki pomiędzy'],
      },
      poet: { label: 'Poeta', hint: '3/krawędź łąki', fields: ['Krawędzie łąki'] },
    },
  },
}
