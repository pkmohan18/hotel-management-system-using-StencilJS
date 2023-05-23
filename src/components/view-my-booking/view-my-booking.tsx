import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'view-my-booking',
  styleUrl: 'view-my-booking.css',
  // shadow: true,
})
export class ViewMyBooking {

  componentDidRender(){
    this.displayMyBookings();
  }

  async displayMyBookings(){
    let resp = await fetch("http://localhost:8080/bookedRoom/get");
    if(resp.status==200){
      let bookedRooms = await resp.json();
      console.log(bookedRooms);
      let dispMyRooms = document.getElementById("disp-my-rooms");
      let count = 0;
      dispMyRooms.innerHTML = '';
      for (let broom of bookedRooms) {
        if (broom.user==sessionStorage.getItem("email")) {
          let row = document.createElement('tr');

          let slno = document.createElement('td');
          slno.innerText = String(++count);
          row.appendChild(slno);

          let roomNo = document.createElement('td');
          roomNo.innerText = broom.roomNo;
          row.appendChild(roomNo);

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

          let isApproved = document.createElement('td');
          isApproved.innerText = broom.isApproved === "Yes" ? "Approved" : "Pending Approval";
          row.appendChild(isApproved);

          let book = document.createElement('td');

          let delIcon = document.createElement('i');
          delIcon.setAttribute('class', 'fa-solid fa-trash');
          if(broom.isApproved == "Yes"){
            delIcon.style.color = 'grey';
          }
          if(!(broom.isApproved == "Yes")){
            console.log('not approved');
            delIcon.addEventListener('click', () => {
              this.delbroom(broom.id);
            });
          }
          book.appendChild(delIcon);
          row.appendChild(book);

          dispMyRooms.appendChild(row);
        }
      }
    }
  }
  
  async delbroom(id: number){
    let resp = await fetch("http://localhost:8080/bookedRoom/delete?id="+id,{
          method : "DELETE"
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
          <div class="disp-list" style={{left: '15%'}}>
            <table>
            <caption>My Bookings</caption>
              <thead>
                <tr>
                  <th>Sl.No</th>
                  <th>Room No</th>
                  <th>CheckIn Date</th>
                  <th>CheckOut Date</th>
                  <th>No. of days</th>
                  <th>Total Bill</th>
                  <th>Approval Status</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody id="disp-my-rooms"></tbody>
            </table>
          </div>
        </main>
      </Host>
    );
  }
}
