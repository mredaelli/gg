import {
  Component,
  createEffect,
  createResource,
  createSignal,
  For,
  Match,
  Switch,
} from 'solid-js';
import { sendGuess } from './api';

import styles from './App.module.css';
import { N, PastGuess } from './models';

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

export const Game: Component<{ gameId: number }> = (props) => {
  const [done, setDone] = createSignal<boolean>(false);

  const [currentGuess, setCurrentGuess] = createSignal<number>(
    Math.floor(N / 2),
  );
  const [guesses, setGuesses] = createSignal<PastGuess[]>([]);

  createEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _ = props.gameId;
    setGn(undefined);
    setDone(false);
    setCurrentGuess(Math.floor(N / 2));
    setGuesses([]);
  });

  const guessRespFetch = async (): Promise<void> => {
    const guess = currentGuess();
    const response = await sendGuess(props.gameId, guess);
    setGuesses([...guesses(), { guess, response }]);
    if (response === 'right-ho') {
      setDone(true);
    }
  };
  const [gn, setGn] = createSignal<number | undefined>();
  const submitGuess = () => setGn((gn() || 0) + 1);
  createResource(gn, guessRespFetch);

  return (
    <div>
      <p>This is game n. {props.gameId}.</p>
      <Switch fallback={<p>Done!</p>}>
        <Match when={!done()}>
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
      <History guesses={guesses()} />
    </div>
  );
};
