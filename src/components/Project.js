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
        marginTop: '7px'
    },
    taskItem: {
        marginTop: '5px'
    },
    finishedAt: {
        marginTop: '0px',
        marginLeft: '32px'
    },
    divider: {
        margin: '20px'
    }
  }));

const Project = (props) => {

    const [titleNewTask, setTitleNewTask] = useState("");
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
        if (titleNewTask) {
            const projectUpdated = Object.assign([], project);
            projectUpdated.tasks.push({title: titleNewTask});
            const updatedProject = await ProjectService.update(projectUpdated);
            setProject(updatedProject);
            setTasks(updatedProject.tasks);
            setTitleNewTask("");
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


    const handleSortTasks = (unsortedTasks) => {
        return _.sortBy(unsortedTasks, o => o.done)
    }

    const renderItens = (list) => {
        if (list.length) {
            return list.map(task => (
                    <Grid direction="row" container justify="space-between" alignItems="flex-start"  key={task._id}>
                        <Grid item xm={6} md={7} lg={8} xl={9}> 
                            <Tooltip 
                                disableHoverListener={!task.done}
                                title={ task.done ? `Finished at ${handleShowFinishedAt(task.finishedAt)}` : ""} 
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

        console.log("todoList", todoList)
        console.log("doneList", doneList)

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
                {/* <FormLabel component="legend">To Do</FormLabel> */}
                {
                    renderLists(project.tasks)
                    
                }
            </CardContent>
            <CardActions>
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
                    onChange={handleChangeTitleNewTask}
                />
                <Button 
                    size="medium" 
                    variant="contained" 
                    color="primary" 
                    className={classes.addButton}
                    onClick={handleNewTask}
                >
                  Add
                </Button>
            </CardActions>
        </Card>
    )

}

export default Project;