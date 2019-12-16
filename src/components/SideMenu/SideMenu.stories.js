import React from 'react'
import { action } from '@storybook/addon-actions'

import { Global, PageContent } from './styles'
import SideMenu from './index'
export default {
  title: 'SideMenu'
}

const MENU = [
  {
    id: 1,
    name: 'parent1',
    kids: [{ name: 'child11' }, { name: 'child12' }, { name: 'child13' }]
  },
  {
    name: 'parent2'
  },
  {
    name: 'parent3',
    kids: [
      { name: 'child31' },
      { name: 'child32', kids: [{ name: 'gchild321' }] }
    ]
  },
  {
    name: <span>🙀something something</span>
  }
]

export const basic = () => (
  <>
    <Global />
    <SideMenu menu={MENU}>
      {page => (
        <PageContent>
          Page: id: {page.id}, name: {page.name}
        </PageContent>
      )}
    </SideMenu>
  </>
)
