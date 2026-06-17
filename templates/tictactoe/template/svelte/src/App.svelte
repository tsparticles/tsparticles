<script lang="ts">
  import Particles from "@tsparticles/svelte";
  import { confetti } from "@tsparticles/confetti";
  import type { ISourceOptions } from "@tsparticles/engine";

  type Player = "X" | "O";

  const WIN_PATTERNS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let board = $state<(Player | null)[]>(Array(9).fill(null));
  let currentPlayer = $state<Player>("X");
  let winner = $state<Player | "draw" | null>(null);
  let winLine = $state<number[] | null>(null);
  let scores = $state<{ X: number; O: number; draw: number }>({ X: 0, O: 0, draw: 0 });

  function fireConfetti(): void {
    const count = 200;
    const defaults = { origin: { y: 0.7 } };

    function fire(particleRatio: number, opts: Record<string, unknown>): void {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  }

  function checkWin(b: (Player | null)[]): { winner: Player | "draw"; winLine: number[] } | null {
    for (const pattern of WIN_PATTERNS) {
      const [a, b2, c2] = pattern;

      if (b[a] && b[a] === b[b2] && b[a] === b[c2]) {
        return { winner: b[a] as Player, winLine: pattern };
      }
    }

    if (b.every((cell) => cell !== null)) {
      return { winner: "draw", winLine: [] };
    }

    return null;
  }

  function makeMove(index: number): void {
    if (board[index] || winner) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = currentPlayer;

    const result = checkWin(newBoard);

    if (result) {
      board = newBoard;
      winner = result.winner;
      winLine = result.winLine;

      const newScores = { ...scores };

      if (result.winner === "draw") {
        newScores.draw++;
      } else {
        newScores[result.winner]++;
        fireConfetti();
      }

      scores = newScores;
    } else {
      board = newBoard;
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }

  function reset(): void {
    board = Array(9).fill(null);
    currentPlayer = "X";
    winner = null;
    winLine = null;
  }

  const options: ISourceOptions = {
    fullScreen: { enable: true, zIndex: -1 },
    background: { color: { value: "#0a0a1a" } },
    fpsLimit: 60,
    particles: {
      number: { value: 30, density: { enable: true } },
      color: { value: ["#6c5ce7", "#a29bfe"] },
      shape: { type: "circle" },
      opacity: { value: 0.2, random: true },
      size: { value: { min: 1, max: 2 } },
      move: {
        enable: true,
        speed: 0.5,
        direction: "none",
        random: true,
        straight: false,
        outModes: { default: "out" },
      },
    },
    detectRetina: true,
  };
</script>

<h1>Tic-Tac-Toe</h1>

<div class="scoreboard">
  <span>X: {scores.X}</span>
  <span>O: {scores.O}</span>
  <span>Draw: {scores.draw}</span>
</div>

<div class="turn">
  {#if !winner}
    {currentPlayer}'s turn
  {:else if winner === "draw"}
    It's a draw!
  {:else}
    {winner} wins!
  {/if}
</div>

<div id="board" class="board">
  {#each board as cell, i}
    <button
      class="cell"
      class:taken={cell !== null}
      class:win={winLine?.includes(i) ?? false}
      onclick={() => makeMove(i)}
    >
      {cell ?? ""}
    </button>
  {/each}
</div>

<button class="reset-btn" onclick={reset}>Reset</button>

<Particles id="tsparticles" options={options} />

<style>
  :global(*) {
    box-sizing: border-box;
  }

  :global(body) {
    margin: 0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0a0a1a;
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    color: #fff;
  }

  :global(#app) {
    text-align: center;
    z-index: 10;
    padding: 1rem;
  }

  h1 {
    font-size: 2.5em;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #6c5ce7, #fd79a8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .scoreboard {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 1rem;
    font-size: 1.1em;
    opacity: 0.8;
  }

  .turn {
    font-size: 1.2em;
    margin-bottom: 1rem;
    opacity: 0.7;
  }

  .board {
    display: grid;
    grid-template-columns: repeat(3, 100px);
    grid-template-rows: repeat(3, 100px);
    gap: 4px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    overflow: hidden;
    margin: 0 auto;
    width: fit-content;
  }

  .cell {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5em;
    font-weight: 700;
    background: #12122a;
    cursor: pointer;
    transition: background 0.2s;
    user-select: none;
    border: none;
    color: #fff;
  }

  .cell:hover {
    background: #1a1a3a;
  }

  .cell.taken {
    cursor: default;
  }

  .cell.win {
    background: rgba(108, 92, 231, 0.3);
  }

  .reset-btn {
    margin-top: 1.5rem;
    padding: 0.7em 2em;
    font-size: 1em;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    background: linear-gradient(135deg, #6c5ce7, #a29bfe);
    color: #fff;
    cursor: pointer;
    transition: transform 0.2s;
  }

  .reset-btn:hover {
    transform: scale(1.05);
  }
</style>
