import ServiceCard from "../ServiceCard/ServiceCard";

import styles from "./ServiceList.module.css";

function ServiceList({ services, onDelete }) {
  const sortedServices = services.sort((firstService, secondService) =>
    firstService.name.localeCompare(secondService.name)
  );

  return (
    <div className={styles.serviceList}>
      {sortedServices.map((service) => (
        <ServiceCard service={service} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default ServiceList;
