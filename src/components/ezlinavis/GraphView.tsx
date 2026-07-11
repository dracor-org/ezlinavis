import {useEffect} from 'react';
import Graph from 'graphology';
import {SigmaContainer, useLoadGraph, useSigma} from '@react-sigma/core';
import {useWorkerLayoutForceAtlas2} from '@react-sigma/layout-forceatlas2';
import {useWorkerLayoutNoverlap} from '@react-sigma/layout-noverlap';
import '@react-sigma/core/lib/style.css';

import type {Scene} from '../../lib/cooccurrences';
import {getCharacters, getCooccurrences} from '../../lib/cooccurrences';

export type GraphLayout = 'noverlap' | 'forceatlas2';

const nodeColor = '#555';
const edgeColor = '#999';

function buildGraph(scenes: Scene[]): Graph {
  const graph = new Graph({multi: false, type: 'undirected'});
  const characters = getCharacters(scenes);

  characters.forEach((c, i) => {
    const angle = (2 * Math.PI * i) / Math.max(characters.length, 1);
    graph.addNode(c, {
      label: c,
      x: Math.cos(angle),
      y: Math.sin(angle),
      size: 6,
      color: nodeColor,
    });
  });

  const cooccurrences = getCooccurrences(scenes);
  const maxWeight = cooccurrences.reduce((m, [, , w]) => Math.max(m, w), 1);

  cooccurrences.forEach(([source, target, weight]) => {
    graph.addEdge(source, target, {
      size: 1 + (4 * weight) / maxWeight,
      color: edgeColor,
    });
  });

  return graph;
}

function LoadGraph({scenes}: {scenes: Scene[]}) {
  const loadGraph = useLoadGraph();
  useEffect(() => {
    loadGraph(buildGraph(scenes));
  }, [scenes, loadGraph]);
  return null;
}

const FORCEATLAS_DURATION_MS = 2000;
const NOVERLAP_DURATION_MS = 2000;

function ForceAtlasLayout({scenes}: {scenes: Scene[]}) {
  const {start, stop} = useWorkerLayoutForceAtlas2({
    settings: {gravity: 3, slowDown: 5, linLogMode: true},
  });
  useEffect(() => {
    start();
    const t = setTimeout(stop, FORCEATLAS_DURATION_MS);
    return () => {
      clearTimeout(t);
      stop();
    };
  }, [start, stop, scenes]);
  return null;
}

function NoverlapLayout({scenes}: {scenes: Scene[]}) {
  const {start, stop} = useWorkerLayoutNoverlap({
    settings: {gridSize: 10},
  });
  useEffect(() => {
    start();
    const t = setTimeout(stop, NOVERLAP_DURATION_MS);
    return () => {
      clearTimeout(t);
      stop();
    };
  }, [start, stop, scenes]);
  return null;
}

function RefreshOnSceneChange({scenes}: {scenes: Scene[]}) {
  const sigma = useSigma();
  useEffect(() => {
    sigma.refresh();
  }, [scenes, sigma]);
  return null;
}

interface Props {
  scenes: Scene[];
  layout: GraphLayout;
}

export default function GraphView({scenes, layout}: Props) {
  return (
    <SigmaContainer
      style={{height: '100%', width: '100%'}}
      settings={{
        defaultNodeColor: nodeColor,
        defaultEdgeColor: edgeColor,
        labelDensity: 0.07,
        labelGridCellSize: 60,
        labelRenderedSizeThreshold: 6,
      }}
    >
      <LoadGraph scenes={scenes} />
      {layout === 'forceatlas2' ? (
        <ForceAtlasLayout scenes={scenes} />
      ) : (
        <NoverlapLayout scenes={scenes} />
      )}
      <RefreshOnSceneChange scenes={scenes} />
    </SigmaContainer>
  );
}
