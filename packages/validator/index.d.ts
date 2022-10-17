import joi from 'joi'
import { Request } from '@middy-graphql/core'

interface JoiValidatorSchema {
  args?: joi.AnySchema<any>
}

declare function validator(schema: JoiValidatorSchema): {
  before: ((request: Request) => void) | undefined
}

export default validator
