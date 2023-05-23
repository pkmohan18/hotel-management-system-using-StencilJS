// import { newSpecPage } from '@stencil/core/testing';
import { SampleTest } from '../sample-test';
// import { h } from '@stencil/core';

describe('sample-test', () => {
  // it('renders', async () => {
  //   const page = await newSpecPage({
  //     components: [SampleTest],
  //     html: `<sample-test></sample-test>`,
  //   });
  //   expect(page.root).toEqualHtml(`
  //     <sample-test>
  //       <mock:shadow-root>
  //         <slot></slot>
  //       </mock:shadow-root>
  //     </sample-test>
  //   `);
  // });
  it('Addition', async () => {
    // const greeting = 'Hello World';
    const stest = new SampleTest();
    // const page = await newSpecPage({
    //   components: [SampleTest],
    //   template: () => (<sample-test></sample-test>),
    // });
    expect(stest.add(5,10)).toBe(15);
  });
});

