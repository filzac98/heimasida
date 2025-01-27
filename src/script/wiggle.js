document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");

  setInterval(() => {
    cards.forEach((card) => {
      card.classList.add("wiggle");
      setTimeout(() => {
        card.classList.remove("wiggle");
      }, 500); // Remove the class after 0.5s (duration of the wiggle animation)
    });
  }, 4000); // Wiggle every 4 seconds
});
