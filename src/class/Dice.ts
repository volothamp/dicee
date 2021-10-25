import { DiceeExceptions } from '~/class'
import { AdvantageDisadvantageRoll, DiceOptions } from '~/interface'

const options: DiceOptions = {
  maxSides: 1000000000,
  minSides: 1,
  defaultSides: 20,
  maxRollMultiple: 1000,
  minRollMultiple: 1,
  defaultRollMultiple: 2,
}

const exceptions: DiceeExceptions = new DiceeExceptions()

export default class Dice {
  sides: number

  constructor(sides: number = options.defaultSides) {
    if (!Number.isInteger(sides)) {
      throw exceptions.paramTypeError('sides', 'integer')
    }
    if (sides < options.minSides || sides > options.maxSides) {
      throw exceptions.paramRangeError(
        'sides',
        options.minSides,
        options.maxSides,
      )
    }
    this.sides = sides
  }

  roll = (): number => {
    return Math.floor(Math.random() * this.sides + 1)
  }

  rollMultiple = (times: number = options.defaultRollMultiple): number[] => {
    if (!Number.isInteger(times)) {
      throw exceptions.paramTypeError('times', 'integer')
    }
    if (times < options.minRollMultiple || times > options.maxRollMultiple) {
      throw exceptions.paramRangeError(
        'sides',
        options.minRollMultiple,
        options.maxRollMultiple,
      )
    }

    return Array.apply(null, { length: times }).map(Function.call, this.roll)
  }

  rollAdvantage = (): AdvantageDisadvantageRoll => {
    const results: number[] = this.rollMultiple(2)
    return {
      value: Math.max(...results),
      results,
      type: 'advantage',
    }
  }

  rollDisadvantage = (): AdvantageDisadvantageRoll => {
    const results: number[] = this.rollMultiple(2)
    return {
      value: Math.min(...results),
      results,
      type: 'disadvantage',
    }
  }
}
