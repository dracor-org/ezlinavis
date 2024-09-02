import React from 'react';
import PropTypes from 'prop-types';
import {Modal, Button} from 'react-bootstrap';

import {version} from '../../package.json';

class Info extends React.Component {
  render() {
    return (
      <Modal {...this.props} bsSize="large">
        <Modal.Header closeButton>
          <Modal.Title>
            Easy Linavis: Simple Network Visualization for Literary Texts
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Easy Linavis (<em>ezlinavis</em>) generates CSV files with network
            data from simple segmentations of dramatic texts. In the{' '}
            <strong>left column</strong>, you can list segments (chapters, acts,
            scenes, etc.) and characters appearing or speaking in a given
            segment. Segments are indicated with a hashtag and they can be
            hierarchical, e.g.:
          </p>
          <pre>
            {'# First Act\n## First Scene\nCharacter 1\nCharacter 2\n…'}
          </pre>
          <p>
            This will automatically generate a CSV file with node-node relations
            (source, type, target, weight) in the{' '}
            <strong>column in the centre</strong>. Data changes as you type: as
            soon as you change something in the first column, the mid-column
            changes accordingly. The &quot;type&quot; column in the CSV file is
            always &quot;undirected&quot; here, but we inserted it so you can
            directly work with the CSV files in Gephi. The network graph in the{' '}
            <strong>right column</strong> is also generated live, using a
            spring-embedded layout, just to give you a first impression of what
            your network data looks like. To make it easier to understand how{' '}
            <em>ezlinavis</em> works, we provide some example files which can be
            accessed via the corresponding drop-down menu in the right upper
            corner.
          </p>
          <p>
            <em>ezlinavis</em> was developed in 2017 by Carsten Milling and
            Frank Fischer, using the React and Sigma JS libraries. It is mainly
            meant for didactic purposes (we are mainly resorting to it in our
            workshops on the network analysis of literary texts), although in
            principle it is also suited to handle bigger network data. If you
            want to contact us, please drop a line to
            fr.fischer(at)fu-berlin.de.
          </p>
          <p>
            Interestingly, ezlinavis has also been used in medical research (
            <a href="https://doi.org/doi:10.1007/s00432-022-04200-0">
              doi:10.1007/s00432-022-04200-0
            </a>
            ,
            <a href="https://doi.org/doi:10.21873/invivo.12976">
              doi:10.21873/invivo.12976
            </a>
            ).
          </p>
          <p>
            <b>How to cite</b>
            <br />
            Frank Fischer, Carsten Milling: Easy Linavis (Simple Network
            Visualisation for Literary Texts). In: HDH2017: "Sociedades,
            políticas, saberes". 18–20 October 2017. Málaga. Libro de resúmenes,
            pp. 173–176. (
            <a href="https://doi.org/doi:10.5281/zenodo.10478399">
              doi:10.5281/zenodo.10478399
            </a>
            )
          </p>
          <p>Version: {version}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

Info.propTypes = {
  onHide: PropTypes.func.isRequired,
};

export default Info;
