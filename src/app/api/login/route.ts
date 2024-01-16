import cookie from 'cookie'

export const POST = async (request: Request) => {
  const { user, password } = await request.json()

  if (user === process.env.ADMIN_USER && password === process.env.ADMIN_PASSWORD) {
    return Response.json('login successful', {
      status: 200,
      headers: {
        'Set-Cookie': cookie.serialize('token', process.env.TOKEN!, {
          maxAge: 60 * 60,
          sameSite: 'strict',
          path: '/',
        }),
      },
    })
  } else {
    return  Response.json('login failed', {
      status: 400,
    })
  }

  // await database.disconnect()
}
