const clearValue = (name) => {
  if (name == "legion") {
    document.querySelector("[list='legion']").value = "";
  }
  if (name == "incomeType") {
    document.querySelector("#income-type").value = "Vui lòng chọn";
  }
};
