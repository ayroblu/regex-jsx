/** @jsx re */
import {r, re} from '../methods'

describe('methods.ts', () => {
  describe('normal', () => {
    const tests: [string, string][] = [
      [
        r.raw([r.wordBreak, r.group([r.union(['hi', 'bye'])]), r.wordBreak]),
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
        <raw>
          {'<'}
          <group>
            <character>a-z</character>
            <repeat />
          </group>
          <mayRepeat> </mayRepeat>
          <character negate={true}>/</character>
          <mayRepeat lazy={true} />
          {'>'}
        </raw>,
        '<([a-z]+) *[^/]*?>',
      ],
      [
        <raw>
          <character>a-z</character>
          <mayRepeat />
          just some text
        </raw>,
        '[a-z]*just some text',
      ],
      [
        <raw>
          <repeatN exactly={3}>hi</repeatN>
        </raw>,
        'hi{3}',
      ],
      [
        <raw>
          <wordBreak />
          <group>
            <union>
              <raw>hi</raw>
              <raw>bye</raw>
            </union>
          </group>
          <wordBreak />
        </raw>,
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
