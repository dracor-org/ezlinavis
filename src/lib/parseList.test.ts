import {readFileSync, readdirSync} from 'node:fs';
import {join} from 'node:path';
import {describe, expect, it} from 'vitest';
import {parseList} from './parseList';

const examplesDir = join(__dirname, '..', '..', 'public', 'examples');

describe('parseList', () => {
  it('parses a header and one section with characters', () => {
    const text = 'A play\nby someone\n\n# Act 1\nAlice\nBob\n';
    const result = parseList(text);
    expect(result.isValid).toBe(true);
    expect(result.scenes).toHaveLength(1);
    expect(result.scenes[0].characters).toEqual(['Alice', 'Bob']);
  });

  it('accepts multiple sections', () => {
    const text = '# Act 1\nAlice\n# Act 2\nBob\nCarol\n';
    const result = parseList(text);
    expect(result.isValid).toBe(true);
    expect(result.scenes).toHaveLength(2);
    expect(result.scenes[1].characters).toEqual(['Bob', 'Carol']);
  });

  it('treats any level of # as a section separator', () => {
    const text = '# Act 1\nAlice\n### Act 2\nBob\n';
    const result = parseList(text);
    expect(result.isValid).toBe(true);
    expect(result.scenes).toHaveLength(2);
  });

  it('returns no scenes when input has no sections', () => {
    const result = parseList('just a header line\n');
    expect(result.scenes).toEqual([]);
  });

  it('parses every bundled example without errors', () => {
    const files = readdirSync(examplesDir).filter((f) => f.endsWith('.txt'));
    expect(files.length).toBeGreaterThan(0);
    for (const file of files) {
      const text = readFileSync(join(examplesDir, file), 'utf-8');
      const result = parseList(text);
      expect(result.isValid, `${file} should parse`).toBe(true);
      expect(
        result.scenes.length,
        `${file} should have sections`
      ).toBeGreaterThan(0);
    }
  });
});
