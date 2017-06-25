import React from 'react';
import Modal, {closeStyle} from 'simple-react-modal';

require('font-awesome-webpack');
require('./Info.styl');

class Info extends React.Component {
  constructor () {
    super();
    this.state = {};
  }

  show () {
    this.setState({show: true});
  }

  close () {
    this.setState({show: false});
  }

  render () {
    return (
      <div className="info">
        <a
          title="About ezlinavis"
          className="info-button"
          onClick={this.show.bind(this)}
          >
          <i className="fa fa-info-circle fa-lg" />
        </a>

        <Modal
          containerStyle={{width: '90%', maxWidth: '700px', borderRadius: '10px'}}
          show={this.state.show}
          onClose={this.close.bind(this)}
          transitionSpeed={0}
          >

          <a style={closeStyle} onClick={this.close.bind(this)}>
            <i className="fa fa-close"/>
          </a>

          <div>
            <p>
              Easy Linavis (<em>ezlinavis</em>) generates CSV files with
              network data from simple segmentations of dramatic texts. In the
              <strong> left column</strong>, you can list segments (chapters,
              acts, scenes, etc.) and characters appearing or speaking in a
              given segment. Segments are indicated with a hashtag and they can
              be hierarchical, e.g.:
            </p>
            <pre>{`# First Act\n## First Scene\n### …`}</pre>
            <p>
              This will automatically generate a CSV file with node-node
              relations (source, type, target, weight) in the <strong>column in
              the centre</strong>. Data changes as you type: as soon as you
              change something in the first column, the mid-column changes
              accordingly. The &quot;type&quot; column in the CSV file is always
              &quot;undirected&quot; here, but we inserted it so you can
              directly work with the CSV files in Gephi. The network graph in
              the right column is also generated live, using a spring-embedded
              layout, just to give you a first impression of what your network
              data looks like. To make it easier to understand how ezlinavis
              works, we provide some example files which can be accessed via the
              drop-down menu in the first column.
            </p>
            <p>
              <em>ezlinavis</em> was developed by Carsten Milling and Frank
              Fischer, making use of the React and Sigma JS libraries. It is
              mainly meant for didactic purposes, although it could also be
              suitable to process simply-structured research data. We are mainly
              resorting to it in our workshops on network analysis of literary
              texts.
            </p>
          </div>
        </Modal>
      </div>

    );
  }
}

Info.defaultProps = {
};

export default Info;
