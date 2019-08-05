import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';

import { formatPrice } from '../../util/format';
import * as CartActions from '../../store/modules/cart/actions';
import { Container, ProductTable, Total } from './styles';

export default function Cart() {
  const cart = useSelector(state =>
    state.cart.map(product => ({
      ...product,
      subTotal: formatPrice(product.amount * product.price),
    }))
  );
  const total = useMemo(
    () =>
      formatPrice(
        cart.reduce((acumulator, product) => {
          return acumulator + product.amount * product.price;
        }, 0)
      ),
    [cart]
  );

  const loading = useSelector(state => state.loading);

  const dispatch = useDispatch();

  function increment(product) {
    dispatch(
      CartActions.updateAmountRequest(product.id, product.amount + 1, 'plus')
    );
  }

  function decrement(product) {
    dispatch(
      CartActions.updateAmountRequest(product.id, product.amount - 1, 'minus')
    );
  }

  function handleRemoveProduct(id) {
    dispatch(CartActions.removeFromCart(id));
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {cart.map(product => (
            <tr key={product.id}>
              <td>
                <img src={product.image} alt={product.title} />
              </td>
              <td>
                <strong>{product.title}</strong>
                <span>{product.priceFormatted}</span>
              </td>
              <td>
                <div>
                  {loading[product.id] && loading[product.id].minus ? (
                    <div>
                      <FaSpinner size={20} color="#7159c1" />
                    </div>
                  ) : (
                    <button type="button" onClick={() => decrement(product)}>
                      <MdRemoveCircleOutline size={20} color="#7159c1" />
                    </button>
                  )}

                  <div>
                    <input type="number" readOnly value={product.amount} />
                  </div>

                  {loading[product.id] && loading[product.id].plus ? (
                    <div>
                      <FaSpinner size={20} color="#7159c1" />
                    </div>
                  ) : (
                    <button type="button" onClick={() => increment(product)}>
                      <MdAddCircleOutline size={20} color="#7159c1" />
                    </button>
                  )}
                </div>
              </td>
              <td>
                <strong>{product.subTotal}</strong>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => handleRemoveProduct(product.id)}
                >
                  <MdDelete size={20} color="#7159c1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>

      <footer>
        <button type="button">Finalizar pedido</button>
        <Total>
          <span>Total</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
}
