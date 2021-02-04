import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


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
    changeTodoListTitle:(title:string, todolistID:string) => void
}

function TodoList(props: TodoListType) {
    // const [title, setTitle] = useState<string>('')
    // const [error,setError] = useState<string | null>(null)

    // const addTask = () => {
    //     const taskTitle = title.trim()
    //     if(taskTitle) {
    //         props.addTask(taskTitle, props.id)
    //     }else  {
    //         setError('title is required!')
    //     }
    //     setTitle('')
    // }
    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setError(null)
    //     setTitle(e.currentTarget.value)
    // }
    // const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     if (e.key === 'Enter') addTask()
    // }

    const addTask = (title: string) => {
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
        props.changeTodoListTitle(title,props.id)
    }

    return (
        <div >
            <h3 style={{textAlign: 'center'}}>
                <EditableSpan
                    title={props.title}
                              changeTitle={changeTodoListTile}
            />
            <IconButton onClick={removeTodoList}>
                <Delete />
            </IconButton>
                {/*<button onClick={removeTodoList}>x</button>*/}
            </h3>
            <AddItemForm addItem={addTask}/>
            <div style={{padding: '20px'}}>
                <div>
                    <Button
                        size={"small"}
                        variant={props.filter === 'all' ? "outlined" : "contained"}
                        color={"primary"}
                        // className={props.filter === 'all' ? 'active-filter' : ''}
                        onClick={onAllClickHandler}>All
                    </Button>
                    <Button
                        size={"small"}
                        variant={props.filter === 'active' ? "outlined" : "contained"}
                        color={"primary"}
                        // className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active
                    </Button>
                    <Button
                        size={"small"}
                        variant={props.filter === 'completed' ? "outlined" : "contained"}
                        color={"primary"}
                        // className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                    </Button>
                </div>
            </div>
            {/*<div>*/}
            {/*    <input*/}
            {/*        value={title}*/}
            {/*        // e.currentTarget === input*/}
            {/*        onChange={onChangeHandler}*/}
            {/*        onKeyPress={onKeyPressHandler}*/}
            {/*        className={error ? 'error' : ''}*/}
            {/*    />*/}
            {/*    <button onClick={addTask}>+</button>*/}
            {/*    {error && <div className={'error-message'}>{error}</div>}*/}
            {/*</div>*/}
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
                                {/*<input*/}
                                {/*    onChange={changeStatus}*/}
                                {/*    type="checkbox"*/}
                                {/*    checked={task.isDone}*/}
                                {/*/>*/}
                                <EditableSpan title={task.title}
                                              changeTitle={changeTitle}
                                />
                                {/*<span>{task.title}</span>*/}
                                <IconButton onClick={removeTask}>
                                    <Delete />
                                </IconButton>
                                {/*<button onClick={removeTask}>x</button>*/}
                            </li>
                        )
                    })
                }
            </ul>

        </div>
    );
}

export default TodoList;


