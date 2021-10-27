export default interface AdvantageDisadvantageRoll {
  result: number
  data: {
    type: 'advantage' | 'disadvantage'
    rolls: number[]
  }
}
