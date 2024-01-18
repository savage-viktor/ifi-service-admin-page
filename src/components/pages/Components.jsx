import { Button, Grid, Paper } from "@mui/material";
import FindInput from "../FindInput/FindInput";
import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import ModalConfirm from "../ModalConfirm/ModalConfirm";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import AddComponentForm from "../AddComponentForm/AddComponentForm";
import {
  DeleteComponent,
  EditComponent,
  GetComponents,
  SubmitComponent,
} from "../../services/ComponentsAPI";
import ComponentList from "../ComponentList/ComponentList";
import Confirm from "../Confirm/Confirm";
import { toast } from "react-toastify";

const initialComponent = {
  type: "",
  mark: "",
  image: "",
  coment: "",
  size: "",
  flashMemory: "",
  flashSpeed: "",
  flashType: "",
  dataSheetURL: "",
  batteryCapacity: "",
};

function Components() {
  const [status, setStatus] = useState("idle");
  const [components, setComponents] = useState(false);
  const [component, setComponent] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [modalConfirmText, setModalConfirmText] = useState("");
  const [modalConfirmType, setModalConfirmType] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [findModel, setFindModel] = useState("");
  const [restoreFile, setRestoreFile] = useState(null);
  const [loaderCount, setLoaderCount] = useState(0);
  const [breakRestore, setBreakRestore] = useState(false);

  const [update, setUpdate] = useState(1);

  useEffect(() => {
    setStatus("loading");
    GetComponents()
      .then((components) => {
        setComponents(components);
        setStatus("idle");
      })
      .catch((error) => {
        console.log(error.message);
        setStatus("error");
      });
  }, [update]);

  const handleOpenModal = () => {
    setModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
    setComponent(false);
  };

  const handleCloseModalConfirm = () => {
    setRestoreFile(null);
    setModalConfirm(false);
    setLoaderCount(0);
  };

  const handleConfirmModal = async () => {
    switch (modalConfirmType) {
      case "delete":
        try {
          handleCloseModalConfirm();
          await DeleteComponent(deleteId);
          setUpdate((prevState) => prevState + 1);

          toast.success("Видалено успішно", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } catch (error) {
          toast.error(`Помилка видалення ${error.message}`, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }

        break;

      case "submit":
        try {
          handleCloseModalConfirm();
          handleCloseModal();

          await SubmitComponent(component);
          setUpdate((prevState) => prevState + 1);

          toast.success("Компонент додано успішно", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } catch (error) {
          toast.error(`Помилка дадавання компонента ${error.message}`, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }

        break;

      case "edit":
        try {
          handleCloseModalConfirm();
          handleCloseModal();

          await EditComponent(component);
          setUpdate((prevState) => prevState + 1);

          toast.success("Відредаговано успішно", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } catch (error) {
          toast.error(`Помилка редагування ${error.message}`, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }

        break;

      default:
        alert("Помилка типу модального вікна");
    }
  };

  const handleSubmitComponent = (component) => {
    setComponent(component);
    setModalConfirmType(component._id ? "edit" : "submit");
    setModalConfirmText(
      component._id ? "Зберегти зміни?" : "Додати нову модель?"
    );
    setModalConfirm(true);
  };

  const handleEditModel = (component) => {
    setComponent(component);
    setModalConfirmType("edit");
    setModal(true);
  };

  const handleDeleteModel = async (id) => {
    setDeleteId(id);
    setModalConfirmType("delete");
    setModalConfirmText("Ви дійсно бажаєте видалити?");
    setModalConfirm(true);
  };

  return (
    <div>
      <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "row",
            // height: 100,
          }}
        >
          <FindInput onChange={setFindModel} />
          <Button
            onClick={handleOpenModal}
            variant="contained"
            sx={{ ml: "auto" }}
          >
            Додати компонент
          </Button>
        </Paper>
      </Grid>

      {modal && (
        <Modal onClose={handleCloseModal}>
          <AddComponentForm
            component={component || initialComponent}
            onSubmit={handleSubmitComponent}
          />
        </Modal>
      )}

      {modalConfirm && (
        <ModalConfirm
          onClose={
            loaderCount === 0 ||
            breakRestore ||
            loaderCount === restoreFile.length
              ? handleCloseModalConfirm
              : () => {}
          }
        >
          {loaderCount === 0 && (
            <Confirm
              text={modalConfirmText}
              accept={handleConfirmModal}
              decline={handleCloseModalConfirm}
            ></Confirm>
          )}
        </ModalConfirm>
      )}

      {status === "loading" && <Loader />}
      {status === "error" && <Error />}

      {components && (
        <>
          Всього {components.length}
          <ComponentList
            components={components}
            onEdit={handleEditModel}
            onDelete={handleDeleteModel}
          />
        </>
      )}
    </div>
  );
}
export default Components;
