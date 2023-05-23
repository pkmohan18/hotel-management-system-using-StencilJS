import { Component, Host, State, getAssetPath, h } from '@stencil/core';

@Component({
  tag: 'register-page',
  styleUrl: 'register-page.css',
  // shadow: true,
})
export class RegisterPage {
  
  @State() fname: HTMLInputElement;
  @State() lname: HTMLInputElement;
  @State() dob: HTMLInputElement;
  @State() gender: HTMLSelectElement;
  @State() phno: HTMLInputElement;
  @State() email: HTMLInputElement;
  @State() password: HTMLInputElement;
  @State() con_password: HTMLInputElement;
  @State() ID: HTMLSelectElement;
  @State() ID_no: HTMLInputElement;
  @State() isAdmin: boolean = false;
  @State() noRooms: number = 0;

  @State() error: HTMLElement;

  phPattern: RegExp = /^[6-9]\d{9}$/;
  emailPattern: RegExp = /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([a-z]{2,3})$/;
  passPattern: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#_]).{8,}$/;

  validate(event: Event) {
    event.preventDefault();
    if (!this.phno.value.match(this.phPattern)) {
      // this.message('Please enter a valid mobile number!...');
      this.error = <error-message message='Please enter a valid mobile number!...'></error-message>
    } else if (!this.email.value.match(this.emailPattern)) {
      // this.message('Please enter a valid email address!...');
      this.error = <error-message message='Please enter a valid email address!...'></error-message>
    } else if (this.password.value.length < 8) {
      // this.message('Password should be atleast 8 characters long!...');
      this.error = <error-message message='Password should be atleast 8 characters long!...'></error-message>
    } else if (!this.password.value.match(this.passPattern)) {
      // this.message('Password should be strong!...');
      this.error = <error-message message='Password should be strong!...'></error-message>
    } else if (!this.con_password.value.match(this.password.value)) {
      // this.message('Password and confirm password should match!...');
      this.error = <error-message message='Password and confirm password should match!...'></error-message>
    } else {
      this.checkUser();
    }
  }

  // message(msg: string, suc = false) {
  //   document.querySelector<HTMLDivElement>('.error').style.display = 'block';
  //   document.querySelector('.error').innerHTML = msg;
  //   if (suc == true) {
  //     document.querySelector<HTMLDivElement>('.error').style.color = 'green';
  //   }
  //   document.onclick = () => {
  //     document.querySelector<HTMLDivElement>('.error').style.display = 'none';
  //   };
  // }

  async checkUser() {
    let resp = await fetch('http://localhost:8080/user/getByEmail?email=' + this.email.value);
    if (resp.status == 200) {
      // this.message('User already exists please login!...');
      this.error = <error-message message='User already exists please login!...'></error-message>
      setTimeout(() => (location.href = '/login'), 1000);
    } else this.signUp();
  }

  async signUp() {
    let user = {
      fname: this.fname.value,
      lname: this.lname.value,
      dob: this.dob.value,
      gender: this.gender.value,
      phno: Number(this.phno.value),
      email: this.email.value,
      idType: this.ID.value,
      idNo: this.ID_no.value,
      password: this.password.value,
      con_password: this.con_password.value,
      isAdmin: this.isAdmin,
      noRooms: this.noRooms,
    };
    await fetch('http://localhost:8080/user/save', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    // this.message("You've signed up successfully!", true);
    this.error = <error-message message="You've signed up successfully!" success={true}></error-message>
    setTimeout(() => (location.href = '/login'), 1000);
  }

  render() {
    return (
      <Host>
        <header class="nav-bar" style={{ padding: "12px 30px" }}>
          <div class="logo">
            <a href="/">
              <h2>
                <i class="fa-solid fa-hotel"></i>
                HomeTown Hotel
              </h2>
            </a>
          </div>
          <div class="sign">
            <a href="login" class="button">
              Login
            </a>
          </div>
        </header>
        <div class="error">{this.error}</div>
        <main class="login">
          <img src={getAssetPath('../../assets/images/hotel.jpg')} alt="hotel" />
          <div class="signup">
            <form onSubmit={this.validate.bind(this)}>
              <fieldset>
                <legend> New User Register Here </legend>
                <br />
                <div class="form-items">
                  <div>
                    <label htmlFor="fname">First Name:</label>
                    <input type="text" id="fname" name="fname" placeholder="Your Name.." required autofocus ref={el => (this.fname = el as HTMLInputElement)} />
                    <br />
                    <br />
                    <label htmlFor="lname">Last Name:</label>
                    <input type="text" id="lname" name="lname" placeholder="Your Last Name.." required ref={el => (this.lname = el as HTMLInputElement)} />
                    <br />
                    <br />
                    <label htmlFor="dob">Date of Birth:</label>
                    <input type="date" id="dob" name="dob" required ref={el => (this.dob = el as HTMLInputElement)} />
                    <br />
                    <br />
                    <label htmlFor="gender">Gender:</label>
                    <select name="gender" id="gender" ref={el => (this.gender = el as HTMLSelectElement)}>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="others">Others</option>
                    </select>
                    <br />
                    <br />
                    <label htmlFor="phno">Phone Number</label>
                    <input type="number" name="phno" id="phno" placeholder="Phone no.." required maxlength="10" ref={el => (this.phno = el as HTMLInputElement)} />
                    <br />
                    <br />
                  </div>
                  <div>
                    <label htmlFor="id-proof">Select one Govt. ID:</label>
                    <select name="id-proof" id="id-proof" ref={el => (this.ID = el as HTMLSelectElement)}>
                      <option value="aadhar">Aadhar</option>
                      <option value="pan">Pan No</option>
                      <option value="drive">DL</option>
                      <option value="voter">Voter ID</option>
                    </select>
                    <br />
                    <br />
                    <label htmlFor="id-proof-no">Enter ID No:</label>
                    <input type="text" name="id-proof-no" id="id-proof-no" placeholder="Enter chosen ID No:" required ref={el => (this.ID_no = el as HTMLInputElement)} />
                    <br />
                    <br />
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="example@email.com" required ref={el => (this.email = el as HTMLInputElement)} />
                    <br />
                    <br />
                    <label htmlFor="pass">Password:</label>
                    <input type="password" name="pass" id="pass" placeholder="password" required ref={el => (this.password = el as HTMLInputElement)} />
                    <br />
                    <br />
                    <label htmlFor="conpass">Confirm Password:</label>
                    <input type="password" name="conpass" id="conpass" placeholder="Re-enter password" required ref={el => (this.con_password = el as HTMLInputElement)} />
                    <br />
                    <br />
                  </div>
                </div>
                <br />
                <input type="submit" value="Register" />
                <br />
              </fieldset>
            </form>
          </div>
        </main>
      </Host>
    );
  }
}
