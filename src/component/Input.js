import React from 'react'
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

export const InputField = (props) => {
  return (<>
    {props.title + ":"}{props.isRequired && <span style={{ color: "red" }}>*</span>}
    <Form.Control
      type={props.type}
      name={props.name}
      className={props.errorMsg && "red-border"}
      title={props.title}
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      onFocus={props.onFocus}
    />
    {props.errorMsg && <span style={{ color: "red" }}>{props.errorMsg}</span>}
  </>)
}
InputField.defaultProps = {
  isRequired: false
}
InputField.propTypes = {
  type: PropTypes.oneOf(['text', 'email', 'password']),
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func

}