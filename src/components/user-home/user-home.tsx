import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'user-home',
  styleUrl: 'user-home.css',
  // shadow: true,
})
export class UserHome {
  render() {
    return (
      <Host>
        <user-nav></user-nav>
        <main class="login">
          <img src="../../assets/images/hotel.jpg" alt="hotel" />
          <div class="marq">
            <marquee behavior="alternate" direction="right">
              <div class="msg">
                <h1>
                  Hello <span id="fname"></span> !.
                </h1>
                <script>fname.innerHTML = sessionStorage.getItem("fname")</script>
              </div>
            </marquee>
          </div>
        </main>
      </Host>
    );
  }
}
