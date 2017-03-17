import React from 'react';

class ListInputComponent extends React.Component {
  render () {
    let className = this.props.text === '' ?
      '' :
      this.props.isValid ?
        'valid' :
        'invalid';

    return (
      <div className="listinput-component">
        <div className={className}>
          <textarea
            placeholder="Type a character list..."
            onInput={e => this.props.onListChange(e.target.value)}
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
