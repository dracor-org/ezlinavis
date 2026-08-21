import {describe, expect, it} from 'vitest';
import {
  getCharacters,
  getCooccurrences,
  makeCsv,
  type Scene,
} from './cooccurrences';

describe('getCharacters', () => {
  it('returns unique characters in order of first appearance', () => {
    const scenes: Scene[] = [
      {characters: ['Alice', 'Bob']},
      {characters: ['Bob', 'Carol', 'Alice']},
    ];
    expect(getCharacters(scenes)).toEqual(['Alice', 'Bob', 'Carol']);
  });

  it('skips scenes with null characters', () => {
    const scenes: Scene[] = [{characters: null}, {characters: ['Alice']}];
    expect(getCharacters(scenes)).toEqual(['Alice']);
  });

  it('returns empty array for empty input', () => {
    expect(getCharacters([])).toEqual([]);
  });
});

describe('getCooccurrences', () => {
  it('counts pairs across scenes', () => {
    const scenes: Scene[] = [
      {characters: ['Alice', 'Bob']},
      {characters: ['Alice', 'Bob', 'Carol']},
    ];
    const result = getCooccurrences(scenes);
    expect(result).toEqual([
      ['Alice', 'Bob', 2],
      ['Alice', 'Carol', 1],
      ['Bob', 'Carol', 1],
    ]);
  });

  it('deduplicates characters within a scene', () => {
    const scenes: Scene[] = [{characters: ['Alice', 'Alice', 'Bob']}];
    expect(getCooccurrences(scenes)).toEqual([['Alice', 'Bob', 1]]);
  });

  it('trims trailing spaces before deduplicating', () => {
    const scenes: Scene[] = [{characters: ['Alice ', 'Alice', 'Bob']}];
    expect(getCooccurrences(scenes)).toEqual([['Alice', 'Bob', 1]]);
  });

  it('skips scenes with null characters', () => {
    const scenes: Scene[] = [
      {characters: null},
      {characters: ['Alice', 'Bob']},
    ];
    expect(getCooccurrences(scenes)).toEqual([['Alice', 'Bob', 1]]);
  });

  it('sorts pairs alphabetically', () => {
    const scenes: Scene[] = [{characters: ['Bob', 'Alice']}];
    expect(getCooccurrences(scenes)).toEqual([['Alice', 'Bob', 1]]);
  });

  it('returns empty array when no cooccurrences', () => {
    expect(getCooccurrences([{characters: ['Alice']}])).toEqual([]);
  });
});

describe('makeCsv', () => {
  it('produces Gephi-style CSV', () => {
    const csv = makeCsv([
      ['Alice', 'Bob', 2],
      ['Alice', 'Carol', 1],
    ]);
    expect(csv).toBe(
      'Source,Type,Target,Weight\nAlice,Undirected,Bob,2\nAlice,Undirected,Carol,1\n'
    );
  });

  it('emits only the header for empty input', () => {
    expect(makeCsv([])).toBe('Source,Type,Target,Weight\n');
  });
});
