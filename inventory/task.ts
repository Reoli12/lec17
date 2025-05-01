import { Array } from 'effect'
import { Task, TaskBoard, TaskStatus, Priority } from './projectTypes'

function addTask(taskBoard: TaskBoard, task: Task){ 
    return TaskBoard.make({
        ...taskBoard,
        board: Array.append(taskBoard.board, task)
    })
}

function updateTaskStatus(taskBoard: TaskBoard, taskID: string, newStatus: TaskStatus) {
    if (!Array.contains(Array.map(taskBoard.board, (task) => task.id), 
                        taskID)) {
                            // raise error here
                        }
}