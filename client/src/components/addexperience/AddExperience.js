import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { TextField, TextArea } from "../common";
import { addExperience } from "../../redux";

class AddExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: "",
      title: "",
      location: "",
      from: "",
      to: "",
      current: false,
      description: "",
      errors: {},
      disabled: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleOnInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleOnCheck = () => {
    const { disabled, current } = this.state;
    this.setState({
      disabled: !disabled,
      current: !current
    });
  };

  handleOnSubmit = async e => {
    e.preventDefault();

    const {
      company,
      title,
      location,
      from,
      to,
      current,
      description
    } = this.state;
    const { addExperience, history } = this.props;

    const expData = {
      company: company,
      title: title,
      location: location,
      from: from,
      to: to,
      current: current,
      description: description
    };

    addExperience(expData, history);
  };

  render() {
    const {
      company,
      title,
      location,
      from,
      to,
      current,
      description,
      errors,
      disabled
    } = this.state;
    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Experience</h1>
              <p className="lead text-center">
                Add any job or position that you have had in the past or current
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.handleOnSubmit}>
                <TextField
                  placeholder="* Company"
                  name="company"
                  value={company}
                  onChange={this.handleOnInputChange}
                  error={errors.company}
                />
                <TextField
                  placeholder="* Job Title"
                  name="title"
                  value={title}
                  onChange={this.handleOnInputChange}
                  error={errors.title}
                />
                <TextField
                  placeholder="Location"
                  name="location"
                  value={location}
                  onChange={this.handleOnInputChange}
                  error={errors.location}
                />
                <h6>From Date</h6>
                <TextField
                  name="from"
                  type="date"
                  value={from}
                  onChange={this.handleOnInputChange}
                  error={errors.from}
                />
                <h6>To Date</h6>
                <TextField
                  name="to"
                  type="date"
                  value={to}
                  onChange={this.handleOnInputChange}
                  error={errors.to}
                  disabled={disabled ? "disabled" : ""}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={current}
                    checked={current}
                    onChange={this.handleOnCheck}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current Job
                  </label>
                </div>
                <TextArea
                  placeholder="Job Description"
                  name="description"
                  value={description}
                  onChange={this.handleOnInputChange}
                  error={errors.description}
                  info="Tell us about the the position"
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addExperience })(
  withRouter(AddExperience)
);
