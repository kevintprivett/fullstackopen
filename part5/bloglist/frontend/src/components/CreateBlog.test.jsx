import { render, screen } from '@testing-library/react'
import CreateBlog from './CreateBlog'
import userEvent from '@testing-library/user-event'

describe('<CreateBlog />', () => {
  
  test('Create Blog Form functions properly', async () => {
    const mockHandleCreate = vi.fn()

    const user = userEvent.setup()

    render(<CreateBlog handleCreate={mockHandleCreate} />)

    const input = screen.getAllByRole('textbox')
    const submitButton = screen.getByText('create')

    await user.type(input[0], 'test title')
    await user.type(input[1], 'test author')
    await user.type(input[2], 'test url')
    
    await user.click(submitButton)

    expect(mockHandleCreate.mock.calls).toHaveLength(1)

    console.log(mockHandleCreate.mock.calls[0][0])

    expect(mockHandleCreate.mock.calls[0][0].title).toBe('test title')
    expect(mockHandleCreate.mock.calls[0][0].author).toBe('test author')
    expect(mockHandleCreate.mock.calls[0][0].url).toBe('test url')
  })
})
