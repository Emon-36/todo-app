import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { TodoState } from '@/types/todo'

interface StateManagement {
    todos : TodoState[]
    addTodo : (todo :TodoState) => void
    deleteTodo : (id : string) => void
    toggleTodo : (id : string) => void
    editTodo : (id : string, text : string) => void

}

export const TodoStore = create<StateManagement>()(
    persist(
    (set) => ({
      todos: [],
      addTodo: (todo) =>
        set((state) => ({ todos: [todo, ...state.todos] })),
      deleteTodo: (id) =>
        set((state) => ({ todos: state.todos.filter((t) => t.id !== id) })),
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t
          ),
        })),
      editTodo: (id, text) =>
        set((state) => ({
          todos: state.todos.map((t) =>
            t.id === id ? { ...t, text } : t
          ),
        })),
    }),
    { name: 'todo-storage' }
  )
)