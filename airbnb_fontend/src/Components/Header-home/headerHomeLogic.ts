//utils
import { getLocal } from "../../utils/utils";
//const
import { ACCESS_USER_ID } from "../../constant/constant";
//react hook
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//redux
import { AppDispatch, RootState } from "../../redux/store";
import { getProfileData } from "../../redux/user-slice/UserSlice";

export const useLoginRenderAva = (getAcessToken: string) => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (getAcessToken) {
      dispatch(getProfileData(getLocal(ACCESS_USER_ID)));
    }
  }, [getLocal(ACCESS_USER_ID)]);
  const profileData = useSelector(
    (state: RootState) => state.sliceUser.profileData,
  );
  // console.log(profileData);
  let avaName = "";
  if (profileData) {
    avaName =
      profileData.name.split(" ")[profileData.name?.split(" ").length - 1];
  } else {
    avaName = "None";
  }
  return avaName.split("")[0];
};
