import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Row, Col, Container } from "react-bootstrap";
import { connect } from "react-redux";
import { Formik } from 'formik';
import { register } from '../../redux/actions/user/auth.user'
import { Redirect } from "react-router-dom";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = (props) => {
  const classes = useStyles();
  const [error, setError] = useState({})
  return props.isAuthenticated ? <Redirect to="/" /> : (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Create Account
            </Typography><Formik
       initialValues={{ email: '', password: '', firstName: '', lastName: '', confirmPass: '' }}
       validate={values => {
         const errors = {};
         if (!values.email) {
           errors.email = 'Required';
         } else if (
           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
         ) {
           errors.email = 'Invalid email address';
         }
         if (!values.firstName){
              errors.firstName = "required"
          }
          if (!values.lastName){
            errors.lastName = "required"
          }
          if (!values.password){
            errors.password = "required"
        }
         if (!values.confirmPass){
            errors.confirmPass = "required"
         }else if (values.confirmPass !== values.password){
            errors.confirmPass = "passwords must be matched"
         }

         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
            props.register(values)
              .then(() => props.history.push('/'))
              .catch(err => {
                if(err.response.status !== 200){
                  setError(err.response.data)
                }
              })
            setSubmitting(false);
         }, 600);
       }}
     >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         /* and other goodies */
       }) => (
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              { error && error.msg && <span>{error.msg}</span>}
              { error && error.password && <span>{error.password}</span>}
              <Row>
                <Col md={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    value={values.firstName}
                    onChange={handleChange}
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    type="text"
                    autoFocus
                  />
                </Col>
                <Col md={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    label="Last Name"
                    name="lastName"
                  />
                </Col>
              </Row>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={values.email}
                onChange={handleChange}
                id="email"
                label="Email Address"
                name="email"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                value={values.password}
                onChange={handleChange}
                label="Password"
                type="password"
                id="password"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                value={values.confirmPass}
                onChange={handleChange}
                fullWidth
                name="confirmPass"
                label="Repeat Password"
                type="password"
                id="confirmPass"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/forget_password" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
            )}
            </Formik>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Col>
      </Row>
    </Container>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated
})

export default connect(mapStateToProps, { register })(SignUp)