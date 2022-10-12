import classNames from "classnames";
import { Mark } from "../../types";
import styles from "./styles.module.css";

type OwnProps = {
  winner?: Mark;
  restart: () => unknown;
};

const WinnerAnnouncement = ({ winner, restart }: OwnProps) => {
  if (!winner) {
    return null;
  }
  return (
    <div data-winner={winner} className={classNames(styles.winnerAnnouncement)}>
      <h1>{winner && `${winner} wins!`}</h1>
      <button className={styles.winnerAnnouncementRestart} onClick={restart}>
        Restart
      </button>
    </div>
  );
};
export default WinnerAnnouncement;
