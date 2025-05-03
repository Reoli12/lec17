import { HashMap, Array } from 'effect'
import { TaskBoard, Task, TaskStatus, Priority } from "./projectTypes"

function setupPriorityDropdown() {

    const priorityDropdown = document.createElement('select')
        const lowPriorityOption = document.createElement('option')
        const mediumPriorityOption = document.createElement('option')
        const highPriorityOption = document.createElement('option')
        const nonePriorityOption = document.createElement('option')
            lowPriorityOption.textContent = 'Low'
            mediumPriorityOption.textContent = 'Medium'
            highPriorityOption.textContent = 'High'
            nonePriorityOption.textContent = 'None'

        for (const option of Array.make(nonePriorityOption, lowPriorityOption,
                                        mediumPriorityOption, highPriorityOption )) {
            priorityDropdown.options.add(option)
            }


    return priorityDropdown
}

function main() {
    const root = document.querySelector('#root')!
    const taskNameInput = document.createElement('input')
    const priorityDropdown = setupPriorityDropdown()

    root.append(taskNameInput)
    root.append(priorityDropdown)
    
}

main()
