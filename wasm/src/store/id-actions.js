import { idActions } from './id-slice'

export const fetchIdData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch()

      if (!response.ok) {
        throw new Error('Could not fetch cart data!')
      }

      const data = await response.json()

      return data
    }
    try {
      const cartData = await fetchData()
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      )
    } catch {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sent data failed!',
        })
      )
    }
  }
}

export const sendIdData = (cart) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        'https://react-http-22344-default-rtdb.firebaseio.com/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      )
      if (!response.ok) {
        throw new Error('error')
      }
    }
  }
}
