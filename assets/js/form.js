const clearValue = (name) => {
  if (name == "legion") {
    document.querySelector("[list='legion']").value = "";
  }
  if (name == "income-type") {
    document.querySelector("#income-type").value = "Vui lòng chọn";
  }
};
