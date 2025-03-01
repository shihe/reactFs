import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../../src/components/Blog'
import { testBlog } from './test_helper'

describe('<Blog />', () => {
  let container, mockHandler

  beforeEach(() => {
    mockHandler = vi.fn()
    container = render(<Blog blog={testBlog} addLike={mockHandler} />).container
  })

  test('renders content', async () => {
    const div = screen.getByLabelText('hide-details')
    expect(div).not.toHaveStyle('display: none')
    expect(div).toHaveTextContent(`${testBlog.title} ${testBlog.author}`)
    expect(div).not.toHaveTextContent(`${testBlog.likes}`)
    expect(div).not.toHaveTextContent(`${testBlog.url}`)
  })

  test('clicking view button shows details', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const div = screen.getByLabelText('show-details')
    expect(div).not.toHaveStyle('display: none')
    expect(div).toHaveTextContent(`${testBlog.likes}`)
    expect(div).toHaveTextContent(`${testBlog.url}`)
  })

  test('clicking like button twice triggers mock handler twice', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})