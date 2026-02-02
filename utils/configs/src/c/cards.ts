import type { ISourceOptions } from "@tsparticles/engine";

const cardSuits = ["spades", "hearts", "diamonds", "clubs"] as const,
  cardValues = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"] as const,
  allCards = cardSuits.flatMap(suit =>
    cardValues.map(value => ({
      suit,
      value,
    })),
  ),
  options: ISourceOptions = {
    key: "cards",
    name: "Cards",
    particles: {
      color: {
        value: "#fff",
      },
      number: {
        value: 52,
      },
      reduceDuplicates: true,
      shape: {
        type: ["card"],
        options: {
          card: allCards,
        },
      },
      opacity: {
        value: 1,
      },
      size: {
        value: 30,
      },
      move: {
        enable: true,
        speed: 2,
      },
      stroke: {
        width: 1,
        color: "#000",
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "repulse",
        },
        onClick: {
          enable: true,
          mode: "push",
        },
      },
      modes: {
        repulse: {
          distance: 200,
        },
        push: {
          quantity: 4,
        },
      },
    },
    background: {
      color: "#fff",
    },
  };

export default options;
