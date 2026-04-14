export type Priority = 'low' | 'medium' | 'high'
export type Category = 'personal' | 'work' | 'study' | 'other'

export interface TodoState {
    id : string
    text : string
    completed : boolean
    category : Category
    priority : Priority
    dueDate : string
    createdAt : number
}