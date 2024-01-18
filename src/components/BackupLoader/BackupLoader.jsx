import Loader from "../Loader/Loader";
import styles from "./BackupLoader.module.css";

function BackupLoader({ count, length, children }) {
  return (
    <div className={styles.loaderWindow}>
      {count === length ? (
        <div>Завантажено успішно</div>
      ) : (
        <div>
          {Math.round(count)}/{length}
          {children || <Loader />}
        </div>
      )}
    </div>
  );
}

export default BackupLoader;
