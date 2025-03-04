document.getElementById("newsForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const newsCategory = document.getElementById("newsCategory").value;
    const newsImage = document.getElementById("newsImage").files[0];

    if (!newsImage) {
        alert("Please select an image");
        return;
    }

    // ✅ Create FormData correctly
    let formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("newsCategory", newsCategory);
    formData.append("latest", newsImage);

    console.log("FormData Entries:");
    for (let [key, value] of formData.entries()) {
        console.log(key, value);
    }

    try {
        const response = await fetch("http://localhost:3000/latest/addNews", {
            method: "POST",
            body: formData,
        });

        // ✅ Check if response is actually JSON
        const text = await response.text();
        console.log("Raw Response:", text);

        const data = JSON.parse(text); // Convert to JSON safely
        if (response.ok) {
            alert("News added successfully!");
            fetchNews()
            document.getElementById("newsForm").reset();
        } else {
            alert("Error: " + data.error);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
    }
});

const fetchNews = async() =>{
    let AllNews = [];
    let tbl = "";
    try {
        const response = await fetch("http://localhost:3000/latest/getAllNews");
        const data = await response.json();
        console.log(data.news);
        AllNews = data.news

        if (!Array.isArray(data.news)) {
            console.error("Invalid data format:", data.news);
            return;
        }
        AllNews.map((news) => {
            return (
                tbl += `
                   <div role="listitem" class="w-dyn-item">
                                <a data-w-id="82da54f5-63de-d952-ae24-f000150b6cd1"
                                    href="#"
                                    class="news-link-v3 w-inline-block">
                                    <div class="news-img-v3">
                                        <img alt="" loading="lazy"
                                            style="-webkit-transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-moz-transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-ms-transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)"
                                            src="${news.imageUrl}"
                                            sizes="(max-width: 479px) 92vw, (max-width: 767px) 38vw, (max-width: 991px) 34vw, 15vw"
                                            srcset="${news.imageUrl} 500w, ${news.imageUrl} 824w"
                                            class="news-image" />
                                    </div>
                                    <div class="news-data-v3">
                                        <div class="news-category">${news.newsCategory}</div>
                                        <h5 class="news-title-v4">${news.title}</h5>
                                        
                                        <p>${news.description}</p>

                                            <div>
                                                <button onclick="deleteNewsItem('${news._id}')">Delete</button>
                                                 <button onclick="openUpdateForm('${news._id}', '${news.title}', '${news.description}', '${news.newsCategory}', '${news.imageUrl}')">Update</button>
                           
                                                
                                            </div>
                                    </div>
                                   
                                </a>
                            </div>
                    `
            )
    
        })
        document.getElementById("newsList").innerHTML = tbl;

      
  
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}
fetchNews()

const deleteNewsItem = async (newsId) => {
    alert(newsId)
    try {
        const response = await fetch("http://localhost:3000/latest/deleteNews", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ newsId })
        })
        const data = await response.json();
        if (data.success) {
            alert("News deleted successfully!");
            fetchNews(); // Refresh the news list after deletion
        } else {
            alert("Failed to delete news: " + data.message);
        }
    } catch (error) {
        console.error("Error deleting news:", error);
        alert("An error occurred while deleting news.");
    }
};
function previewImage(event, previewId) {
    const file = event.target.files[0]; // Get selected file
    if (file) {
        const reader = new FileReader();

        reader.onload = function () {
            const preview = document.getElementById(previewId);
            preview.src = reader.result; // Set preview image
            preview.style.display = "block"; // Show preview
        };

        reader.readAsDataURL(file); // Convert to Base64
    }
}
function openUpdateForm(newsId, title, description, newsCategory, imageUrl) {
    // Hide Add News Form
    document.getElementById("newsForm").style.display = "none";

    // Show Update Form
    document.getElementById("updateForm").style.display = "block";

    // Fill update form with existing data
    document.getElementById("updateNewsId").value = newsId;
    document.getElementById("updateTitle").value = title;
    document.getElementById("updateDescription").value = description;
    document.getElementById("updateNewsCategory").value = newsCategory;

    // ✅ Show existing image in preview
    const imagePreview = document.getElementById("updateImagePreview");
    imagePreview.src = imageUrl;
    imagePreview.style.display = "block";
}


function closeUpdateForm() {
    // Hide Update Form
    document.getElementById("updateForm").style.display = "none";

    // Show Add News Form
    document.getElementById("newsForm").style.display = "block";
}

async function submitUpdate() {
    const newsId = document.getElementById("updateNewsId").value;
    const title = document.getElementById("updateTitle").value;
    const description = document.getElementById("updateDescription").value;
    const newsCategory = document.getElementById("updateNewsCategory").value;
    const newsImage = document.getElementById("updateImage").files[0];

    let formData = new FormData();
    formData.append("newsId", newsId);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("newsCategory", newsCategory);
    
    if (newsImage) {
        formData.append("latest", newsImage);
    }

    try {
        const response = await fetch("http://localhost:3000/latest/updateNews", {
            method: "PUT",
            body: formData,
        });

        const data = await response.json();
        if (response.ok) {
            alert("News updated successfully!");
            fetchNews(); // Refresh news list
            closeUpdateForm(); // Hide update form
        } else {
            alert("Error: " + data.message);
        }
    } catch (error) {
        console.error("Error updating news:", error);
        alert("Something went wrong. Please try again.");
    }
}

