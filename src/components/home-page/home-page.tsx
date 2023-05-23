import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'home-page',
  styleUrl: 'home-page.css',
})
export class HomePage {
  changeToDate(check: string) {
    if (check === 'in') document.getElementById('check-in').setAttribute('type', 'date');
    else document.getElementById('check-out').setAttribute('type', 'date');
  }

  render() {
    return (
      <Host>
        <header class="nav-bar" style={{ padding: '12px 30px' }}>
          <div class="logo">
            <a href="/" style={{ padding: '12px 25px' }}>
              <h2>
                <i class="fa-solid fa-hotel"></i>
                HomeTown Hotel
              </h2>
            </a>
          </div>
          <div class="nav-items">
            <ul class="hpage">
              <div class="li">
                <a href="/">Home</a>
              </div>
              <div class="li">
                <a href="#">Rooms</a>
              </div>
              <div class="li">
                <a href="#facilities">Facilities</a>
              </div>
              <div class="li">
                <a href="#contact">Contact Us</a>
              </div>
              <div class="li">
                <a href="#contact">About</a>
              </div>
            </ul>
          </div>
          <div class="sign">
            <a href="/login" class="button">
              Login
            </a>
            <a href="/register" class="button">
              Register
            </a>
          </div>
        </header>
        <main class="home">
          <div style={{ display: 'inline-flex' }}>
            <div class="banner1">
              <div class="msg">
                <br />
                <br />
                <h3>Book Your Stay &</h3>
                <p>
                  <h3>Enjoy a Luxury Experience</h3>
                </p>
                <br />
                <p style={{ fontWeight: '100' }}>Book your room now, </p>
                <p>starting from ₹799 per night</p>
                <p>and enjoy a luxury experience.</p>
                <br />
                <br />
              </div>
            </div>
            <div class="banner2 msg">
              <h6>Check availability</h6>
              <form onSubmit={() => alert('Please Login!...')}>
                <input type="text" name="check-in" id="check-in" placeholder="Check-In Date" onFocus={this.changeToDate.bind(this, 'in')} />
                <input type="text" name="check-out" id="check-out" placeholder="Check-Out Date" onFocus={this.changeToDate.bind(this, 'out')} />
                <input type="number" name="adult" id="adult" placeholder="No of adults" />
                <input type="number" name="child" id="child" placeholder="No of Children" />
                <input type="submit" value="Check" />
              </form>
            </div>
          </div>
        </main>
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
