import { Formik, Field, Form } from "formik";
import { GetServices } from "../../services/ServicesAPI";

import SelectService from "../SelectService/SelectService";

import styles from "./AddModelForm.module.css";
import { useState, useEffect } from "react";

// const availableServiceOptions = (serviceOptions) => {
//   const options = [];
//   serviceOptions.map((serviceOption) =>
//     options.push(serviceOption.description)
//   );
//   console.log(options);
//   return options;
// };

function AddModelForm({ model, onSubmit }) {
  const [services, setServices] = useState(model.services);
  const [service, setService] = useState();
  const [serviceOptions, setServiceOptions] = useState([]);

  useEffect(() => {
    GetServices()
      .then((services) => {
        setServiceOptions(services);
      })
      .catch();
  }, []);

  const handleInputService = (value) => {
    console.log(value);
    setService(value);
  };

  const handleSubmit = (values) => {
    values.image = `./images/models/${values.model
      .split(" ")
      .join("_")
      .toLowerCase()}.jpg`;
    values.services = services;
    onSubmit(values);
  };

  const handleIsPage = (event) => {
    setServices((prevServices) => {
      return prevServices.map((prevService) => {
        if (event.target.name === prevService.label) {
          return { ...prevService, ...{ isPage: !prevService.isPage } };
        }
        return prevService;
      });
    });
  };

  const handleAddService = () => {
    if (services.length === 0) {
      setServices((prevServices) => {
        return [...prevServices, service];
      });
      return;
    }

    let isService = false;
    services.map((s) => {
      if (s.id === service.id) {
        isService = true;
      }
      return 0;
    });

    !isService &&
      setServices((prevServices) => {
        return [...prevServices, service];
      });
    // setServices(prevServices => {
    //   return [...prevServices, service];
    // });
    // setService('');
  };

  const deleteService = (index) => {
    setServices(services.filter((service, i) => i !== index));
  };

  return (
    <div className={styles.section}>
      <Formik
        // validationSchema="erg"
        initialValues={model}
        onSubmit={handleSubmit}
      >
        <Form autoComplete="off" className={styles.form}>
          <div className={styles.fields}>
            <div className={styles.columnModelMain}>
              <div className={styles.vendorModel}>
                <label className={styles.label}>
                  Виробник
                  <Field className={styles.field} as="select" name="vendor">
                    <option value="" disabled hidden>
                      Виберіть виробника
                    </option>

                    <option className={styles.option} value="Novatel">
                      Novatel
                    </option>
                    <option className={styles.option} value="Netgear">
                      Netgear
                    </option>
                    <option className={styles.option} value="Huawei">
                      Huawei
                    </option>
                    <option className={styles.option} value="ZTE">
                      ZTE
                    </option>
                    <option className={styles.option} value="Alcatel">
                      Alcatel
                    </option>
                    <option className={styles.option} value="Other">
                      Інший виробник
                    </option>
                  </Field>
                </label>
                <label className={styles.label}>
                  Модель
                  <Field
                    className={styles.field}
                    name="model"
                    placeholder="Модель"
                  />
                </label>
              </div>
              <div className={styles.servicesBox}>
                <span>Сервісні послуги</span>
                <div>
                  <SelectService
                    onChange={handleInputService}
                    options={serviceOptions}
                  />
                  <button type="button" onClick={handleAddService}>
                    Додати
                  </button>
                  <div className={styles.serviceList}>
                    {services.length !== 0 &&
                      services.map((service, index) => {
                        return (
                          <div key={service.id}>
                            <span>{service.label}</span>
                            <input
                              type="checkbox"
                              checked={service.isPage}
                              onChange={handleIsPage}
                              name={service.label}
                              // id={service.id}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                deleteService(index);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.columnDetails}>
              <label className={styles.label}>
                Тип пристрою
                <Field
                  className={styles.field}
                  name="details.type"
                  placeholder="Тип пристрою"
                />
              </label>

              <label className={styles.label}>
                Тип SIM карти
                <Field
                  className={styles.field}
                  name="details.typeOfSim"
                  placeholder="Тип SIM карти"
                />
              </label>

              <label className={styles.label}>
                Розмір, мм
                <Field
                  className={styles.field}
                  name="details.size"
                  placeholder="Розмір"
                />
              </label>

              <label className={styles.label}>
                Акумулятор
                <Field
                  className={styles.field}
                  name="details.battery"
                  placeholder="Акумулятор"
                />
              </label>

              <label className={styles.label}>
                Частоти
                <Field
                  className={styles.field}
                  name="details.bands"
                  placeholder="Частоти"
                />
              </label>

              <label className={styles.label}>
                Антенний роз'єм
                <Field
                  className={styles.field}
                  name="details.antena"
                  placeholder="Антена"
                />
              </label>

              <label className={styles.label}>
                Wi-Fi
                <Field
                  className={styles.field}
                  name="details.wifi"
                  placeholder="Wi-Fi"
                />
              </label>

              <label className={styles.label}>
                Мобільна мережа
                <Field
                  className={styles.field}
                  name="details.mobileNetwork"
                  placeholder="Мобільна мережа"
                />
              </label>
            </div>
          </div>

          <button className={styles.submitButton} type="submit">
            Submit
          </button>
        </Form>
      </Formik>
      {/* <AddServiceForm handleAddService={handleAddService} /> */}
    </div>
  );
}

export default AddModelForm;
