import type { Component } from 'solid-js';

import styles from './App.module.css';

async function list() {
  const endpoint = '/data-api/rest/Game';
  const response = await fetch(endpoint);
  const data = await response.json();
  console.table(data.value);
}

await list()

const App: Component = () => {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <p>
          Click to start a new game
        </p>
      </header>
    </div>
  );
};

export default App;
