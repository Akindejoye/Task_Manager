import styles from './index.module.css'
import { useSelector } from 'react-redux';
import Task from '../Task';

const TaskList = ({ handleShow }) => {
    const tasks = useSelector(state => state.task.tasks)
    const users = useSelector(state => state.user.users)

    const getAssignedUserImage = (id) => {
        let user = users?.filter(user => user.id === id)
        return user[0]?.icon
    }
    return (
        <div className={styles.container}>
            {tasks && tasks?.map(task => (
                <Task task={task} key={task.id} src={getAssignedUserImage(task?.assigned_user)} handleShow={handleShow} />
            ))}
        </div>
    )
}

export default TaskList