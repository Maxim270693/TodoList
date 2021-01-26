import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

type RemoveTodoListActionType = {
    type:  'REMOVE-TODOLIST'
    id: string
}
type AddTodoListActionType = {
    title: string
    type: 'ADD-TODOLIST'
}

type ChangeTodoListTitle = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
type ChangeTodoListFilter = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}


export type ActionType = RemoveTodoListActionType | AddTodoListActionType |
    ChangeTodoListTitle | ChangeTodoListFilter

export function todoListsReducer(state: Array<TodolistType>, action: ActionType): Array<TodolistType> {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            const newTodoList: TodolistType = {
                id: v1(),
                title: action.title,
                filter: 'all'
            }
            return [...state, newTodoList]
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

