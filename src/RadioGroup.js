import React, { PropTypes } from 'react';
import Radio from './Radio';

class RadioGroup extends React.Component {
    static propTypes = {
        children: PropTypes.arrayOf(function(props, propName, componentName) {
            var prop = props[propName];
            if(prop.type !== Radio) {
                return new Error('`' + componentName + '` only accepts `Radio` as children.');
            }
        }),
        name: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired
    }

    _handleChange = (value) => {
        this.props.onChange(value);
    }

    render() {
        var { name, onChange, value, children, ...otherProps} = this.props;

        return (
            <ul {...otherProps}>
                {React.Children.map(children, child => {
                    return (
                        <li>
                            {React.cloneElement(child, {
                                name: name,
                                checked: child.props.value === value,
                                onChange: this._handleChange
                            })}
                        </li>
                    );
                })}
            </ul>
        );
    }
}

export default RadioGroup;
