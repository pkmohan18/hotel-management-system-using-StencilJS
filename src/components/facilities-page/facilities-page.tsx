import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'facilities-page',
  styleUrl: 'facilities-page.css',
  // shadow: true,
})
export class FacilitiesPage {
  render() {
    return (
      <Host>
        <user-nav id="user-nav" />
        <section id="facilities" style={{ textAlign: 'center' }}>
          <h1 class="fac-header">Facilities</h1>
          <div class="hr"></div>
          <ul class="fac-list">
            <li class="fac-list-item">
              <i class="fa-sharp fa-solid fa-wifi"></i>
              <p>Free Wireless Internet Access</p>
            </li>
            <li class="fac-list-item">
              <i class="fa-solid fa-building-shield"></i>
              <p>24/7 Security</p>
            </li>
            <li class="fac-list-item">
              <i class="fa-solid fa-person-swimming"></i>
              <p>Swimming Pool & Poolside Bar</p>
            </li>
            <li class="fac-list-item">
              <i class="fa-solid fa-taxi"></i>
              <p>Tour & Excursions</p>
            </li>
            <li class="fac-list-item">
              <i class="fa-solid fa-utensils"></i>
              <p>Semi open & outdoor restaurant</p>
            </li>
            <li class="fac-list-item">
              <i class="fa-solid fa-shirt"></i>
              <p>Free Laundry Services</p>
            </li>
          </ul>
        </section>
      </Host>
    );
  }
}
