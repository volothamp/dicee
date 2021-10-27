import { Dice } from '~/class'

import 'jest-chain'

describe('Dice: Initialization', () => {
  test('Initializing with float throws TypeError', () => {
    expect(() => new Dice(1.1)).toThrow(TypeError)
  })

  test('Initializing with invalid types throws TypeError', () => {
    expect(
      () =>
        // @ts-ignore
        new Dice('wow'),
    ).toThrow(TypeError)
    expect(
      () =>
        // @ts-ignore
        new Dice(true),
    ).toThrow(TypeError)
    expect(
      () =>
        // @ts-ignore
        new Dice(null),
    ).toThrow(TypeError)
  })

  test('Initializing with negative number throws RangeError', () => {
    expect(() => new Dice(-1)).toThrow(RangeError)
  })

  test('Initializing with sides greater than 1,000,000,000 throws RangeError', () => {
    expect(() => new Dice(1000000001)).toThrow(RangeError)
  })

  test('Initializing with error should not return a value', () => {
    let diceTypeError
    let diceRangeError

    // @ts-ignore
    diceTypeError = new Dice('wow')
    // @ts-ignore
    diceRangeError = new Dice(-1)

    expect(diceTypeError).not.toBeInstanceOf(Dice)
    expect(diceRangeError).not.toBeInstanceOf(Dice)
  })

  test('Initializing with no passed value should be a d20', () => {
    const dice = new Dice()
    expect(dice).toBeInstanceOf(Dice)
    expect(dice.sides).toStrictEqual(20)
  })

  test('Initializing with integer <n> returns Dice object with <n> sides', () => {
    const die6 = new Dice(6)
    const die20 = new Dice(20)
    const die100 = new Dice(100)

    expect(die6).toBeInstanceOf(Dice)
    expect(die6.sides).toStrictEqual(6)
    expect(die20).toBeInstanceOf(Dice)
    expect(die20.sides).toStrictEqual(20)
    expect(die100).toBeInstanceOf(Dice)
    expect(die100.sides).toStrictEqual(100)
  })
})

