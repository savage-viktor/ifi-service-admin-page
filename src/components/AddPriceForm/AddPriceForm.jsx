import { MultiSelect } from "react-multi-select-component";

import styles from "./AddPriceForm.module.css";
import { useEffect, useState } from "react";
import { GetClients } from "../../services/ClientsAPI";
import { GetModels } from "../../services/ModelsAPI";
import { useFormik } from "formik";

const initPrice = {
  amount: "",
  comment: "",
  models: [],
  clients: [],
  dropshippers: [],
};

function AddPriceForm({ service, onSubmit }) {
  const [client, setClient] = useState([]);
  const [model, setModel] = useState([]);
  const [dropshippers, setDropshippers] = useState([]);

  const [status, setStatus] = useState("idle");

  const [clientsOptions, setClientsOptions] = useState([]);
  const [modelsOptions, setModelsOptions] = useState([]);

  useEffect(() => {
    setStatus("loading");
    GetClients()
      .then((clients) => {
        setClientsOptions(
          clients.map((client) => {
            return {
              label: `${client.lastName} ${client.firstName}`,
              value: `${client.lastName} ${client.firstName}`,
            };
          })
        );
        setStatus("idle");
      })
      .catch((error) => {
        console.log(error.message);
        setStatus("error");
      });

    GetModels()
      .then((models) => {
        setModelsOptions(
          models.map(({ model }) => {
            return {
              label: model,
              value: model,
            };
          })
        );
        setStatus("idle");
      })
      .catch((error) => {
        console.log(error.message);
        setStatus("error");
      });
  }, []);

  const handleSubmit = (values) => {
    values.models = model.map((model) => model.label);
    values.clients = client.map((client) => client.label);
    values.dropshippers = dropshippers.map(
      (dropshippers) => dropshippers.label
    );

    onSubmit(values);
  };

  const formik = useFormik({
    initialValues: initPrice,

    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <label>
        Ціна послуги
        <input
          onChange={formik.handleChange}
          value={formik.amount}
          name="amount"
          type="number"
        />
      </label>

      <label>
        Коментар
        <input
          onChange={formik.handleChange}
          value={formik.comment}
          name="comment"
          type="text"
        />
      </label>

      <label for="client">Клієнти: </label>
      <MultiSelect
        shouldToggleOnHover={false}
        id="client"
        options={clientsOptions}
        value={client}
        onChange={setClient}
        isLoading={false}
        labelledBy="client"
        overrideStrings={{
          allItemsAreSelected: "Вибрано всіх клієнтів.",
          clearSearch: "Clear Search",
          clearSelected: "Clear Selected",
          noOptions: "Немає варіантів",
          search: "Пошук",
          selectAll: "Вибрати всіх",
          selectAllFiltered: "Select All (Filtered)",
          selectSomeItems: "Виберіть клієнта...",
          create: "Create",
        }}
      />

      <label for="client">Моделі: </label>
      <MultiSelect
        shouldToggleOnHover={false}
        id="client"
        options={modelsOptions}
        value={model}
        onChange={setModel}
        isLoading={false}
        labelledBy="client"
        overrideStrings={{
          allItemsAreSelected: "Вибрано всіх клієнтів.",
          clearSearch: "Clear Search",
          clearSelected: "Clear Selected",
          noOptions: "Немає варіантів",
          search: "Пошук",
          selectAll: "Вибрати всіх",
          selectAllFiltered: "Select All (Filtered)",
          selectSomeItems: "Виберіть клієнта...",
          create: "Create",
        }}
      />

      <label for="client">Дропшиппери: </label>
      <MultiSelect
        shouldToggleOnHover={false}
        id="client"
        options={clientsOptions}
        value={dropshippers}
        onChange={setDropshippers}
        isLoading={false}
        labelledBy="client"
        overrideStrings={{
          allItemsAreSelected: "Вибрано всіх клієнтів.",
          clearSearch: "Clear Search",
          clearSelected: "Clear Selected",
          noOptions: "Немає варіантів",
          search: "Пошук",
          selectAll: "Вибрати всіх",
          selectAllFiltered: "Select All (Filtered)",
          selectSomeItems: "Виберіть клієнта...",
          create: "Create",
        }}
      />

      <button type="submit"> Додати</button>
    </form>
  );
}

export default AddPriceForm;
