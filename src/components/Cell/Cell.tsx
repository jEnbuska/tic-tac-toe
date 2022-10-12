import { memo } from "react";
import { Mark } from "../../types";
import styles from "./styles.module.css";

type OwnProps = {
  x: number;
  y: number;
  value: string;
  onClick(y: number, x: number): unknown;
  turn: Mark;
};

const Cell = memo(({ onClick, y, x, value, turn }: OwnProps) => {
  return (
    <button
      className={styles.cell}
      onClick={() => onClick(y, x)}
      data-mark={value || turn}
      data-empty={!value}
    >
      <span className={styles.cellValue}>{value}</span>
    </button>
  );
});

export default Cell;
