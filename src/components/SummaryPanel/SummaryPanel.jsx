import styles from "./SummaryPanel.module.css";

function SummaryPanel({ array }) {
  return <div className={styles.panel}> Всього {array.length}</div>;
}

export default SummaryPanel;
