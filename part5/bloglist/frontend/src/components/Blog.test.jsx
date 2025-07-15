import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container

  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'https://example.com',
    likes: 1337
  }

  const mockLikeHandler = vi.fn()

  beforeEach(() => {
    container = render(
      <Blog blog={blog} handleLike={mockLikeHandler} />  
    ).container
  })

  test('renders title and author but not url and likes', async () => {
    const blogVisible = container.querySelector('.blogVisible')
    expect(blogVisible).not.toHaveStyle('display: none')

    const blogToggle = container.querySelector('.blogToggle')
    expect(blogToggle).toHaveStyle('display: none')
  })

  test('url and likes appear when show button has been clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)

    const blogVisible = container.querySelector('.blogVisible')
    expect(blogVisible).not.toHaveStyle('display: none')

    const blogToggle = container.querySelector('.blogToggle')
    expect(blogToggle).not.toHaveStyle('display: none')
  })

  test('like button calls event handler', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.dblClick(button)

    expect(mockLikeHandler.mock.calls).toHaveLength(2)
  })
})
