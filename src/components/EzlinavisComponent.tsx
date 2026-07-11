import {useCallback, useMemo, useState} from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {
  Sigma,
  EdgeShapes,
  NodeShapes,
  ForceAtlas2,
  NOverlap,
  RelativeSize,
  RandomizeNodePositions,
} from 'react-sigma';
import ForceLink from 'react-sigma/lib/ForceLink';
import Info from './Info';
import ListInput from './ezlinavis/ListInputComponent';
import Csv from './ezlinavis/CsvComponent';
import {
  getCharacters,
  getCooccurrences,
  makeCsv,
  type Scene,
} from '../lib/cooccurrences';
import {parseList} from '../lib/parseList';

import './EzlinavisComponent.css';

import examples from '../examples.json';

const edgeColor = '#999';
const nodeColor = '#555';

type GraphLayout = 'noverlap' | 'forcelink' | 'forceatlas2';

interface SigmaGraph {
  nodes: {id: string; label: string}[];
  edges: {
    id: string;
    source: string;
    target: string;
    size: number;
    color: string;
  }[];
}

function makeGraph(scenes: Scene[]): SigmaGraph {
  const characters = getCharacters(scenes);
  const nodes = characters.map((c) => ({id: c, label: c}));
  const cooccurrences = getCooccurrences(scenes);
  const edges = cooccurrences.map(([source, target, size]) => ({
    id: `${source}|${target}`,
    source,
    target,
    size,
    // NB: we set the edge color here since the defaultEdgeColor in Sigma
    // settings does not to have any effect
    color: edgeColor,
  }));
  return {nodes, edges};
}

const sigmaSettings = {
  maxEdgeSize: 5,
  defaultLabelSize: 15,
  defaultEdgeColor: edgeColor, // FIXME: this does not seem to work
  defaultNodeColor: nodeColor,
  labelThreshold: 5,
  labelSize: 'fixed',
  drawLabels: true,
  drawEdges: true,
};

const forceAtlasOptions = {
  iterationsPerRender: 1,
  edgeWeightInfluence: 0,
  timeout: 1000,
  adjustSizes: false,
  gravity: 3,
  slowDown: 5,
  linLogMode: true,
  outboundAttractionDistribution: false,
  strongGravityMode: false,
};

export default function EzlinavisComponent() {
  const [showAbout, setShowAbout] = useState(false);
  const [graphLayout, setGraphLayout] = useState<GraphLayout>('forcelink');
  const [listText, setListText] = useState('');
  const [isValid, setIsValid] = useState<boolean | undefined>(undefined);
  const [csv, setCsv] = useState<string | null>(null);
  const [graph, setGraph] = useState<SigmaGraph | null>(null);

  const handleListChange = useCallback((text: string) => {
    const parsed = parseList(text);
    const cooccurrences = getCooccurrences(parsed.scenes);
    setListText(text);
    setIsValid(parsed.isValid);
    setCsv(cooccurrences.length > 0 ? makeCsv(cooccurrences) : null);
    setGraph(makeGraph(parsed.scenes));
  }, []);

  const selectExample = useCallback(
    (i: number) => {
      const example = examples[i];
      fetch(example.url)
        .then((response) => response.text())
        .then((text) => handleListChange(text))
        // eslint-disable-next-line no-console
        .catch((error) => console.log(error));
    },
    [handleListChange]
  );

  const layout = useMemo(() => {
    if (graphLayout === 'noverlap') {
      return <NOverlap gridSize={10} maxIterations={100} />;
    }
    if (graphLayout === 'forcelink') {
      return <ForceLink background easing="cubicInOut" />;
    }
    return <ForceAtlas2 {...forceAtlasOptions} />;
  }, [graphLayout]);

  const sigma =
    graph && graph.nodes.length > 0 ? (
      <Sigma
        key={`sigma-component-${listText.length}-${graphLayout}`}
        renderer="canvas"
        graph={graph}
        settings={sigmaSettings}
        style={{display: 'flex', flexGrow: 1}}
      >
        <EdgeShapes default="line" />
        <NodeShapes default="circle" />
        <RandomizeNodePositions>
          {layout}
          <RelativeSize initialSize={15} />
        </RandomizeNodePositions>
      </Sigma>
    ) : null;

  return (
    <div className="ezlinavis-component">
      <Navbar fluid>
        <Navbar.Header onClick={() => setShowAbout(true)}>
          <Navbar.Brand title="Simple Network Visualization for Literary Texts">
            Easy Linavis
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <NavDropdown title="Examples" id="examples-menu">
            {examples.map((example, i) => (
              <MenuItem
                key={example.url}
                eventKey={i}
                onSelect={(eventKey: number) => selectExample(eventKey)}
              >
                {example.title}
              </MenuItem>
            ))}
          </NavDropdown>
          <NavDropdown
            title="Graph"
            id="graph-menu"
            onSelect={(value: GraphLayout) => setGraphLayout(value)}
          >
            <MenuItem eventKey="noverlap" active={graphLayout === 'noverlap'}>
              NOverlap
            </MenuItem>
            <MenuItem eventKey="forcelink" active={graphLayout === 'forcelink'}>
              ForceLink
            </MenuItem>
            <MenuItem
              eventKey="forceatlas2"
              active={graphLayout === 'forceatlas2'}
            >
              ForceAtlas2
            </MenuItem>
          </NavDropdown>
          <NavItem onClick={() => setShowAbout(true)}>About</NavItem>
        </Nav>
      </Navbar>

      <Info show={showAbout} onHide={() => setShowAbout(false)} />

      <div className="ezlinavis-columns">
        <ListInput
          text={listText}
          isValid={isValid}
          onListChange={handleListChange}
        />
        <Csv data={csv} />
        <div className="graph">{sigma}</div>
      </div>
    </div>
  );
}
