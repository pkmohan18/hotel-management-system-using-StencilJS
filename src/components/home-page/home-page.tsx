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
                <a href="/login" onClick={() => alert('Please Login to Book Rooms!...')}>
                  Rooms
                </a>
              </div>
              <div class="li">
                <a href="#facilities">Facilities</a>
              </div>
              <div class="li">
                <a href="#about">About</a>
              </div>
              <div class="li">
                <a href="#contact">Contact Us</a>
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
              <form onSubmit={() => alert('Please Login to Book Rooms!...')} method="post">
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
        <section id="about">
          <h1 class="fac-header">About</h1>
          <div class="hr"></div>
          <div class="about-container">
            <div class="about-data">
              <p class="about-desc-header">Founded in 2023 | Headquarters in Bangalore | 700 employees</p>
              <p class="about-desc">
                Designed from the ground up to meet the needs of small businesses, Home Town Hotel is the one hotel software that makes it easy to manage your property, attract
                more guests, convert direct bookings, maintain your website and take online payments. We give you all the tools you need to run your business your way - even a
                mobile app to use on-the-go. Our platform is simple, our set-up is quick, and 24/7 help is always just one click away.
              </p>
            </div>
            <div class="image">
              <img src="../../assets/images/hotel1.jpg" alt="room" id="img1" />
            </div>
          </div>
        </section>
        <section class="contact" id="contact">
          <h1 class="fac-header">Contact Us</h1>
          <div class="hr"></div>
          <div class="con-container">
            <div class="contact-map">
              <div class="google-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62228.85409750036!2d77.59631590000001!3d12.888203299999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1524c170499d%3A0x9423f8c83d07ee39!2sAmiti%20Software%20Technologies%20Private%20Limited!5e0!3m2!1sen!2sin!4v1684913111001!5m2!1sen!2sin"
                  width="400"
                  height="450"
                  style={{ border: '0' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div class="contact-info">
                <div class="contact-info-item">
                  <h3>Say hello!</h3> <br />
                  <p>+91 7483130175</p>
                  <p>
                    <a href="mailto:mohanpanathale18@gmail.com">mohanpanathale18@gmail.com</a>
                  </p>
                </div>
                <ul class="social-links">
                  <li>
                    <a href="#" title="Facebook">
                      <i class="fab fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" title="Instagram">
                      <i class="fab fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" title="Youtube">
                      <i class="fab fa-youtube"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="contact-form">
              <h2>Any Queries? Let's talk..</h2>
              <form action="" method="post">
                <div class="name-email">
                  <input type="text" class="form-control" name="name" placeholder="Your Name" id="name" />
                  <input type="email" class="form-control" name="email" placeholder="Email" id="email" />
                </div>
                <textarea name="message" rows={6} class="form-control" id="message" placeholder="Message"></textarea>
                <input type="submit" class="form-control submit-btn" value="Submit" style={{float: 'right', borderRadius: '50px'}}/>
              </form>
            </div>
          </div>
        </section>
      </Host>
    );
  }
}
