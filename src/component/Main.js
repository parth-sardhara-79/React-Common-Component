import React from 'react';
import { InputField } from './Input'
import { Container, Card, Button, Row, FormGroup, Col } from 'react-bootstrap';
import '../App.css'
class CommonComponent extends React.Component {
  state = {
    formData: {
      email: "",
      password: ""
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
    })
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
    const { email, password } = this.state.formData;
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
              <Col className="center-item">
                <Button onClick={this.handleSubmit} variant="dark">Submit</Button>
              </Col>
            </Row>
          </Card.Body>
        </Container>
      </div>);
  }
}

export default CommonComponent;