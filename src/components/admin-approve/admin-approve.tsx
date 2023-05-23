import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'admin-approve',
  styleUrl: 'admin-approve.css',
  // shadow: true,
})
export class AdminApprove {
  componentDidRender() {
    this.displayApprove();
  }

  async displayApprove() {
    let dispBooking = document.getElementById('disp-booking');
    let resp = await fetch('http://localhost:8080/bookedRoom/get');
    if (resp.status == 200) {
      let bookedRooms = await resp.json();
      let count = 0;
      dispBooking.innerHTML = '';
      for (let broom of bookedRooms) {
        if (broom.isApproved === 'No') {
          let row = document.createElement('tr');

          let slno = document.createElement('td');
          slno.innerText = String(++count);
          row.appendChild(slno);

          let roomNo = document.createElement('td');
          roomNo.innerText = broom.roomNo;
          row.appendChild(roomNo);

          let user = document.createElement('td');
          user.innerText = broom.user;
          row.appendChild(user);

          let checkIn = document.createElement('td');
          checkIn.innerText = broom.checkIn;
          row.appendChild(checkIn);

          let checkOut = document.createElement('td');
          checkOut.innerText = broom.checkOut;
          row.appendChild(checkOut);

          let noDays = document.createElement('td');
          noDays.innerText = broom.noDays;
          row.appendChild(noDays);

          let totPrice = document.createElement('td');
          totPrice.innerText = broom.totPrice;
          row.appendChild(totPrice);

          let book = document.createElement('td');

          let approveIcon = document.createElement('i');
          approveIcon.setAttribute('class', 'fa-solid fa-thumbs-up');
          approveIcon.addEventListener('click', () => {
            this.approve(broom.roomNo);
          });
          book.appendChild(approveIcon);
          row.appendChild(book);

          dispBooking.appendChild(row);
        }
      }
    }
  }

  async approve(num: number) {
    let resp = await fetch('http://localhost:8080/bookedRoom/getByNo?num=' + num);
    let broom = await resp.json();
    let resp1 = await fetch('http://localhost:8080/user/getByEmail?email=' + broom.user);
    let user = await resp1.json();
    if (confirm('Approve Booking?.')) {
      broom.isApproved = 'Yes';
      await fetch('http://localhost:8080/bookedRoom/save', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(broom),
      });
      user.noRooms = user.noRooms + 1;
      await fetch('http://localhost:8080/user/save', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      // document.querySelector(".error").style.display = "block"
      // document.querySelector(".error").innerHTML = "Approved Successfully!...";
      // document.querySelector(".error").style.color = "green";
      this.message('Approved Successfully!...', true);
      setTimeout(() => (location.href = '/viewbooking'), 500);
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
        <admin-nav></admin-nav>
        <main class="login">
          <img src="../../assets/images/hotel.jpg" alt="hotel" />
          <div class="disp-list" style={{ position: 'absolute', left: '15%' }}>
            <table>
              <caption>Approve Bookings</caption>
              <thead>
                <tr>
                  <th>Sl.No</th>
                  <th>Room No</th>
                  <th>User</th>
                  <th>CheckIn Date</th>
                  <th>CheckOut Date</th>
                  <th>No. of days</th>
                  <th>Total Bill</th>
                  <th>Approve Booking</th>
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
