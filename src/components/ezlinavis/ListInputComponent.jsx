import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DebounceInput from 'react-debounce-input';

class ListInputComponent extends Component {
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
            value={this.props.text}
            onChange={e => this.props.onListChange(e.target.value)}
          />
        </div>
      </div>
    );
  }
}

ListInputComponent.displayName = 'EzlinavisListInputComponent';

ListInputComponent.propTypes = {
  text: PropTypes.string,
  isValid: PropTypes.bool,
  onListChange: PropTypes.func.isRequired
};

ListInputComponent.defaultProps = {
  text: '',
  isValid: false
};

export default ListInputComponent;
