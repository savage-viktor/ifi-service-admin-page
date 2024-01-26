import styles from "./Dashboard.module.css";

function Dashboard({ children }) {
  return <div className={styles.dashboard}>{children}</div>;
}
export default Dashboard;
