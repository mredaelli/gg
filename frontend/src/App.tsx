import { Component, createResource, Show } from 'solid-js';
import { createGame, getUser } from './api';

import styles from './App.module.css';
import { Game } from './Game';
import { ClientPrincipal } from './models';

const Login: Component = () => (
  <header class={styles.header}>
    <p>Login with</p>
    <ul>
      <li><a href="/.auth/login/aad">Azure</a></li>
      <li><a href="/.auth/login/facebook">Facebook</a></li>
      <li><a href="/.auth/login/twitter">Twitter</a></li>
      <li><a href="/.auth/login/github">GitHub</a></li>
      <li><a href="/.auth/login/google">Google</a></li>
      <li><a href="/.auth/login/apple">Apple</a></li>
    </ul>
  </header>
);

const App: Component = () => {
  const [user] = createResource<ClientPrincipal>(getUser);
  const [gameId, { refetch: newGame }] = createResource<number>(createGame);

  return (
    <div class={styles.App}>
      <Show when={user() !== null} fallback={<Login />}>
        <p class={styles.welcome}>Hello {user()?.userDetails}!</p>
        <Show when={gameId() !== undefined}>
          <Game gameId={gameId() || 0} />
          <hr class={styles.sep} />
          <div>
            <button onClick={() => newGame()}>Click here</button> to start a new
            game
          </div>
        </Show>
      </Show>
    </div>
  );
};

export default App;
