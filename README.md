# react-astro

> A simple cross-component state store for react. Does not make use of reducers or action methods. Avoids component drilling

[![NPM](https://img.shields.io/npm/v/react-astro.svg)](https://www.npmjs.com/package/react-astro) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-astro
```

## Usage

You can use a plain old object for your store e.g :

```jsx
export default {
  foo: false,
  bar: true,
  counter: 0
};
```

Initialize the store by adding this bit your index.js. For example:

```jsx
import { addGlobalState } from 'react-astro';
import store from './store';

addGlobalState(store);
```

Using the default export of astro, you can attach any component with the HOC component, in this case **AstroProvider**  
This will provide your component with an additional attribute in the props object, namely **astro**.  
Alter state by importing and using **setGlobalState**. This works very similarly to react's **setState** method

Example Implementation:

```jsx
import React, { Component } from 'react';
import AstroProvider, { setGlobalState } from 'react-astro';

class App extends Component {
  render() {
    const { astro } = this.props;
    return (
      <div>
        <div>
          <p>Foo: {astro.foo.toString()}</p>
          <button
            onClick={() =>
              setGlobalState(prevState => ({ foo: !prevState.foo }))
            }
          >
            Change
          </button>
        </div>

        <div>
          <p>Bar: {astro.bar.toString()}</p>
          <button
            onClick={() =>
              setGlobalState(prevState => ({ bar: !prevState.bar }))
            }
          >
            Change
          </button>
        </div>

        <div>
          <p>Count: {astro.counter}</p>
          <button
            onClick={() =>
              setGlobalState(prevState => ({ counter: prevState.counter + 1 }))
            }
          >
            Increment
          </button>
        </div>
      </div>
    );
  }
}

export default AstroProvider(App);
```

You can also subscribe to only specific key changes within the state by passing an array as the second argument to the provider hoc function:

```jsx
export default AstroProvider(App, ['foo']);
```

This will cause your component to only get updates when specific keys in the global state object change.
It will also cause the 'astro' prop to only contain subscribed keys (if any are specified).

Anyone is free to contribute and to submit PR's:
[https://github.com/LeonVDW/react-astro](https://github.com/LeonVDW/react-astro)

## License

MIT © [LeonVDW](https://github.com/LeonVDW)
