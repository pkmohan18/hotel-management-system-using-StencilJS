import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'view-booking',
  styleUrl: 'view-booking.css',
  // shadow: true,
})
export class ViewBooking {
  componentDidRender() {
    this.displayBookings();
  }

  async displayBookings() {
    let dispBooking = document.getElementById('disp-booking');
    let resp = await fetch('http://localhost:8080/bookedRoom/get');
    if (resp.status == 200) {
      let bookedRooms = await resp.json();
      let list = '';
      let count = 0;
      for (let broom of bookedRooms) {
        if (broom.isApproved === 'Yes') {
          list += `<tr>
                    <td>${++count}</td>
                    <td>${broom.roomNo}</td>
                    <td>${broom.user}</td>
                    <td>${broom.checkIn}</td>
                    <td>${broom.checkOut}</td>
                    <td>${broom.noDays}</td>
                    <td>${broom.totPrice}</td>
                    <td>Booked</td>
                    </tr>`;
        }
        dispBooking.innerHTML = list;
      }
    }
  }

  message(msg: string, suc = false) {
    document.querySelector<HTMLDivElement>('.error').style.display = 'block';
    document.querySelector('.error').innerHTML = msg;
    if (suc == true) {
      document.querySelector<HTMLDivElement>('.error').style.color = 'green';
    }
    document.addEventListener('click', () => {
      document.querySelector<HTMLDivElement>('.error').style.display = 'none';
    });
  }

  render() {
    return (
      <Host>
        <admin-nav />
        <main class="login">
          <img src="../../assets/images/hotel.jpg" alt="hotel" />
          <div class="disp-list" style={{ position: 'absolute', left: '15%' }}>
            <table>
              <caption>All Bookings</caption>
              <thead>
                <tr>
                  <th>Sl.No</th>
                  <th>Room No</th>
                  <th>User</th>
                  <th>CheckIn Date</th>
                  <th>CheckOut Date</th>
                  <th>No. of days</th>
                  <th>Total Bill</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody id="disp-booking"></tbody>
            </table>
          </div>
        </main>
      </Host>
    );
  }
}
