import React, {createContext, useState, useEffect, useRef} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import AuthService from '../service/AuthService';
import ProjectService from '../service/ProjectService';
import Project from '../components/Project';
import TextEditor from '../components/TextEditor';
import FabModalEditor from '../components/FabModalEditor';

const useStyles = makeStyles((theme) => ({
	'@global': {
		ul: {
		margin: 0,
		padding: 0,
		listStyle: 'none',
		},
	},
	appBar: {
		background: theme.palette.primary.main,
		borderBottom: `1px solid ${theme.palette.divider}`,
		marginBottom: '30px'
	},
	toolbar: {
		flexWrap: 'wrap',
	},
	toolbarTitle: {
		color: 'white',
		flexGrow: 1,
	},
	link: {
		color: 'white',
		margin: theme.spacing(1, 1.5),
	},
	heroContent: {
		padding: theme.spacing(8, 0, 6),
	},
	card:{
		marginTop: theme.spacing(1, 1.5),
	},
	cardHeader: {
		backgroundColor:
		theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
	},
	extendedIcon: {
		marginRight: theme.spacing(1),
	},
	fab: {
		position: 'absolute',
		bottom: theme.spacing(4),
		right: theme.spacing(4),
	},
}));


const Home = (props) => {

	const [load, setload] = useState(true);
	const anchorRef = useRef(null);
	const [open, setOpen] = useState(false);
	const [projects, setProjects] = useState([]);
	const [user, setUser] = useState(null)
	const classes = useStyles();

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
		return;
		}
		setOpen(false);
	};

	const handleLogout = () => {
		AuthService.logout();
		props.history.push("/login");
	};

	const handleListKeyDown = (event) => {
		if (event.key === 'Tab') {
		event.preventDefault();
		setOpen(false);
		}
	}

	const loadProjects = async () => {
		setProjects(await ProjectService.list());
	}

	useEffect(() => {
		if (AuthService.isAuthenticated()) {
			setUser(AuthService.getCurrentUser().user) 
			loadProjects();
		} else {
			handleLogout();
		}    
	}, [load]);


	const handleNewProject = (itemId, title) => {
		ProjectService.create(title);
		loadProjects();
	}

	return (
		<>
			<CssBaseline />
			<AppBar position="static" color="default" elevation={0} className={classes.appBar}>
				<Toolbar className={classes.toolbar}>
					<Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
						Todo List
					</Typography>
					<Button 
						color="inherit" 
						className={classes.link}
						ref={anchorRef}
						aria-controls={open ? 'menu-list-grow' : undefined}
						aria-haspopup="true"
						onClick={handleToggle}
						endIcon={<ArrowDropDownIcon/>}
						autoCapitalize={false}
					>
						{user?.name}
					</Button>
					<Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
						{({ TransitionProps, placement }) => (
							<Grow
							{...TransitionProps}
							style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
							>
							<Paper>
							<ClickAwayListener onClickAway={handleClose}>
								<MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
								<MenuItem onClick={handleLogout}>Logout</MenuItem>
								</MenuList>
							</ClickAwayListener>
							</Paper>
							</Grow>
						)}
					</Popper>
				</Toolbar>
			</AppBar>
			<Container component="main" maxWidth={false}>
				<Grid container spacing={5} alignItems="flex-start">
					{projects.map((project) => (
						<Grid item xs={12} sm={12} md={6} lg={4} key={project._id}>
							<Project project={project} reload={loadProjects}/>
						</Grid>
					))}
				</Grid>
			</Container>
			
			<FabModalEditor 
				itemId={"new"} 
				defaultValue={""} 
				confirmButton={handleNewProject}
				dialogTitle="Create a new Project"
				fieldLabel="Project name"
			/>
			
		</>
	);
}

export default Home;



