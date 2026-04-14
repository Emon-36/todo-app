'use client'
import { useState } from "react"
import { Category, Priority, TodoState } from "@/types/todo"
import { TodoStore } from "@/store/useTodoStore"

export default function Home() {

  const { todos, addTodo } = TodoStore()
  const [text, setText] = useState('')
  const [category , setCategory] = useState<Category>('personal')
  const [priority, setPriority] = useState<Priority>('medium')
  const [dueDate, setDueDate] = useState('')

  const handleAdd = () =>
  {
    if(!text.trim()) return
    const newTodo : TodoState = {
      id : crypto.randomUUID(),
      text,
      completed:false,
      category,
      priority,
      dueDate,
      createdAt : Date.now()
    }
    addTodo(newTodo)
    setText('')
    setDueDate('')
  }
  return (
    <main className="min-h-screen bg-gray-950 text-white px-4 py-10">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <h1 className="text-4xl font-bold mb-2 text-center text-indigo-400">
          Active Schedulizer
        </h1>
        <p className="text-center text-gray-500 mb-8 text-sm">
          3 tasks remaining
        </p>

        {/* Input Section */}
        <div className="bg-gray-900 rounded-2xl p-6 mb-6 flex flex-col gap-3 shadow-lg">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key == 'Enter' && handleAdd()}
            className="bg-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <div className="flex gap-3 flex-wrap">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="bg-gray-800 rounded-xl px-3 py-2 text-sm text-gray-300 outline-none"
            >
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="study">Study</option>
              <option value="other">Other</option>
            </select>

            <select 
              value={priority}
              onChange={(e)=> setPriority(e.target.value as Priority)}
              className="bg-gray-800 rounded-xl px-3 py-2 text-sm text-gray-300 outline-none"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>


            <input
              type="date"
              value={dueDate}
              onChange={(e)=> setDueDate(e.target.value)}
              className="bg-gray-800 rounded-xl px-3 py-2 text-sm text-gray-300 outline-none"
            />
          </div>
          <button 
            onClick={handleAdd}
            className="bg-indigo-600 hover:bg-indigo-500 transition rounded-xl py-3 font-semibold text-white"
          >
            + Add Task
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-4">
          <button className="px-4 py-2 rounded-xl text-sm font-medium bg-indigo-600 text-white">All</button>
          <button className="px-4 py-2 rounded-xl text-sm font-medium bg-gray-800 text-gray-400 hover:bg-gray-700">Active</button>
          <button className="px-4 py-2 rounded-xl text-sm font-medium bg-gray-800 text-gray-400 hover:bg-gray-700">Completed</button>
        </div>

        
      </div>
    </main>
  )
}