import * as styles from './styles.module.css';

type SectionLabelProps = {
  text: string;
};
export default function SectionLabel({ text }: SectionLabelProps) {
  return (
    <div className={styles.sectionLabel}>
      <h5 className={styles.textLabel}>{text}</h5>
    </div>
  );
}
