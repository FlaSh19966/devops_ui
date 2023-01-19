import Login from '@/portal/Chatbot/Dashboard/Pages/Login'
import { mount } from '@vue/test-utils'

describe('Login.vue', () => {
  test('renders correctly', () => {
    const wrapper = mount(Login)
    expect(wrapper.element).toMatchSnapshot()
  })
})
