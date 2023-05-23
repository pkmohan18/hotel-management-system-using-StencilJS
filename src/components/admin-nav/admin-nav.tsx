import { Component, Host, State, h } from '@stencil/core';

@Component({
  tag: 'admin-nav',
  styleUrl: 'admin-nav.css',
  // shadow: true,
})
export class AdminNav {
  @State() error: HTMLElement;

  logout() {
    this.error = <logout-component></logout-component>;
  }

  render() {
    return (
      <Host>
        <header class="nav-bar admin">
          <div class="logo">
            <a href="/adminhome">
              <h2>
                <i class="fa-solid fa-hotel"></i>
                HomeTown Hotel <sub style={{ fontSize: 'medium' }}>(Admin)</sub>
              </h2>
            </a>
          </div>
          <div class="nav-items">
            <ul>
              <div class="li">
                <a href="/adminhome">Home</a>
              </div>
              <div class="li">
                <a href="/viewuser">Users</a>
              </div>
              <div class="li">
                <a href="/addrooms">Rooms</a>
              </div>
              <div class="li">
                <a href="/approve">Approve Bookings</a>
              </div>
              <div class="li">
                <a href="/viewbooking">View Bookings</a>
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
