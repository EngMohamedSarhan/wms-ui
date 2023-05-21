import { FormControl, Grid, MenuItem, Select } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import HomeMenuItem from "../../components/HomeMenuItem/HomeMenuItem";
import PageLayout from "../../components/PageLayout/PageLayout";
import WarhousePicker from "../../components/WarehousePicker/WarehousePicker";
import useGetApplications from "../../hooks/useGetApplications";
import applications from "../../utilities/constants/applications";
import { SortOrders } from "../../utilities/constants/sort";
import { getComparator } from "../../utilities/functions/comparators";
import en from "../../utilities/json/en.json";

const HomePage = () => {
  const originalAppsRef = useRef(applications);
  const [apps, setApps] = useState([...applications]);
  const [sort, setSort] = useState(SortOrders.sort);
  const { getApplications } = useGetApplications(originalAppsRef, setApps);

  const handleChange = (event) => setSort(event.target.value);

  const renderApps = () =>
    apps.map(
      ({ applicationId, applicationName, descriptionTxt, applicationRoute }) => (
        <Grid item xs={12} sm={6} lg={3} key={applicationId}>
          <HomeMenuItem
            to={applicationRoute}
            label={applicationName}
            description={descriptionTxt}
          />
        </Grid>
      )
    );

  useEffect(() => {
    if (sort !== SortOrders.sort) {
      setApps(
        [...originalAppsRef.current].sort(getComparator(sort, "applicationName"))
      );
    } else {
      setApps(originalAppsRef.current);
    }
  }, [sort]);

  useEffect(() => {
    getApplications();
  }, []);

  return (
    <PageLayout>
      <Grid container pl={5} pt={2} pr={3}>
        <Grid container justifyContent="space-between">
          <WarhousePicker sx={{ mb: 0.5, mt: 0.5 }} />
          <FormControl>
            <Select
              color="primary"
              size="small"
              value={sort}
              onChange={handleChange}
              sx={{ minWidth: 200 }}
            >
              <MenuItem value={SortOrders.sort}>{en.sort}</MenuItem>
              <MenuItem value={SortOrders.asc}>{en.sortNameAsc}</MenuItem>
              <MenuItem value={SortOrders.desc}>{en.sortNameDesc}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid container pt={2} spacing={3} rowGap={4}>         
          {renderApps()}
        </Grid>
      </Grid>
    </PageLayout>
  );
};

export default HomePage;
