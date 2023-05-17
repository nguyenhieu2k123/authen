
import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from '@material-ui/core';
import jwtDecode from 'jwt-decode';
import { LockOutlined } from '@material-ui/icons';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useStyles from './style';
import Input from './Input';
import Icon from './icon';
import { signin, signup } from '../../actions/auth';
import { fetchGoogleResponse } from '../../api';

export default function Auth() {
  const initState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  const navigate = useNavigate();
  const [showPassWord, setShowPassWord] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initState);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = (e) => {
    setShowPassWord((prev) => !prev);
  };
  const handleSwitchModel = () => {
    setIsSignUp((prev) => !prev);
    setShowPassWord(false);
  };
  const googleFailure = (err) => {
    console.log('gg failure');
    console.log(err);
  };

  const googleSuccess = async (res) => {
    try {
      const googleDecodedRes = await fetchGoogleResponse(res);
      console.log(googleDecodedRes);
      const result = res?.profileObj;
      const token = res?.tokenId;
      dispatch({ type: 'AUTH', data: { result, token } });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography variant="h5">{isSignUp ? 'Sign up' : 'Sign in'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="First Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input name="email" label="Email address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassWord ? 'text' : 'password'} handleShowPassWord={handleShowPassword} />
            {isSignUp && <Input name="confirmPassword" label="Confirm password" handleChange={handleChange} type="password" />}
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.button}>
            {isSignUp ? 'Sign Up' : 'Sign in'}
          </Button>
          <GoogleLogin
            // clientId="119784807842-lh6kk972qn8s6ce30edugdgv4amspc39.apps.googleusercontent.com"
            render={
              (renderProps) => (
                <Button
                  className={classes.googleButton}
                  color="primary"
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<Icon />}
                  variant="contained"
                >
                  Google Signin
                </Button>
              )
            }
            onSuccess={googleSuccess}
            onError={googleFailure}

          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={handleSwitchModel}>
                {isSignUp ? 'Already have a account? Sign in' : "Don't have account? sign up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}
