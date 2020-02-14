import React from 'react'
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

const InputField = (props) => {
  return (<>
    {props.title + ":"}{props.isRequired && <span style={{ color: "red" }}>*</span>}
    <Form.Control
      type={props.type}
      name={props.name}
      className={props.errorMsg && "red-border"}
      title={props.title}
      value={props.value}
      isRequired={props.isRequired}
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
  type: PropTypes.oneOf(['text', 'email', 'password', 'number']),
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func
}

export const CheckBox = (props) => {
  return (<>
    {props.title + ":"}{props.isRequired && <span style={{ color: "red" }}>*</span>}
    <div>
      {props.checkbox.map((check,key) => {
        return <Form.Check inline
          key={key}
          name={props.name}
          value={check.value}
          id={check.id}
          label={check.label}
          onChange={props.onChange}
        />
      })}
    </div>
    {props.errorMsg && <span style={{ color: "red" }}>{props.errorMsg}</span>}
  </>)
}
CheckBox.defaultProps = {
  isRequired: false
}
CheckBox.propTypes = {
  type: PropTypes.oneOf('checkbox').isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  title: PropTypes.string,
  isRequired: PropTypes.bool,
  onChange: PropTypes.func
}


export const RadioButtons = (props) => {
  return (<>
    {props.title + ":"}{props.isRequired && <span style={{ color: "red" }}>*</span>}
    <div>
      {props.radionutton.map((radio,key) => {
        return <Form.Check inline
          type="radio"
          key={key}
          name={props.name}
          value={radio.value}
          id={radio.id}
          label={radio.label}
          onChange={props.onChange}
          onFocus={props.onFocus}
          checked={props.checked === radio.value}
        />
      })}
    </div>
    {props.errorMsg && <span style={{ color: "red" }}>{props.errorMsg}</span>}
  </>)
}
RadioButtons.defaultProps = {
  isRequired: false
}
RadioButtons.prototype = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  errorMsg: PropTypes.string,
  isRequired: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func
}

export const DropDown = (props) => {
  return (<>
    {props.title + ":"}{props.isRequired && <span style={{ color: "red" }}>*</span>}
    <Form.Control as="select" name={props.name} value={props.value} onChange={props.onChange} onFocus={props.onFocus}>
      <option value="" label="--select--" />
      {
        props.options.map(option => {
          return <option value={option.value} label={option.label} />
        })
      }
    </Form.Control>
    {props.errorMsg && <span style={{ color: "red" }}>{props.errorMsg}</span>}
  </>);
}
DropDown.defaultProps = {
  isRequired: false
}
DropDown.protoTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  errorMsg: PropTypes.string
}
export default InputField;
