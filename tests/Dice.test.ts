import { Dice } from '~/class'
import 'jest-chain'

describe('Dice: Initialization', () => {
  test('Initializing with float throws TypeError', () => {
    expect(() => {
      new Dice(1.1)
    }).toThrow(TypeError)
  })

  test('Initializing with invalid types throws TypeError', () => {
    expect(() => {
      //@ts-ignore
      new Dice('wow')
    }).toThrow(TypeError)
    expect(() => {
      //@ts-ignore
      new Dice(true)
    }).toThrow(TypeError)
    expect(() => {
      //@ts-ignore
      new Dice(null)
    }).toThrow(TypeError)
  })

  test('Initializing with negative number throws RangeError', () => {
    expect(() => {
      new Dice(-1)
    }).toThrow(RangeError)
  })

  test('Initializing with sides greater than 1,000,000,000 throws RangeError', () => {
    expect(() => {
      new Dice(1000000001)
    }).toThrow(RangeError)
  })

  test('Initializing with error should not return a value', () => {
    let diceTypeError
    let diceRangeError

    try {
      //@ts-ignore
      diceTypeError = new Dice('wow')
    } catch (e) {}
    try {
      diceRangeError = new Dice(-1)
    } catch (e) {}
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
      //@ts-ignore
      dice.rollMultiple(1.1)
    }).toThrow(TypeError)
  })

  test('rollMultiple with invalid types throws TypeError', () => {
    const dice = new Dice()
    expect(() => {
      //@ts-ignore
      dice.rollMultiple('wow')
    }).toThrow(TypeError)
    expect(() => {
      //@ts-ignore
      dice.rollMultiple(true)
    }).toThrow(TypeError)
    expect(() => {
      //@ts-ignore
      dice.rollMultiple(null)
    }).toThrow(TypeError)
  })

  test('rollMultiple with negative @params:times throws RangeError', () => {
    const dice = new Dice()
    expect(() => {
      //@ts-ignore
      dice.rollMultiple(-1)
    }).toThrow(RangeError)
  })

  test('rollMultiple with @params:times over 1000 throws RangeError', () => {
    const dice = new Dice()
    expect(() => {
      //@ts-ignore
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

    jest.spyOn(dice, 'rollMultiple').mockReturnValue([5, 15])
    let result = dice.rollAdvantage()
    jest.spyOn(dice, 'rollMultiple').mockRestore()

    expect(result)
      .toBeInstanceOf(Object)
      .toHaveProperty('value')
      .toHaveProperty('results')
      .toHaveProperty('type')
    expect(typeof result.value).toBe('number')
    expect(result.results).toBeInstanceOf(Array)
    expect(typeof result.type).toBe('string')
    expect(result.type).toBe('advantage')
  })

  test('rollAdvantage returns the proper format (when numbers match: 18)', () => {
    const dice = new Dice()

    jest.spyOn(dice, 'rollMultiple').mockReturnValue([18, 18])
    let result = dice.rollAdvantage()
    jest.spyOn(dice, 'rollMultiple').mockRestore()

    expect(result)
      .toBeInstanceOf(Object)
      .toHaveProperty('value')
      .toHaveProperty('results')
      .toHaveProperty('type')
    expect(typeof result.value).toBe('number')
    expect(result.results).toBeInstanceOf(Array)
    expect(typeof result.type).toBe('string')
    expect(result.type).toBe('advantage')
  })

  test('rollDisadvantage returns the proper format (6)', () => {
    const dice = new Dice()

    jest.spyOn(dice, 'rollMultiple').mockReturnValue([6, 16])
    let result = dice.rollDisadvantage()
    jest.spyOn(dice, 'rollMultiple').mockRestore()

    expect(result)
      .toBeInstanceOf(Object)
      .toHaveProperty('value')
      .toHaveProperty('results')
      .toHaveProperty('type')
    expect(typeof result.value).toBe('number')
    expect(result.results).toBeInstanceOf(Array)
    expect(typeof result.type).toBe('string')
    expect(result.type).toBe('disadvantage')
    expect(result.value).toBe(6)
  })

  test('rollDisadvantage returns the proper format (when numbers match, 10)', () => {
    const dice = new Dice()

    jest.spyOn(dice, 'rollMultiple').mockReturnValue([10, 10])
    let result = dice.rollDisadvantage()
    jest.spyOn(dice, 'rollMultiple').mockRestore()

    expect(result)
      .toBeInstanceOf(Object)
      .toHaveProperty('value')
      .toHaveProperty('results')
      .toHaveProperty('type')
    expect(typeof result.value).toBe('number')
    expect(result.results).toBeInstanceOf(Array)
    expect(typeof result.type).toBe('string')
    expect(result.type).toBe('disadvantage')
    expect(result.value).toBe(10)
  })
})
