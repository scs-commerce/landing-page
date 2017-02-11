/* global customElements, HTMLElement */
import $ from 'zepto'

export default class BookmarkForm extends HTMLElement {
  constructor (self) {
    self = super(self)
    this.dom = {}
    return self
  }

  init (product) {
    this.product = product
    this.dom.product = $(product)
  }

  connectedCallback () {
    this.dom.self = $(this)
    this.dom.template = $(this.render())
    this.dom.form = this.dom.template.find('form')
    this.dom.form = $(this.dom.form)
    this.dom.submit = this.dom.form.find('[type=submit]')
    this.dom.amount = this.dom.form.find('[name=amount]')

    this.dom.self.append(this.dom.template)

    this.dom.form.on('submit', (e) => {
      e.preventDefault()

      $.post(this.dom.form.attr('action'), this.dom.form.serialize(), (res) => {
        $(document).trigger('shopping-basket:update', [res])
        this.mark({ amount: this.dom.amount.val() })
      })
    })
  }

  // TODO: jsxify?
  render () {
    return `
    <div class="card-footer">
      <form action="/order/basket" method="POST">
        <input type="hidden" name="id" value="${this.product.id}">
        <input type="hidden" name="name" value="${this.product.name}">
        <input type="number" name="amount" value="1" min="1" max="5">
        <button type="submit" class="btn btn-sm">mark</button>
      </form>
    </div>`
  }

  mark (item) {
    this.dom.submit.text('update')
    this.dom.amount.val(item.amount)
  }
}

customElements.define('bookmark-form', BookmarkForm)
