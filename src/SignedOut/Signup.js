import React, {useState} from 'react';
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
import SnackbarContent from '@material-ui/core/SnackbarContent';
import AuthService from "../service/AuthService";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Flavio Mendes
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
    fields: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    link: {
		cursor: 'pointer'
    },
    error:{
		width: '100%',
		marginTop: '15px',
		marginBottom: '10px',
		elevation: 0,
		backgroundColor: theme.palette.secondary.main,
	}
}));

const SignUp = (props) => {
    const classes = useStyles();
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState(null);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(null);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(null);
    const [error, setError] = useState(null);

    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleFieldError = (data) => {
        switch (data.field) {
            case 'name':
                setNameError(data.error)
                break;
            case 'email':
                setEmailError(data.error)
                break;
            case 'password':
                setPasswordError(data.error)
                break;
            default:
                break;
        }
    }

    const handleClearFieldErros = () => {
        setNameError(null);
        setEmailError(null);
        setPasswordError(null);
    }

    const handleSignup = async () => {
        handleClearFieldErros();
		const result = await AuthService.register(name, email, password);
		if (result.status === 200){
		    props.history.push("/home");
		} else {
            if (result.data.field) {
                handleFieldError(result.data);
            } else {
                setError(result.data.error)
            }
        }
		
	}

    const handleLogin = () => {
        props.history.push("/login");
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="firstName"
                    label="Name"
                    autoFocus
                    defaultValue={name}
                    helperText={nameError}
                    error={!!nameError}
                    onKeyUp={handleNameChange}
                />
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    margin="normal"
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    defaultValue={email}
                    helperText={emailError}
                    error={!!emailError}
                    onKeyUp={handleEmailChange}
                />
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    margin="normal"
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    defaultValue={password}
                    helperText={passwordError}
                    error={!!passwordError}
                    onKeyUp={handlePasswordChange}
                />
                {
					error && (
						<SnackbarContent message={error} className={classes.error}/>
					)
				}				
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleSignup}
                >
                    Sign Up
                </Button>
                <Grid container justify="flex-end">
                    <Grid item>
                    <Link variant="body2" onClick={handleLogin} className={classes.link}>
                        Already have an account? Sign in
                    </Link>
                    </Grid>
                </Grid>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}

export default SignUp;