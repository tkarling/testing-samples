// import React from 'react'

// const SideMenu = () => <div>Hello</div>

// export default SideMenu

import React, { memo, useState } from 'react'
import { useSpring, a } from 'react-spring'
import { useMeasure, usePrevious } from './helpers'
import {
  Global,
  Frame,
  Title,
  Content,
  toggle,
  Page,
  Menu,
  PageContent
} from './styles'
import * as Icons from './icons'

const Tree = memo(({ children, name, style, defaultOpen = false, onClick }) => {
  const [isOpen, setOpen] = useState(defaultOpen)
  const previous = usePrevious(isOpen)
  const [bind, { height: viewHeight }] = useMeasure()
  const { height, opacity, transform } = useSpring({
    from: { height: 0, opacity: 0, transform: 'translate3d(20px,0,0)' },
    to: {
      height: isOpen ? viewHeight : 0,
      opacity: isOpen ? 1 : 0,
      transform: `translate3d(${isOpen ? 0 : 20}px,0,0)`
    }
  })
  const Icon =
    Icons[`${children ? (isOpen ? 'Minus' : 'Plus') : 'Close'}SquareO`]
  const onSetOpen = value => {
    setOpen(value)
    onClick()
  }
  return (
    <Frame>
      <Icon
        style={{ ...toggle, display: children ? 'default' : 'none' }}
        onClick={() => onSetOpen(!isOpen)}
      />
      <Title style={style} onClick={() => onSetOpen(!isOpen)}>
        {name}
      </Title>
      <Content
        style={{
          opacity,
          height: isOpen && previous === isOpen ? 'auto' : height
        }}
      >
        <a.div style={{ transform }} {...bind} children={children} />
      </Content>
    </Frame>
  )
})

const TreeWChildren = ({ name, kids, onClick }) => (
  <Tree name={name} onClick={() => onClick(name)}>
    {kids ? kids.map(kid => <TreeWChildren {...kid} onClick={onClick} />) : ''}
  </Tree>
)

const MENU = [
  {
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

const SideMenu = () => {
  const [page, setPage] = useState('parent1')
  return (
    <>
      <Global />
      <Page>
        <Menu>
          {MENU.map(item => (
            <TreeWChildren {...item} onClick={setPage} />
          ))}
        </Menu>
        <PageContent>{page}</PageContent>
      </Page>
    </>
  )
}

export default SideMenu
