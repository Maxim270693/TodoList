import {ActionType, useReducer, UserType} from "./user-reducer";

test("increment age", () => {
    const startUser: UserType = {
        name: 'Alex',
        age: 23,
        childrenCount: 3
    }

    const myAction: ActionType = {type: 'INCREMENT-AGE'}

    const endUser = useReducer(startUser, myAction)

    expect(endUser.age).toBe(24)
})
test("increment childrenCount", () => {
    const startUser: UserType = {
        name: 'Alex',
        age: 23,
        childrenCount: 3
    }

    const endUser = useReducer(startUser, {type: 'INCREMENT-CHILDREN-COUNT'})

    expect(endUser.childrenCount).toBe(4)
})
test("change name", () => {
    const startUser: UserType = {
        name: 'Alex',
        age: 23,
        childrenCount: 3
    }

    const endUser = useReducer(startUser, {type: 'CHANGE-NAME', newName: 'bob'})

    expect(endUser.name).toBe('bob')
})