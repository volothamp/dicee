import { AdvantageDisadvantageRoll } from '~/interface'

export default interface CupRoll {
  die: string
  result: number
  data?: AdvantageDisadvantageRoll
}
