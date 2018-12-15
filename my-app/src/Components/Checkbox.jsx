import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ type = 'checkbox', name, val, checked = false, onChange }) => (
  <input type={type} name={name} value={val} checked={checked} onChange={onChange} />
);

Checkbox.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  val: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

export default Checkbox;