import React from 'react';
import DebounceInput from 'react-debounce-input';

class ListInputComponent extends React.Component {
  render () {
    const className = this.props.text === '' ?
      '' :
      this.props.isValid ?
        'valid' :
        'invalid';

    return (
      <div className="listinput-component">
        <div className={className}>
          <DebounceInput
            element="textarea"
            placeholder="Enter list of characters or choose one from examples"
            debounceTimeout={500}
            onChange={e => this.props.onListChange(e.target.value)}
            value={this.props.text}
            />
        </div>
      </div>
    );
  }
}

ListInputComponent.displayName = 'EzlinavisListInputComponent';

ListInputComponent.propTypes = {
  text: React.PropTypes.string,
  isValid: React.PropTypes.bool,
  onListChange: React.PropTypes.func
};

ListInputComponent.defaultProps = {
  text: ''
};

export default ListInputComponent;
