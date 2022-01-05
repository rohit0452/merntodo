import './App.css';
import { useState, useEffect } from "react"

function App() {
  const [todos, setTodos] = useState([])
  const [popupActive, setpopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const API = "http://localhost:3001"


  // Update todos
  const updatetodo = async id => {
    const data = await fetch(API + "/todo/update/" + id)
      .then(res => res.json())

    setTodos(todos => todos.map(todo => {
      if (todo._id == data._id) {
        todo.completed = data.completed
      }

      return todo;
    }))
  }
  // get todos
  const getTodos = () => {
    fetch("http://localhost:3001/todos")
      .then((result) => result.json())
      .then((data) => setTodos(data))
  }

  // delete todos
  const deleteTodo = async id => {
    const data = await fetch(API + "/todo/delete/" + id, { method: "DELETE" })
      .then(res => res.json())
    setTodos(todos => todos.filter(todo => todo._id != data._id))
  }

  // Add Todos
  const addTodo = async () => {
    const add = await fetch(API + "/todo/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title: newTodo
      })

    }).then(res => res.json());

    setTodos([...todos, add])
    setNewTodo("");
    setpopupActive(false);

    
  }

  useEffect(() => {
    getTodos();
  },[])

  return (
    <div className="App">
      <h2>Your Tasks</h2>


      {todos.map(todo =>
        <div className={"data" + (todo.completed ? " isComplete" : "")} key={todo._id} >
          <span onClick={() => updatetodo(todo._id)} className="is-selected">{todo.completed}</span>
          <span className='content'>{todo.title}</span>
          <span onClick={() => deleteTodo(todo._id)} className="delete-btn">X</span>
        </div>
      )}


      <span className="add-btn" onClick={() => setpopupActive(true)}>ADD TODO</span>

      {popupActive ?

        <div className='pop'>
          <span className='disable' onClick={() => setpopupActive(false)}>x</span>
          <div className='form'>
            <input type="text"
              name='title'
              placeholder='Enter the Task'
              onChange={e => setNewTodo(e.target.value)}
              value={newTodo}
            />


            <button disabled={newTodo.length<1} onClick={addTodo}  className='create-btn'>ADD TASK</button>
          </div>
        </div>

        : ""
      }


    </div>
  );
}

export default App;
