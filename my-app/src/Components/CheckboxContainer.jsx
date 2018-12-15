import React from 'react';
import PropTypes from 'prop-types';
import checkboxes from './checkboxes';
import Checkbox from './Checkbox';
import NewsCardRender from './newsCardRender';

class CheckboxContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedItems: new Map(),
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const item = e.target.value;
    const isChecked = e.target.checked;
    this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
    this.props.callbackFromParent(this.state.checkedItems);
  }

  render() {
    return (
      <React.Fragment>
        {
          checkboxes.map(item => (
            <div className="filter-text" key={item.key}>
              <Checkbox name={item.name} val={item.val} checked={this.state.checkedItems.get(item.val)} onChange={this.handleChange} />
              {" "}{item.name}
            </div>
          ))
        }
      </React.Fragment>
    );
  }
}

export default CheckboxContainer;