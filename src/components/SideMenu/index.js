import React, { memo, useState } from 'react'
import { useSpring, a } from 'react-spring'
import { useMeasure, usePrevious } from './helpers'
import { Frame, Title, Content, toggle, Page, Menu } from './styles'
import * as Icons from './icons'

const Tree = memo(
  ({ children, name, id, style, defaultOpen = false, page, onSetPage }) => {
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
      onSetPage()
    }
    const activeStyle = id === page.id ? { fontWeight: 'bold' } : {}
    return (
      <Frame>
        <Icon
          style={{ ...toggle, display: children ? 'default' : 'none' }}
          onClick={() => onSetOpen(!isOpen)}
        />
        <Title
          style={{ ...style, ...activeStyle }}
          onClick={() => onSetOpen(!isOpen)}
        >
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
  }
)

const TreeWChildren = ({ id, name, kids, page, onSetPage }) => (
  <Tree
    id={id || name}
    name={name}
    page={page}
    onSetPage={() => onSetPage({ id: id || name, name })}
  >
    {kids
      ? kids.map(kid => (
          <TreeWChildren {...kid} page={page} onSetPage={onSetPage} />
        ))
      : ''}
  </Tree>
)

const getInitialPage = menu => {
  const { id, name } = menu && menu.length ? menu[0] : {}
  return { id, name }
}

const SideMenu = ({ menu, children }) => {
  const [page, setPage] = useState(() => getInitialPage(menu))
  return (
    <>
      <Page>
        <Menu>
          {menu.map(item => (
            <TreeWChildren {...item} page={page} onSetPage={setPage} />
          ))}
        </Menu>
        {children(page)}
      </Page>
    </>
  )
}

export default SideMenu
