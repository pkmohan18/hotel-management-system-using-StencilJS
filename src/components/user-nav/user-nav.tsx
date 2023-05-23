import { Component, Host, State, h } from '@stencil/core';

@Component({
  tag: 'user-nav',
  styleUrl: 'user-nav.css',
  // shadow: true,
})
export class UserNav {
  @State() error: HTMLElement;
  @State() user: string;

  connectedCallback(){
    this.user = sessionStorage.getItem('fname');
  }

  logout() {
    this.error = <logout-component></logout-component>;
  }

  render() {
    return (
      <Host>
        <header class="nav-bar">
          <div class="logo">
            <a href="/userhome">
              <h2>
                <i class="fa-solid fa-hotel"></i>
                HomeTown Hotel <sub style={{ fontSize: 'medium' }}>({this.user})</sub>
              </h2>
            </a>
          </div>
          <div class="nav-items">
            <ul>
              <div class="li">
                <a href="/userhome">Home</a>
              </div>
              <div class="li">
                <a href="/profile">Profile</a>
              </div>
              <div class="li">
                <a href="/viewrooms">Rooms</a>
              </div>
              <div class="li">
                <a href="/my-bookings">My Bookings</a>
              </div>
              <div class="li">
                <a href="/facilities">Facilities</a>
              </div>
              <div class="li">
                <a href="#">Contact Us</a>
              </div>
              <div class="li">
                <a href="#">About</a>
              </div>
            </ul>
          </div>
          <div class="sign">
            <a onClick={this.logout.bind(this)} class="button">
              Logout
            </a>
          </div>
        </header>
        <div class="error">{this.error}</div>
      </Host>
    );
  }
}
