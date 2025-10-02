import { useState, useRef } from 'react';

import type { ReportObject } from '@/types/Report';
import ScoreLabel from '@ui/ScoreLabel/ScoreLabel';
import GlassContainer from '@ui/GlassContainer/GlassContainer';
import Button from '@ui/Button/Button';

import * as styles from './styles.module.css';

type ReportObjectProps = {
  data: ReportObject;
  id: number;
};

const NAMES_HASH = {
  tree: 'Дерево',
  shrub: 'Куст',
};
const ELEMENTS_HEIGHT = {
  labels: [110, 190],
  content: [200, 420],
};

const DUR = 400;
export default function ReportObjectBlock({ data, id }: ReportObjectProps) {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const onClick = () => {
    setIsOpened(!isOpened);
  };

  return (
    <GlassContainer
      className={styles.objectBlockContainer}
      contentContainerClassName={styles.objectBlock}
      style={{ height: ELEMENTS_HEIGHT.content[+isOpened] }}
    >
      <div className={styles.header}>
        <h5 className={styles.headerText}>{`Объект № ${id}`}</h5>
      </div>
      <div className={styles.columnBlock}>
        <div className={[styles.col, styles.textBlock].join(' ')}>
          <span
            className={styles.text}
          >{`Тип: ${NAMES_HASH[data.plantType]}`}</span>
          <span className={styles.text}>{`Порода: ${data.species}`}</span>
        </div>
        <div
          className={[styles.col, styles.labelBlock].join(' ')}
          style={{ height: ELEMENTS_HEIGHT.labels[+isOpened] }}
        >
          <ScoreLabel
            score={data.healthScore}
            text={`Здоровье: ${data.healthScore}`}
          />
          <ScoreLabel
            score={data.crackScore}
            text={`Повреждения: ${data.crackScore}`}
          />
          <ScoreLabel
            score={data.cavityScore}
            text={`Полости: ${data.cavityScore}`}
          />
          <ScoreLabel
            score={data.fungusScore}
            text={`Грибок: ${data.fungusScore}`}
          />
          <ScoreLabel
            score={data.fungusScore}
            text={`мех. повреждения: ${data.mechDamageScore}`}
          />
        </div>
      </div>
      <div className={styles.textSection}>
        {isOpened ? <p className={styles.text}>{data.description}</p> : null}
      </div>
      <Button className={styles.button} callback={onClick}>
        <span className={styles.buttonText}>
          {!isOpened ? 'Подробнее' : 'Свернуть'}
        </span>
      </Button>
    </GlassContainer>
  );
}
