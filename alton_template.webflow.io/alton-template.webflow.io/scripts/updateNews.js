document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const newsId = urlParams.get("newsId");

    if (newsId) {
        fetch(`http://localhost:3000/news/getNewsById/${newsId}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    document.getElementById("newsId").value = data.news._id;
                    document.getElementById("title").value = data.news.title;
                    document.getElementById("description").value = data.news.description;
                    document.getElementById("newsCategory").value = data.news.newsCategory;
                } else {
                    alert("News not found!");
                    window.location.href = "index.html";
                }
            })
            .catch(error => console.error("Error fetching news:", error));
    }

    document.getElementById("updateForm").addEventListener("submit", function (event) {
        event.preventDefault();

        let formData = new FormData();
        formData.append("newsId", document.getElementById("newsId").value);
        formData.append("title", document.getElementById("title").value);
        formData.append("description", document.getElementById("description").value);
        formData.append("newsCategory", document.getElementById("newsCategory").value);
        let imageFile = document.getElementById("image").files[0];
        if (imageFile) {
            formData.append("news", imageFile);
        }

        fetch("http://localhost:3000/news/updateNews", {
            method: "PUT",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("News updated successfully!");
                window.location.href = "index.html"; // Redirect to the news list page
            } else {
                alert("Error updating news: " + data.message);
            }
        })
        .catch(error => console.error("Error updating news:", error));
    });
});
