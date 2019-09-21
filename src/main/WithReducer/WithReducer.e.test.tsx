import React from 'react'
import {
  mount,
  getElement,
  click,
  toggleCheck,
  expectTexts
} from '../../testHelpers.e'
import { TEXT, TEST_ID } from './components/Common'
import WithReducer from './WithReducer'

const setup = () => mount(<WithReducer />)
describe('WithState', () => {
  let wrapper: any
  beforeEach(() => {
    wrapper = setup()
  })
  it('renders initial value', () => {
    expectTexts(wrapper, [TEXT.noItems])
  })

  it('can add Item', () => {
    click(wrapper, TEST_ID.addButton)
    expectTexts(wrapper, [TEXT.itemTitleBase])
  })

  describe('with one item created', () => {
    beforeEach(() => {
      click(wrapper, TEST_ID.addButton)
      expectTexts(wrapper, [TEXT.itemTitleBase])
    })
    it('can toggle checked status', () => {
      expect(getElement(wrapper, TEST_ID.toggleCheck)).not.toBeChecked()

      // toggle completed to true
      toggleCheck(wrapper, TEST_ID.toggleCheck)
      wrapper.update()
      expect(getElement(wrapper, TEST_ID.toggleCheck)).toBeChecked()

      // toggle completed back to false
      toggleCheck(wrapper, TEST_ID.toggleCheck)
      wrapper.update()
      expect(getElement(wrapper, TEST_ID.toggleCheck)).not.toBeChecked()
    })

    it('can delete Item', () => {
      click(wrapper, TEST_ID.deleteButton)
      expectTexts(wrapper, [TEXT.noItems])
    })
  })
})
