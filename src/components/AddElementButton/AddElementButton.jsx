import styles from "./AddElementButton.module.css";

function AddElementButton({ label, onClick }) {
  return (
    <button onClick={onClick} className={styles.button}>
      {label}
    </button>
  );
}

export default AddElementButton;
