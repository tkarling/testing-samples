// Following to setup react testing library
// react-testing-library renders your components to document.body,
// this will ensure they're removed after each test.
import '@testing-library/react/cleanup-after-each'
// this adds jest-dom's custom assertions
import '@testing-library/jest-dom/extend-expect'

// Following to setup enzyme
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import 'jest-enzyme'

configure({ adapter: new Adapter() })
