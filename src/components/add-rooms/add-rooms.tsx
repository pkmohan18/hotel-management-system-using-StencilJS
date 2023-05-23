import { Component, Host, State, h } from '@stencil/core';

@Component({
  tag: 'add-rooms',
  styleUrl: 'add-rooms.css',
  // shadow: true,
})
export class AddRooms {
  @State() rooms;

  @State() roomNo: HTMLInputElement;
  @State() roomType: HTMLSelectElement;
  @State() capacity: HTMLInputElement;
  @State() price: HTMLInputElement;
  @State() isAvailable: HTMLInputElement;
  @State() btn: HTMLButtonElement;

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

  async checkRooms() {
    if (this.btn.value == 'Update') this.updateRooms(this.roomNo.value);
    else {
      let resp = await fetch('http://localhost:8080/room/getByNo?num=' + this.roomNo.value);
      if (resp.status == 200) {
        setTimeout(() => this.message('Room with this Room No Already Exists!...'), 2000);
      } else this.addRooms();
    }
  }

  async addRooms() {
    let room = {
      roomNo: this.roomNo.value,
      roomType: this.roomType.value,
      capacity: this.capacity.value,
      price: this.price.value,
      isAvailable: this.isAvailable.checked ? 'Yes' : 'No',
    };
    await fetch('http://localhost:8080/room/save', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(room),
    });
    this.message('Room added successfully!...', true);
    setTimeout(() => location.reload(), 1000);
  }

  async componentWillLoad() {
    let resp = await fetch('http://localhost:8080/room/get');
    if (resp.status == 200) {
      this.rooms = await resp.json();
    }
  }

  componentDidRender() {
    this.displayRooms();
  }

  async displayRooms() {
    let dispRooms = document.getElementById('disp-rooms');
    let count = 0;
    dispRooms.innerHTML = '';

    for (let room of this.rooms) {
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

      let isAvailable = document.createElement('td');
      isAvailable.innerText = room.isAvailable;
      row.appendChild(isAvailable);

      let edit = document.createElement('td');

      let editIcon = document.createElement('i');
      editIcon.setAttribute('class', 'fa-solid fa-pen-to-square');
      editIcon.addEventListener('click', () => {
        this.editroom(room.roomNo);
      });
      edit.appendChild(editIcon);
      row.appendChild(edit);

      let del = document.createElement('td');

      let delIcon = document.createElement('i');
      delIcon.setAttribute('class', 'fa-solid fa-trash');
      delIcon.addEventListener('click', () => {
        this.delroom(room.id);
      });
      del.appendChild(delIcon);
      row.appendChild(del);

      dispRooms.appendChild(row);
    }
  }

  async delroom(id: number) {
    let resp = await fetch('http://localhost:8080/room/delete?id=' + id, {
      method: 'DELETE',
    });
    let msg = await resp.text();
    setTimeout(()=>this.message(msg),1000);
    location.reload();
  }

  async editroom(num: number) {
    let resp = await fetch('http://localhost:8080/room/getByNo?num=' + num);
    let room = await resp.json();
    this.roomNo.value = room.roomNo;
    this.roomType.value = room.roomType;
    this.capacity.value = room.capacity;
    this.price.value = room.price;
    if (room.isAvailable) this.isAvailable.checked = true;
    else this.isAvailable.checked = false;
    this.btn.value = 'Update';
  }

  async updateRooms(num) {
    let resp = await fetch('http://localhost:8080/room/getByNo?num=' + num);
    if (resp.status == 200) {
      let room = await resp.json();
      let roomUp = {
        id: room.id,
        roomNo: this.roomNo.value,
        roomType: this.roomType.value,
        capacity: this.capacity.value,
        price: this.price.value,
        isAvailable: this.isAvailable.checked ? 'Yes' : 'No',
      };
      await fetch('http://localhost:8080/room/save', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roomUp),
      });
      this.message('Room updated successfully!...', true);
      setTimeout(() => location.reload(), 1000);
    } else {
      this.message('Room No. does not exists!...');
    }
  }

  render() {
    return (
      <Host>
        <admin-nav></admin-nav>
        <main class="login">
          <img src="../../assets/images/hotel.jpg" alt="hotel" />
          <div class="container">
            <div class="room-form">
              <form onSubmit={this.checkRooms.bind(this)}>
                <input type="number" name="room-no" id="room-no" placeholder="Room No." required ref={el => (this.roomNo = el)} />
                <select name="room-type" id="room-type" required ref={el => (this.roomType = el)}>
                  <option value="non-ac">Non_Ac</option>
                  <option value="ac">AC</option>
                  <option value="delux">Delux</option>
                </select>
                <input type="number" name="capacity" id="capacity" placeholder="Room Capacity" required ref={el => (this.capacity = el)} />
                <input type="number" name="price" id="price" placeholder="Price" required ref={el => (this.price = el)} />
                <label htmlfor="available" id="avail">
                  Available
                  <input type="checkbox" name="available" id="available" ref={el => (this.isAvailable = el)} />
                </label>
                <input type="submit" value="Add Room" id="btn" style={{ width: '10vw', padding: '5px' }} ref={el => (this.btn = el)} />
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
                    <th>Available</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody id="disp-rooms"></tbody>
              </table>
            </div>
          </div>
        </main>
      </Host>
    );
  }
}
