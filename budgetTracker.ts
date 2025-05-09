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

function remainingBudget(company: Company, department: DepartmentName): number {
    return company.departments[department].budget 
}

function spend(company: Company, department: DepartmentName, amount: number): Company {
    const currentBudget = remainingBudget(company, department)
    if (currentBudget < amount) {
        console.log('Not enough money!')
        return company
    }
    
    const newBudget = currentBudget - amount
    const newSpent = company.departments[department].spent + amount

    const companyUpdated = Company.make({
        ...company,
        departments: DeptalFiscalData.make({
            ...company.departments,
            [department]: FiscalDetails.make({
                budget: newBudget,
                spent: newSpent,
            })
        })
    })

    return companyUpdated

}

function transferFunds(company: Company, fromDept: DepartmentName,
                        toDept: DepartmentName, amount: number): Company {
    if (remainingBudget(company, fromDept) < amount) {
        console.log('Not enough funds! ')
        return company
    }

    // removing funds from fromDept
    const intermediateCompanyState = spend(company, fromDept, amount)

    // giving toDept the previously mentioned funds
    const toDeptCurrentBudget = remainingBudget(company, toDept)

    const updatedCompanyState = Company.make({
        ...intermediateCompanyState,
        departments: DeptalFiscalData.make({
            ...intermediateCompanyState.departments,
            [toDept]: FiscalDetails.make({
                ...intermediateCompanyState.departments[toDept],
                budget: toDeptCurrentBudget + amount
            })
        })
    })

    return updatedCompanyState
}


const neonLabsCompany = Company.make({
    name: "Neon Labs",
    departments: DeptalFiscalData.make({
        engineering: enggFiscal,
        marketing: marketingFiscal,
        hr: hrFiscal
    })
})

const a = JSON.stringify(neonLabsCompany, null, 4)
console.log(a)
const b = spend(neonLabsCompany, 'engineering', 5000)
const b2 = JSON.stringify(b, null, 4)
console.log(b2)

const c = transferFunds(b, 'hr', 'engineering', b.departments.hr.budget)
const c2 = JSON.stringify(c, null, 4)
console.log(c2)

