import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MdAddShoppingCart } from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';

import PropTypes from 'prop-types';

import { formatPrice } from '../../util/format';
import api from '../../services/api';

import * as CartActions from '../../store/modules/cart/actions';

import { ProductList } from './styles';

class Home extends Component {
  static propTypes = {
    addToCardRequest: PropTypes.func.isRequired,
    amount: PropTypes.shape({
      amount: PropTypes.number,
    }).isRequired,
    loading: PropTypes.shape({
      plus: PropTypes.bool,
      minus: PropTypes.bool,
    }).isRequired,
  };

  state = {
    products: [],
  };

  async componentDidMount() {
    const response = await api.get(`products`);

    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));

    this.setState({
      products: data,
    });
  }

  handleAddProduct = id => {
    const { addToCardRequest } = this.props;
    addToCardRequest(id);
  };

  render() {
    const { products } = this.state;
    const { amount, loading } = this.props;
    console.tron.log(amount);
    return (
      <ProductList>
        {products.map(product => (
          <li key={product.id}>
            <img src={product.image} alt={product.title} />
            <strong>{product.title}</strong>
            <span>{product.priceFormatted}</span>

            <button
              type="button"
              onClick={() => this.handleAddProduct(product.id)}
            >
              {loading[product.id] ? (
                <div>
                  <FaSpinner size={16} color="#fff" className="spinner" />
                </div>
              ) : (
                <div>
                  <MdAddShoppingCart size={16} color="#fff" />
                  {amount[product.id] || 0}
                </div>
              )}

              <span>Adicionar ao carrinho</span>
            </button>
          </li>
        ))}
      </ProductList>
    );
  }
}

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;

    return amount;
  }, {}),
  loading: state.loading,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
