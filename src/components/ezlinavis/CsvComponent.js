import React from 'react';

class CsvComponent extends React.Component {
  render () {
    let link = null;
    if (this.props.data) {
      const uri = 'data:text/csv;base64,' +
        btoa(unescape(encodeURIComponent(this.props.data)));
      link = <a href={uri} download="ezlinavis.csv">download CSV</a>;
    }

    return (
      <div className="csv-component">
        {link}
        <div>
          <pre>{this.props.data}</pre>
        </div>
      </div>
    );
  }
}

CsvComponent.displayName = 'EzlinavisCsvComponent';

CsvComponent.propTypes = {
  data: React.PropTypes.string
};

export default CsvComponent;
