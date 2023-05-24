import { Add, DateRangeOutlined, Remove } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";

import AlertModal from "../../components/AlertModal/AlertModal";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import PageLayout from "../../components/PageLayout/PageLayout";
import TransferList from "../../components/TransferList/TransferList";
import WarehousePicker from "../../components/WarehousePicker/WarehousePicker";
import useGetTaskGroups from "../../hooks/useGetTaskGroups";
import useGetUsers from "../../hooks/useGetUsers";
import usePostUpdateTaskGroups from "../../hooks/usePostUpdateTaskGroups";
import { INITIAL_SELECTED_WAREHOUSE } from "../../redux/reducers/settingsSlice";
import { APP_BAR_HEIGHT } from "../../styles/styles";
import en from "../../utilities/json/en.json";

const TaskGroupPage = () => {
  const { postUpdateTaskGroups } = usePostUpdateTaskGroups();
  const { users, getUsers, selectedWarehouse } = useGetUsers();
  const { taskGroups, getTaskGroups } = useGetTaskGroups();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [listHeight, setListHeight] = useState(
    window.innerHeight - APP_BAR_HEIGHT - 40 - 135
  );

  const handleAddModalOpen = () => setIsAddModalOpen(true);

  const handleAddModalClose = () => setIsAddModalOpen(false);

  const handleRemoveModalOpen = () => setIsRemoveModalOpen(true);

  const handleRemoveModalClose = () => setIsRemoveModalOpen(false);

  const handleUserSelect = (id) => {
    if (selectedUsers.indexOf(id) === -1) {
      selectedUsers.push(id);
      setSelectedUsers([...selectedUsers]);
    } else {
      setSelectedUsers(selectedUsers.filter((userId) => userId !== id));
    }
  };

  const handleUserSelectAll = () => {
    if (selectedUsers.length !== users.length) {
      setSelectedUsers(users.map(({ userId }) => userId));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleGroupSelect = (id) => {
    if (selectedGroups.indexOf(id) === -1) {
      selectedGroups.push(id);
      setSelectedGroups([...selectedGroups]);
    } else {
      setSelectedGroups(selectedGroups.filter((taskGroupId) => taskGroupId !== id));
    }
  };

  const handleGroupSelectAll = () => {
    if (selectedGroups.length !== taskGroups.length) {
      setSelectedGroups(taskGroups.map(({ taskGroupId }) => taskGroupId));
    } else {
      setSelectedGroups([]);
    }
  };

  const handleResetAll = () => {
    setSelectedUsers([]);
    setSelectedGroups([]);
  };

  const handleAddTaskGroups = () =>
    postUpdateTaskGroups(selectedUsers, selectedGroups);

  const handleRemoveTaskGroups = () =>
    postUpdateTaskGroups(selectedUsers, selectedGroups, true);

  useEffect(() => {
    if (selectedWarehouse !== INITIAL_SELECTED_WAREHOUSE) {
      getUsers();
      getTaskGroups();
      handleResetAll();
    }
  }, [selectedWarehouse]);

  useEffect(() => {
    const resizeListener = () =>
      setListHeight(window.innerHeight - APP_BAR_HEIGHT - 40 - 135);

    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  return (
    <PageLayout>
      <Grid container direction="column" pt={2} pl={5} pb={2} pr={3}>
        <Grid container alignItems="center" pb={3}>
          <WarehousePicker sx={{ mb: 0.5, mt: 0.5 }} />
          <Breadcrumbs
            icon={DateRangeOutlined}
            label={en.taskGroup}
            sx={{ ml: 2 }}
          />
        </Grid>
        <Grid
          container
          spacing={4}
          mb={2}
          sx={(theme) => ({
            height: listHeight,
            [theme.breakpoints.down("sm")]: {
              height: 2 * listHeight,
            },
          })}
        >
          <Grid item xs={12} sm={6} sx={{ height: listHeight }}>
            <TransferList
              title={en.usersListTitle}
              label={en.users}
              renderBy={["firstName", "lastName"]}
              valueBy="userId"
              height="90%"
              items={users}
              selected={selectedUsers}
              onSelect={handleUserSelect}
              onSelectAll={handleUserSelectAll}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ height: listHeight }}>
            <TransferList
              title={en.taskGroupsListTitle}
              label={en.assignedTaskGroups}
              renderBy="description"
              valueBy="taskGroupId"
              height="90%"
              items={taskGroups}
              selected={selectedGroups}
              onSelect={handleGroupSelect}
              onSelectAll={handleGroupSelectAll}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="flex-end" gap={2}>
          <Button
            variant="contained"
            color="error"
            startIcon={<Remove />}
            onClick={handleRemoveModalOpen}
          >
            {en.removeTaskGroup}
          </Button>
          <Button
            variant="contained"
            color="success"
            startIcon={<Add />}
            onClick={handleAddModalOpen}
          >
            {en.addTaskGroup}
          </Button>
        </Grid>
      </Grid>
      <AlertModal
        isOpen={isAddModalOpen}
        title={en.pleaseConfirm.toUpperCase()}
        actionLabel={en.confirmToAdd}
        onClose={handleAddModalClose}
        onAction={handleAddTaskGroups}
      >
        {en.addUsersConfirmMessage}
      </AlertModal>
      <AlertModal
        isOpen={isRemoveModalOpen}
        title={en.pleaseConfirm.toUpperCase()}
        actionLabel={en.confirmToRemove}
        onClose={handleRemoveModalClose}
        onAction={handleRemoveTaskGroups}
      >
        {en.removeUsersConfirmMessage}
      </AlertModal>
    </PageLayout>
  );
};

export default TaskGroupPage;
