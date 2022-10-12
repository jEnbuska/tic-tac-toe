import { Mark, Range } from "../../types";
import getRotation from "../../utils/get-rotation";
import getWinRangeBarLength from "../../utils/get-win-range-bar-length";
import styles from "./styles.module.css";

type OwnProps = {
  range: Range;
  mark: Mark;
};
const WinRange = ({ range, mark }: OwnProps) => {
  const [[top, left]] = range;
  const width = getWinRangeBarLength(range);
  const rotate = getRotation(range);
  return (
    <div
      className={styles.winRange}
      style={{
        top: `${top}rem`,
        left: `${left}rem`,
        width: `${width}rem`,
        rotate: `${rotate}rad`,
        outlineColor: mark === Mark.X ? "darkblue" : "darkred",
      }}
    />
  );
};

export default WinRange;
