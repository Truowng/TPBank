const clearValue = (name) => {
  if (name == "legion") {
    document.querySelector("[list='legion']").value = "";
  }
  if (name == "income-type") {
    document.querySelector("#income-type").value = "Vui lòng chọn";
  }
};

// const focusFn = (name) => {
//   if (name == "legion") {
//     document.querySelector("[list='legion']").focus();
//   }
//   if (name == "income-type") {
//     document.querySelector("#income-type").focus();
//   }
// };
