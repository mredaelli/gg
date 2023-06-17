import {
  Component,
  createResource,
  createSignal,
  For,
  Match,
  Switch,
} from 'solid-js';
import { SetStoreFunction } from 'solid-js/store';
import { sendGuess } from './api';

import styles from './App.module.css';
import { Game, N, PastGuess, State } from './models';

const DataList: Component = () => (
  <datalist id="markers">
    <For each={[...Array(11).keys()].map((i) => i * 1000)}>
      {(item) => <option value={item} label={`${item}`}></option>}
    </For>
  </datalist>
);

const History: Component<{ guesses: PastGuess[] }> = (props) => (
  <div class={styles.history}>
    <ul>
      <For each={props.guesses.reverse()}>
        {(item, index) => (
          <li>
            {props.guesses.length - index()}. {item.guess}: {item.response}
          </li>
        )}
      </For>
    </ul>
  </div>
);

export const GameComponent: Component<{
  game: Game;
  setStore: SetStoreFunction<State>;
}> = (props) => {
  const [currentGuess, setCurrentGuess] = createSignal<number>(
    Math.floor(N / 2),
  );
  const [guessEnabled, setGuessEnabled] = createSignal<boolean>(false);

  const guessRespFetch = async (guess: number): Promise<void> => {
    const response = await sendGuess(props.game.id, guess);
    props.setStore('game', 'pastGuesses', (pg) => [...pg, { guess, response }]);
    if (response === 'right-ho') {
      props.setStore('game', 'done', true);
    }
  };
  const [_, { refetch }] = createResource(guessEnabled, () =>
    guessRespFetch(currentGuess()),
  );
  const submitGuess = () => {
    setGuessEnabled(true);
    refetch();
  };

  return (
    <div>
      <p>This is game n. {props.game.id}.</p>
      <Switch fallback={<p>Done!</p>}>
        <Match when={!props.game.done}>
          <p>Please select a number between 1 and {N}</p>
          <div>
            <input
              class={styles.fw}
              type="range"
              min="1"
              max={N}
              step="1"
              value={currentGuess()}
              onChange={(e) => setCurrentGuess(Number.parseInt(e.target.value))}
              list="markers"
            />
          </div>
          <div>
            <input
              class={styles.spininput}
              type="number"
              value={currentGuess()}
              onChange={(e) => setCurrentGuess(Number.parseInt(e.target.value))}
            />
          </div>
          <p>and</p>
          <p>
            <button onClick={() => submitGuess()}>Try</button>!
          </p>
          <DataList />
        </Match>
      </Switch>
      <History guesses={props.game.pastGuesses} />
    </div>
  );
};
