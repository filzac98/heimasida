export async function fetchComments() {
  try {
    const res = await fetch("/api/comments");
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
}

export async function loadComments() {
  // Ensure this code runs only in the browser
  if (typeof window === "undefined") return;

  const commentsContainer = document.getElementById("comments-list");
  const comments = await fetchComments();

  if (comments.length > 0) {
    commentsContainer.innerHTML = comments
      .map(
        (comment) => `
      <div class="comment">
        <strong>${comment.name}</strong>
        <p>${comment.comment}</p>
      </div>
    `
      )
      .join("");
  } else {
    commentsContainer.innerHTML =
      "<p>No comments yet. Be the first to write one!</p>";
  }
}

export async function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const name = formData.get("name");
  const comment = formData.get("comment");

  // Posting the comment to Supabase (or your API)
  const res = await fetch("/api/comments", {
    method: "POST",
    body: JSON.stringify({ name, comment }),
    headers: { "Content-Type": "application/json" },
  });

  const result = await res.json();
  if (res.ok) {
    alert("Comment submitted successfully!");
    loadComments(); // Reload comments after submit
  } else {
    alert("Failed to submit comment.");
  }
}

// Ensure loadComments is called only in the browser
if (typeof window !== "undefined") {
  loadComments();
}
