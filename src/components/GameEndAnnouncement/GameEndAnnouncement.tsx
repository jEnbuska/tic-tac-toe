import classNames from "classnames";
import { Mark } from "../../types";
import styles from "./styles.module.css";

type OwnProps = {
  winner?: Mark;
  restart: () => unknown;
  draw: boolean;
};

const GameEndAnnouncement = ({ winner, draw, restart }: OwnProps) => {
  if (!winner && !draw) {
    return null;
  }
  return (
    <div
      data-winner={winner}
      className={classNames(styles.gameEndAnnouncement)}
    >
      <h1>{draw ? "Draw!" : `${winner} wins!`}</h1>
      <button className={styles.gameEndAnnouncementRestart} onClick={restart}>
        Restart
      </button>
    </div>
  );
};
export default GameEndAnnouncement;
