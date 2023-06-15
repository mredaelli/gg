import { Component, createResource, createSignal, createStore, Match, Switch } from 'solid-js';

import styles from './App.module.css';
import { UUID } from './models';

const N = 10000;

const randomInt = (N: number): number => Math.floor(Math.random() * N) + 1;

let x = 1;
const createGame = async (): Promise<number> => {
  const data = {
    user: 'me',
    number: randomInt(N)
  };

  // const endpoint = `/data-api/rest/game/`;
  // const response = await fetch(endpoint, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(data)
  // });
  // const result = await response.json();
  // console.table(result.value);
  // return result.value.id;
  x = x + 1;
  return x;
}
const getUser = async (): Promise<ClientPrincipal> => {
  const response = await fetch('/.auth/me');
  const result = await response.json();
  return result?.clientPrincipal;
}

const xxx = async (): Promise<void> => {
  const response = await fetch('/api/message');
  const result = await response.json();
  console.log(result);
}
await xxx();
interface ClientPrincipal {
  userId: string;
  userDetails: string;
}

const Login: Component = () => {
  return <div>
    Login with <a href="/.auth/login/aad">Azure</a>
  </div>
}
const App: Component = () => {
  const [gameId, { refetch: newGame }] = createResource(createGame);
  const [user] = createResource<ClientPrincipal>(getUser);

  return (
    <Switch fallback={<Login />}>
      <Match when={user() !== null}>
        <p>Hello {user()?.userDetails}!</p>
        <p>This is game {gameId()}.</p>
        <p>But <button onClick={() => newGame()}>click here</button> to start a new game</p>
        <p>Please select a number between 1 and {N}</p>
        <input type="number"/>
      </Match>
    </Switch>
    // <div class={styles.App}>
    //   <header class={styles.header}>
    //     <p>
    //       Click to start a new game
    //     </p>
    //   </header>
    // </div>
  );
};

export default App;
