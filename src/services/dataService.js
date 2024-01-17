function getSession() {
  const token = JSON.parse(sessionStorage.getItem('token'))
  const cbid = JSON.parse(sessionStorage.getItem('cbid'))

  return { token, cbid }
}

export async function getUser() {
  const browserData = getSession()
  const requestOptions = {
    method: 'GET',
    headers: {
      'content-Type': 'application/json',
      Authorization: `Bearer ${browserData.token}`,
    },
  }

  const response = await fetch(
    `${process.env.REACT_APP_HOST}/600/users/${browserData.cbid}`,
    requestOptions
  )
  if (!response.ok) {
    // eslint-disable-next-line no-throw-literal
    throw {
      message: response.statusText,
      status: response.status,
    } 
  }
  const data = await response.json()

  return data
}

export async function getUserOrders() {
  const browserData = getSession()
  const requestOrders = {
    method: 'GET',
    headers: {
      'content-Type': 'application/json',
      Authorization: `Bearer ${browserData.token}`,
    },
  }

  const response = await fetch(
    `${process.env.REACT_APP_HOST}/660/orders?user.id=${browserData.cbid}`,
    requestOrders
  )
  if (!response.ok) {
    // eslint-disable-next-line no-throw-literal
    throw {
      message: response.statusText,
      status: response.status,
    } 
  }
  const data = await response.json()

  return data
}

export async function createOrder(cartList, total, user) {
  const browserData = getSession()
  const order = {
    cartList: cartList,
    amount_paid: total,
    quantity: cartList.length,
    user: {
      name: user.name,
      email: user.email,
      id: user.id,
    },
  }

  const requestOrderOptions = {
    method: 'POST',
    headers: {
      'content-Type': 'application/json',
      Authorization: `Bearer ${browserData.token}`,
    },
    body: JSON.stringify(order),
  }

  const response = await fetch(
    `${process.env.REACT_APP_HOST}/660/orders`,
    requestOrderOptions
  )
  // console.log(response)
  if (!response.ok) {
    // eslint-disable-next-line no-throw-literal
    throw {
      message: response.statusText,
      status: response.status,
    } 
  }

  const data = await response.json()
  // console.log(response)

  return data
}
