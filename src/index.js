import React from 'react';
import { EventEmitter } from 'events';

const stateEmitter = new EventEmitter();
stateEmitter.setMaxListeners(0);

export let globalState = {};

export function addGlobalState(stateObj) {
  globalState = { ...globalState, ...stateObj };
}

export const setGlobalState = param => {
  const newState = typeof param === 'function' ? param(globalState) : param;

  try {
    for (var key in newState) {
      globalState[key] = newState[key];
      stateEmitter.emit(`astroUpdate:${key}`);
    }
    stateEmitter.emit('astroUpdateState');
  } catch (error) {
    console.log('setGlobalStateError: ', error);
  }
};

export default function AstroStateProvider(WrappedComponent, keys = []) {
  return class extends React.Component {
    componentDidMount() {
      if (keys.length > 0) {
        for (const key of keys) {
          stateEmitter.on(`astroUpdate:${key}`, () => {
            this.forceUpdate();
          });
        }
      } else {
        stateEmitter.on('astroUpdateState', () => {
          this.forceUpdate();
        });
      }
    }

    render() {
      let stateToReturn = {};
      if (keys.length > 0) {
        for (const key in globalState) {
          if (keys.includes(key)) {
            stateToReturn[key] = globalState[key];
          }
        }
      } else {
        stateToReturn = globalState;
      }

      return <WrappedComponent {...this.props} astro={stateToReturn} />;
    }
  };
}
