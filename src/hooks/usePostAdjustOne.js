import { useDispatch } from "react-redux";

import { turnOffLoader, turnOnLoader } from "../redux/reducers/settingsSlice";
import { ADJUST_ONE_API } from "../utilities/constants/api";
import axios from "../utilities/constants/axios";

const usePostAdjustOne = () => {
  const dispatch = useDispatch();

  const postAdjustOne = (row, onSuccess) => {
    dispatch(turnOnLoader("isAppLoading"));
    axios
      .post(ADJUST_ONE_API, row)
      .then((res) => {
        if (onSuccess) {
          onSuccess(res.data);
        }
      })
      .catch((e) => console.log(e))
      .finally(() => dispatch(turnOffLoader("isAppLoading")));
  };

  return { postAdjustOne };
};

export default usePostAdjustOne;
