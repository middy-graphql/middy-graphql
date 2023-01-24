import joi from 'joi'
import { Request } from '@middy-graphql/core'

interface JoiValidatorSchema {
  args?: joi.AnySchema<any>
}

declare function validator(
  schema: JoiValidatorSchema,
  cb?: (
    errors: {
      message: string
      label: string
      key: string
      value: string
    }[]
  ) => Promise<any> | any
): {
  before: ((request: Request) => void) | undefined
}

export default validator
