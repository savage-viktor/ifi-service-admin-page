import styles from "./DashboardHeader.module.css";

function DashboardHeader({ text }) {
  return <h1 className={styles.header}>{text}</h1>;
}
export default DashboardHeader;
