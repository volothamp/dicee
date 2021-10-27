import Dice from '~/class/Dice'

class Dicee {
  loose: Dice[] = []

  addDie(sides: number, quantity: number) {
    for (let i = 0; i < quantity; i++) {
      this.loose.push(new Dice(sides))
    }
  }
}

export = Dicee
