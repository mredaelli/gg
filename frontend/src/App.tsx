import { Component, createEffect, createResource, Show } from 'solid-js';
import { createStore } from 'solid-js/store';
import { createGame, getUser } from './api';

import styles from './App.module.css';
import { GameComponent } from './Game';
import { ClientPrincipal, State } from './models';

const Login: Component = () => (
  <header class={styles.header}>
    <p>Login with your favourite service</p>
    <ul>
      <li>
        <a href="/.auth/login/aad">Azure</a>
      </li>
      <li>
        <a href="/.auth/login/facebook">Facebook</a>
      </li>
      <li>
        <a href="/.auth/login/twitter">Twitter</a>
      </li>
      <li>
        <a href="/.auth/login/github">GitHub</a>
      </li>
      <li>
        <a href="/.auth/login/google">Google</a>
      </li>
      <li>
        <a href="/.auth/login/apple">Apple</a>
      </li>
    </ul>
  </header>
);

const App: Component = () => {
  const [user] = createResource<ClientPrincipal>(getUser);
  const [gameId, { refetch: newGameId }] = createResource<number>(createGame);
  const [store, setStore] = createStore<State>({});

  createEffect(() => {
    const id = gameId();
    if (id !== undefined) {
      setStore({ game: { id, pastGuesses: [], done: false } });
    }
  });

  return (
    <div class={styles.App}>
      <Show when={user() !== null} fallback={<Login />}>
        <p class={styles.welcome}>Hello {user()?.userDetails}!</p>
        <Show when={store.game?.id}>
          <GameComponent game={store.game!} setStore={setStore} />
          <hr class={styles.sep} />
          <div>
            <button onClick={() => newGameId()}>Click here</button> to start a
            new game
          </div>
        </Show>
      </Show>
    </div>
  );
};

export default App;
