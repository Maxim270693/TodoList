import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodolistType} from "./AppWithRedux";


type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTodoList: (TodoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (filterValue: FilterValuesType, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTodoListTitle: (title: string, todolistID: string) => void
}

function TodoList(props: TodoListType) {

    const todolist = useSelector<AppRootStateType, TodolistType>(state => state.todoLists.filter(todo => todo.id === props.id)[0])
    const task = useSelector<AppRootStateType,Array<TaskType>>(state => state.tasks[props.id])

    const dispatch = useDispatch()

    const addTask = (title: string) => {
        // dispatch(addTaskAC(title,todolist.id))
        props.addTask(title, props.id)
    }
    const onAllClickHandler = () => {
        props.changeFilter('all', props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.id)
    }

    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }
    const changeTodoListTile = (title: string) => {
        props.changeTodoListTitle(title, props.id)
    }

    return (
        <div>
            <h3 style={{textAlign: 'center'}}>
                <EditableSpan
                    title={todolist.title}
                    changeTitle={changeTodoListTile}
                />
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div style={{padding: '20px'}}>
                <div>
                    <Button
                        size={"small"}
                        variant={props.filter === 'all' ? "outlined" : "contained"}
                        color={"primary"}
                        onClick={onAllClickHandler}>All
                    </Button>
                    <Button
                        size={"small"}
                        variant={props.filter === 'active' ? "outlined" : "contained"}
                        color={"primary"}
                        onClick={onActiveClickHandler}>Active
                    </Button>
                    <Button
                        size={"small"}
                        variant={props.filter === 'completed' ? "outlined" : "contained"}
                        color={"primary"}
                        onClick={onCompletedClickHandler}>Completed
                    </Button>
                </div>
            </div>
            <ul style={{listStyle: "none", padding: '0'}}>
                {
                    props.tasks.map(task => {
                        const removeTask = () => {
                            props.removeTask(task.id, props.id)
                        }
                        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(task.id, e.currentTarget.checked, props.id)
                        }
                        const changeTitle = (title: string) => {
                            props.changeTaskTitle(task.id, title, props.id)
                        }
                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <Checkbox
                                    color={'primary'}
                                    onChange={changeStatus}
                                    checked={task.isDone}
                                />
                                <EditableSpan title={task.title}
                                              changeTitle={changeTitle}
                                />
                                <IconButton onClick={removeTask}>
                                    <Delete/>
                                </IconButton>
                            </li>
                        )
                    })
                }
            </ul>

        </div>
    );
}

export default TodoList;


