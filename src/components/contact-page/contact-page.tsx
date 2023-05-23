import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'contact-page',
  styleUrl: 'contact-page.css',
  shadow: true,
})
export class ContactPage {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
