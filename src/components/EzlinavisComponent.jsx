import React, {Component} from 'react';
import {Parser, Grammar} from 'nearley';
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
import grammar from '../grammar';

import './EzlinavisComponent.css';

// load example lists
import examples from '../examples.json';

const edgeColor = '#999';
const nodeColor = '#555';

function getCooccurrences(scenes) {
  const map = {};
  scenes.forEach((scene) => {
    if (!scene.characters) {
      return;
    }
    // make sure each character occurs only once in scene
    const characters = scene.characters
      .map((c) => c.replace(/ +$/, '')) // trim trailing spaces
      .filter((v, i, a) => a.indexOf(v) === i);
    characters.forEach((c, i) => {
      if (i < characters.length - 1) {
        const others = characters.slice(i + 1);
        others.forEach((o) => {
          const pair = [c, o].sort();
          const key = pair.join('|');
          if (map[key]) {
            map[key][2]++;
          } else {
            map[key] = pair.concat(1);
          }
        });
      }
    });
  });

  const cooccurrences = [];
  Object.keys(map)
    .sort()
    .forEach((key) => {
      cooccurrences.push(map[key]);
    });

  return cooccurrences;
}

function makeCsv(cooccurrences) {
  let csv = 'Source,Type,Target,Weight\n';
  cooccurrences.forEach((line) => {
    line.splice(1, 0, 'Undirected');
    csv += line.join(',') + '\n';
  });
  return csv;
}

function getCharacters(scenes) {
  const characters = [];
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

function makeGraph(scenes) {
  const characters = getCharacters(scenes);
  const nodes = [];
  characters.forEach((c) => {
    nodes.push({id: c, label: c});
  });
  const cooccurrences = getCooccurrences(scenes);
  const edges = [];
  cooccurrences.forEach((cooc) => {
    edges.push({
      id: cooc[0] + '|' + cooc[1],
      source: cooc[0],
      target: cooc[1],
      size: cooc[2],
      // NB: we set the edge color here since the defaultEdgeColor in Sigma
      // settings does not to have any effect
      color: edgeColor,
    });
  });
  return {nodes, edges};
}

class EzlinavisComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAbout: false,
      graphLayout: 'forcelink',
      listText: '',
      isValid: null,
      csv: null,
    };
  }

  selectExample(i) {
    const example = examples[i];
    const {url} = example;
    const opts = {};
    console.log('loading %s', url);
    fetch(url, opts)
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        this.handleListChange(text);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleListChange(text) {
    let list = [];
    let isValid = null;
    const parser = new Parser(Grammar.fromCompiled(grammar));
    try {
      parser.feed(text);
      list = parser.results[0] || {};
      isValid = true;
    } catch (error) {
      isValid = false;
    }

    const scenes = list.sections || [];
    const cooccurrences = getCooccurrences(scenes);
    const csv = cooccurrences.length > 0 ? makeCsv(cooccurrences) : null;
    const graph = makeGraph(scenes);
    this.setState({listText: text, isValid, csv, graph});
  }

  render() {
    console.log(this.state.graph);

    const settings = {
      maxEdgeSize: 5,
      defaultLabelSize: 15,
      defaultEdgeColor: edgeColor, // FIXME: this does not seem to work
      defaultNodeColor: nodeColor,
      labelThreshold: 5,
      labelSize: 'fixed',
      drawLabels: true,
      drawEdges: true,
    };

    const layoutOptions = {
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

    const {graph} = this.state;

    let layout;
    if (this.state.graphLayout === 'noverlap') {
      layout = <NOverlap gridSize={10} maxIterations={100} />;
    } else if (this.state.graphLayout === 'noverlap') {
      layout = <ForceLink background easing="cubicInOut" />;
    } else {
      layout = <ForceAtlas2 {...layoutOptions} />;
    }

    let sigma = null;
    if (graph && graph.nodes.length > 0) {
      sigma = (
        <Sigma
          key={`sigma-component-${this.state.listText.length}-${this.state.graphLayout}`}
          renderer="canvas"
          graph={graph}
          settings={settings}
          style={{display: 'flex', flexGrow: 1}}
        >
          <EdgeShapes default="line" />
          <NodeShapes default="circle" />
          <RandomizeNodePositions>
            {layout}
            <RelativeSize initialSize={15} />
          </RandomizeNodePositions>
        </Sigma>
      );
    }

    const menuItems = [];
    examples.forEach((example, i) => {
      const item = (
        <MenuItem
          key={example.url}
          eventKey={i}
          onSelect={(eventKey) => this.selectExample(eventKey)}
        >
          {example.title}
        </MenuItem>
      );
      menuItems.push(item);
    });

    return (
      <div className="ezlinavis-component">
        <Navbar fluid>
          <Navbar.Header onClick={() => this.setState({showAbout: true})}>
            <Navbar.Brand title="Simple Network Visualization for Literary Texts">
              Easy Linavis
            </Navbar.Brand>
          </Navbar.Header>
          <Nav pullRight>
            <NavDropdown title="Examples" id="examples-menu">
              {menuItems}
            </NavDropdown>
            <NavDropdown
              title="Graph"
              id="graph-menu"
              onSelect={(layout) => this.setState({graphLayout: layout})}
            >
              <MenuItem
                eventKey="noverlap"
                active={this.state.graphLayout === 'noverlap'}
              >
                NOverlap
              </MenuItem>
              <MenuItem
                eventKey="forcelink"
                active={this.state.graphLayout === 'forcelink'}
              >
                ForceLink
              </MenuItem>
              <MenuItem
                eventKey="forceatlas2"
                active={this.state.graphLayout === 'forceatlas2'}
              >
                ForceAtlas2
              </MenuItem>
            </NavDropdown>
            <NavItem onClick={() => this.setState({showAbout: true})}>
              About
            </NavItem>
          </Nav>
        </Navbar>

        <Info
          show={this.state.showAbout}
          onHide={() => this.setState({showAbout: false})}
        />

        <div className="ezlinavis-columns">
          <ListInput
            text={this.state.listText}
            isValid={this.state.isValid}
            onListChange={this.handleListChange.bind(this)}
          />
          <Csv data={this.state.csv} />
          <div className="graph">{sigma}</div>
        </div>
      </div>
    );
  }
}

EzlinavisComponent.displayName = 'EzlinavisComponent';

export default EzlinavisComponent;
