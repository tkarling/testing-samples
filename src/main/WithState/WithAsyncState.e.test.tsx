import React from 'react'
import {
  mount,
  callSetImmediate,
  getElement,
  click,
  expectTexts
} from '../../testHelpers.e'

import WithAsyncState from './WithAsyncState'
import WithContextAsyncState from './WithContextAsyncStateProvider'
import WithRenderProp from './WithRenderProp'

import { mockExpectedCounter } from '../../api/__mocks__/counterService'
jest.mock('../../api/counterService')

const counterId = 'counter'
const expectAsyncValue = async (wrapper: any, expectedValue: number) => {
  expectTexts(wrapper, ['Spinning'])
  await callSetImmediate()
  wrapper.update()
  expectTexts(wrapper, [expectedValue + ''])
}
;['WithAsyncState', 'WithContextAsyncState', 'WithRenderProp'].forEach(
  componentName => {
    const setup = () =>
      mount(
        componentName === 'WithAsyncState' ? (
          <WithAsyncState />
        ) : WithContextAsyncState ? (
          <WithContextAsyncState />
        ) : (
          <WithRenderProp />
        )
      )
    describe(componentName, () => {
      it('renders Spinning before fetch', () => {
        expect.assertions(2)
        const wrapper = setup()
        expectTexts(wrapper, ['Spinning'])
        expect(getElement(wrapper, counterId)).not.toExist()
      })

      it('renders async counter', async () => {
        expect.assertions(2)
        const wrapper = setup()
        await expectAsyncValue(wrapper, mockExpectedCounter)
      })

      it('can increment', async () => {
        expect.assertions(4)
        const wrapper = setup()
        await expectAsyncValue(wrapper, mockExpectedCounter)

        click(wrapper, counterId)
        await expectAsyncValue(wrapper, mockExpectedCounter + 1)
      })
    })
  }
)
