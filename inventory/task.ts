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
        ...HashMap.unsafeGet(taskBoard.board, taskID),
        status: newStatus
    })

    return TaskBoard.make({
        ...taskBoard,
        board: HashMap.set(taskBoard.board, taskID, newTask)
    })
}