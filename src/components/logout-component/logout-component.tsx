import { Component } from '@stencil/core';

@Component({
  tag: 'logout-component',
  styleUrl: 'logout-component.css',
  shadow: true,
})
export class LogoutComponent {

  logout() {
    console.log("logout....");
    document.querySelector<HTMLDivElement>('.error').style.display = 'block';
    document.querySelector('.error').innerHTML = 'Logged out Successfully!...';
    document.querySelector<HTMLDivElement>('.error').style.color = 'green';
    setTimeout(() => (location.href = '/'), 1000);
    sessionStorage.clear();
  };

  render() {
    return this.logout();
  }

}
