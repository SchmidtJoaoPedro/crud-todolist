import { useEffect, useState } from 'react'
import './App.css'

const API_URL = 'http://localhost:3333/tasks'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [editingId, setEditingId] = useState(null)

  // Carregar tarefas da API
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(setTasks)
  }, [])

  // Adicionar ou atualizar
  async function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) return

    if (editingId) {
      const res = await fetch(`${API_URL}/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      })
      const updated = await res.json()
      setTasks(tasks.map(t => (t.id === editingId ? updated : t)))
      setEditingId(null)
    } else {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      })
      const newTask = await res.json()
      setTasks([...tasks, newTask])
    }

    setTitle('')
  }

  function handleEdit(task) {
    setTitle(task.title)
    setEditingId(task.id)
  }

  async function handleDelete(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    setTasks(tasks.filter(t => t.id !== id))
  }

  return (
    <div className="container">
      <h1>Todo List</h1>

      <form className="form" onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Nova tarefa"
        />
        <button type="submit">{editingId ? 'Atualizar' : 'Adicionar'}</button>
      </form>

      <ul className="list">
        {tasks.map(task => (
          <li key={task.id} className="item">
            <span>{task.title}</span>
            <div className="actions">
              <button className="edit" onClick={() => handleEdit(task)}>Editar</button>
              <button className="delete" onClick={() => handleDelete(task.id)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
