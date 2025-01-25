const commentForm = document.getElementById("commentForm");

// Function to load and display comments from the comments.json file
function loadComments() {
  fetch("/comments.json")
    .then((response) => response.json())
    .then((comments) => {
      const commentsContainer = document.getElementById("comments");
      commentsContainer.innerHTML = ""; // Clear existing comments

      comments.forEach((comment) => {
        const commentElement = document.createElement("div");
        commentElement.innerHTML = `<strong>${comment.name}</strong>: ${comment.text}`;
        commentsContainer.appendChild(commentElement);
      });
    });
}

// Event listener for form submission
commentForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const comment = document.getElementById("comment").value;

  const newComment = { name, text: comment };

  // Append new comment to the comments.json (this part needs server-side logic, like Node.js)
  fetch("/submit-comment", {
    method: "POST",
    body: JSON.stringify(newComment),
    headers: { "Content-Type": "application/json" },
  })
    .then(() => {
      loadComments(); // Refresh the displayed comments after submission
      document.getElementById("name").value = ""; // Clear the input fields
      document.getElementById("comment").value = "";
    })
    .catch((error) => console.error("Error submitting comment:", error));
});

// Load comments when the page loads
loadComments();
