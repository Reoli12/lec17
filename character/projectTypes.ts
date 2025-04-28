import {Schema as S,} from 'effect'

export type CharacterClass = typeof CharacterClass.Type
export type Character = typeof Character.Type

export const CharacterClass = S.Union(
    S.TaggedStruct('Warrior', {
        /** 0 <= armorLevel < 100 */
        armorLevel: S.Number
    }),
    S.TaggedStruct('Mage', {
        mana: S.Number
    }),
    S.TaggedStruct('Rogue', {
        /** 0 <= evasionChance <= 100 */
        evasionChance: S.Number
    })
)

export const Character = S.TaggedStruct('Character', {
    name: S.String,
    class: CharacterClass,
    hp: S.Number,
});
