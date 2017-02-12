/* global customElements, HTMLElement */
import $ from 'zepto'
import './bookmark-form.js'

export default class Product extends HTMLElement {
  constructor (self) {
    self = super(self)
    this.dom = {}
    return self
  }

  connectedCallback () {
    this.dom.self = $(this)
    this.dom.bookmarkForm = $('<bookmark-form></bookmark-form>')
    this.bookmarkForm = this.dom.bookmarkForm[0]
    this.bookmarkForm.init(this)
    this.dom.self.append(this.dom.bookmarkForm)
  }

  get name () {
    this._name = this._name || this.dom.self.find('.product-name').text()
    return this._name
  }

  get id () {
    this._id = this._id || this.dom.self.attr('data-id')
    return this._id
  }

  get price () {
    this._price = this._price || this.dom.self.attr('data-price')
    return this._price
  }

  mark (item) {
    this.bookmarkForm.mark(item)
  }
}

customElements.define('product-item', Product)
