import PropTypes from "prop-types";
import React, { useEffect } from "react";

import NotificationModal from "../../components/NotificationModal/NotificationModal";
import AppLoader from "../AppLoader/AppLoader";
import NavBar from "../NavBar/NavBar";
import { useSelector } from "react-redux";
import { settingsState } from "../../redux/store";
import useGetWarehouseLocations from "../../hooks/useGetWarehouseLocations";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

const PageLayout = (props) => {
  const { warehouses } = useSelector(settingsState);
  const { getWarehouseLocations } = useGetWarehouseLocations();

  useEffect(() => {
    if (warehouses.length === 0) {
      getWarehouseLocations();
    }
  }, []);

  return (
    <ErrorBoundary>
      <div>
        <NavBar />
        <AppLoader />
        <NotificationModal />
        <main {...props} />
      </div>
    </ErrorBoundary>
  );
};

PageLayout.propTypes = {
  children: PropTypes.node,
};

export default PageLayout;
