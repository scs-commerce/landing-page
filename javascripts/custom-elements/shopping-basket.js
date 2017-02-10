/* global customElements, HTMLElement */
import $ from 'zepto'

export default class ShoppingBasket extends HTMLElement {
  constructor (self) {
    self = super(self)
    this.dom = {}
    return self
  }

  connectedCallback () {
    this.dom.self = $(this)
    this.dom.basketItems = $('.basket-items', this.dom.self)
    $(document).on('shopping-basket:update', (e, basket) => this.update(basket))
  }

  update (basket) {
    this.dom.basketItems.replaceWith(basket)
  }
}

customElements.define('shopping-basket', ShoppingBasket)
