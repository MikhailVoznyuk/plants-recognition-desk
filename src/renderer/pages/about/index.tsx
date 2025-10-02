import { Link } from 'react-router-dom';
import GlassContainer from '@ui/GlassContainer/GlassContainer';
import SectionLabel from '@ui/SectionLabel/SectionLabel';
import * as styles from './styles.module.css';

export default function AboutPage() {
  return (
    <div className={styles.containerFluid}>
      <h1 className={styles.sectionTitle}>Инструкция по работе с приложением</h1>

      <GlassContainer className={styles.container}>
        <p>1. Зайдите во владку "Анализ". Загрузите изображения, перетащив их в соответсвующее окно или выбрав их с помощью файлового менеджера.</p>
      </GlassContainer>
      <GlassContainer className={styles.container}>
        <p>2. Загруженные изображение отобразятся в контейнере справа, проверьте их, при необходимости удалив ненужные, нажав кнопку удалить.</p>
      </GlassContainer>
      <GlassContainer className={styles.container}>
        <p>3. Дождитесь обработки изображений. Отчеты по каждому изображению находятся во вкладке "отчеты", Нажмите кнопку "Подробнее", чтобы открыть конкретный отчет.</p>
      </GlassContainer>
      <GlassContainer className={styles.container}>
        <p>4. В отчете находится изображение с выделенными обнаруженными деревьями и кустами. По каждому из них ниже представлены основные показатели жизнеспособности. Нажмите "подробнее" чтобы открыть развернутую инфомацию по конкретному дереву или кусту.</p>
      </GlassContainer>
    </div>
  );
}
