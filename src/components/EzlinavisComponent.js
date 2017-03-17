import React from 'react';
import {Parser} from 'nearley';
import Sigma from 'react-sigma/lib/Sigma';
import RelativeSize from 'react-sigma/lib/RelativeSize';
import RandomizeNodePositions from 'react-sigma/lib/RandomizeNodePositions';
import Grammar from './ezlinavis/grammar.ne';
import ListInput from 'components/ezlinavis/ListInputComponent';
import Csv from 'components/ezlinavis/CsvComponent';

require('styles/Ezlinavis.styl');

function listScenes (acts) {
  let scenes = [];
  acts.forEach(function (act) {
    if (!act.scenes) {
      return;
    }
    act.scenes.forEach(function (scene) {
      scenes.push({
        scene: scene.title,
        act: act.title,
        characters: scene.characters
      });
    });
  });
  return scenes;
}

function getCooccurrences (scenes) {
  let map = {};
  scenes.forEach(function (scene) {
    if (!scene.characters) {
      return;
    }
    scene.characters.forEach(function (c, i) {
      if (i < scene.characters.length - 1) {
        let others = scene.characters.slice(i + 1);
        others.forEach(function (o) {
          let pair = [c, o].sort();
          let key = pair.join('|');
          if (map[key]) {
            map[key][2]++;
          } else {
            map[key] = pair.concat(1);
          }
        });
      }
    });
  });

  let cooccurrences = [];
  Object.keys(map).sort().forEach(function (key) {
    cooccurrences.push(map[key]);
  });

  return cooccurrences;
}

function makeCsv (cooccurrences) {
  let csv = 'Source,Type,Target,Weight\n';
  cooccurrences.forEach(function (line) {
    line.splice(1, 0, '"Undirected"');
    csv += line.join(',') + '\n';
  });
  return csv;
}

function getCharacters (scenes) {
  let characters = [];
  scenes.forEach(function (scene) {
    if (!scene.characters) {
      return;
    }
    scene.characters.forEach(function (c) {
      if (characters.indexOf(c) === -1) {
        characters.push(c);
      }
    });
  });
  return characters;
}

function makeGraph (scenes) {
  let characters = getCharacters(scenes);
  let nodes = [];
  characters.forEach(function (c) {
    nodes.push({id: c, label: c});
  });
  let cooccurrences = getCooccurrences(scenes);
  let edges = [];
  cooccurrences.forEach(function (cooc) {
    edges.push({
      id: cooc[0] + '|' + cooc[1],
      source: cooc[0],
      target: cooc[1]
    });
  });
  return {nodes, edges};
}

class EzlinavisComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      listText: 'foo',
      list: [],
      isValid: null,
      csv: null
    };
  }

  handleListChange (text) {
    let list = [];
    let isValid = null;
    let parser = new Parser(Grammar.ParserRules, Grammar.ParserStart);
    try {
      parser.feed(text);
      list = parser.results[0] || [];
      isValid = true;
    } catch (err) {
      isValid = false;
      console.error(err);
    }

    let scenes = listScenes(list);
    let cooccurrences = getCooccurrences(scenes);
    let csv = cooccurrences.length > 0 ? makeCsv(cooccurrences) : null;
    let graph = makeGraph(scenes);
    this.setState({listText: text, list, isValid, csv, graph});
  }

  render () {
    console.log(this.state.graph);
    let sigma = null;
    if (this.state.graph && this.state.graph.nodes.length > 0) {
      sigma = (<Sigma
        renderer="canvas"
        graph={this.state.graph}
        settings={{drawEdges: true, drawEdgeLabels: true}}
        >
        <RelativeSize initialSize={15}/>
        <RandomizeNodePositions/>
      </Sigma>);
    }

    return (
      <div className="ezlinavis-component">
        <ListInput
          text={this.state.listText}
          isValid={this.state.isValid}
          onListChange={this.handleListChange.bind(this)}
          />
        <Csv data={this.state.csv}/>
        <div className="graph">{sigma}</div>
      </div>
    );
  }
}

EzlinavisComponent.displayName = 'EzlinavisComponent';

export default EzlinavisComponent;
