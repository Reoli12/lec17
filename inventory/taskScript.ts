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
        taskNameInput.defaultValue = 'New task '
    const priorityDropdown = setupPriorityDropdown()

    taskNameInput.addEventListener('click', () => clearTextboxIfDefaultVal(taskNameInput))
    taskNameInput.addEventListener('focusout', () => revertToDefaultValueIfEmpty(taskNameInput))

    root.append(taskNameInput)
    root.append(priorityDropdown)

    
    
}

const revertToDefaultValueIfEmpty = (textbox: HTMLInputElement) => {
    if (textbox.value === '') {
        textbox.value = textbox.defaultValue
    }
}

const clearTextboxIfDefaultVal = (textbox: HTMLInputElement) => {
    if (textbox.value === textbox.defaultValue) {
        textbox.value = ''
    }
}

main()
