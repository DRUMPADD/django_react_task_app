import React, { useEffect, useState } from 'react'

function TasksPage() {
  const [active, setActive] = useState({
    isActive: false
  });
  const [tasks, setTasks] = useState([]);
  const [param, setParam] = useState(0);
  const [task, setTask] = useState({
    id: 0,
    name: "",
    desc: ""
  });

  const showForm = (e) => {
    setActive({
      isActive: !active.isActive
    })
  }
  async function getTasks() {
    const res = await fetch("http://localhost:8000/tasks")
    const data = await res.json();
    setTasks(data.tasks);
  }

  async function getTask(id) {
    const res = await fetch(`http://localhost:8000/task/${id}`)
    .then(res => {
      return res.json();
    })
    .catch(err => {
      console.log(err);
    })
    console.log("Task found");
    console.log(res.task);
    setTask({
      id: res.task[0],
      name: res.task[1],
      desc: res.task[2],
    })
  }
  useEffect(() => {
    getTasks();
  },[task.id, task.name, task.desc])


  let crsftoken = document.cookie.split("=")[1];

  const saveTask = async () => {
      await fetch("http://localhost:8000/saveTask", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              "X-CSRFToken": crsftoken
          },
          body: JSON.stringify(task)
      })
      .then(res => {
          return res.json();
      })
      .then(message => {
        console.log(message.result);
      })
  }
  const updateTask = async () => {
      await fetch(`http://localhost:8000/updateTask/${param}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              "X-CSRFToken": crsftoken
          },
          body: JSON.stringify({
            name: task.name,
            desc: task.desc,
          })
      })
      .then(res => {
          return res.json();
      })
      .then(message => {
        console.log(message.result);
      })
      setParam(0)
  }

  function handleSubmit(event) {
      event.preventDefault();
      if(param !== 0) {
        updateTask();
        getTasks();
      } else {
        saveTask();
        getTasks();
      }
      active.isActive = false;
      setTask({

        id: 0,
        name: "",
        desc: ""
      });
  }

  function handleChange(event) {
      setTask({
          ...task,
          [event.target.name] : event.target.value
      })
  }

  const deleteTask = async(id) => {
    await fetch(`http://localhost:8000/deleteTask/${id}`, {method: 'POST'})
  }
  
  const clickDeleteButton = (id) => {
    deleteTask(id);
    getTasks();
    // setTaskId(id);
    // deleteTask();
  }
  const clickUpdateButton = (id) => {
    console.log(id);
    getTask(id);
    setParam(id);
    active.isActive = true;
    // setTaskId(id);
    // deleteTask();
  }

  return (
    <div className='container'>
        <h1>Tasks page</h1>
        <button type='button' className='btn add' onClick={showForm}>Add</button>
        <form hidden={!active.isActive} onSubmit={handleSubmit}>
            <div>
                <input type="text" name='name' value={task.name} onChange={handleChange} placeholder='Task name' className='input' />
            </div>
            <div>
                <textarea name='desc' placeholder='Description' value={task.desc} onChange={handleChange} className='textarea'></textarea>
            </div>
            <div>
                <button className='btn save'>Save</button>
            </div>
        </form>
        <div className='cards'>
            {
              tasks.map(element => (
                <div className='card' key={element.id}>
                  <div className='card-body-title'>
                    <p className='card-title'>{element.id}.- {element.task_name}</p>
                    <div>
                      <button type='button' className='btn info' onClick={() => clickUpdateButton(element.id)}>Update</button>
                      <button type='button' className='btn danger' onClick={() => clickDeleteButton(element.id)}>Delete</button>
                      </div>
                    </div>
                    <div className='card-body'>
                        <p>{element.desc}</p>
                    </div>
                </div>
              ))
            }
        </div>
    </div>
  )
}

export default TasksPage