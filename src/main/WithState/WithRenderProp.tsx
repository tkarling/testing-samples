import React from 'react'
import useCounter from './hooks/useCounter'
import Counter from './components/Counter'

const CounterRenderProp = ({ children }: { children: any }) =>
  children(useCounter('CounterRenderProp'))

export class WithRenderProp extends React.Component {
  render() {
    return (
      <div data-testid="container">
        <CounterRenderProp>
          {({
            counter,
            increment,
            loading
          }: {
            counter: number
            increment: () => void
            loading: boolean
          }) => (
            <Counter
              title="With Render Prop Async Counter"
              counter={counter}
              increment={increment}
              loading={loading}
            />
          )}
        </CounterRenderProp>
      </div>
    )
  }
}

export default WithRenderProp
