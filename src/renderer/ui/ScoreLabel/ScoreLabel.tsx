import * as styles from './styles.module.css';

const COLORS_SCORE = {
  1: { backgroundColor: '#13DE00', textColor: '#FFF' },
  2: { backgroundColor: '#FFAF1C', textColor: '#696767' },
  3: { backgroundColor: '#FF0000', textColor: '#FFF' },
};

type ScoreLabelProps = {
  score: 1 | 2 | 3;
  text: string;
};

export default function ScoreLabel(props: ScoreLabelProps) {
  return (
    <div
      className={styles.scoreLabel}
      style={{ backgroundColor: COLORS_SCORE[props.score].backgroundColor }}
    >
      <span style={{ color: COLORS_SCORE[props.score].textColor }}>
        {props.text}
      </span>
    </div>
  );
}
