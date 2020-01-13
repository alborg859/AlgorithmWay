import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";

import { Link } from "react-router-dom";

//mui

import Grid from "@material-ui/core/Grid";

import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CircularProgress from "@material-ui/core/CircularProgress";

import axios from "axios";

//redux
import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';
import { width } from "@material-ui/system";

const styles = {
  form: {
    textAlign: "center",

    marginTop: "30px"
  },

  pageTitle: {
    color: "#2E2E3A",
    marginBottom: "20px"
  },

  bigAvatar: {
    marginBottom: "10px"
  },

  textField: {
    marginBottom: "13px",
    marginTop: "2px"
  },

  custError: {
    color: "red",
    fontSize: "0.9rem"
  },
  crtAcc: {
    textDecoration: "none",
    color: "#4d4d62",
    "&:hover": {
      color: "#8b8ba3",
      transition: "0.2s"
    }
  },

  button: {
    marginTop: "25px",
    position: "relative"
  },
  progress: {
    position: "absolute"
  }
};

export class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      handle: "",

      errors: {}
    };
    this.nick = React.createRef();
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });

    }

    if (!nextProps.UI.errors && !nextProps.UI.general && nextProps.UI.loading === false) {

      this.props.enqueueSnackbar('Verification email sent', {
        preventDuplicate: true,
        variant: "success",
        autoHideDuration: 3000,

      });
    }


  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    const userData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle
    };


    this.props.signupUser(userData, this.props.history);

  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { classes, UI: { loading } } = this.props;
    const { errors } = this.state;
    var handleHelper;

    if (!errors.handle)
      handleHelper = "Your nickname should be max 25 characters long";
    if (errors.handle) handleHelper = errors.handle;

    return (
      <Grid container className={classes.form}>
        <Grid item xs></Grid>
        <Grid item>
          <center>
            <Avatar className={classes.bigAvatar} src="logo192.png"></Avatar>
          </center>{" "}
          <br></br>
          <Typography variant="h5" className={classes.pageTitle}>
            Sign up to AlgorithmWay
          </Typography>
          <Card className={"formCard"}>
            <form noValidate onSubmit={this.handleSubmit}>
              <TextField
                inputProps={{ maxLength: 25 }}
                variant="outlined"
                ref={this.nick}
                color="primary"
                type="text"
                id="handle"
                name="handle"
                label="Username"
                className={classes.textField}
                value={this.state.handle}
                helperText={handleHelper}
                error={errors.handle ? true : false}
                onChange={this.handleChange}
                fullWidth
              ></TextField>

              <TextField
                inputProps={{ maxLength: 50 }}
                variant="outlined"
                color="primary"
                type="text"
                id="email"
                name="email"
                label="Email"
                className={classes.textField}
                value={this.state.email}
                helperText={errors.email}
                error={errors.email ? true : false}
                onChange={this.handleChange}
                fullWidth
              ></TextField>

              <TextField
                inputProps={{ maxLength: 25 }}
                variant="outlined"
                type="password"
                id="password"
                name="password"
                label="Password"
                className={classes.textField}
                value={this.state.password}
                helperText={
                  (errors.password,
                    "Your password should be between 8 and 25 characters long")
                }
                error={errors.password ? true : false}
                onChange={this.handleChange}
                fullWidth
              ></TextField>

              <TextField
                inputProps={{ maxLength: 25 }}
                variant="outlined"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm password"
                className={classes.textField}
                value={this.state.confirmPassword}
                helperText={errors.confirmPassword}
                error={errors.confirmPassword ? true : false}
                onChange={this.handleChange}
                fullWidth
              ></TextField>

              {errors.general && ( //if <= this then print => html
                <Typography variant="body2" className={classes.custError}>
                  {errors.general}
                </Typography>
              )}

              <Button
                disabled={loading}
                type="submit"
                variant="contained"
                color="secondary"
                className={classes.button}
              >
                Sign up
                {loading && (
                  <CircularProgress size={30} className={classes.progress} />
                )}
              </Button>
            </form>
          </Card>
          <Typography
            component={Link}
            className={classes.crtAcc}
            to="/login"
            variant="body1"
          >
            Already have an account?
          </Typography>
        </Grid>
        <Grid item xs></Grid>
      </Grid>
    );
  }
}
signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,

};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
})

export default connect(mapStateToProps, { signupUser })(withStyles(styles)(withSnackbar((signup))));
