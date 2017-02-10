/* global customElements, HTMLElement */
import $ from 'zepto'

export default class ListFetchIndicator extends HTMLElement {
  constructor (self) {
    self = super(self)
    this.dom = {}
    this.rendered = false
    return self
  }

  connectedCallback () {
    this.dom.self = $(this)
    this.dom.fetcher = $(this.render())

    if (!this.rendered) {
      this.dom.self.append(this.dom.fetcher)
      this.rendered = true
    }
  }

  render () {
    return '<div style="color: red; margin-top: 1rem; border: 1px solid black; font-size: 1.5rem; padding: 1rem;">Loading ...</div>'
  }
}

customElements.define('product-list-fetch-indicator', ListFetchIndicator)
