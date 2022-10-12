import { useCallback, useEffect, useRef, useState } from "react";
import { Mark } from "../../types";
import createGame from "../../utils/create-game";
import getWinRanges from "../../utils/get-win-ranges";
import Cell from "../Cell/Cell";
import WinnerAnnouncement from "../Winner/WinnerAnnouncement";
import WinRange from "../WinRange/WinRange";
import styles from "./styles.module.css";

const initialState = {
  grid: createGame(10),
  turn: Mark.X,
};
const Game = () => {
  const [game, setGame] = useState(initialState);
  const restart = () => setGame(initialState);
  const winRanges = getWinRanges(game.grid);
  const onClick = useCallback((y: number, x: number) => {
    setGame((prevGame) => {
      const { grid, turn } = prevGame;
      if (grid[y][x] !== Mark.EMPTY) {
        return prevGame;
      }
      const nextGrid = [...grid];
      const row = (nextGrid[y] = [...nextGrid[y]]);
      row[x] = turn;
      const nextTurn = turn === Mark.X ? Mark.O : Mark.X;
      return {
        grid: nextGrid,
        turn: nextTurn,
      };
    });
  }, []);
  const { grid, turn } = game;
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (winRanges.length) {
      ref.current?.setAttribute("inert", `true`);
    } else {
      ref.current?.removeAttribute("inert");
    }
  }, [winRanges]);
  return (
    <div className={styles.game}>
      <WinnerAnnouncement winner={winRanges[0]?.mark} restart={restart} />
      <div className={styles.grid} ref={ref}>
        {grid.map((row, y) => (
          <div key={`row-${y}`} className={styles.row}>
            {row.map((value, x) => {
              return (
                <Cell
                  key={`cell-${x}`}
                  onClick={onClick}
                  x={x}
                  y={y}
                  value={value}
                  turn={turn}
                />
              );
            })}
          </div>
        ))}
        {winRanges.map(({ range, mark }, i) => {
          return <WinRange range={range} mark={mark} key={`range-${i}`} />;
        })}
      </div>
    </div>
  );
};

export default Game;