describe('Dice: Rolling', () => {
  const minRand = 0
  const maxRand = 0.9999999999999999

  test('roll() returns an integer, between 1 and Dice.sides', () => {
    const dice = new Dice()

    // Test min
    jest.spyOn(global.Math, 'random').mockReturnValue(minRand)
    expect(dice.roll()).toBe(1)
    jest.spyOn(global.Math, 'random').mockRestore()

    // Test max
    jest.spyOn(global.Math, 'random').mockReturnValue(maxRand)
    expect(dice.roll()).toBe(20)
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  test('rollMultiple with float @params:times throws TypeError', () => {
    const dice = new Dice()
    expect(() => {
      // @ts-ignore
      dice.rollMultiple(1.1)
    }).toThrow(TypeError)
  })

  test('rollMultiple with invalid types throws TypeError', () => {
    const dice = new Dice()
    expect(() => {
      // @ts-ignore
      dice.rollMultiple('wow')
    }).toThrow(TypeError)
    expect(() => {
      // @ts-ignore
      dice.rollMultiple(true)
    }).toThrow(TypeError)
    expect(() => {
      // @ts-ignore
      dice.rollMultiple(null)
    }).toThrow(TypeError)
  })

  test('rollMultiple with negative @params:times throws RangeError', () => {
    const dice = new Dice()
    expect(() => {
      // @ts-ignore
      dice.rollMultiple(-1)
    }).toThrow(RangeError)
  })

  test('rollMultiple with @params:times over 1000 throws RangeError', () => {
    const dice = new Dice()
    expect(() => {
      // @ts-ignore
      dice.rollMultiple(1001)
    }).toThrow(RangeError)
  })

  test('rollMultiple without passed @params:times returns array of valid rolls of length:<2>', () => {
    const dice = new Dice()
    expect(dice.rollMultiple()).toBeInstanceOf(Array).toHaveLength(2)
  })

  test('rollMultiple returns an array of valid rolls of length:<@params:times>', () => {
    const dice = new Dice()
    expect(dice.rollMultiple(10)).toBeInstanceOf(Array).toHaveLength(10)
  })
})

describe('Dice: Rolling Advantage/Disadvantage', () => {
  test('rollAdvantage returns the proper format (15)', () => {
    const dice = new Dice()
    const testLow = 5
    const testHigh = 15

    jest.spyOn(dice, 'rollMultiple').mockReturnValue([testLow, testHigh])
    const roll = dice.rollAdvantage()
    jest.spyOn(dice, 'rollMultiple').mockRestore()

    expect(roll)
      .toBeInstanceOf(Object)
      .toHaveProperty('result')
      .toHaveProperty('data')
    expect(roll.result).toBe(testHigh)
    expect(roll.data)
      .toBeInstanceOf(Object)
      .toHaveProperty('type')
      .toHaveProperty('rolls')
    expect(roll.data.rolls).toBeInstanceOf(Array).toHaveLength(2)
    expect(roll.data.type).toBe('advantage')
    expect(roll.data.rolls[0]).toBe(testLow)
    expect(roll.data.rolls[1]).toBe(testHigh)
  })

  test('rollAdvantage returns the proper format (when numbers match: 18)', () => {
    const dice = new Dice()
    const testLow = 18
    const testHigh = 18

    jest.spyOn(dice, 'rollMultiple').mockReturnValue([testLow, testHigh])
    const roll = dice.rollAdvantage()
    jest.spyOn(dice, 'rollMultiple').mockRestore()

    expect(roll)
      .toBeInstanceOf(Object)
      .toHaveProperty('result')
      .toHaveProperty('data')
    expect(roll.result).toBe(testHigh)
    expect(roll.data)
      .toBeInstanceOf(Object)
      .toHaveProperty('type')
      .toHaveProperty('rolls')
    expect(roll.data.rolls).toBeInstanceOf(Array).toHaveLength(2)
    expect(roll.data.type).toBe('advantage')
    expect(roll.data.rolls[0]).toBe(testLow)
    expect(roll.data.rolls[1]).toBe(testHigh)
  })

  test('rollDisadvantage returns the proper format (6)', () => {
    const dice = new Dice()
    const testLow = 6
    const testHigh = 16

    jest.spyOn(dice, 'rollMultiple').mockReturnValue([testLow, testHigh])
    const roll = dice.rollAdvantage()
    jest.spyOn(dice, 'rollMultiple').mockRestore()

    expect(roll)
      .toBeInstanceOf(Object)
      .toHaveProperty('result')
      .toHaveProperty('data')
    expect(roll.result).toBe(testLow)
    expect(roll.data)
      .toBeInstanceOf(Object)
      .toHaveProperty('type')
      .toHaveProperty('rolls')
    expect(roll.data.rolls).toBeInstanceOf(Array).toHaveLength(2)
    expect(roll.data.type).toBe('advantage')
    expect(roll.data.rolls[0]).toBe(testLow)
    expect(roll.data.rolls[1]).toBe(testHigh)
  })

  test('rollDisadvantage returns the proper format (when numbers match, 10)', () => {
    const dice = new Dice()
    const testLow = 10
    const testHigh = 10

    jest.spyOn(dice, 'rollMultiple').mockReturnValue([testLow, testHigh])
    const roll = dice.rollAdvantage()
    jest.spyOn(dice, 'rollMultiple').mockRestore()

    expect(roll)
      .toBeInstanceOf(Object)
      .toHaveProperty('result')
      .toHaveProperty('data')
    expect(roll.result).toBe(testLow)
    expect(roll.data)
      .toBeInstanceOf(Object)
      .toHaveProperty('type')
      .toHaveProperty('rolls')
    expect(roll.data.rolls).toBeInstanceOf(Array).toHaveLength(2)
    expect(roll.data.type).toBe('advantage')
    expect(roll.data.rolls[0]).toBe(testLow)
    expect(roll.data.rolls[1]).toBe(testHigh)
  })
})
