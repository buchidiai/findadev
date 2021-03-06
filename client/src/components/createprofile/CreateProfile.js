import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { TextField, SelectListGroup, TextArea, InputGroup } from "../common";
import { createProfile } from "../../redux";
import { options } from "../../assets";

export class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubusername: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleOnInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleOnSubmit = e => {
    e.preventDefault();

    const {
      handle,
      company,
      website,
      location,
      skills,
      status,
      githubusername,
      bio,
      twitter,
      facebook,
      instagram,
      youtube,
      linkedin
    } = this.state;

    const { createProfile, history } = this.props;

    const profileData = {
      handle: handle,
      company: company,
      website: website,
      location: location,
      status: status,
      skills: skills,
      githubusername: githubusername,
      bio: bio,
      twitter: twitter,
      facebook: facebook,
      linkedin: linkedin,
      youtube: youtube,
      instagram: instagram
    };

    createProfile(profileData, history);
  };

  render() {
    const {
      handle,
      status,
      company,
      website,
      location,
      bio,
      skills,
      githubusername,
      errors,
      displaySocialInputs,
      twitter,
      facebook,
      youtube,
      linkedin,
      instagram
    } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={twitter}
            onChange={this.handleOnInputChange}
            error={errors.twitter}
          />

          <InputGroup
            placeholder="Facebook Page URL"
            name="facebook"
            icon="fab fa-facebook"
            value={facebook}
            onChange={this.handleOnInputChange}
            error={errors.facebook}
          />

          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={linkedin}
            onChange={this.handleOnInputChange}
            error={errors.linkedin}
          />

          <InputGroup
            placeholder="YouTube Channel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={youtube}
            onChange={this.handleOnInputChange}
            error={errors.youtube}
          />

          <InputGroup
            placeholder="Instagram Page URL"
            name="instagram"
            icon="fab fa-instagram"
            value={instagram}
            onChange={this.handleOnInputChange}
            error={errors.instagram}
          />
        </div>
      );
    }
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.handleOnSubmit}>
                <TextField
                  placeholder="* Profile Handle"
                  name="handle"
                  value={handle}
                  onChange={this.handleOnInputChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your full name, company name, nickname"
                />
                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={status}
                  onChange={this.handleOnInputChange}
                  options={options}
                  error={errors.status}
                  info="Give us an idea of where you are at in your career"
                />
                <TextField
                  placeholder="Company"
                  name="company"
                  value={company}
                  onChange={this.handleOnInputChange}
                  error={errors.company}
                  info="Could be your own company or one you work for"
                />
                <TextField
                  placeholder="Website"
                  name="website"
                  value={website}
                  onChange={this.handleOnInputChange}
                  error={errors.website}
                  info="Could be your own website or a company one"
                />
                <TextField
                  placeholder="Location"
                  name="location"
                  value={location}
                  onChange={this.handleOnInputChange}
                  error={errors.location}
                  info="City or city & state suggested (eg. Boston, MA)"
                />
                <TextField
                  placeholder="* Skills"
                  name="skills"
                  value={skills}
                  onChange={this.handleOnInputChange}
                  error={errors.skills}
                  info="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP"
                />
                <TextField
                  placeholder="Github Username"
                  name="githubusername"
                  value={githubusername}
                  onChange={this.handleOnInputChange}
                  error={errors.githubusername}
                  info="If you want your latest repos and a Github link, include your username"
                />
                <TextArea
                  placeholder="Short Bio"
                  name="bio"
                  value={bio}
                  onChange={this.handleOnInputChange}
                  error={errors.bio}
                  info="Tell us a little about yourself"
                />
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
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

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);
