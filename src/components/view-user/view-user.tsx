import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'view-user',
  styleUrl: 'view-user.css',
  // shadow: true,
})
export class ViewUser {
  @State() users;

  async componentWillLoad() {
    let resp = await fetch('http://localhost:8080/user/get');
    if (resp.status == 200) {
      this.users = await resp.json();
    }
  }

  componentDidRender() {
    this.display();
  }

  display() {
    let dispUsers = document.getElementById('disp-users');
    let count = 0;
    dispUsers.innerHTML = '';

    for (let user of this.users) {
      let row = document.createElement('tr');

      let slno = document.createElement('td');
      slno.innerText = String(++count);
      row.appendChild(slno);

      let name = document.createElement('td');
      name.innerText = user.fname + ' ' + user.lname;
      row.appendChild(name);

      let email = document.createElement('td');
      email.innerText = user.email;
      row.appendChild(email);

      let phno = document.createElement('td');
      phno.innerText = user.phno;
      row.appendChild(phno);

      let noRooms = document.createElement('td');
      noRooms.innerText = user.noRooms;
      row.appendChild(noRooms);

      let del = document.createElement('td');

      let delIcon = document.createElement('i');
      delIcon.setAttribute('class', 'fa-solid fa-trash');
      delIcon.addEventListener('click', () => {
        this.delUser(user.id);
      });
      del.appendChild(delIcon);
      row.appendChild(del);

      dispUsers.appendChild(row);
    }
  }

  async delUser(id: number) {
    console.log(id, 'deleted');
    let resp = await fetch('http://localhost:8080/user/delete?id=' + id, {
      method: 'DELETE',
    });
    let msg = await resp.text();
    this.message(msg);
    location.reload();
  }

  message(msg: string, suc = false) {
    document.querySelector<HTMLDivElement>('.error').style.display = 'block';
    document.querySelector('.error').innerHTML = msg;
    if (suc == true) {
      document.querySelector<HTMLDivElement>('.error').style.color = 'green';
    }
    document.onclick = () => {
      document.querySelector<HTMLDivElement>('.error').style.display = 'none';
    };
  }

  render() {
    return (
      <div>
        <admin-nav />
        <main class="login">
          <img src="../../assets/images/hotel.jpg" alt="hotel" />
          <div class="disp-list">
            <table>
              <caption>List of Users</caption>
              <thead>
                <tr>
                  <th>Sl.No</th>
                  <th>User Name</th>
                  <th>Email Address</th>
                  <th>Mobile Number</th>
                  <th>No.of Rooms Booked</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody id="disp-users"></tbody>
            </table>
          </div>
        </main>
      </div>
    );
  }
}
