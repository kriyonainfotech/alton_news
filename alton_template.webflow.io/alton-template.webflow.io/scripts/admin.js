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
    formData.append("news", newsImage);

    console.log("FormData Entries:");
    for (let [key, value] of formData.entries()) {
        console.log(key, value);
    }

    try {
        const response = await fetch("http://localhost:3000/news/addNews", {
            method: "POST",
            body: formData, 
        });

        // ✅ Check if response is actually JSON
        const text = await response.text();
        console.log("Raw Response:", text);

        const data = JSON.parse(text); // Convert to JSON safely
        if (response.ok) {
            alert("News added successfully!");
            document.getElementById("newsForm").reset();
        } else {
            alert("Error: " + data.error);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
    }
});
