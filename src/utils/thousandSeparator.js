export const addCommas = (num) =>
	num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
export const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, "");
