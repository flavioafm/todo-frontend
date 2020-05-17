import React, {createContext, useState, useRef} from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Divider from '@material-ui/core/Divider';

import _ from 'lodash';


import ProjectService from '../service/ProjectService';
import ButtonsEdition from '../components/ButtonsEdition';

const useStyles = makeStyles((theme) => ({
    card:{
      marginTop: theme.spacing(1, 1.5),
    },
    cardHeader: {
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    },
    addButton:{
        marginTop: '17px'
    },
    taskItem: {
        marginTop: '5px'
    },
    finishedAt: {
        marginTop: '0px',
        marginLeft: '32px'
    },
    divider: {
        margin: '20px 5px 20px 5px'
        // marginTop: '20px',
        // marginBottom: '20px',
    }
  }));

const Project = (props) => {

    const [titleNewTask, setTitleNewTask] = useState("");
    const [errorTitleNewTask, setErrorTitleNewTask] = useState(null);
    const [project, setProject] = useState(props.project);  
    const [tasks, setTasks] = useState(props.project.tasks);  
    
    const classes = useStyles();

    const handleChangeTitleNewTask = (event) =>{
        setTitleNewTask(event.target.value);
        event.preventDefault();
    }

    const reloadProject = async() => {
        const currentProject = await ProjectService.find(project._id);
        setProject(currentProject);
        setTasks(currentProject.tasks);
    }

    const handleNewTask = async () => {
        setErrorTitleNewTask(null);
        if (titleNewTask) {
            const projectUpdated = Object.assign([], project);
            projectUpdated.tasks.push({title: titleNewTask});
            const updatedProject = await ProjectService.update(projectUpdated);
            setProject(updatedProject);
            setTasks(updatedProject.tasks);
            setTitleNewTask("");
        } else {
            setErrorTitleNewTask('Task description is required.');
        }       
        
    }

    const handleChangeCheckTask = async (event, taskId) => {
        const tasksClone = Object.assign([], tasks);
        const taskIndex = _.findIndex(tasksClone, ["_id", taskId]);
        if (tasksClone[taskIndex] ) tasksClone[taskIndex].done = event.target.checked;

        const projectUpdated = Object.assign([], project);
        projectUpdated.tasks = tasksClone;
        const updatedProject = await ProjectService.update(projectUpdated);
        setProject(updatedProject);
        setTasks(updatedProject.tasks);
    }


    const handleDeleteTask = async (taskId) => {
        const projectUpdated = Object.assign([], project);
        
        const delTasks = _.remove(projectUpdated.tasks, function(item) {
            return item._id === taskId;
        });

        const updatedProject = await ProjectService.update(projectUpdated, _.map(delTasks, '_id'));
        //setProject(updatedProject);
        //setTasks(updatedProject.tasks);
        reloadProject()
    }

    const handleUpdatedTask = async (taskId, title) => {
        const projectUpdated = Object.assign([], project);
        
        const taskIndex = _.findIndex(projectUpdated.tasks, ["_id", taskId]);
        if (taskIndex >= 0) {
            projectUpdated.tasks[taskIndex].title = title;

            const updatedProject = await ProjectService.update(projectUpdated);
            setProject(updatedProject);
            setTasks(updatedProject.tasks);
        } else {
            props.reload();
        }
        
    }


    const handleDeleteProject = async (projectId) => {
        await ProjectService.delete(projectId);
        props.reload();        
    }

    const handleUpdateProject = async (projectId, title) => {
        const projectUpdated = Object.assign([], project);
        projectUpdated.title = title;
        const updatedProject = await ProjectService.update(projectUpdated);
        setProject(updatedProject);
        setTasks(updatedProject.tasks);
    }

    const handleShowFinishedAt = (rawDate) => {
        const date = new Date(rawDate);
        return date.toLocaleString()
    }

    const handleTooltip = (task) => {
        const createdAtMessage = `Created at ${handleShowFinishedAt(task.createdAt)}`;
        const finishedAtMessage = `Finished at ${handleShowFinishedAt(task.finishedAt)}`;
        return task.done ? 
            (<span>
                {createdAtMessage}
                <br/>
                {finishedAtMessage}
            </span>): 
            createdAtMessage
    }

    const handleSortTasks = (unsortedTasks) => {
        return _.sortBy(unsortedTasks, o => o.done)
    }

    const renderItens = (list) => {
        if (list.length) {
            return list.map(task => (
                    <Grid direction="row" container justify="space-between" alignItems="flex-start"  key={task._id}>
                        <Grid item xm={6} md={7} lg={8} xl={9}> 
                            <Tooltip 
                                //disableHoverListener={!task.done}
                                title={handleTooltip(task)} 
                                placement="bottom-start"
                            >
                                <FormGroup>
                                    <FormControlLabel 
                                        control={
                                            <Checkbox 
                                                checked={task.done} 
                                                onChange={(event) => handleChangeCheckTask(event, task._id)}
                                            />
                                        }
                                        label={task.title}
                                        className={classes.taskItem}
                                    />
                                </FormGroup>
                            </Tooltip>
                        </Grid>
                        <Grid item xm={6} md={5} lg={4} xl={3}>
                            {
                                !task.done && (
                                    <ButtonsEdition 
                                        item={task} 
                                        handleDelete={handleDeleteTask} 
                                        handleUpdate={handleUpdatedTask}
                                    />
                                )
                            }
                        </Grid>
                    </Grid>
                )
            )
        }
    }

    const renderLists = (list) => {
        const sortedList = handleSortTasks(list);
        const todoList = sortedList.filter(item => item.done === false);
        const doneList = sortedList.filter(item => item.done === true);
        return (
            <>
                {!!todoList.length && (
                    <>
                        <FormLabel component="legend">To Do</FormLabel>
                        {renderItens(todoList)}
                    </>
                )}
                {!!todoList.length && !!doneList.length && <Divider className={classes.divider} variant="middle" />}
                {!!doneList.length && (
                    <>
                        <FormLabel component="legend">Done</FormLabel>
                        {renderItens(doneList)}
                    </>
                )}
            </>
        )
    }


    return (
        <Card>
            <CardHeader
                subheader={project.title}
                subheaderTypographyProps={{ align: 'left' }}
                action={
                    <ButtonsEdition item={project} handleDelete={handleDeleteProject} handleUpdate={handleUpdateProject}/>
                }
                className={classes.cardHeader}
            />
            <CardContent>
                <Grid direction="row" container alignItems="flex-start" justify="space-between" >
                    <Grid item xs={10}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="titleNewTask"
                            label="New Task"
                            id="titleNewTask"
                            size="small"
                            value={titleNewTask}
                            helperText={errorTitleNewTask}
                            error={!!errorTitleNewTask}
                            onChange={handleChangeTitleNewTask}
                        />
                    </Grid>
                    <Grid item xm={2}>
                        <Button 
                            size="medium" 
                            margin="normal"
                            variant="contained" 
                            color="primary" 
                            className={classes.addButton}
                            onClick={handleNewTask}
                        >
                        Add
                        </Button>

                    </Grid>
                </Grid>
                {!!project.tasks.length && <Divider className={classes.divider} variant="middle" />}
                {
                    renderLists(project.tasks)
                    
                }
            </CardContent>
        </Card>
    )

}

export default Project;