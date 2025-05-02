import { Array, HashMap, Match } from 'effect'
import { Task, TaskBoard, TaskStatus, Priority, TaskCollectionStats } from './projectTypes'

function addTask(taskBoard: TaskBoard, task: Task){ 
    return TaskBoard.make({
        ...taskBoard,
        board: HashMap.set(taskBoard.board, task.id, task)
    })
}

function updateTaskStatus(taskBoard: TaskBoard, taskID: string, newStatus: TaskStatus) {
    if (!HashMap.has(taskBoard.board, taskID)){
        throw 'Task ID not found! '
        }

    const newTask = Task.make({
        ...getSpecificTask(taskBoard, taskID),
        status: newStatus
    })

    return updateTaskBoard(taskBoard, newTask)
}

function assignTask(taskBoard: TaskBoard, taskID: string, newAssignee: string) {
    if (!HashMap.has(taskBoard.board, taskID)){
        throw 'Task ID not found! '
        }

    const currentTaskState = getSpecificTask(taskBoard, taskID)

    if (currentTaskState.assignee === newAssignee) {
        return taskBoard
    }

    const newTaskState = Task.make({
        ...currentTaskState,
        assignee: newAssignee
    })

    return updateTaskBoard(taskBoard, newTaskState)
}

function filterTasks(taskBoard: TaskBoard, status?: TaskStatus, priority?: Priority) {
    const taskArray = HashMap.values(taskBoard.board)
    let ret: Array<Task> =  Array.filter(taskArray, () => true) // array copy

    if (typeof status !== 'undefined') {
        ret = Array.filter(taskArray, (task): boolean => (task.status === status))
    }

    if (typeof priority !== 'undefined') {
        ret = Array.filter(ret, (task): boolean => (task.priority === priority))
    }

    return ret
}

function getStats(taskBoard: TaskBoard): TaskCollectionStats {
    let total = 0
    let done = 0
    let inProgress = 0
    let todo = 0

    for (const task of HashMap.values(taskBoard.board)) {
        total += 1

        Match.value(task.status).pipe(
            Match.tag('todo', () => {todo += 1}),
            Match.tag('ongoing', () => {inProgress += 1}),
            Match.tag('done', () => {done += 1}),
            Match.exhaustive,
        )
    }

    return TaskCollectionStats.make({
        total: total,
        done: done,
        inProgress: inProgress,
        todo: todo,
    })
}


const updateTaskBoard = (taskBoard: TaskBoard, newTask: Task) => (
    TaskBoard.make({
        ...taskBoard,
        board: HashMap.set(taskBoard.board, newTask.id, newTask)
    })
)
const getSpecificTask = (taskBoard: TaskBoard, taskID: string) => HashMap.unsafeGet(taskBoard.board, taskID)