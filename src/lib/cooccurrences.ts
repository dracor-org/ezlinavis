export interface Scene {
  title?: string;
  characters: string[] | null;
}

export type Cooccurrence = [string, string, number];

export function getCharacters(scenes: Scene[]): string[] {
  const characters: string[] = [];
  scenes.forEach((scene) => {
    if (!scene.characters) {
      return;
    }
    scene.characters.forEach((c) => {
      if (characters.indexOf(c) === -1) {
        characters.push(c);
      }
    });
  });
  return characters;
}

export function getCooccurrences(scenes: Scene[]): Cooccurrence[] {
  const map: Record<string, Cooccurrence> = {};
  scenes.forEach((scene) => {
    if (!scene.characters) {
      return;
    }
    const characters = scene.characters
      .map((c) => c.replace(/ +$/, ''))
      .filter((v, i, a) => a.indexOf(v) === i);
    characters.forEach((c, i) => {
      if (i < characters.length - 1) {
        const others = characters.slice(i + 1);
        others.forEach((o) => {
          const pair = [c, o].sort() as [string, string];
          const key = pair.join('|');
          if (map[key]) {
            map[key][2]++;
          } else {
            map[key] = [pair[0], pair[1], 1];
          }
        });
      }
    });
  });

  return Object.keys(map)
    .sort()
    .map((key) => map[key]);
}

export function makeCsv(cooccurrences: Cooccurrence[]): string {
  let csv = 'Source,Type,Target,Weight\n';
  cooccurrences.forEach(([source, target, weight]) => {
    csv += `${source},Undirected,${target},${weight}\n`;
  });
  return csv;
}
