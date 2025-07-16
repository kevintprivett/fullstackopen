const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    // empty the db
    await request.post('http://localhost:3001/api/testing/reset')

    // create a user for the backend here
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'test name',
        username: 'testusername',
        password: 'testpassword'
      }
    })

    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'test name 1',
        username: 'testusername1',
        password: 'testpassword1'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const login = await page.getByRole('button', { name: 'login' }) 

    await expect(login).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByTestId('username').fill('testusername')
      await page.getByTestId('password').fill('testpassword')

      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('test name logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('testusername')
      await page.getByTestId('password').fill('wrong')

      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Wrong credentials')).toBeVisible()
    })

    describe('When logged in', () => {
      beforeEach(async ({ page }) => {
        await page.getByTestId('username').fill('testusername')
        await page.getByTestId('password').fill('testpassword')
        await page.getByRole('button', { name: 'login' }).click()
      })

      test('a new blog can be created', async ({ page }) => {
        await page.getByRole('button', { name: 'new blog' }).click()
        await page.getByTestId('title').fill('test title')
        await page.getByTestId('author').fill('test author')
        await page.getByTestId('url').fill('www.url.com')
        await page.getByRole('button', { name: 'create' }).click()

        await expect(page.getByText('test title test author')).toBeVisible()
      })

      describe('With existing blog', () => {
        beforeEach(async ({ page }) => {
          await page.getByRole('button', { name: 'new blog' }).click()
          await page.getByTestId('title').fill('test title')
          await page.getByTestId('author').fill('test author')
          await page.getByTestId('url').fill('www.url.com')
          await page.getByRole('button', { name: 'create' }).click()
        })

        test('a blog can be liked', async ({ page }) => {
          // expand blog
          await page.getByRole('button', { name: 'show' }).click()

          // click like
          await page.getByRole('button', { name: 'like' }).click()

          // verify that number of likes is 1
          await expect(page.getByText('Likes: 1')).toBeVisible()
        })

        test('a blog can be deleted by owner', async ({ page }) => {
          // expand blog
          await page.getByRole('button', { name: 'show' }).click()

          // make handle to confirm on window
          page.on('dialog', dialog => dialog.accept())

          // click delete
          await page.getByRole('button', { name: 'delete' }).click()

          // verify that there is no more blog shown
          await expect(page.getByText('test title test author')).not.toBeVisible()
        })

        test('delete button not visible for non-owner', async ({ page }) => {
          // logout
          await page.getByRole('button', { name: 'Logout' }).click()

          // login as second user
          await page.getByTestId('username').fill('testusername1')
          await page.getByTestId('password').fill('testpassword1')
          await page.getByRole('button', { name: 'login' }).click()

          // verify that there is no delete button
          await expect(page.getByRole('button', { name: 'delete' })).not.toBeVisible()
        })

        test('blogs are arranged by likes', async ({ page }) => {
          // create a couple more blogs
          await page.getByRole('button', { name: 'new blog' }).click()
          await page.getByTestId('title').fill('test title 1')
          await page.getByTestId('author').fill('test author 1')
          await page.getByTestId('url').fill('www.url1.com')
          await page.getByRole('button', { name: 'create' }).click()
          await page.getByText('test title 1 test author 1').waitFor()

          await page.getByRole('button', { name: 'new blog' }).click()
          await page.getByTestId('title').fill('test title 2')
          await page.getByTestId('author').fill('test author 2')
          await page.getByTestId('url').fill('www.url2.com')
          await page.getByRole('button', { name: 'create' }).click()
          await page.getByText('test title 2 test author 2').waitFor()

          // expand all
          let showButton = await page.getByRole('button', { name: 'show' }).first()

          await showButton.click()
          await page.getByText('www.url.com')

          showButton = await page.getByRole('button', { name: 'show' }).first()
          await showButton.click()
          await page.getByText('www.url1.com')

          showButton = await page.getByRole('button', { name: 'show' }).first()
          await showButton.click()
          await page.getByText('www.url2.com')

          // like bottom, like top, like bottom
          let likeButtons = await page.getByRole('button', { name: 'like' }).all() 
          await likeButtons[0].click()

          likeButtons = await page.getByRole('button', { name: 'like' }).all() 
          await likeButtons.at(-1).click()

          likeButtons = await page.getByRole('button', { name: 'like' }).all() 
          await likeButtons[0].click()

          // verify order
          const likes = await page.getByText('Likes: ').all()

          await expect(likes[0]).toHaveText('Likes: 0like')
          await expect(likes[1]).toHaveText('Likes: 1like')
          await expect(likes[2]).toHaveText('Likes: 2like')
        })
      })
    })
  })
})
