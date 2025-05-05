import { HashMap, Array, String, Match } from 'effect'
import { pipe } from 'effect/Function'
import { TaskBoard, Task, TaskStatus, Priority, PriorityDropdownOptions } from "./projectTypes"

const [low, medium, high] = Priority.members
const [todo, ongoing, done] = TaskStatus.members

function setupPriorityDropdown() {

    const priorityDropdown = document.createElement('select')

    const nonePriorityOption = document.createElement('option')
        nonePriorityOption.textContent = 'None'
    priorityDropdown.options.add(nonePriorityOption)

        for (const priorityLevel of Priority.members) {
            const priorityLevelOption = document.createElement('option')
            priorityLevelOption.textContent = pipe(
                priorityLevel.make(),
                (priorityObject) => priorityObject._tag,
                String.capitalize
            )
            priorityDropdown.options.add(priorityLevelOption)
        }
        
    return priorityDropdown
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

    const statsTableBody = document.createElement('tbody')

        const taskArray = HashMap.values(taskBoard.board)
        const taskArraySortedByID = [...taskArray].sort(sortByID)

        for (const task of taskArraySortedByID) {
            // console.log(task)
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
                                                    return taskDetail}
                                                return taskDetail._tag})(taskDetail)
                taskEntry.appendChild(taskDetailCellNode)                         
            }
        // console.log(taskEntry)
        statsTableBody.appendChild(taskEntry)

        }
    statsTable.appendChild(statsTableHeader)
    statsTable.appendChild(statsTableBody)

    console.log(statsTable)
    return statsTable
}

const sortByID = (a: Task, b: Task) => a.id < b.id? -1 : a.id > b.id? 1 : 0

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

function main() {
    const root = document.querySelector('#root')!
    const taskNameInput = document.createElement('input')
        taskNameInput.defaultValue = 'New Task '
    const priorityDropdown = setupPriorityDropdown()
    const addTaskButton = document.createElement('button')
        addTaskButton.textContent = 'Add Task'


    let taskBoard = TaskBoard.make({
        name: 'Daily Tasks',
        board: HashMap.empty()
    })

    taskNameInput.addEventListener('click', () => clearTextboxIfDefaultVal(taskNameInput))
    taskNameInput.addEventListener('focusout', () => revertToDefaultValueIfEmpty(taskNameInput))

    addTaskButton.addEventListener('click', () => {
        taskBoard = appendToTaskBoard(taskBoard, taskNameInput.value, priorityDropdown.value, taskCounter)
        taskTable.innerHTML = ''
            taskTable = makeTasksTable(taskBoard)
            root.appendChild(taskTable)
        taskCounter++
})

    let taskTable = makeTasksTable(taskBoard)

    let taskCounter = 0
    root.appendChild(taskNameInput)
    root.appendChild(priorityDropdown)
    root.appendChild(addTaskButton)
    root.appendChild(taskTable)
}

function appendToTaskBoard(taskBoard: TaskBoard, taskName: string, 
                            taskPriorityStr: string, taskCounter: number): TaskBoard {

    const lowerTaskPriorityStr = String.toLowerCase(taskPriorityStr)
    
    const strToPrioLevelHashMap: HashMap.HashMap<string, PriorityDropdownOptions> = pipe(
        PriorityDropdownOptions.members,
        Array.map((optionObject) => optionObject.make()),
        Array.map((initObj): [string, PriorityDropdownOptions] => [initObj._tag, initObj]),
        (entries) => HashMap.make(...entries) //spread k-v pairs to .make()
    )

    const taskPriority = HashMap.unsafeGet(strToPrioLevelHashMap, lowerTaskPriorityStr) 
    
    const taskPriorityActual: Priority | null = Match.value(taskPriority).pipe(
        Match.tag('none', () => null),
        Match.orElse(() => taskPriority as Priority),
    )

    if (taskPriorityActual === null) {
        throw new Error('Priority must not be None ')
    }

    const newTask = Task.make({
        title: taskName,
        id: pipe (
            `${taskCounter}`,
            String.padStart(5, '0')
        ),
        status: ongoing.make(),
        priority: taskPriorityActual,
        assignee: null,
    })

    return TaskBoard.make({
        ...taskBoard,
        board: HashMap.set(taskBoard.board, newTask.id, newTask)
    })
}
main()
