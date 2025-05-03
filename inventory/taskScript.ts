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
    const addTaskButton = document.createElement('button')
        addTaskButton.textContent = 'Add Task'

    const taskBoard = TaskBoard.make({
        name: 'Daily Tasks',
        board: HashMap.empty()
    })

    taskNameInput.addEventListener('click', () => clearTextboxIfDefaultVal(taskNameInput))
    taskNameInput.addEventListener('focusout', () => revertToDefaultValueIfEmpty(taskNameInput))
    

    root.append(taskNameInput)
    root.append(priorityDropdown)
    root.append(addTaskButton)

    root.append(makeTasksTable(taskBoard))

    
    
}

function makeTasksTable(taskBoard: TaskBoard): HTMLTableElement {
    const statsTable = document.createElement('table')
    statsTable.border = '1'
    statsTable.style = 'border-collapse: collapse;'
        const statsTableHeader = document.createElement('thead')
            const headerRow = document.createElement('tr')
            for (const columnHead of Array.make('ID', 'Name', 'Priority', 'Status')) {
                const headerCell = document.createElement('th')
                headerCell.textContent = columnHead
                headerRow.appendChild(headerCell)
            }
        statsTableHeader.appendChild(headerRow)
    statsTable.appendChild(statsTableHeader)

    return statsTable
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
