import { useFormik } from "formik";
import styles from "./AddClientForm.module.css";

const initClient = {
  firstName: "",
  lastName: "",
  city: "",
};

function AddClientForm({ onSubmit }) {
  const handleSubmit = (values) => {
    onSubmit(values);
  };

  const formik = useFormik({
    initialValues: initClient,

    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <label>
        Ім'я
        <input
          onChange={formik.handleChange}
          value={formik.firstName}
          name="firstName"
          type="text"
        />
      </label>
      <label>
        Прізвище
        <input
          onChange={formik.handleChange}
          value={formik.lastName}
          name="lastName"
          type="text"
        />
      </label>
      <label>
        Населений пункт
        <input
          onChange={formik.handleChange}
          value={formik.city}
          name="city"
          type="text"
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default AddClientForm;
