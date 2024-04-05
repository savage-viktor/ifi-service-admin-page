import { Field, Form, Formik } from "formik";
import { useState } from "react";

import componentTypes from "../../data/componentTypes";

import styles from "./AddComponentForm.module.css";

function AddComponentForm({ component, onSubmit }) {
  const [selectedType, setSelectedType] = useState(component.type);

  const handleChangeType = (event) => {
    setSelectedType(event.target.value);
  };

  const handleSubmit = (values) => {
    values.image = `/images/components/${values.mark
      .split(" ")
      .join("_")
      .toLowerCase()}.jpg`;

    values.type = selectedType;

    onSubmit(values);
  };

  return (
    <div className={styles.section}>
      <Formik
        // validationSchema="erg"
        initialValues={component}
        onSubmit={handleSubmit}
      >
        <Form autoComplete="off" className={styles.form}>
          <label>
            Компонент
            <Field
              onChange={handleChangeType}
              value={selectedType}
              as="select"
              name="type"
            >
              <option value="" disabled hidden>
                Виберіть компонент
              </option>

              {Object.entries(componentTypes).map((type) => {
                return <option value={type[1]}>{type[1]}</option>;
              })}
            </Field>
          </label>

          <label>
            Маркування
            <Field name="mark" placeholder="Маркування" />
          </label>
          <p>Image - {component.image}</p>

          <label>
            Посилання на datasheet
            <Field name="dataSheetURL" placeholder="Посилання на datasheet" />
          </label>

          <label>
            Розмір, мм
            <Field name="size" placeholder="Розмір, мм" />
          </label>

          <label>
            Коментар
            <Field
              className={styles.comment}
              name="coment"
              placeholder="Коментар"
              as="textarea"
            />
            {/* <textarea
              name="coment"
              className={styles.comment}
              cols="30"
              rows="10"
              placeholder="Коментар"
            ></textarea> */}
          </label>

          {selectedType === componentTypes.flash && (
            <>
              <label>
                Місткість, МБ
                <Field name="flashMemory" placeholder="Місткість, МБ" />
              </label>
              <label>
                Швидкість, ТБ/сек
                <Field name="flashSpeed" placeholder="Швидкість, ТБ/сек" />
              </label>
              <label>
                Тип мікросхеми
                <Field name="flashType" placeholder="Тип мікросхеми" />
              </label>
            </>
          )}

          {selectedType === componentTypes.battery && (
            <>
              <label>
                "Ємність, мАг"
                <Field name="batteryCapacity" placeholder="Ємність, мАг" />
              </label>
            </>
          )}

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
}

export default AddComponentForm;
