// import React, {createContext, useState, useRef} from 'react';
// import FormLabel from '@material-ui/core/FormLabel';
// import FormControl from '@material-ui/core/FormControl';
// import FormGroup from '@material-ui/core/FormGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import IconButton from '@material-ui/core/IconButton';
// import EditIcon from '@material-ui/icons/Edit';
// import DeleteIcon from '@material-ui/icons/Delete';
// import OptionsIcon from '@material-ui/icons/MoreVert'
// import Grid from '@material-ui/core/Grid';
// import MenuItem from '@material-ui/core/MenuItem';
// import Menu from '@material-ui/core/Menu';

// const Tasks = (props) => {

//     const [tasks, setTasks] = useState(props.tasks);
//     const [anchorEl, setAnchorEl] = useState(false);

//     // const handleChangeCheckNewTask = (event) => {
//     //     const updatedTask =  {...task, done: event.target.checked};
        
//     //     setTask(updatedTask);
//     //     props.updateFromParent(updatedTask);
//     // }

//     // const handleEditTask = () => {

//     // }

//     const handleDeleteTask = async (taskId) => {
//         await props.deleteFromParent(taskId);
//         handleCloseMenu();
//     }

//     const handleOpenMenu = event => {
//         setAnchorEl(event.currentTarget);
//     };
    
//     const handleCloseMenu = () => {
//         setAnchorEl(null);
//     };

//     return (
//         tasks.map((task) => (
//             <Grid direction="row" container justify="flex-end" alignItems="stretch">
//                 <Grid item xs={11}>
//                     <FormGroup>
//                         <FormControlLabel 
//                             control={
//                                 <Checkbox 
//                                     key={task._id} 
//                                     checked={task.done} 
//                                     //onChange={handleChangeCheckNewTask}
//                                 />}
//                             label={task.title}
//                         />
//                     </FormGroup>
//                 </Grid>
//                 <Grid item xs={1} >
//                 {
//                     !task.done &&  (
//                         <Grid direction="row" container justify="flex-end" alignItems="center">
//                             <IconButton 
//                                 aria-label="options"  
//                                 aria-controls="simple-menu" 
//                                 aria-haspopup="true" 
//                                 color="primary" 
//                                 onClick={handleOpenMenu}>
//                                 <OptionsIcon />
//                             </IconButton>
//                             <Menu
//                                 id="simple-menu"
//                                 anchorEl={anchorEl}
//                                 keepMounted
//                                 open={Boolean(anchorEl)}
//                                 onClose={handleCloseMenu}
//                             >
//                                 <MenuItem onClick={() => alert("Teste")}>Edit</MenuItem>
//                                 <MenuItem onClick={() => handleDeleteTask(task._id)}>Delete</MenuItem>
//                             </Menu>
//                         </Grid>
//                     )
//                 }
//                 </Grid>
//             </Grid>
//         ))
//     )
// }

// export default Tasks;