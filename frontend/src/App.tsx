import { Component, createResource, createSignal, createStore, Match, Switch } from 'solid-js';

import styles from './App.module.css';
import { UUID } from './models';

const N = 10000;

const endpoint = '/data-api/rest/game';

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


const App: Component = () => {
  // const [game, setGame] = createSignal<UUID | null>(null);
  // const [guesses, setGuesses] = createSignal<[number] | null>(null);
  const [gameId, { refetch: newGame }] = createResource(createGame);

  return (
    <Switch fallback={<p>is between 5 and 10</p>}>
      <Match when={null === null}>
        <p>This is game {gameId()}</p>
        <p>Please select a number between 1 and {N}</p>
        <button onClick={() => newGame()}>Click here to start a new game</button>
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
