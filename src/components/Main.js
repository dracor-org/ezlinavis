import React from 'react';
import Ezlinavis from 'components/EzlinavisComponent';

require('normalize.css/normalize.css');
require('styles/App.styl');

class AppComponent extends React.Component {
  render () {
    return (
      <div className="index">
        <Ezlinavis/>
      </div>
    );
  }
}

export default AppComponent;
