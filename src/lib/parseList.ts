import {Grammar, Parser} from 'nearley';
import grammar from '../grammar.js';
import type {Scene} from './cooccurrences';

export interface ParsedList {
  header: string | null;
  sections: Scene[];
}

export interface ParseResult {
  isValid: boolean;
  scenes: Scene[];
  header: string | null;
}

export function parseList(text: string): ParseResult {
  const parser = new Parser(Grammar.fromCompiled(grammar));
  try {
    parser.feed(text);
    const list = (parser.results[0] as ParsedList) ?? {header: null, sections: []};
    return {
      isValid: true,
      scenes: list.sections ?? [],
      header: list.header ?? null,
    };
  } catch {
    return {isValid: false, scenes: [], header: null};
  }
}
