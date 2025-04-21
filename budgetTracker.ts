import {Company, DeptalFiscalData, FiscalDetails} from './projectTypes'

type Company = typeof Company.Type
type DeptalFiscalData = typeof DeptalFiscalData.Type
type FiscalDetails = typeof FiscalDetails.Type

type DepartmentName = 
| 'engineering'
| 'marketing'
| 'hr'

let enggFiscal = FiscalDetails.make({
    budget: 100000,
    spent: 4200,
})

let marketingFiscal = FiscalDetails.make({
    budget: 50000,
    spent: 12000,
})

let hrFiscal = FiscalDetails.make({
    budget: 30000,
    spent: 8000
})

let neonLabsCompany = Company.make({
    name: "Neon Labs",
    departments: DeptalFiscalData.make({
        engineering: enggFiscal,
        marketing: marketingFiscal,
        hr: hrFiscal
    })
})

function remainingBudget(department: FiscalDetails): number {
    return department.budget - department.spent
}

function spend(departmentName: DepartmentName, amount: number): void {

    let department = neonLabsCompany.departments[departmentName]
    if (amount > remainingBudget(department)) {
        console.log("can't afford! ")
        return
    }

    const newBudget = department.budget - amount
    const newSpent = department.spent + amount

    neonLabsCompany = Company.make({
        ...neonLabsCompany,
        departments: DeptalFiscalData.make({
            ...neonLabsCompany.departments,
            [departmentName] : FiscalDetails.make({ //assigns variab;e's VALUE as key
                budget: newBudget,
                spent: newSpent
            })
            
        })
    })
}

const a = JSON.stringify(neonLabsCompany, null, 4)
console.log(a)
spend('engineering', 5000)
const b = JSON.stringify(neonLabsCompany, null, 4)
console.log(b)


