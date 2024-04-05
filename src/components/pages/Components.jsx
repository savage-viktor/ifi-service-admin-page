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
import ControlPanel from "../ControlPanel/ControlPanel";
import AddElementButton from "../AddElementButton/AddElementButton";

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
  const [findComponent, setFindComponent] = useState("");
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

  const filterComponents = (components) => {
    return components.filter((component) => {
      return (
        component.mark.toLowerCase().includes(findComponent) ||
        component.coment.toLowerCase().includes(findComponent)
      );
    });
  };

  return (
    <div>
      <ControlPanel>
        <FindInput onChange={setFindComponent} label="Пошук компонета" />
        <AddElementButton onClick={handleOpenModal} label="Додати компонент" />
      </ControlPanel>

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
          Всього {filterComponents(components).length}
          <ComponentList
            components={filterComponents(components)}
            onEdit={handleEditModel}
            onDelete={handleDeleteModel}
          />
        </>
      )}
    </div>
  );
}
export default Components;
