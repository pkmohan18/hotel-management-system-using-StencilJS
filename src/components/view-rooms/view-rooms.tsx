import { Component, Host, State, h } from '@stencil/core';

@Component({
  tag: 'view-rooms',
  styleUrl: 'view-rooms.css',
  // shadow: true,
})
export class ViewRooms {
  @State() checkIn: HTMLInputElement;
  @State() checkOut: HTMLInputElement;

  displayHandler(event: Event) {
    event.preventDefault();
    if (new Date(this.checkOut.value) < new Date(this.checkIn.value)) {
      this.message('Checkout Date should be greater than the Checkin Date !...');
    } else this.displayUserRooms();
  }

  async displayUserRooms() {
    let resp = await fetch('http://localhost:8080/room/get');
    if (resp.status == 200) {
      let rooms = await resp.json();
      let dispRooms = document.getElementById('disp-rooms');
      let count = 0;
      dispRooms.innerHTML = '';
      for (let room of rooms) {
        if (room.isAvailable == 'Yes' && (await this.isRoomEmpty(room.roomNo))) {
          let row = document.createElement('tr');

          let slno = document.createElement('td');
          slno.innerText = String(++count);
          row.appendChild(slno);

          let roomNo = document.createElement('td');
          roomNo.innerText = room.roomNo;
          row.appendChild(roomNo);

          let roomType = document.createElement('td');
          roomType.innerText = room.roomType;
          row.appendChild(roomType);

          let capacity = document.createElement('td');
          capacity.innerText = room.capacity;
          row.appendChild(capacity);

          let price = document.createElement('td');
          price.innerText = room.price;
          row.appendChild(price);

          let book = document.createElement('td');

          let bookIcon = document.createElement('i');
          bookIcon.setAttribute('class', 'fa-solid fa-right-to-bracket');
          bookIcon.addEventListener('click', () => {
            this.bookroom(room.roomNo);
          });
          book.appendChild(bookIcon);
          row.appendChild(book);

          dispRooms.appendChild(row);
        }
      }
    }
  }

  async isRoomEmpty(num: number) {
    let resp = await fetch('http://localhost:8080/bookedRoom/getByNo?num=' + num);
    if (resp.status != 200) return true;
    else {
      let broom = await resp.json();
      if (new Date(this.checkIn.value) < new Date(broom.checkOut)) {
        return false;
      } else return true;
    }
  }

  async bookroom(roomNo: number) {
    if (confirm(`Do you want to book Room : ${roomNo} ?`)) {
      let resp = await fetch('http://localhost:8080/room/getByNo?num=' + roomNo);
      let room = await resp.json();
      let bookedRooms = {
        roomNo: room.roomNo,
        user: sessionStorage.getItem('email'),
        roomType: room.roomType,
        capacity: room.capacity,
        checkIn: this.checkIn.value,
        checkOut: this.checkOut.value,
        noDays: (Number(new Date(this.checkOut.value)) - Number(new Date(this.checkIn.value))) / (1000 * 60 * 60 * 24),
        totPrice: ((Number(new Date(this.checkOut.value)) - Number(new Date(this.checkIn.value))) / (1000 * 60 * 60 * 24)) * Number(room.price),
        isApproved: 'No',
      };
      let response = await fetch('http://localhost:8080/bookedRoom/save', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookedRooms),
      });
      console.log(await response.text());
      this.message('Your booking has been submitted and sent for Admin approval!... Check MyBookings for Approval status..', true);
      this.displayUserRooms();
      setTimeout(() => (location.href = '/my-bookings'), 3000);
    }
  }

  changeToDate(check: string) {
    if (check === 'in') document.getElementById('check-in').setAttribute('type', 'date');
    else document.getElementById('check-out').setAttribute('type', 'date');
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
        <user-nav />
        <main class="login">
          <img src="../../assets/images/hotel.jpg" alt="hotel" />
          <div class="container" style={{ left: '23%' }}>
            <div class="room-form">
              <form onSubmit={this.displayHandler.bind(this)}>
                <input
                  type="text"
                  name="check-in"
                  id="check-in"
                  placeholder="Check-In Date"
                  onFocus={this.changeToDate.bind(this, 'in')}
                  required
                  ref={el => (this.checkIn = el)}
                />
                <span style={{ color: 'white' }}>-</span>
                <input
                  type="text"
                  name="check-out"
                  id="check-out"
                  placeholder="Check-Out Date"
                  onFocus={this.changeToDate.bind(this, 'out')}
                  required
                  ref={el => (this.checkOut = el)}
                />
                <span style={{ color: 'white' }}>:</span>
                <input type="submit" value="Check Availability" style={{ width: '15vw', padding: '8px' }} />
              </form>
            </div>
            <div class="disp-rooms-list">
              <table>
                <thead>
                  <tr>
                    <th>Sl.No</th>
                    <th>Room No</th>
                    <th>Room Type</th>
                    <th>Room Capacity</th>
                    <th>Price/Day</th>
                    <th>Book Room</th>
                  </tr>
                </thead>
                <tbody id="disp-rooms"></tbody>
              </table>
            </div>
          </div>
        </main>
        <script>
          const today = new Date(); let tomorrow = new Date(); tomorrow.setDate(today.getDate() + 1); let tom = tomorrow.toISOString().substring(0, 10);
          document.getElementById("check-in").setAttribute('min',tom); document.getElementById("check-out").setAttribute('min', tom);
        </script>
      </Host>
    );
  }
}
