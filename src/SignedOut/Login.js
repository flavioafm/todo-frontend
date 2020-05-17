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
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

 const Login = (props) => {
	const classes = useStyles();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async () => {
		const result = await AuthService.login(email, password);
		if (result.user ){
			props.history.push("/home");
		}
		console.log(result)
	}

	const handleSignup = async () => {
		props.history.push("/signup");
	}

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
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
					onKeyUp={setEmail}
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
					onKeyUp={setPassword}
				/>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
					className={classes.submit}
					onClick={handleLogin}
				>
					Sign In
				</Button>
				<Grid container>
					<Grid>
					<Link variant="body2" onClick={handleSignup}>
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