document.getElementById("addNewsForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const categoryName = document.getElementById("categoryName").value;
    const categoryDescription = document.getElementById("categoryDescription").value;
    const iconImage = document.getElementById("iconImage").files[0];

    // if (!iconImage) {
    //     alert("Please select an image");
    //     return;
    // }

    let formData = new FormData();
    formData.append("name", categoryName);
    formData.append("description", categoryDescription);
    formData.append("category", iconImage);

    console.log("FormData Entries:");
    for (let [key, value] of formData.entries()) {
        console.log(key, value);
    }

    try {
        const response = await fetch("http://localhost:3000/category/addCategory", {
            method: "POST",
            body: formData,
        });

        const text = await response.text();
        console.log("Raw Response:", text);

        const data = JSON.parse(text);
        if (response.ok) {
            alert("Category added successfully!");
            fetchNews()
            document.getElementById("addNewsForm").reset();
            document.getElementById("imagePreview").style.display = "none";
        } else {
            alert("Error: " + data.error);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
    }
});

// Function to preview image before upload
function previewImage(event, previewId) {
    const imagePreview = document.getElementById(previewId);
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function () {
            imagePreview.src = reader.result;
            imagePreview.style.display = "block";
        };
        reader.readAsDataURL(file);
    }
}

const fetchNews = async() =>{
    let AllNews = [];
    let tbl = "";
    try {
        const response = await fetch("http://localhost:3000/category/getAllCategories");
        const data = await response.json();
        console.log(data.categories);
        AllNews = data.categories

        if (!Array.isArray(data.categories)) {
            console.error("Invalid data format:", data.categories);
            return;
        }
        AllNews.map((news) => {
            return (
                tbl += `
                   <div role="listitem" class="w-dyn-item">
                                <a data-w-id="82da54f5-63de-d952-ae24-f000150b6cd1"
                                    href="#"
                                    class="news-link-v3 w-inline-block">
                                   
                                    <div class="news-data-v3">
                                    <h5 class="news-title-v4">${news.name}</h5>
                                        
                                        <div class="news-category">${news.description}</div>

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
        document.getElementById("catlist").innerHTML = tbl;

      
  
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}
fetchNews()

const deleteNewsItem = async (newsId) => {
    alert(newsId)
    try {
        const response = await fetch("http://localhost:3000/category/deleteCategory", {
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
