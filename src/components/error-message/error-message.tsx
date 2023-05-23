import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'error-message',
  styleUrl: 'error-message.css',
  shadow: true,
})
export class ErrorMessage {

  @Prop() message: string;
  @Prop() success: boolean = false;

  dispMessage(msg: string, suc = false) {
    // console.log("helooooooooo");
    document.querySelector<HTMLDivElement>('.error').style.display = 'block';
    document.querySelector('.error').innerHTML = msg;
    if (suc == true) {
      document.querySelector<HTMLDivElement>('.error').style.color = 'green';
    }
    // document.addEventListener('click', () => {
    //   document.querySelector<HTMLDivElement>('.error').style.display = 'none';
    // });
  }

  render() {
      return this.dispMessage(this.message,this.success);
  }

}
