import {useCallback, useMemo, useRef, useState} from 'react';
import {Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/react';
import Info from './Info';
import ListInput from './ezlinavis/ListInputComponent';
import Csv from './ezlinavis/CsvComponent';
import GraphView, {type GraphLayout} from './ezlinavis/GraphView';
import {getCooccurrences, makeCsv} from '../lib/cooccurrences';
import {parseList} from '../lib/parseList';

import examples from '../examples.json';

const layoutLabels: Record<GraphLayout, string> = {
  noverlap: 'NOverlap',
  forceatlas2: 'ForceAtlas2',
  force: 'Force',
  circular: 'Circular',
};

export default function EzlinavisComponent() {
  const [showAbout, setShowAbout] = useState(false);
  const [graphLayout, setGraphLayout] = useState<GraphLayout>('forceatlas2');
  const [listText, setListText] = useState('');
  const [parseText, setParseText] = useState('');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  const parsed = useMemo(() => parseList(parseText), [parseText]);
  const cooccurrences = useMemo(
    () => getCooccurrences(parsed.scenes),
    [parsed.scenes]
  );
  const csv = cooccurrences.length > 0 ? makeCsv(cooccurrences) : null;
  const isValid = parseText === '' ? undefined : parsed.isValid;

  const handleUserEdit = useCallback((text: string) => {
    setListText(text);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setParseText(text), 500);
  }, []);

  const loadText = useCallback((text: string) => {
    clearTimeout(debounceRef.current);
    setListText(text);
    setParseText(text);
  }, []);

  const selectExample = useCallback(
    (i: number) => {
      const example = examples[i];
      fetch(example.url)
        .then((response) => response.text())
        .then((text) => loadText(text))
        // eslint-disable-next-line no-console
        .catch((error) => console.log(error));
    },
    [loadText]
  );

  return (
    <div className="flex h-dvh flex-col">
      <nav className="flex items-center justify-between bg-gray-800 px-4 py-2 text-white">
        <button
          type="button"
          onClick={() => setShowAbout(true)}
          className="cursor-pointer text-lg font-semibold"
          title="Simple Network Visualization for Literary Texts"
        >
          Easy Linavis
        </button>
        <div className="flex items-center gap-2">
          <Menu>
            <MenuButton className="rounded px-3 py-1 hover:bg-gray-700">
              Examples ▾
            </MenuButton>
            <MenuItems
              anchor="bottom end"
              className="mt-1 max-h-[80vh] w-96 overflow-auto rounded bg-white text-xs text-black shadow-lg [--anchor-gap:4px]"
            >
              {examples.map((example, i) => (
                <MenuItem key={example.url}>
                  <button
                    type="button"
                    onClick={() => selectExample(i)}
                    className="block w-full px-3 py-1 text-left data-focus:bg-gray-100"
                  >
                    {example.title}
                  </button>
                </MenuItem>
              ))}
            </MenuItems>
          </Menu>
          <Menu>
            <MenuButton className="rounded px-3 py-1 hover:bg-gray-700">
              Graph ▾
            </MenuButton>
            <MenuItems
              anchor="bottom end"
              className="mt-1 w-40 rounded bg-white text-sm text-black shadow-lg [--anchor-gap:4px]"
            >
              {(['noverlap', 'forceatlas2', 'force', 'circular'] as const).map(
                (l) => (
                  <MenuItem key={l}>
                    <button
                      type="button"
                      onClick={() => setGraphLayout(l)}
                      className={`block w-full px-4 py-2 text-left data-focus:bg-gray-100 ${
                        graphLayout === l ? 'font-semibold' : ''
                      }`}
                    >
                      {layoutLabels[l]}
                    </button>
                  </MenuItem>
                )
              )}
            </MenuItems>
          </Menu>
          <button
            type="button"
            onClick={() => setShowAbout(true)}
            className="rounded px-3 py-1 hover:bg-gray-700"
          >
            About
          </button>
        </div>
      </nav>

      <Info show={showAbout} onHide={() => setShowAbout(false)} />

      <div className="flex min-h-0 flex-1 items-stretch overflow-hidden border-t border-[#a57878]">
        <ListInput
          text={listText}
          isValid={isValid}
          onListChange={handleUserEdit}
        />
        <Csv data={csv} />
        <div className="flex flex-3 flex-col border-l border-gray-500 p-1">
          <GraphView scenes={parsed.scenes} layout={graphLayout} />
        </div>
      </div>
    </div>
  );
}
