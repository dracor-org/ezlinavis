import React from 'react';

require('normalize.css/normalize.css');
require('styles/App.styl');

class AppComponent extends React.Component {
  render () {
    return (
      <div className="index">
        <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
