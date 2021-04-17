import { useState } from 'react'
import './App.css'

function Todo({ completeTodo, removeTodo, todo }) {
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      {todo.text}
      <div>
        <button onClick={completeTodo}>Complete</button>
        <button onClick={removeTodo}>x</button>
      </div>
    </div>
  )
}

function TodoForm({ addTodo }) {
  const [value, setValue] = useState("")

  const onSubmit = event => {
    event.preventDefault()
    if (!value) return
    addTodo(value)
    setValue("")
  }

  return (
    <form {...{onSubmit}}>
      <input
        className="input"
        onChange={event => setValue(event.target.value)}
        type="text"
        {...{value}}
      />
    </form>
  )
}

const initialTodos = [
  { text: "Learn about React", isCompleted: false },
  { text: "Meet friend for lunch", isCompleted: false },
  { text: "Build really cool todo app", isCompleted: false }
]

export default function App() {
  const [todos, setTodos] = useState(initialTodos)

  const addTodo = text => setTodos([...todos, { text }])

  const completeTodo = index => () => {
    const newTodos = [...todos]
    newTodos[index].isCompleted = true
    setTodos(newTodos)
  }

  const removeTodo = index => () => {
    const newTodos = [...todos]
    setTodos(newTodos.filter((_, i) => i !== index))
  }

  const renderTodo = (todo, index) => (
    <Todo
      key={index}
      completeTodo={completeTodo(index)}
      removeTodo={removeTodo(index)}
      {...{index, todo}}
    />
  )

  return (
    <div clasname="app">
      <div className="todo-list">
        {todos.map(renderTodo)}
        <TodoForm {...{addTodo}} />
      </div>
    </div>
  )
}
