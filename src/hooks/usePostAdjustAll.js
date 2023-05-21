import { useDispatch } from "react-redux";

import { turnOffLoader, turnOnLoader } from "../redux/reducers/settingsSlice";
import { ADJUST_ALL_API } from "../utilities/constants/api";
import axios from "../utilities/constants/axios";

const usePostAdjustAll = () => {
  const dispatch = useDispatch();

  const postAdjustAll = (row, onSuccess) => {
    dispatch(turnOnLoader("isAppLoading"));
    axios
      .post(ADJUST_ALL_API, row)
      .then((res) => {
        if (onSuccess) {
          onSuccess(res.data);
        }
      })
      .catch((e) => console.log(e))
      .finally(() => dispatch(turnOffLoader("isAppLoading")));
  };

  return { postAdjustAll };
};

export default usePostAdjustAll;
