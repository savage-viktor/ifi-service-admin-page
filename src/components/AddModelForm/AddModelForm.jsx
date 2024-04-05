import { useFormik } from "formik";
import { GetServices } from "../../services/ServicesAPI";

import SelectService from "../SelectService/SelectService";

import styles from "./AddModelForm.module.css";
import { useState, useEffect } from "react";
import { GetComponents } from "../../services/ComponentsAPI";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function AddModelForm({ model, onSubmit }) {
  // const [serviceObjects] = useState(model.services);
  const [componentMarks] = useState(model.components);

  const [services, setServices] = useState(model.services);
  const [components, setComponents] = useState([]);

  const [serviceOptions, setServiceOptions] = useState([]);
  const [componentOptions, setComponentOptions] = useState([]);

  const [service, setService] = useState();
  const [component, setComponent] = useState("");

  useEffect(() => {
    GetServices()
      .then((services) => {
        const options = [];
        services.map((service) => {
          return options.push({
            label: service.name,
            value: service._id,
            isPage: false,
            isOnSite: false,
            name: service.name,
            page: service.page,
          });
        });
        setServiceOptions(options);
      })
      .catch();
    GetComponents()
      .then((components) => {
        const options = [];
        components.map((component) => {
          return options.push({
            label: component.mark,
            value: component._id,
            ...component,
          });
        });
        setComponentOptions(options);

        const includedComponents = [];
        componentMarks.map((componentMark) => {
          return components.map((component) => {
            if (component.mark === componentMark) {
              return includedComponents.push(component);
            }
            return 0;
          });
        });
        setComponents(includedComponents);
      })
      .catch();
  }, [componentMarks]);

  const handleInputService = (service) => {
    console.log(service);
    setService(service);
  };

  const handleInputComponent = (component) => {
    setComponent(component);
  };

  const handleSubmit = (values) => {
    values.image = `./images/models/${values.model
      .split(" ")
      .join("_")
      .toLowerCase()}.jpg`;

    const conponentsArray = components.map((component) => component.mark);

    values.services = services;
    values.components = conponentsArray;
    // console.log(values);
    onSubmit(values);
  };

  const handleIsOnSite = (event) => {
    setServices((prevServices) => {
      return prevServices.map((prevService) => {
        if (event.target.name === prevService.name) {
          return { ...prevService, ...{ isOnSite: !prevService.isOnSite } };
        }
        return prevService;
      });
    });
    console.log(services);
  };

  const handleIsPage = (event) => {
    setServices((prevServices) => {
      return prevServices.map((prevService) => {
        if (event.target.name === prevService.name) {
          return { ...prevService, ...{ isPage: !prevService.isPage } };
        }
        return prevService;
      });
    });
    console.log(services);
  };

  const handleAddService = () => {
    // console.log(services);
    let isService = false;
    services.map((s) => {
      if (s.name === service.name) {
        isService = true;
      }
      return 0;
    });

    !isService &&
      setServices((prevServices) => {
        return [...prevServices, service];
      });
  };

  const handleAddComponent = () => {
    setComponents((prevComponents) => {
      return [...prevComponents, component];
    });
  };

  const deleteService = (index) => {
    setServices(services.filter((service, i) => i !== index));
  };

  const deleteComponent = (index) => {
    setComponents(components.filter((component, i) => i !== index));
  };

  const formik = useFormik({
    initialValues: model,

    // initialValues: model,
    onSubmit: handleSubmit,
    // validate: (values) => {
    //   let errors = {};
    //   if (!values.name) {
    //     errors.name = "required";
    //   }
    //   return errors;
    // },
  });

  return (
    <div className={styles.section}>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles.fields}>
          <div className={styles.columnModelMain}>
            <div className={styles.vendorModel}>
              <label className={styles.label}>
                Виробник
                <select
                  className={styles.field}
                  as="select"
                  name="vendor"
                  onChange={formik.handleChange}
                  value={formik.values.vendor}
                >
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
                  <option className={styles.option} value="4Gmodule">
                    4G Модуль
                  </option>
                  <option className={styles.option} value="Other">
                    Інший виробник
                  </option>
                </select>
              </label>
              <label className={styles.label}>
                Модель
                <input
                  className={styles.field}
                  name="model"
                  placeholder="Модель"
                  onChange={formik.handleChange}
                  value={formik.values.model}
                />
              </label>
            </div>
            <div className={styles.selectBox}>
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
                          <div key={service.name}>
                            <span className={styles.name}>{service.name}</span>
                            <input
                              className={styles.checkboxOnSite}
                              type="checkbox"
                              checked={service.isOnSite}
                              onChange={handleIsOnSite}
                              name={service.name}
                            />
                            <input
                              type="checkbox"
                              checked={service.isPage}
                              onChange={handleIsPage}
                              name={service.name}
                            />
                            <div className={styles.icon}>
                              <IconButton
                                onClick={() => {
                                  deleteService(index);
                                }}
                                aria-label="delete"
                                size="small"
                              >
                                <DeleteIcon fontSize="inherit" />
                              </IconButton>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
              <div className={styles.servicesBox}>
                <span>Компоненти</span>
                <div>
                  <SelectService
                    onChange={handleInputComponent}
                    options={componentOptions}
                  />
                  <button type="button" onClick={handleAddComponent}>
                    Додати
                  </button>
                  <div className={styles.serviceList}>
                    {components.length !== 0 &&
                      components.map((component, index) => {
                        return (
                          <div key={index}>
                            <span>{component.mark}</span>

                            <div className={styles.icon}>
                              <IconButton
                                onClick={() => {
                                  deleteComponent(index);
                                }}
                                aria-label="delete"
                                size="small"
                              >
                                <DeleteIcon fontSize="inherit" />
                              </IconButton>
                            </div>

                            {/* <button
                              type="button"
                              onClick={() => {
                                deleteComponent(index);
                              }}
                            >
                              Delete
                            </button> */}
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.columnDetails}>
            <label className={styles.label}>
              Тип пристрою
              <input
                className={styles.field}
                name="details.type"
                placeholder="Тип пристрою"
                onChange={formik.handleChange}
                value={formik.values.details.type}
              />
            </label>

            <label className={styles.label}>
              Тип SIM карти
              <input
                className={styles.field}
                name="details.typeOfSim"
                placeholder="Тип SIM карти"
                onChange={formik.handleChange}
                value={formik.values.details.typeOfSim}
              />
            </label>

            <label className={styles.label}>
              Розмір, мм
              <input
                className={styles.field}
                name="details.size"
                placeholder="Розмір"
                onChange={formik.handleChange}
                value={formik.values.details.size}
              />
            </label>

            <label className={styles.label}>
              Акумулятор
              <input
                className={styles.field}
                name="details.battery"
                placeholder="Акумулятор"
                onChange={formik.handleChange}
                value={formik.values.details.battery}
              />
            </label>

            <label className={styles.label}>
              Частоти
              <input
                className={styles.field}
                name="details.bands"
                placeholder="Частоти"
                onChange={formik.handleChange}
                value={formik.values.details.bands}
              />
            </label>

            <label className={styles.label}>
              Антенний роз'єм
              <input
                className={styles.field}
                name="details.antena"
                placeholder="Антена"
                onChange={formik.handleChange}
                value={formik.values.details.antena}
              />
            </label>

            <label className={styles.label}>
              Wi-Fi
              <input
                className={styles.field}
                name="details.wifi"
                placeholder="Wi-Fi"
                onChange={formik.handleChange}
                value={formik.values.details.wifi}
              />
            </label>

            <label className={styles.label}>
              Мобільна мережа
              <input
                className={styles.field}
                name="details.mobileNetwork"
                placeholder="Мобільна мережа"
                onChange={formik.handleChange}
                value={formik.values.details.mobileNetwork}
              />
            </label>
          </div>
        </div>

        <button className={styles.submitButton} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddModelForm;
