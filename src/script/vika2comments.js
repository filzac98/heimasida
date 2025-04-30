document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", handleSubmit);

  async function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission

    const name = document.getElementById("name").value;
    const comment = document.getElementById("comment").value;

    // Send the comment data to the new API
    const response = await fetch("/api/vika2comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, comment }),
    });

    if (response.ok) {
      loadComments(); // Reload the comments after submitting
    } else {
      console.error("Failed to submit comment");
    }

    // Clear the form fields
    document.getElementById("name").value = "";
    document.getElementById("comment").value = "";
  }

  // Load and display the comments from the new `vika2` table
  async function loadComments() {
    try {
      const response = await fetch("/api/vika2comments");
      const { comments } = await response.json();

      const commentsContainer = document.getElementById("comments-list");
      commentsContainer.innerHTML = ""; // Clear existing comments

      if (comments && comments.length > 0) {
        comments.forEach((comment) => {
          const commentElement = document.createElement("div");
          commentElement.classList.add("comment");
          commentElement.innerHTML = `
              <strong>${comment.name}</strong>
              <p>${comment.comment}</p>
            `;
          commentsContainer.appendChild(commentElement);
        });
      } else {
        commentsContainer.innerHTML =
          "<p>No comments yet. Be the first to leave one!</p>";
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }

  // Load comments initially when the page is loaded
  loadComments();
});
