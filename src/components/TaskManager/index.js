import styles from './index.module.css'
import AddIcon from '@mui/icons-material/Add';
import TaskForm from '../TaskForm';
import TaskList from '../TaskList';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTasks } from '../../store/task';
import { ALL_TASKS_URL, GET_USERS_URL } from '../../config/api';
import { axios } from '../../requests';
import { setUsers } from '../../store/user';


const TaskManager = ({ loading }) => {
    const [show, setShow] = useState(false)
    const tasks = useSelector(state => state.task.tasks)
    const selectedTask = useSelector(state => state.task.task)
    const user = useSelector(state => state.user.user)
    const users = useSelector(state => state.user.users)
    const dispatch = useDispatch()

    const handleShow = (bool) => {
        setShow(bool)
    }
    useEffect(() => {
        if (!loading) {
            fetchTasks()
            fetchUsers()
        }
    }, [loading])

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`${ALL_TASKS_URL}${user?.company_id}`)
            if (response.data?.code === 200 || response.data?.status === 'success') {
                dispatch(setTasks(response.data?.results))
            }
        } catch (error) {
            console.log(error.response?.data)
        }
    }

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${GET_USERS_URL}${user?.company_id}`)
            if (response.data?.code === 200 || response.data?.status === 'success') {
                dispatch(setUsers(response.data?.results?.data))
            }
        } catch (error) {
            console.log(error.response?.data)
        }
    }
    return (
        <>
            {loading ?
                <p>Logging in user...</p>
                :
                <div className={styles.container}>
                    <div className={styles.top}>
                        <p className={styles.text}>TASKS <span className={styles.number}>{tasks?.length || 0}</span></p>
                        <div className={styles.add} onClick={() => handleShow(true)} title='New Task'>
                            <AddIcon color='gray' />
                        </div>
                    </div>
                    {show && <TaskForm handleShow={handleShow} selectedTask={selectedTask} fetchTasks={fetchTasks} />}
                    {tasks && users && <TaskList handleShow={handleShow} />}
                </div>
            }
        </>
    )
}

export default TaskManager