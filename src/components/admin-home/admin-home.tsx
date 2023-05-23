import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'admin-home',
  styleUrl: 'admin-home.css',
  // shadow: true,
})
export class AdminHome {
  render() {
    return (
      <Host>
        <admin-nav></admin-nav>
        <main class="login">
          <img src="../../assets/images/hotel.jpg" alt="hotel" />
          <div class="marq">
            <marquee behavior="alternate" direction="right">
              <div class="msg">
                <h1>Hello Admin!.</h1>
              </div>
            </marquee>
          </div>
        </main>
      </Host>
    );
  }
}
