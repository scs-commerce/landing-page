/* global customElements, HTMLElement, fetch, Headers */
import $ from 'zepto'
import ProductListFetchIndicator from './product-list-fetch-indicator.js'
import endlessListFetcher from './endless-list-fetcher.js'

const arrify = (list) => [].slice.call(list)

export default class ProductList extends HTMLElement {
  constructor (self) {
    self = super(self)

    this.dom = {}
    this.dom.fetchIndicator = new ProductListFetchIndicator()

    return self
  }

  connectedCallback () {
    this.dom.productList = $(this)

    this.dom.products = $(this.dom.productList).find('.products')

    this.dom.prev = this.dom.productList.find('[rel=prev]')
    this.dom.next = this.dom.productList.find('[rel=next]')

    this.dom.next.hide()
    this.dom.prev.hide()

    this.getBookmarks()
    setTimeout(endlessListFetcher(this), 300)
  }

  fetch () {
    if (this.dom.next && this.dom.next.length > 0) {
      const href = this.dom.next[0].href

      this.dom.products.append(this.dom.fetchIndicator)

      return fetch(href)
        .then(res => res.text())
        .then(body => {
          setTimeout(() => this.dom.fetchIndicator.remove(), 500)
          this.addProducts(body)
        })
        .catch(e => console.log(e))
    }

    return Promise.resolve(true)
  }

  addProducts (body) {
    const newProducts = $(body)

    this.dom.next = newProducts.find('[rel=next]')
    newProducts.find('product-item')
      .forEach(product => this.addProduct(product))
  }

  addProduct (product) {
    console.log('add product')
    this.dom.products.append(product)
    this.updateProductBookmark(product)
  }

  getBookmarks () {
    const headers = new Headers({
      'Accept': 'application/json'
    })

    const requestConfig = {
      headers,
      credentials: 'same-origin'
    }

    return fetch('/order/basket', requestConfig)
      .then(res => res.json())
      .then(basket => {
        this.basket = basket
        this.updateProductBookmarks(this.basket.items)
      })
  }

  updateProductBookmarks (items) {
    Object.keys(items)
      .map(id => {
        const products = this.dom.products.find('product-item')

        return arrify(products)
          .filter(product => product.id === id)
          .forEach(product => product.mark(items[id]))
      })
  }

  updateProductBookmark (product) {
    this.basket && this.basket.items[product.id] && product.mark(this.basket.items[product.id])
  }

}

customElements.define('product-list', ProductList)
