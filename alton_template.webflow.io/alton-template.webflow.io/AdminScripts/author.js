document.getElementById("addNewsForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const about = document.getElementById("about").value;
    const article = document.getElementById("article").value;
    const profileImage = document.getElementById("profileImage").files[0];

    if (!profileImage) {
        alert("Please upload a profile picture");
        return;
    }

    let formData = new FormData();
    formData.append("name", name);
    formData.append("about", about);
    formData.append("article", article);
    formData.append("profileImage", profileImage);

    try {
        const response = await fetch("http://localhost:3000/author/addAuthor", {
            method: "POST",
            body: formData,
        });
        
        const data = await response.json();
        if (response.ok) {
            alert("Author added successfully!");
            fetchAuthors();
            document.getElementById("addNewsForm").reset();
        } else {
            alert("Error: " + data.error);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
    }
});

const fetchAuthors = async () => {
    try {
        const response = await fetch("http://localhost:3000/author/getAllAuthors");
        const data = await response.json();
        console.log(data,"author");
        
        let authorsList = "";
        
        data.authors.map((author) => {
            authorsList += `
                  <div role="listitem" class="w-dyn-item">
                                <a data-w-id="82da54f5-63de-d952-ae24-f000150b6cd1"
                                    href="#"
                                    class="news-link-v3 w-inline-block">
                                    <div class="news-img-v3">
                                        <img alt="" loading="lazy"
                                            style="-webkit-transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-moz-transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-ms-transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)"
                                            src="${author.profilepic}"
                                            sizes="(max-width: 479px) 92vw, (max-width: 767px) 38vw, (max-width: 991px) 34vw, 15vw"
                                            srcset="${author.profilepic} 500w, ${author.profilepic} 824w"
                                            class="news-image" />
                                    </div>
                                    <div class="news-data-v3">
                                    <h5 class="news-title-v4">${author.name}</h5>
                                        <div class="">${author.about}</div>
                                        <p>${author.article}</p>

                                            <div>
                                                <button onclick="deleteNewsItem('${author._id}')">Delete</button>
                                                 <button onclick="openUpdateForm('${author._id}', '${author.name}', '${author.about}', '${author.article}', '${author.profilepic}')">Update</button>
                           
                                                
                                            </div>
                                    </div>
                                   
                                </a>
                            </div>
            `;
        });
        document.getElementById("authorList").innerHTML = authorsList;
    } catch (error) {
        console.error("Error fetching authors:", error);
    }
};
fetchAuthors();

const deleteAuthor = async (authorId) => {
    try {
        const response = await fetch("http://localhost:3000/author/deleteAuthor", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ authorId })
        });
        const data = await response.json();
        if (data.success) {
            alert("Author deleted successfully!");
            fetchAuthors();
        } else {
            alert("Failed to delete author: " + data.message);
        }
    } catch (error) {
        console.error("Error deleting author:", error);
    }
};

function previewImage(event, previewId) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function () {
            const preview = document.getElementById(previewId);
            preview.src = reader.result;
            preview.style.display = "block";
        };
        reader.readAsDataURL(file);
    }
}

function openUpdateForm(authorId, name, about, article, profileImage) {
    document.getElementById("newsForm").style.display = "none";
    document.getElementById("updateForm").style.display = "block";

    document.getElementById("updateNewsId").value = authorId;
    document.getElementById("updatename").value = name;
    document.getElementById("updateabout").value = about;
    document.getElementById("updatearticle").value = article;

    const imagePreview = document.getElementById("updateImagePreview");
    imagePreview.src = profileImage;
    imagePreview.style.display = "block";
}

function closeUpdateForm() {
    document.getElementById("updateForm").style.display = "none";
    document.getElementById("newsForm").style.display = "block";
}

async function submitUpdate() {
    const authorId = document.getElementById("updateNewsId").value;
    const name = document.getElementById("updatename").value;
    const about = document.getElementById("updateabout").value;
    const article = document.getElementById("updatearticle").value;
    const profileImage = document.getElementById("updateprofileImage").files[0];

    let formData = new FormData();
    formData.append("authorId", authorId);
    formData.append("name", name);
    formData.append("about", about);
    formData.append("article", article);
    
    if (profileImage) {
        formData.append("profileImage", profileImage);
    }

    try {
        const response = await fetch("http://localhost:3000/author/updateAuthor", {
            method: "PUT",
            body: formData,
        });
        const data = await response.json();
        if (response.ok) {
            alert("Author updated successfully!");
            fetchAuthors();
            closeUpdateForm();
        } else {
            alert("Error: " + data.message);
        }
    } catch (error) {
        console.error("Error updating author:", error);
    }
}
