import React from 'react';
import Header from 'components/HeaderComponent';
import Ezlinavis from 'components/EzlinavisComponent';

require('font-awesome-webpack');
require('normalize.css/normalize.css');
require('styles/App.styl');

class AppComponent extends React.Component {
  render () {
    return (
      <div className="index">
        <Header/>
        <Ezlinavis/>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
