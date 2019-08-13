import React from 'react'
import { mount } from 'enzyme'
import { getElement, getText, click, toggleCheck } from '../testHelpers.e'
import { TEXT, TEST_ID } from './Common'
import WithReducer from './WithReducer'

const setup = () => mount(<WithReducer />)
describe('WithState', () => {
  let wrapper: any
  beforeEach(() => {
    wrapper = setup()
  })
  it('renders initial value', () => {
    expect(getText(wrapper, TEST_ID.container)).toContain(TEXT.noItems)
  })

  it('can add Item', () => {
    click(wrapper, TEST_ID.addButton)
    expect(getText(wrapper, TEST_ID.container)).toContain(TEXT.itemTitleBase)
  })

  describe('with one item created', () => {
    beforeEach(() => {
      wrapper = setup()
      click(wrapper, TEST_ID.addButton)
      expect(getText(wrapper, TEST_ID.container)).toContain(TEXT.itemTitleBase)
    })
    it('can toggle checked status', async () => {
      expect(getElement(wrapper, TEST_ID.toggleCheck)).not.toBeChecked()

      // toggle completed to true
      toggleCheck(wrapper, TEST_ID.toggleCheck)
      await wrapper.update()
      expect(getElement(wrapper, TEST_ID.toggleCheck)).toBeChecked()

      // toggle completed back to false
      toggleCheck(wrapper, TEST_ID.toggleCheck)
      await wrapper.update()
      expect(getElement(wrapper, TEST_ID.toggleCheck)).not.toBeChecked()
    })

    it('can delete Item', () => {
      click(wrapper, TEST_ID.deleteButton)
      expect(getText(wrapper, TEST_ID.container)).toContain(TEXT.noItems)
    })
  })
})
