/** @jsx re */
import {r, re} from '../methods'

describe('methods.ts', () => {
  describe('normal', () => {
    const tests: [string, string][] = [
      [
        r.text([r.wordBreak, r.group([r.union(['hi', 'bye'])]), r.wordBreak]),
        '\\b(hi|bye)\\b',
      ],
    ]
    tests.forEach(([input, output]) => {
      it(`expect "${input}" to equal "${output}"`, () => {
        expect(input).toEqual(output)
      })
    })
  })
  describe('jsx', () => {
    const tests = [
      [
        <text>
          {'<'}
          <group>
            <character>a-z</character>
            <repeat />
          </group>
          <mayRepeat> </mayRepeat>
          <character negate={true}>/</character>
          <mayRepeat lazy={true} />
          {'>'}
        </text>,
        '<([a-z]+) *[^/]*?>',
      ],
      [
        <text>
          <character>a-z</character>
          <mayRepeat />
          just some text
        </text>,
        '[a-z]*just some text',
      ],
      [
        <text>
          <repeatN exactly={3}>hi</repeatN>
        </text>,
        'hi{3}',
      ],
      [
        <text>
          <wordBreak />
          <group>
            <union>
              <text>hi</text>
              <text>bye</text>
            </union>
          </group>
          <wordBreak />
        </text>,
        '\\b(hi|bye)\\b',
      ],
    ]
    tests.forEach(([input, output]) => {
      it(`expect ${input} to equal ${output}`, () => {
        expect(input).toEqual(output)
      })
    })
  })
})
