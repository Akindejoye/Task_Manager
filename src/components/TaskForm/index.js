import { InputAdornment, MenuItem, OutlinedInput, Select, TextField } from '@mui/material'
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import DeleteIcon from '@mui/icons-material/Delete';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from 'react'
import styles from './index.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { axios } from '../../requests';
import { SINGLE_TASK_URL, ALL_TASKS_URL } from '../../config/api';
import dayjs from 'dayjs';
import { setSelectedTask } from '../../store/task';


const TaskForm = ({ handleShow, selectedTask, fetchTasks }) => {
    const users = useSelector(state => state.user.users)
    const user = useSelector(state => state.user.user)
    const [title, setTitle] = useState(selectedTask ? selectedTask?.task_msg : '')
    const [person, setPerson] = useState(selectedTask ? users?.filter(user => user.id === selectedTask?.user_id)[0]?.name : "")
    const [value, setValue] = useState(selectedTask ? dayjs(selectedTask?.task_date_time_in_utc_string) : new Date());
    const dispatch = useDispatch()

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const getUserId = () => {
        let user = users?.filter(user => user.name === person)[0]
        return user.id
    }
    const getTimeInSeconds = (value) => {
        let splitTime = value.split(':');
        return (+splitTime[0]) * 60 * 60 + (+splitTime[1]) * 60 + (+splitTime[2]);
    }

    const handleCreateNew = async () => {
        try {
            const response = await axios.post(`${ALL_TASKS_URL}${user?.company_id}`, {
                "assigned_user": getUserId(),
                "task_date": dayjs(value).format('YYYY-MM-DD'),
                "task_time": getTimeInSeconds(dayjs(value).format('LTS').split(" ")[0]),
                "is_completed": 0,
                "time_zone": getTimeInSeconds(dayjs(value).format('Z').split('+')[1] + ':00'),
                "task_msg": title
            })
            if (response.data.status === 'success') {
                handleShow(false)
                fetchTasks()
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdateTask = async () => {
        try {
            const response = await axios.put(`${SINGLE_TASK_URL}${selectedTask.id}?company_id=${user.company_id}`, {
                "assigned_user": getUserId(),
                "task_date": dayjs(value).format('YYYY-MM-DD'),
                "task_time": getTimeInSeconds(dayjs(value).format('LTS').split(" ")[0]),
                "is_completed": 0,
                "time_zone": getTimeInSeconds(dayjs(value).format('Z').split('+')[1] + ':00'),
                "task_msg": title
            })
            if (response.data.status === 'success') {
                handleShow(false)
                fetchTasks()
                dispatch(setSelectedTask(null))
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteTask = async () => {
        try {
            const response = await axios.delete(`${SINGLE_TASK_URL}${selectedTask.id}?company_id=${user.company_id}`)
            if (response.data.status === 'success') {
                handleShow(false)
                fetchTasks()
            }
        } catch (error) {
            console.log(error.response);
        }
    }
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className={styles.form}>
                <div className={styles.inputGroup}>
                    <p className={styles.label}>Task description</p>
                    <OutlinedInput
                        id="outlined-adornment-weight"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        endAdornment={<InputAdornment position="end"><AssignmentLateIcon /></InputAdornment>}
                        inputProps={{
                            'aria-label': 'title',
                            'maxlenght': '20'
                        }}
                        sx={{ height: '40px', width: "100%" }}
                    />
                </div>
                <div className={styles.grid}>
                    <div className={styles.inputGroup}>
                        <p className={styles.label}>Date</p>
                        <DesktopDatePicker
                            inputFormat="MM/DD/YYYY"
                            value={value}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} />}
                            sx={{ height: "40px" }}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <p className={styles.label}>Time</p>
                        <TimePicker
                            value={value}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} />}
                            sx={{ height: "40px" }}
                        />
                    </div>
                </div>
                <div className={styles.inputGroup}>
                    <p className={styles.label}>Assign User</p>
                    <Select
                        value={person}
                        onChange={(e) => setPerson(e.target.value)}
                        sx={{ width: '100%', height: "40px" }}
                        placeholder='Select User'
                    >
                        <MenuItem value="" disabled>
                            <em>Select user</em>
                        </MenuItem>
                        {users && users.map(user => (
                            <MenuItem key={user.name} value={user.name}>
                                <em>{user.name}</em>
                            </MenuItem>
                        ))}
                    </Select>
                </div>
                {selectedTask &&
                    <button className={styles.deleteBtn} title='Delete task' onClick={handleDeleteTask}>
                        <DeleteIcon color='inherit' />
                    </button>
                }
                <div className={styles.flex}>
                    <button className={styles.clearBtn} onClick={() => {
                        handleShow(false)
                        dispatch(setSelectedTask(null))
                    }}>
                        Cancel
                    </button>
                    <button className={styles.btn} onClick={selectedTask ? handleUpdateTask : handleCreateNew}>Save</button>
                </div>
            </div>
        </LocalizationProvider>
    )
}

export default TaskForm