import styles from "./ControlPanel.module.css";

function ControlPanel({ children }) {
  return <div className={styles.panel}>{children}</div>;
}

export default ControlPanel;
