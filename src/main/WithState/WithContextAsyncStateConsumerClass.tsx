import React from 'react'
import Counter from './components/Counter'
import { CounterContext, ActionContext } from './WithContextContext'

class WithAsyncConsumerClass extends React.Component {
  render() {
    return (
      <ActionContext.Consumer>
        {({ increment }) => (
          <CounterContext.Consumer>
            {({ counter, loading }) => (
              <Counter
                id="classCounter"
                title="Context Async Counter Class"
                counter={counter}
                increment={increment}
                loading={loading}
              />
            )}
          </CounterContext.Consumer>
        )}
      </ActionContext.Consumer>
    )
  }
}

export default WithAsyncConsumerClass
