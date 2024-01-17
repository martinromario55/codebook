import { useTitle } from '../../hooks/useTitle'

import { CartEmpty } from './components/CartEmpty'
import { CartList } from './components/CartList'
import { useCart } from '../../context'

export const CartPage = () => {
  useTitle('Cart')

  const { cartList } = useCart()

  return <main>{cartList.length ? <CartList /> : <CartEmpty />}</main>
}
