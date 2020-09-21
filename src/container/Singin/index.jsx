import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { login } from '../../redux/actions/user/auth.user'
import { Redirect } from 'react-router-dom';
import {toast} from 'react-toastify';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

toast.configure()
const SignIn = (props) => {
  const classes = useStyles();
  return props.isAuthenticated ? <Redirect to="/" /> :(
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Formik
       initialValues={{ email: '', password: '' }}
       validate={values => {
         const errors = {};
         if (!values.email) {
           errors.email = 'Required';
         } else if (
           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
         ) {
           errors.email = 'Invalid email address';
         }
         if (!values.password){
            errors.password = "required"
         }
         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
           props.login(values)
            .then(() => {
              toast.success("logged in successfuly", { 
                position: 
                  toast.POSITION.TOP_RIGHT, 
                  autoClose:5000
              })
              props.history.push('/')
            })
            .catch(err => {
              err.response && err.response.status !== 200 && toast.error(err.response.data.msg, { 
                                                          position: 
                                                            toast.POSITION.TOP_RIGHT, 
                                                            autoClose:5000
                                                        })
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            type="email"
            value={values.email}
            onChange={handleChange}
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            onBlur={handleBlur}
            autoFocus
          />
          {errors.email && touched.email && errors.email && <span style={{ color: 'red' }}>Invalid Input</span>}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            onBlur={handleBlur}
            label="Password"
            type="password"
            value={values.password}
            onChange={handleChange}
            id="password"
          />
          {errors.password && touched.password && errors.password && <span style={{ color: 'red' }}>Invalid Input<br /></span>}
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            // type="submit" 
            disabled={isSubmitting}
          >
            Sign In
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
    </Container>
  );
}
const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated
})
export default connect(mapStateToProps, { login })(SignIn)