import { Component, Host, h } from '@stencil/core';
import { createRouter, Route } from 'stencil-router-v2';
const Router = createRouter();

@Component({
  tag: 'app-root',
})
export class AppRoot {

  render() {
    return (
      <Host>
        <Router.Switch>
          <Route path="/">
            <home-page />
          </Route>
          <Route path="/register">
            <register-page />
          </Route>
          <Route path="/login">
            <login-page />
          </Route>
          <Route path="/userhome">
            <user-home />
          </Route>
          <Route path="/adminhome">
            <admin-home />
          </Route>
          <Route path="/about">
            <about-page />
          </Route>
          <Route path="/addrooms">
            <add-rooms />
          </Route>
          <Route path="/approve">
            <admin-approve />
          </Route>
          <Route path="/contact">
            <contact-page />
          </Route>
          <Route path="/profile">
            <user-profile />
          </Route>
          <Route path="/viewbooking">
            <view-booking />
          </Route>
          <Route path="/my-bookings">
            <view-my-booking />
          </Route>
          <Route path="/viewrooms">
            <view-rooms />
          </Route>
          <Route path="/viewuser">
            <view-user />
          </Route>
          <Route path="/facilities">
            <facilities-page />
          </Route>
        </Router.Switch>
      </Host>
    );
  }
}
