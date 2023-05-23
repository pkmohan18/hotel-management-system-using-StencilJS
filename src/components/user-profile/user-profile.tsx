import { Component, Host, State, h } from '@stencil/core';

@Component({
  tag: 'user-profile',
  styleUrl: 'user-profile.css',
  // shadow: true,
})
export class UserProfile {
  @State() user;

  @State() fname: HTMLInputElement;
  @State() lname: HTMLInputElement;
  @State() dob: HTMLInputElement;
  @State() gender: HTMLSelectElement;
  @State() phno: HTMLInputElement;
  @State() email: HTMLInputElement;
  @State() password: HTMLInputElement;
  @State() con_password: HTMLInputElement;

  phPattern = /^[6-9]\d{9}$/;
  emailPattern = /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([a-z]{2,3})$/;
  passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#_]).{8,}$/;

  async componentWillLoad() {
    let resp = await fetch('http://localhost:8080/user/getByEmail?email=' + sessionStorage.getItem('email'));
    this.user = await resp.json();
  }

  componentDidRender() {
    this.insertData();
  }

  insertData() {
    this.fname.value = this.user.fname;
    this.lname.value = this.user.lname;
    this.dob.value = this.user.dob;
    this.gender.value = this.user.gender;
    this.phno.value = this.user.phno;
    this.email.value = this.user.email;
  }

  async updateProfile() {
    if (this.validation()) {
      let resp = await fetch('http://localhost:8080/user/getByEmail?email=' + this.email.value);
      let user = await resp.json();
      user.fname = this.fname.value;
      user.lname = this.lname.value;
      user.dob = this.dob.value;
      user.gender = this.gender.value;
      user.phno = this.phno.value;
      user.password = this.password.value;
      user.con_password = this.con_password.value;
      await fetch('http://localhost:8080/user/save', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      this.message('Profile Updated Successfully!...', true);
      setTimeout(() => (location.href = '/html/userhome.html'), 1000);
    }
  }

  validation() {
    if (!this.phno.value.match(this.phPattern)) {
      this.message('Please enter a valid mobile number!...');
      return false;
    } else if (!this.email.value.match(this.emailPattern)) {
      this.message('Please enter a valid email address!...');
      return false;
    } else if (this.password.value.length < 8) {
      this.message('Password should be atleast 8 characters long!...');
      return false;
    } else if (!this.password.value.match(this.passPattern)) {
      this.message('Password should be strong!...');
      return false;
    } else if (!this.con_password.value.match(this.password.value)) {
      this.message('Password and confirm password should match!...');
      return false;
    } else {
      return true;
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
        <user-nav></user-nav>
        <main class="login">
          <img src="../../assets/images/hotel.jpg" alt="hotel" />
          <div class="signup" style={{ height: '60%' }}>
            <form onSubmit={this.updateProfile.bind(this)}>
              <fieldset>
                <legend>Update Details Here</legend>
                <br />
                <div class="edit-profile">
                  <div>
                    <label htmlFor="fname">First Name:</label>
                    <input type="text" id="fname" name="fname" placeholder="Your Name.." required autofocus ref={el => (this.fname = el)} />
                    <br />
                    <br />
                    <label htmlFor="lname">Last Name:</label>
                    <input type="text" id="lname" name="lname" placeholder="Your Last Name.." required ref={el => (this.lname = el)} />
                    <br />
                    <br />
                    <label htmlFor="dob">Date of Birth:</label>
                    <input type="date" id="dob" name="dob" required ref={el => (this.dob = el)} />
                    <br />
                    <br />
                    <label htmlFor="gender">Gender:</label>
                    <select name="gender" id="gender" ref={el => (this.gender = el)}>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="others">Others</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="phno">Phone Number</label>
                    <input type="number" name="phno" id="phno" placeholder="Phone no.." required ref={el => (this.phno = el)} />
                    <br />
                    <br />
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="example@email.com" required readonly ref={el => (this.email = el)} />
                    <br />
                    <br />
                    <label htmlFor="pass">Password:</label>
                    <input type="password" name="pass" id="pass" placeholder="new password" required ref={el => (this.password = el)} />
                    <br />
                    <br />
                    <label htmlFor="conpass">Confirm Password:</label>
                    <input type="password" name="conpass" id="conpass" placeholder="Re-enter password" required ref={el => (this.con_password = el)} />
                    <br />
                    <br />
                  </div>
                </div>
                <br />
                <input type="submit" value="Update Profile" />
                <br />
              </fieldset>
            </form>
          </div>
        </main>
      </Host>
    );
  }
}
