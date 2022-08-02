import './App.css';
import Aside from './components/Aside';
import TopNav from './components/TopNav';
import TaskManager from './components/TaskManager';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { LOGIN_URL } from './config/api';
import { loginUser } from './store/user';

function App() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const user = useSelector(state => state.user.user)
  
  useEffect(() => {
    login()
  }, [])

  const login = async () => {
    try {
      const response = await axios.post(LOGIN_URL, {
        email: 'smithwills1989@gmail.com',
        password: '12345678'
      });
      if (response.data.code === 200) {
        dispatch(loginUser(response.data.results))
        setLoading(false)
      }
    } catch (error) {
      console.log(error.response)
    }
  }
  return (
    <div className="App">
      <Aside />
      <TopNav />
      <main className='main'>
        <TaskManager loading={loading} />
      </main>
    </div>
  );
}

export default App;
