import { Component, Host, State, getAssetPath, Watch, h } from '@stencil/core';

@Component({
  tag: 'login-page',
  styleUrl: 'login-page.css',
  // shadow: true,
})
export class LoginPage {
  @State() email: HTMLInputElement;
  @State() password: HTMLInputElement;

  @State() error: HTMLElement;

  @State() message: {msg: string, suc?: boolean} = {msg: "Error message", suc: false};
  

  errMsg = document.querySelector("error-message");

  @Watch('message')
  changeMsg(){
    this.error = <error-message message={this.message.msg} success={this.message.suc}></error-message>;
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

  async signIn(event: Event) {
    console.log("login");
    event.preventDefault();
    let resp = await fetch('http://localhost:8080/user/getByEmail?email=' + this.email.value);
    if (resp.status == 200) {
      let user = await resp.json();
      if (user.password == this.password.value) {
        sessionStorage.setItem('email', this.email.value);
        sessionStorage.setItem('fname', user.fname);
        sessionStorage.setItem('password', this.password.value);
        if (user.isAdmin) {
          // this.message(`Admin Logged in successfully!...`, true);
          this.message={msg: 'Admin Logged in successfully!...', suc: true};
          setTimeout(() => (location.href = '/adminhome'), 1000);
          return;
        } else {
          // this.message(`Hello ${user.fname}!. You've Logged in successfully!...`, true);
          this.message={msg: `Hello ${user.fname}!. You've Logged in successfully!...`, suc: true};
          setTimeout(() => (location.href = '/userhome'), 1000);
          return;
        }
      } else {
        // this.message('Wrong Password Try again!...');
        this.message = {msg: 'Wrong Password Try again!...'};
      }
    } else {
      // this.message('Invalid Email or Password!...');
      this.message={msg: 'Invalid Email or Password!...'};
    }
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
            <a href="/register" class="button">
              Register
            </a>
          </div>
        </header>
        <div class="error">{this.error}</div>
        <main class="login">
          <img src={getAssetPath('../../assets/images/hotel.jpg')} alt="hotel" />
          <div class="signin">
            <form onSubmit={this.signIn.bind(this)}>
              <fieldset>
                <legend>Login Here</legend>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="example@email.com" ref={el => (this.email = el)} required />
                <br />
                <br />
                <label htmlFor="pass">Password:</label>
                <input type="password" name="pass" id="pass" placeholder="Enter password" ref={el => (this.password = el)} required />
                <br />
                <br />
                <input type="submit" value="Login" />
              </fieldset>
            </form>
          </div>
        </main>
      </Host>
    );
  }
}
