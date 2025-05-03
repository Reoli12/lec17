import { Schema as S } from 'effect'

export const TaskStatus = S.Union( 
    S.TaggedStruct('todo', {}),
    S.TaggedStruct('ongoing', {}),
    S.TaggedStruct('done', {})
)

export const Priority = S.Union(
    S.TaggedStruct('low', {}),
    S.TaggedStruct('medium', {}),
    S.TaggedStruct('high', {})
)

export const Task = S.TaggedStruct('Task', {
    id: S.String,
    title: S.String,
    status: TaskStatus,
    priority: Priority,
    assignee: S.Union( S.String, S.Null )
})

export const TaskBoard = S.TaggedStruct('TaskBoard', {
    name: S.String,
    board: S.HashMap({
        key: S.String,
        value: Task
    })
})

export const TaskCollectionStats = S.TaggedStruct('TaskCollectionStats', {
    total: S.Number, 
    done: S.Number, 
    inProgress: S.Number, 
    todo: S.Number 
})

export type Task = typeof Task.Type
export type TaskBoard = typeof TaskBoard.Type
export type TaskStatus = typeof TaskStatus.Type
export type Priority = typeof Priority.Type
export type TaskCollectionStats = typeof TaskCollectionStats.Type