import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

import { openNotification } from "../../redux/reducers/settingsSlice";
import AlertModal from "../AlertModal/AlertModal";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorInfo: "",
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    return this.state.hasError ? (
      <AlertModal
        data-testid="error-boundary"
        isOpen
        title="ERROR"
        actionLabel="Refresh"
        onAction={() => window.location.reload()}
      >
        An error has occured please refresh the page!
      </AlertModal>
    ) : (
      this.props.children
    );
  }
}

// const mapDispatchToProps = (dispatch) => ({ openNotification });

export default connect(null, { openNotification })(ErrorBoundary);

ErrorBoundary.propTypes = {
  children: PropTypes.node,
  openNotification: PropTypes.func,
};
