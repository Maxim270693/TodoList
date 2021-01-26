import {ActionType, RemoveTodoListAC, todoListsReducer} from './todoLists-reducer';
import {v1} from 'uuid';
import {FilterValuesType, TodolistType} from "../App";



test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const action: ActionType = RemoveTodoListAC(todolistId1)

    const endState = todoListsReducer(startState, action)

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
})



test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodoListTitle = 'New TodoList'

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const action: ActionType = { type: 'ADD-TODOLIST', title: newTodoListTitle }

    const endState = todoListsReducer(startState, action)

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodoListTitle);
})



test('correct todolist should be changet', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    let newTodoListTitle = 'New Todolist'

    const action: ActionType = {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId2,
        title: newTodoListTitle
    }

    const endState = todoListsReducer(startState, action)

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodoListTitle);
})




test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterValuesType = 'completed'

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const action: ActionType = {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId2,
        filter: newFilter
    }

    const endState = todoListsReducer(startState, action)

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
})




