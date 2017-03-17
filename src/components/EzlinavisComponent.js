import React from 'react';
import ListInput from 'components/ezlinavis/ListInputComponent';
import Csv from 'components/ezlinavis/CsvComponent';

require('styles/Ezlinavis.styl');

class EzlinavisComponent extends React.Component {
  render () {
    return (
      <div className="ezlinavis-component">
        <ListInput/>
        <Csv/>
      </div>
    );
  }
}

EzlinavisComponent.displayName = 'EzlinavisComponent';

export default EzlinavisComponent;
