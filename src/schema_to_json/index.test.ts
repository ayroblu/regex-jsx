import {tableToSchema} from './'

describe('schema to json', () => {
  describe('tableToSchema', () => {
    const ob = [['t1']]
    expect(tableToSchema(ob)).toEqual({})
  })
})
