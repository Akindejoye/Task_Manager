import React from 'react'
import styles from './index.module.css'
import EditIcon from '@mui/icons-material/Edit';
import NotificationsPausedIcon from '@mui/icons-material/NotificationsPaused';
import PersonIcon from '@mui/icons-material/Person';
import CheckIcon from '@mui/icons-material/Check';
import { setSelectedTask } from '../../store/task';
import { useDispatch } from 'react-redux';

const Task = ({ task, src, handleShow }) => {
    const dispatch = useDispatch()
    const handleEdit = () => {
        dispatch(setSelectedTask(task))
        handleShow(true)
    }
    return (
        <div className={styles.container}>
            <div className={styles.task}>
                <img src={src} width={40} height={40} alt='user' />
                <div className={styles.taskDetails}>
                    <h5>{task?.task_msg}</h5>
                    <p>{task?.task_date}</p>
                </div>
            </div>
            <div className={styles.actions}>
                <button className={styles.actionBtn} onClick={handleEdit} title='Edit Task'>
                    <EditIcon fontSize='small' />
                </button>
                <button className={styles.actionBtn} disabled>
                    <NotificationsPausedIcon fontSize='small' />
                </button>
                <button className={styles.actionBtn} disabled>
                    <CheckIcon fontSize='small' />
                </button>
            </div>
        </div>
    )
}

export default Task