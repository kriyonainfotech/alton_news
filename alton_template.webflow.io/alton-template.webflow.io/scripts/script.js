
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
                                            src="${newsItem.imageUrl}"
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


// fetch data for Latest section

const latestLeft = async () => {
    let Letesleft = [];
    let tbl = "";
    try {
        const response = await fetch(`${backendUrl}/latest/getAllNews`);
        const data = await response.json();
        console.log(data.news, "letest");
        Letesleft = data.news

        if (!Array.isArray(data.news)) {
            console.error("Invalid data format:", data.news);
            return;
        }
        if (Letesleft.length > 1) {  // Ensure index 0 exists
            let newsItem = Letesleft[0];  // Get only index 0 (3rd item)
            console.log(newsItem, "news1");

            tbl += `
                                <div role="listitem" class="w-dyn-item">
                                    <a data-w-id="b235476d-2e6d-229e-8592-a946b440312b"
                                        href="/news/trailblazers-of-sport-athletes-paving-the-way-for-future-generations"
                                        class="ln-link w-inline-block">
                                        <div class="ln-img-v2">
                                            <img alt="" loading="lazy"
                                                style="-webkit-transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-moz-transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-ms-transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)"
                                                src="${newsItem.imageUrl}"
                                                sizes="(max-width: 479px) 92vw, (max-width: 767px) 95vw, (max-width: 991px) 96vw, 46vw"
                                                srcset="${newsItem.imageUrl} 824w"
                                                class="news-image" />
                                        </div>
                                        <div>
                                            <div class="news-category">${newsItem.newsCategory}</div>
                                            <h3 class="news-title-v2">${newsItem.title}</h3>
                                            <p class="news-subtext">${newsItem.description}</p>
                                        </div>
                                    </a>
                                </div>
                        `



            document.getElementById("latest-Left").innerHTML = tbl;
        }

    } catch (error) {
        console.error("Error fetching news:", error);
    }
}
latestLeft()

const latestRight = async () => {
    let Letesleft = [];
    let tbl = "";
    try {
        const response = await fetch(`${backendUrl}/latest/getAllNews`);
        const data = await response.json();
        console.log(data.news, "letest");
        Letesleft = data.news

        if (!Array.isArray(data.news)) {
            console.error("Invalid data format:", data.news);
            return;
        }
        Letesleft.slice(1, 4).map((news) => {
            return (
                tbl += `
                             <div role="listitem" class="w-dyn-item">
                                <a data-w-id="82da54f5-63de-d952-ae24-f000150b6cd1"
                                    href="/news/a-detailed-exploration-of-memorable-events-and-the-human-spirit-in-athletics"
                                    class="news-link-v3 w-inline-block">
                                    <div class="news-img-v3">
                                        <img alt="" loading="lazy"
                                            style="-webkit-transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-moz-transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-ms-transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)"
                                            src="${news.imageUrl}"
                                            sizes="(max-width: 479px) 92vw, (max-width: 767px) 38vw, (max-width: 991px) 34vw, 15vw"
                                            srcset="${news.imageUrl} 500w,${news.imageUrl} 824w"
                                            class="news-image" />
                                    </div>
                                    <div class="news-data-v3">
                                        <div class="news-category">${news.newsCategory}</div>
                                        <h5 class="news-title-v4">${news.title}</h5>
                                    </div>
                                </a>
                            </div>
                    `
            )

        })
        document.getElementById("latest-Right").innerHTML = tbl;




    } catch (error) {
        console.error("Error fetching news:", error);
    }
}
latestRight()

// fetch podcast section
const podcastLeft = async () => {
    let podcastleft = [];
    let tbl = "";
    try {
        const response = await fetch(`${backendUrl}/podcast/getAllNews`);
        const data = await response.json();
        console.log(data.news, "podcast");
        podcastleft = data.news

        if (!Array.isArray(data.news)) {
            console.error("Invalid data format:", data.news);
            return;
        }
        if (podcastleft.length > 1) {  // Ensure index 0 exists
            let newsItem = podcastleft[0];  // Get only index 0 (3rd item)
            console.log(newsItem, "pod");

            tbl += `
                                <div role="listitem" class="w-dyn-item">
                                    <a data-w-id="c84bd005-1adc-6016-ab1f-4a3a24e8fecb"
                                       href="/podcasts/conversations-on-todays-top-stories-bringing-you-up-to-date-reports"
                                   class="ln-link w-inline-block">
                                        <div class="ln-img-v2">
                                            <img alt="" loading="lazy"
                                                style="-webkit-transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-moz-transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-ms-transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)"
                                                src="${newsItem.imageUrl}"
                                                sizes="(max-width: 479px) 92vw, (max-width: 767px) 95vw, (max-width: 991px) 96vw, 46vw"
                                                srcset="${newsItem.imageUrl} 824w"
                                                class="news-image" />
                                        </div>
                                        <div>
                                            <div class="news-category">${newsItem.newsCategory}</div>
                                            <h3 class="news-title-v2">${newsItem.title}</h3>
                                            <p class="news-subtext">${newsItem.description}</p>
                                        </div>
                                    </a>
                                </div>
                        `



            document.getElementById("podcast-left").innerHTML = tbl;


        }


    } catch (error) {
        console.error("Error fetching news:", error);
    }
}
podcastLeft()

