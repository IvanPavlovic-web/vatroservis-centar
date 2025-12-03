const items = document.querySelectorAll(".faq-item");

items.forEach((item) => {
  const btn = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");

  btn.addEventListener("click", () => {
    if (item.classList.contains("open")) {
      item.classList.remove("open");
      answer.style.maxHeight = null;
      return;
    }

    items.forEach((el) => {
      el.classList.remove("open");
      el.querySelector(".faq-answer").style.maxHeight = null;
    });

    item.classList.add("open");
    answer.style.maxHeight = answer.scrollHeight + "px";
  });
});

const today = new Date();

const year = today.getFullYear();

document.getElementById("current-year").textContent = year;
