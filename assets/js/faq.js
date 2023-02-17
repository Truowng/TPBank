function toggleQuestion() {
  const items = document.querySelectorAll("#faq .faq-item");
  items.forEach((item) => {
    item.addEventListener("click", () => {
      document.querySelector(".faq-item.active").classList.remove("active");
      item.classList.add("active");
    });
  });
}

toggleQuestion();
