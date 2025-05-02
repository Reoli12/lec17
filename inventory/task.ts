import { Array, HashMap } from 'effect'
import { Task, TaskBoard, TaskStatus, Priority } from './projectTypes'

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

    return TaskBoard.make({
        ...taskBoard,
        board: HashMap.set(taskBoard.board, taskID, newTask)
    })
}

function assignTask(taskBoard: TaskBoard, taskID: string, newAssignee: string) {
    if (!HashMap.has(taskBoard.board, taskID)){
        throw 'Task ID not found! '
        }

    const currentTaskState = getSpecificTask(taskBoard, taskID)
    const newTaskState = Task.make({
        ...currentTaskState,
        assignee: newAssignee
    })

    return updateTaskBoard(taskBoard, newTaskState)
}

const updateTaskBoard = (taskBoard: TaskBoard, newTask: Task) => (
    TaskBoard.make({
        ...taskBoard,
        board: HashMap.set(taskBoard.board, newTask.id, newTask)
    })
)
const getSpecificTask = (taskBoard: TaskBoard, taskID: string) => HashMap.unsafeGet(taskBoard.board, taskID)