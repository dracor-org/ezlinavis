import React from 'react';

let placeholder = `Type character list, e.g.

# ДЕЙСТВИЕ ПЕРВОЕ
## ЯВЛЕНИЕ I
Городничий
Аммос Федорович
Артемий Филипович
Лука Лукич
## ЯВЛЕНИЕ II
Почтмейстер
Городничий
Аммос Федорович
Артемий Филипович
Лука Лукич
...
`;

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
            placeholder={placeholder}
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
