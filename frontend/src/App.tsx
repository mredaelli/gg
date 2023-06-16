import { Component, createResource, Match, Switch } from 'solid-js';

// import styles from './App.module.css';

const N = 10000;

const createGame = async (): Promise<number> => {
  const endpoint = `/data-api/rest/game/`;
  const response = await fetch(endpoint, {
    method: 'PUT',
  });
  const result = await response.json();
  console.table(result.value);
  return result.value;
};

const getUser = async (): Promise<ClientPrincipal> => {
  const response = await fetch('/.auth/me');
  const result = await response.json();
  return result?.clientPrincipal;
};

interface ClientPrincipal {
  userId: string;
  userDetails: string;
}

const Login: Component = () => {
  return (
    <div>
      Login with <a href="/.auth/login/aad">Azure</a>
    </div>
  );
};

const App: Component = () => {
  const [gameId, { refetch: newGame }] = createResource(createGame);
  const [user] = createResource<ClientPrincipal>(getUser);

  return (
    <Switch fallback={<Login />}>
      <Match when={user() !== null}>
        <p>Hello {user()?.userDetails}!</p>
        <p>This is game {gameId()}.</p>
        <p>
          But <button onClick={() => newGame()}>click here</button> to start a
          new game
        </p>
        <p>Please select a number between 1 and {N}</p>
        <input type="number" />
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
