import {Array, Schema as S, Match} from 'effect'
import { Character, CharacterClass } from './projectTypes'

const [Warrior, Mage, Rogue] = CharacterClass.members

function takeDamage(character: Character, damageCount: number): Character {
    // let newHP: number
    return Match.value(character.class).pipe(
        // self refers to Warrior 
        // 0 <= armorLevel < 99, expressed in percent 
        Match.tag('Warrior', (self) => {
            const damageTaken = Math.floor((1 - self.armorLevel/100) * damageCount)
            console.log(damageTaken)
            return Character.make({
                ...character,
                hp: max(Array.make(character.hp - damageTaken, 0))!
                })
        }),
        Match.tag('Mage', (self) => Character.make({
            ...character,
            hp: max(Array.make(character.hp - damageCount, 0))!,
            class: Mage.make({ // new mage as class
                mana: max(Array.make(self.mana, 0))!
            })
        })),
        Match.tag('Rogue', (self) => {
            // 0 <= evasionChance <= 100
            const randomChance = Math.random() * 100
            if (randomChance > self.evasionChance) {
                return character
            } 
            return Character.make({
                ...character,
                hp: max(Array.make(character.hp - damageCount, 0))!
            })
        }),
        Match.exhaustive)
}

function max(seq: number[]): number | void {
    if (Array.isEmptyArray(seq)) {
        return
    }
    let res = Array.unsafeGet(seq, 0)
    for (const num of seq) {
        if (num > res) {
            res = num
        }
    }
    return res
}

const test = Character.make({
    name: 'Gurt',
    class: Warrior.make({armorLevel: 60}),
    hp: 100
})

console.log(takeDamage(test, 80))