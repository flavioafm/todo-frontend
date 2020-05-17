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

// const Task = (props) => {

//     const [task, setTask] = useState(props.task);
//     const [anchorEl, setAnchorEl] = useState(false);

//     const handleChangeCheckTask = (event) => {
//         const updatedTask =  {...task, done: event.target.checked};
        
//         setTask(updatedTask);
//         props.updateFromParent(updatedTask);
//     }

//     const handleEditTask = () => {

//     }

//     const handleDeleteTask = async () => {
//         const taskId =  task._id;
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
//         <Grid direction="row" container justify="flex-end" alignItems="stretch">
//             <Grid item xs={9}>
//                 <FormGroup>
//                     <FormControlLabel 
//                         control={
//                             <Checkbox 
//                                 key={task._id} 
//                                 checked={task.done} 
//                                 onChange={handleChangeCheckTask}
//                             />}
//                         label={task.title}
//                     />
//                 </FormGroup>
//             </Grid>
//             <Grid item xs={3} >
//             {
//                 !task.done &&  (
//                     <Grid direction="row" container justify="flex-end" alignItems="center">
//                         <IconButton 
//                             id={`option_${task._id}`}
//                             aria-label="options"  
//                             aria-controls="simple-menu" 
//                             aria-haspopup="true" 
//                             color="primary" 
//                             //onClick={handleOpenMenu}
//                         >
//                             <EditIcon />
//                         </IconButton>
//                         <IconButton 
//                                 id={`option_${task._id}`}
//                                 aria-label="options"  
//                                 aria-controls="simple-menu" 
//                                 aria-haspopup="true" 
//                                 color="primary" 
//                                 onClick={handleDeleteTask}
//                         >
//                             <DeleteIcon />
//                         </IconButton>
//                     </Grid>
//                 )
//             }
//             </Grid>
            
//         </Grid>
//     )
// }

// export default Task;