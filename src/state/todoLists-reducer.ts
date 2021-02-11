import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListActionType = {
    type:  'REMOVE-TODOLIST'
    id: string
}
export type AddTodoListActionType = {
    title: string
    type: 'ADD-TODOLIST'
    todolistId: string
}

type ChangeTodoListTitleType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
type ChangeTodoListFilterType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

let initialState:Array<TodolistType> = []

export type ActionType = RemoveTodoListActionType | AddTodoListActionType |
    ChangeTodoListTitleType | ChangeTodoListFilterType

export function todoListsReducer(state = initialState, action: ActionType): Array<TodolistType> {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [...state, {id: action.todolistId,title:action.title,filter: 'all'}]
        case 'CHANGE-TODOLIST-TITLE':
             const todoLists =  state.map(tl => {
                if(tl.id === action.id) {
                    return {...tl,title: action.title}
                }
                return tl
            })
                return todoLists
        case 'CHANGE-TODOLIST-FILTER': {
            const todoLists = state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, filter: action.filter}
                }
                return tl
            })
            return todoLists
        }

        default:
            return state
    }
}

export const RemoveTodoListAC = (id: string): RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', id: id}
}
export const AddTodolistAC = (title: string): AddTodoListActionType => {
    return {type: 'ADD-TODOLIST', title: title, todolistId: v1()}
}
export const ChangeTodolistTitleAC = (todolistId: string, title: string): ChangeTodoListTitleType => {
    return {type: 'CHANGE-TODOLIST-TITLE', title: title, id: todolistId}
}
export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodoListFilterType => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: todolistId}
}


