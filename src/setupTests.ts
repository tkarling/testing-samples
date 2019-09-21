// Following to setup react testing library
// this adds jest-dom's custom assertions
import '@testing-library/jest-dom/extend-expect'

// Following to setup enzyme
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import 'jest-enzyme'

configure({ adapter: new Adapter() })

// FIXME Remove when we upgrade to React >= 16.9
const originalConsoleError = console.error
console.error = (...args: any) => {
  if (/Warning.*not wrapped in act/.test(args[0])) {
    return
  }
  originalConsoleError(...args)
}
