import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'sample-test',
  styleUrl: 'sample-test.css',
  // shadow: true,
})
export class SampleTest {

  @Prop() greeting: string;

  add(a: number, b: number){
    return a+b;
  }

  render() {
    return (
    <Host>
      
      {/* {this.greeting} */}

      {this.add(10,20)}

    </Host>);
  }

}
