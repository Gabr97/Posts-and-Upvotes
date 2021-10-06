import api from '../api'

describe('Login', () => {
  it('Deverá logar', async () => {
    const user = 'gabso'
    const password = 'gabsgabs'

    const userToSend = {
      username: `${user}`,
      password: `${password}`,
    }

    const response = await api.post('sign-in', userToSend)

    expect(response.status).toEqual(200)
  })
})
