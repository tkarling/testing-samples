import React from 'react'
import { action } from '@storybook/addon-actions'
// import { Button } from '@storybook/react/demo'

import SideMenu from './index'
export default {
  title: 'Moi'
}

// export const text = () => (
//   <Button onClick={action('clicked')}>Hello Button</Button>
// )

export const tree = () => <SideMenu />
