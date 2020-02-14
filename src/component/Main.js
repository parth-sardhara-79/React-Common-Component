import React from 'react';
import InputField, { CheckBox, RadioButtons } from './Input'
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import '../App.css';
import { toast } from 'react-toastify';

class CommonComponent extends React.Component {
  state = {
    formData: {
      email: "",
      password: "",
      age: 0,
      hobbies: [],
      gender: ""
    },
    errors: {}
  }

  getRegEx = (name) => {
    let regx = null;
    switch (name) {
      case 'email':
        regx = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
        break;
      case 'password':
        regx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
      default:
        break;
    }
    return regx;
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    const { formData } = this.state;
    this.setState({
      formData: {
        ...formData, [name]: value
      }
    });

  }
  handleHobbies = (event) => {
    const { hobbies } = this.state.formData;
    const { formData, errors } = this.state;
    let index;
    if (event.target.checked) {
      hobbies.push(event.target.value)
      errors[event.target.name] = "";
      this.setState({ errors })
    }
    else {
      index = hobbies.indexOf(event.target.value)
      hobbies.splice(index, 1)
    }
    this.setState({ formData: { ...formData, hobbies: hobbies } })
  }
  handleFocus = (event) => {
    const { errors } = this.state;
    const { name, value } = event.target;
    this.setState({
      errors: {
        ...errors,
        [name]: ""
      }
    })
  }

  handleSubmit = () => {
    const { formData, errors } = this.state;
    const requiredFields = {
      email: "", password: "", hobbies: "", gender: ""
    }
    let submit = false;
    Object.keys(requiredFields).forEach(data => {
      if (formData[data] === "" || formData[data].length === 0)
        errors[data] = `Please enter ${data}`
    })
    this.setState({ errors })
    Object.values(errors).forEach(data => {
      if (data.length !== 0)
        submit = true
    });
    if (!submit)
      toast.success("Success");
  }

  validateField = (event) => {
    const { name, value } = event.target;
    const { errors } = this.state;
    let errorMsg = "";
    if (!value) {
      errorMsg = `Please Enter ${(name)}.`;
    } else if (name === 'email' && !this.getRegEx('email').test(value)) {
      errorMsg = `Please Enter valid ${(name)}.`;
    } else if (name === "password" && !this.getRegEx('password').test(value)) {
      errorMsg = "Password must be greater than 6 characters & Combination of upper and lower case & special character";
    }
    this.setState({
      errors: {
        ...errors, [name]: errorMsg
      }
    })
  }
  render() {
    const { errors } = this.state;
    const { email, password, age, gender } = this.state.formData;
    const checkBoxes = [
      { id: "reading", value: "reading", label: "Reading" },
      { id: "writing", value: "writing", label: "Writing" },
      { id: "programming", value: "programming", label: "Programming" }
    ];
    const radiobuttons = [
      { id: "male", value: "male", label: "Male" },
      { id: "female", value: "female", label: "Female" }
    ];
    return (
      <div className="center-content">
        <Container className="mx-auto w-50 card">
          <Card.Body>
            <Card.Title className="center-item">LOGIN</Card.Title>
            <Row>
              <Col>
                <InputField
                  name="email"
                  title="Email address"
                  value={email}
                  isRequired={true}
                  onChange={this.handleChange}
                  onBlur={this.validateField}
                  onFocus={this.handleFocus}
                  errorMsg={errors.email}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <InputField
                  name="password"
                  title="Password"
                  isRequired={true}
                  value={password}
                  type="password"
                  onChange={this.handleChange}
                  onBlur={this.validateField}
                  onFocus={this.handleFocus}
                  errorMsg={errors.password}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <InputField
                  name="age"
                  title="Age"
                  value={age}
                  type="text"
                  isRequired={false}
                  onChange={this.handleChange}
                />
              </Col>
            </Row>
            <Row>
              <Col className="center-item">
                <Button onClick={this.handleSubmit} variant="dark">Submit</Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <CheckBox title="Hobbies"
                  name="hobbies"
                  checkbox={checkBoxes}
                  onChange={this.handleHobbies}
                  errorMsg={errors.hobbies}
                  isRequired={true}
                />
              </Col>
              <Col>
                <RadioButtons
                  title="Gender"
                  isRequired={true}
                  name="gender"
                  checked={gender}
                  radionutton={radiobuttons}
                  errorMsg={errors.gender}
                  onChange={this.handleChange}
                  onFocus={this.handleFocus}
                />
              </Col>
            </Row>
          </Card.Body>
        </Container>
      </div>);
  }
}

export default CommonComponent;