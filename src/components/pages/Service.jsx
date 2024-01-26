import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EditService, GetService } from "../../services/ServicesAPI";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import ControlPanel from "../ControlPanel/ControlPanel";
import FindInput from "../FindInput/FindInput";
import AddElementButton from "../AddElementButton/AddElementButton";
import Modal from "../Modal/Modal";
import AddPriceForm from "../AddPriceForm/AddPriceForm";
import PriceList from "../PriceList/PriceList";
import Dashboard from "../Dashboard/Dashboard";
import DashboardHeader from "../DashboardHeader/DashboardHeader";
import { toast } from "react-toastify";

function Service() {
  const [status, setStatus] = useState("idle");
  const [service, setService] = useState(false);

  const [modal, setModal] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);

  const [update, setUpdate] = useState(1);

  const { serviceId } = useParams();

  useEffect(() => {
    setStatus("loading");
    GetService(serviceId)
      .then((service) => {
        setService(service);
        setStatus("idle");
      })
      .catch((error) => {
        console.log(error.message);
        setStatus("error");
      });
  }, [serviceId, update]);

  function handleSearch() {
    console.log(service);
  }

  const handleOpenModal = () => {
    setModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
    // setModel(false);
  };

  const handleSubmit = (price) => {
    service.prices.push(price);
    //  setService((prevService) => {
    //   return { ...prevService, prices: [...prevService.prices, price] };
    // });
    EditService(service);
    setModal(false);
  };

  const handleEditPrice = (price) => {
    // setModel(model);
    // setModalConfirmType("edit");
    // setModal(true);
  };

  const handleDeletePrice = async (detetedPrice) => {
    const updatedPrices = service.prices.filter(
      (price) => price._id !== detetedPrice._id
    );

    // await EditService({ ...service, prices: updatedPrices });
    // setUpdate((prevState) => prevState + 1);

    try {
      await EditService({ ...service, prices: updatedPrices });
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
  };

  const sortPrices = (prices) => {
    return prices.sort(
      (firstPrice, secondPrice) => firstPrice.amount - secondPrice.amount
    );
  };

  return (
    <Dashboard>
      <ControlPanel>
        <FindInput onChange={handleSearch} label="Пошук прайса" />
        <AddElementButton onClick={handleOpenModal} label="Додати прайс" />
      </ControlPanel>
      {status === "loading" && <Loader />}
      {status === "error" && <Error />}

      {service && (
        <>
          <DashboardHeader text={service.name} />
          <PriceList
            prices={sortPrices(service.prices)}
            onEdit={handleEditPrice}
            onDelete={handleDeletePrice}
          />
        </>
      )}

      {modal && (
        <Modal onClose={handleCloseModal}>
          <AddPriceForm onSubmit={handleSubmit} service={service} />
        </Modal>
      )}
    </Dashboard>
  );
}

export default Service;
