
const backendUrl = "http://localhost:3000"
function fetchHeroLeft() {
    fetch(`${backendUrl}/news/getAllNews`, {
        method: "GET",
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data.news);
            let news = data.news;

            let tbl = "";
            news.slice(0, 2).map((newsItem) => {  // Only map first 2 items
                tbl += `
                <div role="listitem" class="post-item w-dyn-item">
                    <a data-w-id="33c8be8c-3558-2fc1-fc1e-4b807aea3d5f"
                        href="/news/${newsItem.slug || '#'}"
                        class="post-link w-inline-block">
                        <div class="post-img">
                            <img alt="News Image" loading="eager"
                                src="${newsItem.imageUrl || 'https://via.placeholder.com/824'}" 
                                sizes="(max-width: 479px) 92vw, (max-width: 767px) 46vw, (max-width: 991px) 31vw, 19vw"
                                class="news-image" />
                        </div>
                        <div class="post-data">
                            <div class="news-category">${newsItem.newsCategory}</div>
                            <h6 class="post-title">${newsItem.title}</h6>
                        </div>
                    </a>
                </div>
                `;
            });

            document.getElementById("hero-left").innerHTML = tbl;
        })
        .catch((error) => console.error("Error:", error));
}

// Call the function when needed
fetchHeroLeft();
function fetchHeroCenter() {
    fetch(`${backendUrl}/news/getAllNews`, {
        method: "GET",
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data.news, "3rd");
            let news = data.news;

            let tbl = "";
            if (news.length > 2) {  // Ensure index 2 exists
                let newsItem = news[2];  // Get only index 2 (3rd item)

                // Convert 'createdAt' to readable format (January 11, 2024)
                let formattedDate = new Date(newsItem.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                });

                // Calculate reading time (average reading speed = 200 words per minute)
                let wordCount = newsItem.description.split(" ").length;
                let readingTime = Math.ceil(wordCount / 200) || 1; // At least 1 min
                
                // Ensure time format is properly extracted
                let formattedTime = newsItem.time || "N/A"; // If time is missing, show "N/A"

                tbl = `
                <div role="listitem" class="w-dyn-item">
                    <a href="/news/${newsItem.slug || '#'}" class="hero-news-link w-inline-block">
                        <div class="hero-news-img">
                            <img alt="News Image" loading="eager"
                                src="${newsItem.imageUrl || 'https://via.placeholder.com/824'}"
                                class="news-image" />
                        </div>
                        <div class="hero-news-data">
                            <h3 class="hero-title">${newsItem.title}</h3>
                            <p class="hero-news-text">${newsItem.description}</p>
                            <div class="news-date-wrap">
                                <div>${formattedDate}</div>
                               
                                <div class="date-divider"></div>
                                <div>${formattedTime}</div> <!-- Display Time -->
                            </div>
                        </div>
                    </a>
                </div>
                `;
            }

            document.getElementById("hero-center").innerHTML = tbl;
        })
        .catch((error) => console.error("Error:", error));
}

// Call the function when needed
fetchHeroCenter();

function fetchHeroRight() {
    fetch(`${backendUrl}/news/getAllNews`, {
        method: "GET",
    })
        .then((response) => response.json())
        .then((data) => {
           
            let news = data.news.slice(3); 
            console.log(news);
            let tbl = "";
            news.slice(0, 2).map((newsItem) => {  // Only map first 2 items
                let formattedDate = new Date(newsItem.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                });
                tbl += `
               <div role="listitem" class="w-dyn-item">
                                <a data-w-id="ef70b99e-5add-2144-7277-eb50b1d73594"
                                    href="/news/holistic-horizons-navigating-the-intersection-of-physical-mental-and-global-health-trends-2"
                                    class="news-link-v2 w-inline-block">
                                    <div class="news-img-v2"><img alt="News Image" loading="lazy"
                                            style="-webkit-transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-moz-transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-ms-transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)"
                                            src="${newsItem. imageUrl}"
                                            sizes="(max-width: 479px) 37vw, (max-width: 767px) 38vw, (max-width: 991px) 19vw, 11vw"
                                            srcset="https://assets-global.website-files.com/658fab387c2eeaabe2975079/6593cb2a651ff71ad14809a8_health-thumb-03-p-500.jpg 500w, https://assets-global.website-files.com/658fab387c2eeaabe2975079/6593cb2a651ff71ad14809a8_health-thumb-03-p-800.jpg 800w, https://assets-global.website-files.com/658fab387c2eeaabe2975079/6593cb2a651ff71ad14809a8_health-thumb-03.jpg 824w"
                                            class="news-image" /></div>
                                    <div class="news-data-v2">
                                        <div class="news-category">${newsItem.newsCategory}</div>
                                        <h6 class="post-title">${newsItem.title}</h6>
                                        <div class="news-date">${formattedDate}</div>
                                    </div>
                                </a>
                            </div>
                `;
            });

            document.getElementById("hero-right").innerHTML = tbl;
        })
        .catch((error) => console.error("Error:", error));
}
fetchHeroRight();



