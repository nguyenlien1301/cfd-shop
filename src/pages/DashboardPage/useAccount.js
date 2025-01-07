import { authService } from "@/services/authServices";
import { useState } from "react";
import { useSelector } from "react-redux";

const useAccount = () => {
  const { profile } = useSelector((store) => store.auth);

  const [dataProvince, setDataProvince] = useState([]);
  const [dataDistrict, setDataDistrict] = useState([]);
  const [dataWard, setDataWard] = useState([]);
  const [idProvince, setIdProvince] = useState("");
  const [isDistrict, setIsDistrict] = useState("");
  const [idWard, setIdWard] = useState("");
  const [nameProvince, setNameProvince] = useState("");
  const [nameDistrict, setNameDistrict] = useState("");

  const [nameWard, setNameWard] = useState("");

  // Get data Province
  const getDataProvince = async () => {
    const res = await authService.getDataProvince();
    try {
      if (res.data) {
        const _dataTemp = res.data.data.provinces.map((e) => {
          return {
            value: e.id,
            label: e.name,
          };
        });
        setDataProvince(_dataTemp);
        if (isGetName) {
          const province = _dataTemp.find(
            (it) => profile?.province == it.value
          )?.label;
        }
      }
    } catch (error) {
      console.log("🚀error---->", error);
    }
  };

  // Get data Province by ID
  const getDataProvinceById = async (id) => {
    const res = await authService.getDataProvinceById(id);
    try {
      if (res?.data) {
        setNameProvince(res?.data?.data?.name);
      }
    } catch (error) {
      console.log("🚀error---->", error);
    }
  };

  // Get data District
  const getDataDistrict = async (id) => {
    const res = await authService.getDataDistrict(id);
    try {
      if (res.data) {
        const _dataTemp = res.data.data.districts.map((e) => {
          return {
            value: e.id,
            label: e.name,
          };
        });
        setDataDistrict(_dataTemp);
      }
    } catch (error) {
      console.log("🚀error---->", error);
    }
  };

  // Get data District by ID
  const getDataDistrictById = async (id) => {
    const res = await authService.getDataDistrictById(id);
    try {
      if (res?.data) {
        setNameDistrict(res?.data?.data?.name);
      }
    } catch (error) {
      console.log("🚀error---->", error);
    }
  };

  // Get data Ward
  const getDataWard = async (id) => {
    const res = await authService.getDataWard(id);
    try {
      if (res.data) {
        const _dataTemp = res.data.data.wards.map((e) => {
          return {
            value: e.id,
            label: e.name,
          };
        });
        setDataWard(_dataTemp);
      }
    } catch (error) {
      console.log("🚀error---->", error);
    }
  };

  // Get data Ward by ID
  const getDataWardById = async (id) => {
    const res = await authService.getDataWardById(id);
    try {
      if (res?.data) {
        setNameWard(res?.data?.data?.name);
      }
    } catch (error) {
      console.log("🚀error---->", error);
    }
  };

  const getFormProps = {
    dataProvince,
    setDataProvince,
    dataDistrict,
    setDataDistrict,
    dataWard,
    setDataWard,
    idProvince,
    setIdProvince,
    isDistrict,
    setIsDistrict,
    idWard,
    setIdWard,
    getDataDistrict,
    getDataWard,
    getDataProvince,
    getDataProvinceById,
    nameProvince,
    getDataDistrictById,
    nameDistrict,
    getDataWardById,
    nameWard,
  };

  return {
    getFormProps,
  };
};

export default useAccount;

// if (isGetName) {
// 	const wards = _dataTemp.find(
// 		(it) => profile?.wards == it.value
// 	)?.label;
// 	console.log("wards---->", wards);
// }
