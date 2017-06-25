import React from 'react';
import Info from './Info';

require('font-awesome-webpack');

const HeaderComponent = () => (
  <header className="header-component">
    <h1>Easy Linavis (Simple Network Visualization for Literary Texts)</h1>
    <Info/>
  </header>
);

HeaderComponent.displayName = 'HeaderComponent';

export default HeaderComponent;
