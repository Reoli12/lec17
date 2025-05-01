import { Schema as S } from 'effect'

export const TaskStatus = S.Union( 
    S.Literal('todo'),
    S.Literal('ongoing'),
    S.Literal('done')
)

export const Priority = S.Union(
    S.Literal('low'),
    S.Literal('medium'),
    S.Literal('high')
)

export const Task = S.TaggedStruct('Task', {
    id: S.String,
    title: S.String,
    status: TaskStatus,
    priority: Priority,
})

export const TaskBoard = S.TaggedStruct('TaskBoard', {
    name: S.String,
    board: S.Array(Task)
})

export type Task = typeof Task.Type
export type TaskBoard = typeof TaskBoard.Type