import { Schema as S } from 'effect'

export const FiscalDetails = S.TaggedStruct('FiscalDetails', {
    budget: S.Number,
    spent: S.Number
})

export const DeptalFiscalData = S.TaggedStruct('DeptFiscalData', {
    engineering: FiscalDetails,
    marketing: FiscalDetails,
    hr: FiscalDetails
})

export const Company = S.TaggedStruct('Company', {
    name: S.String,
    departments: DeptalFiscalData
    })