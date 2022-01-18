import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import AuthService from "../service/AuthService";
import CircularProgress from '@material-ui/core/CircularProgress';


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
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
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

 const Login = (props) => {
	const classes = useStyles();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const [authenticating, setAuthenticating] = useState(false)

	const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

	const handleLogin = async () => {
		setAuthenticating(true);
		const result = await AuthService.login(email, password);
		if (result.status === 200){
			props.history.push("/home");
		} else {
			setError(result.data.error)
		}
		setAuthenticating(false);

	}

	const handleSignup = async () => {
		props.history.push("/signup");
	}

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Todo List
				</Typography>
				<TextField
					variant="outlined"
					margin="normal"
					required
					fullWidth
					id="email"
					label="Email Address"
					name="email"
					autoFocus
					defaultValue={email}
					onKeyUp={handleEmailChange}
				/>
				<TextField
					variant="outlined"
					margin="normal"
					required
					fullWidth
					name="password"
					label="Password"
					type="password"
					id="password"
					defaultValue={password}
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
					onClick={handleLogin}
				>
					{/* Sign In */}
					{
						authenticating && <CircularProgress size={24} color="inherit" />
					}
					{
						!authenticating && "Sign In"
					}
				</Button>
				<Grid container>
					<Grid>
						<Link variant="body2" onClick={handleSignup} className={classes.link}>
							{"Don't have an account? Sign Up"}
						</Link>
					</Grid>
				</Grid>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	);
}

export default Login;