import { DATE_FORMAT } from "@/constants/format-date";
import moment from "moment";

// ---- Format number to display currency ----//
export const formatCurrency = (data, type = "vi-VN") => {
	if (!data) return 0;
	return data.toLocaleString(type);
};

// ---- Format date to display with format ----//
export const formatDate = (date, format = DATE_FORMAT) => {
	if (!!!date) return "";
	return moment(date).format(format);
};

// transform 0 - 1 to percent 100%
export const transformNumberToPercent = (number) => {
	if (!number) return 0;
	return number * 100;
};

// Remove accent
export const removeAccents = (str) => {
	var AccentsMap = [
		"aàảãáạăằẳẵắặâầẩẫấậ",
		"AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
		"dđ",
		"DĐ",
		"eèẻẽéẹêềểễếệ",
		"EÈẺẼÉẸÊỀỂỄẾỆ",
		"iìỉĩíị",
		"IÌỈĨÍỊ",
		"oòỏõóọôồổỗốộơờởỡớợ",
		"OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
		"uùủũúụưừửữứự",
		"UÙỦŨÚỤƯỪỬỮỨỰ",
		"yỳỷỹýỵ",
		"YỲỶỸÝỴ",
	];
	for (var i = 0; i < AccentsMap.length; i++) {
		var re = new RegExp("[" + AccentsMap[i].substr(1) + "]", "g");
		var char = AccentsMap[i][0];
		str = str.replace(re, char);
	}
	return str;
};
export const getImageURL = (data) =>
	`https://cfdshop.hn.ss.bfcplatform.vn/images/product/${data}`;
