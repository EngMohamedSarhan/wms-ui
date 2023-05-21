import { Button, Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import en from "../../utilities/json/en.json";
import Modal from "../Modal/Modal";

const AlertModal = ({
  actionLabel = en.ok,
  secondActionLabel = en.ok,
  cancelLabel = en.cancel,
  removeCancelButton,
  isOpen,
  title,
  children,
  onAction,
  onSecondAction,
  onClose,
  ...props
}) => {
  const handleAction = () => {
    onAction();
    if (onClose) {
      onClose();
    }
  };

  const handleSecondAction = () => {
    onSecondAction();
    if (onClose) {
      onClose();
    }
  };

  return (
    <Modal
      data-testid="alert-modal"
      isOpen={isOpen}
      title={title}
      onClose={onClose}
      titleProps={{ sx: { pl: 3 } }}
      buttons={
        <Grid container pb={1} pl={2} gap={2}>
          {onAction ? (
            <Button variant="contained" onClick={handleAction}>
              {actionLabel}
            </Button>
          ) : null}
          {onSecondAction ? (
            <Button variant="contained" onClick={handleSecondAction}>
              {secondActionLabel}
            </Button>
          ) : null}
          {onClose && !removeCancelButton ? (
            <Button variant="contained" color="gray" onClick={onClose}>
              {cancelLabel}
            </Button>
          ) : null}
        </Grid>
      }
      {...props}
    >
      <Typography>{children}</Typography>
    </Modal>
  );
};

AlertModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  removeCancelButton: PropTypes.bool,
  title: PropTypes.string,
  actionLabel: PropTypes.string,
  secondActionLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  children: PropTypes.node,
  onClose: PropTypes.func,
  onAction: PropTypes.func,
  onSecondAction: PropTypes.func,
};

export default AlertModal;
