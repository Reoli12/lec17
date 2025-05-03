import { HashMap, Array, Match } from 'effect'
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

    const statsTableHeaderData = Array.make('ID', 'Name', 'Priority', 'Status')
    statsTable.border = '1'
    statsTable.style = 'border-collapse: collapse;'
        const statsTableHeader = document.createElement('thead')
            const tableNameRow = document.createElement('th')
                tableNameRow.textContent = taskBoard.name
                tableNameRow.colSpan = 4
                statsTableHeader.appendChild(tableNameRow)
            const headerRow = document.createElement('tr')
            for (const columnHead of statsTableHeaderData) {
                const headerCell = document.createElement('th')
                headerCell.textContent = columnHead
                headerRow.appendChild(headerCell)
            }
        statsTableHeader.appendChild(headerRow)
    statsTable.appendChild(statsTableHeader)

    const statsTableBody = document.createElement('tbody')
        for (const task of HashMap.values(taskBoard.board)) {
            // make row, append to list
            const taskEntry = document.createElement('tr')
            // taskEntry.appendChild((new HTMLTableCellElement())
            
            for (const taskDetail of Array.make(task.id, task.title, 
                                                task.priority, task.status)) {
                                                    // title and id are string, everything else a struct
                type taskDetailType = typeof taskDetail // to allow typescript to type narrow
                const taskDetailCellNode = document.createElement('td')
                    taskDetailCellNode.textContent = ((taskDetail: taskDetailType) => {
                                                if (typeof taskDetail === 'string') {
                                                    return taskDetail
                                                }
                                                else {
                                                    return taskDetail._tag
                                                }
                                            })(taskDetail)
                taskEntry.appendChild(taskDetailCellNode)                         
            }
            statsTableBody.appendChild(taskEntry)

        }

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
