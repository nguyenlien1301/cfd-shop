import { authService } from "@/services/authServices";
import useQuery from "./useQuery";
import { useState } from "react";

const useAddress = (defaultValue) => {
	const [provinceId, setProvinceId] = useState(defaultValue?.provinceId);
	const [districtId, setDistrictId] = useState(defaultValue?.districtId);
	const [wardId, setWardId] = useState(defaultValue?.wardId);

	const { data: provinceData } = useQuery(authService.getDataProvince);

	const { data: districtData } = useQuery(
		() => provinceId && authService.getDataDistrict(provinceId),
		[provinceId]
	);

	const { data: wardData } = useQuery(() => {
		return districtId && authService.getDataWard(districtId);
	}, [districtId]);

	const handleProvinceChange = (changedId) => {
		setProvinceId(changedId);
		setDistrictId(undefined);
		setWardId(undefined);
	};
	const handleDistrictChange = (changedId) => {
		setDistrictId(changedId);
		setWardId(undefined);
	};
	const handleWardChange = (changedId) => {
		setWardId(changedId);
	};


	return {
		provinces:
			provinceData?.provinces?.map((item) => {
				return {
					value: item.id,
					label: item.name,
				};
			}) || [],
		districts:
			districtData?.districts?.map((item) => {
				return {
					value: item.id,
					label: item.name,
				};
			}) || [],
		wards:
			wardData?.wards?.map((item) => {
				return {
					value: item.id,
					label: item.name,
				};
			}) || [],
		provinceId,
		districtId,
		wardId,
		handleProvinceChange,
		handleDistrictChange,
		handleWardChange,
	};
};

export default useAddress;
