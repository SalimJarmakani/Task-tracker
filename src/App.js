import {useState, useEffect} from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'

import AddTask from './components/AddTask'
function App() {

  useEffect(()=> {

    const getTasks= async ()=> {

      const tasksFromServer = await fetchTasks()

      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  //Fetch Tasks

  const fetchTasks = async ()=> {

    const res = await fetch('http://localhost:5000/tasks')

    const data = await res.json()

    return data
  }


    // Fetch Task
    const fetchTask = async (id) => {
      const res = await fetch(`http://localhost:5000/tasks/${id}`)
      
      const data = await res.json()

       return data
  }


  const [showAddTask,setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

   //delete task

   const deleteTask = async (id) => {

    await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'DELETE',
    })
    
     setTasks (tasks.filter((task)=>task.id!==id))

   }
   // Toggle reminder 

   const toggleReminder = async (id) => {

    const taskToToggle = await fetchTask(id)

    const upTask = {...taskToToggle,
    reminder: !taskToToggle.reminder}

    const res= await fetch (`http://localhost:5000/tasks/${id}`,{
      method : 'PUT',
      headers : {'Content-type' : 'application/json'},

      body: JSON.stringify(upTask)
    })

    const data = await res.json()


    setTasks(tasks.map((task)=> task.id===id
    ? {...task, reminder : data.reminder} : task))
   }

   //add task

   const addTask = async (task) => {

    const res = await fetch (`http://localhost:5000/tasks`,{
      method : 'POST',

      headers: {'Content-type' : 'application/json'},

      body: JSON.stringify(task)  
    })

    const data = await res.json()


    setTasks([...tasks,data])

    /*const id= Math.floor(Math.random()*10000)+1

    const newTask = {id,...task}

    setTasks([...tasks,newTask])*/
   }

   //show add task

   const revealAddTask = () => {

    if (showAddTask === false)
    setShowAddTask(true)

    else 
      setShowAddTask(false)
   }

   
  return (
    <div className="container">
      <Header revealAddTask={revealAddTask} showAdd={showAddTask} />
      {showAddTask ? <AddTask onAdd= {addTask} /> : ''}
      {tasks.length>0 ?<Tasks tasks={tasks} onDelete = {deleteTask} 
      onToggle = {toggleReminder}/> : "nothing to do!"}
    </div>
  );
}

export default App;
