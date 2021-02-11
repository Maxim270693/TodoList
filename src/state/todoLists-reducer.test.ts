import {
    ActionType,
    AddTodolistAC,
    ChangeTodolistFilterAC, ChangeTodolistTitleAC,
    RemoveTodoListAC,
    todoListsReducer
} from './todoLists-reducer';
import {v1} from 'uuid';
import {FilterValuesType, TodolistType} from "../App";

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistType>

beforeEach( () => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
} )


test('correct todolist should be removed', () => {

    const action: ActionType = RemoveTodoListAC(todolistId1)

    const endState = todoListsReducer(startState, action)

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
})



test('correct todolist should be added', () => {

    let newTodoListTitle = 'New TodoList'


    const endState = todoListsReducer(startState, AddTodolistAC(newTodoListTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodoListTitle);
})



test('correct todolist should  change its name', () => {
    let newTodoListTitle = 'New Todolist'

    const action = ChangeTodolistTitleAC(todolistId2,newTodoListTitle)
    const endState = todoListsReducer(startState, action)

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodoListTitle);
})




test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = 'completed'

    let action = ChangeTodolistFilterAC(todolistId2,newFilter)
    const endState = todoListsReducer(startState, action)

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
})




