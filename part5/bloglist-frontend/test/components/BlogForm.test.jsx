import { render, screen } from '@testing-library/react'
import BlogForm from '../../src/components/BlogForm'
import userEvent from '@testing-library/user-event'
import { testBlog } from './test_helper'

describe('<BlogForm />', () => {
  test('submitting calls createBlog with proper input', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()
    render(<BlogForm createBlog={createBlog} />)

    const titleInput = screen.getByRole('textbox', { name : "title" })
    const authorInput = screen.getByRole('textbox', { name : "author" })
    const urlInput = screen.getByRole('textbox', { name : "url" })
    const createButton = screen.getByText('create')

    await user.type(titleInput, testBlog.title)
    await user.type(authorInput, testBlog.author)
    await user.type(urlInput, testBlog.url)
    await user.click(createButton)
    expect(createBlog.mock.calls).toHaveLength(1)

    const createCallInput = createBlog.mock.calls[0][0]
    expect(createCallInput.title).toBe(testBlog.title)
    expect(createCallInput.author).toBe(testBlog.author)
    expect(createCallInput.url).toBe(testBlog.url)
  })
})