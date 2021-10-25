export default class DiceeExceptions {
  paramTypeError = (param: string, type: string): TypeError => {
    return new TypeError(`@param:${param} must be of type \`${type}\``)
  }

  paramRangeError = (
    param: string,
    min: number,
    max: number,
    type?: string,
  ): RangeError => {
    const typeString = type ? '' : ` of type \`${type}\``
    return new RangeError(
      `@param:${param} value must be${typeString} between \`${min}\` and \`${max}\``,
    )
  }

  // TODO: Add tests for DiceeExceptions
}