const podcastRight = async () => {
    let podcastRightt = [];
    let tbl = "";
    try {
        const response = await fetch(`${backendUrl}/podcast/getAllNews`);
        const data = await response.json();
        console.log(data.news, "letest");
        podcastRightt = data.news

        if (!Array.isArray(data.news)) {
            console.error("Invalid data format:", data.news);
            return;
        }
        podcastRightt.slice(1, 4).map((news) => {
            return (
                tbl += `
                             <div role="listitem" class="w-dyn-item">
                                <a data-w-id="82da54f5-63de-d952-ae24-f000150b6cd1"
                                    href="/news/a-detailed-exploration-of-memorable-events-and-the-human-spirit-in-athletics"
                                    class="news-link-v3 w-inline-block">
                                    <div class="news-img-v3">
                                        <img alt="" loading="lazy"
                                            style="-webkit-transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-moz-transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-ms-transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)"
                                            src="${news.imageUrl}"
                                            sizes="(max-width: 479px) 92vw, (max-width: 767px) 38vw, (max-width: 991px) 34vw, 15vw"
                                            srcset="${news.imageUrl} 500w,${news.imageUrl} 824w"
                                            class="news-image" />
                                    </div>
                                    <div class="news-data-v3">
                                        <div class="news-category">${news.newsCategory}</div>
                                        <h5 class="news-title-v4">${news.title}</h5>
                                    </div>
                                </a>
                            </div>
                    `
            )

        })
        document.getElementById("podcast-right").innerHTML = tbl;




    } catch (error) {
        console.error("Error fetching news:", error);
    }
}
podcastRight()

// fetch Authors

const fetchAuthors = async () => {
    let Authors = [];
    let tbl = "";
    try {
        const response = await fetch(`${backendUrl}/author/getAllAuthors`);
        const data = await response.json();
        console.log(data.authors, "Authors");
        Authors = data.authors

        if (!Array.isArray(data.authors)) {
            console.error("Invalid data format:", data.authors);
            return;
        }
        Authors.map((auth) => {
            return (
                tbl += `     
                             <div role="listitem" class="author-item-v2 w-dyn-item">
                                <a data-w-id="92d99ee7-3843-b9b8-dc1b-1e448ee53fce" href="/news-authors/wade-warren"
                                    class="author-link-v2 w-inline-block">
                                    <div class="author-img-v2"><img alt="Author Image" loading="lazy"
                                            src="${auth.profilepic}"
                                            class="author-image-v2" /></div>
                                    <div class="author-data-v2">
                                        <div>
                                            <div class="body-small">${auth.name}</div>
                                            <p class="author-text">${auth.about}</p>
                                        </div>
                                        <div class="secondary-btn">
                                            <div>View Articles</div><img
                                                src="https://assets-global.website-files.com/656703e8a0b00cbc0725e176/658fc9ebea40ea08dd22f012_ic-arrow.svg"
                                                loading="lazy"
                                                style="-webkit-transform:translate3d(0px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-moz-transform:translate3d(0px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-ms-transform:translate3d(0px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);transform:translate3d(0px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)"
                                                alt="Arrow Icon" class="btn-arrow" />
                                        </div>
                                    </div>
                                </a>
                            </div>
                            
                    `
            )

        })
        document.getElementById("author-right").innerHTML = tbl;
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}
fetchAuthors()

// fetch  Categories section
const fetchCategory = async () => {
    let AllCat = [];
    let tbl = "";
    try {
        const response = await fetch(`${backendUrl}/category/getAllCategories`);
        const data = await response.json();
        console.log(data.categories, "categories");
        AllCat = data.categories

        if (!Array.isArray(data.categories)) {
            console.error("Invalid data format:", data.categories);
            return;
        }
        AllCat.slice(0, 4).map((cat) => {
            return (
                tbl += `     
                            <div role="listitem" class="category-item-v2 w-dyn-item">
                        <a data-w-id="674ad31b-7f93-e987-69ba-8573ccb4af8e" href="/news-categories/politics"
                            class="category-link-v2 w-inline-block">
                            <div>
                                <div class="category-data">
                                    <h3 class="category-title">${cat.name}</h3>
                                    <p class="category-text">${cat.description}
                                    </p>
                                </div>
                                <div class="secondary-btn">
                                    <div class="link-text">
                                        <div>Go to</div>
                                        <div>${cat.name}</div>
                                    </div><img
                                        src="https://assets-global.website-files.com/656703e8a0b00cbc0725e176/658fc41eea40ea08dd1f5aa1_ic-arrow.svg"
                                        loading="lazy"
                                        style="-webkit-transform:translate3d(0px, 0px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-moz-transform:translate3d(0px, 0px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);-ms-transform:translate3d(0px, 0px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);transform:translate3d(0px, 0px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)"
                                        alt="Arrow Icon" class="btn-arrow" />
                                </div>
                            </div><img alt="Category icon" loading="lazy"
                                src="https://assets-global.website-files.com/658fab387c2eeaabe2975079/65963a1daee00667c94ae67a_ic-politics.svg"
                                class="category-icon" />
                        </a>
                    </div>
                            
                    `
            )

        })
        document.getElementById("category").innerHTML = tbl;
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}
fetchCategory()
const fetchCategoryNav = async () => {
    let AllCat = [];
    let tbl = "";
    try {
        const response = await fetch(`${backendUrl}/category/getAllCategories`);
        const data = await response.json();
        console.log(data.categories, "categories");
        AllCat = data.categories

        if (!Array.isArray(data.categories)) {
            console.error("Invalid data format:", data.categories);
            return;
        }
        AllCat.slice(0, 6).map((cat) => {
            return (
                tbl += `     
                           <div role="listitem" class="w-dyn-item">
                           <a href=/news-categories/science" class="nav-link">${cat.name}</a>
                                </div>
                            
                    `
            )

        })
        document.getElementById("navcat").innerHTML = tbl;
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}
fetchCategoryNav()