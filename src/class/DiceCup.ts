import { Dice } from "~/class";
import { CupRoll } from "~/interface";


export default class DiceCup {
  dice: Dice[];

  addDice(dice: Dice): void {
    this.dice.push(dice);
  }

  rollAll(): CupRoll[] {
    const results: CupRoll[] = []
    this.dice.forEach((dice) => {
      results.push({
        die: "d" + dice.sides,
        result: dice.roll()
      })
    })
    return results;
  }

  rollAllAdvantage(): CupRoll[] {
    const results: CupRoll[] = []
    this.dice.forEach((dice) => {
      const roll = dice.rollAdvantage();
      results.push({
        die: "d" + dice.sides,
        result: roll.result,
        data: roll
      })
    })
    return results;
  }

  rollAllDisadvantage(): CupRoll[] {
    const results: CupRoll[] = []
    this.dice.forEach((dice) => {
      const roll = dice.rollDisadvantage();
      results.push({
        die: "d" + dice.sides,
        result: roll.result,
        data: roll
      })
    })
    return results;
  }
}