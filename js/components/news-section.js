import { GNEWS_API_KEY } from "../../apiKeys.js";

export function initNewsSection() {
  const apiKey = GNEWS_API_KEY;

  const categories = [
    "sports",
    "technology",
    "health",
    "general",
    "business",
    "entertainment",
  ];

  function fetchCategory(index) {
    if (index >= categories.length) return;

    const category = categories[index];
    const url = `https://gnews.io/api/v4/top-headlines?category=${category}&apikey=${apiKey}&lang=en&max=10`;

    $.ajax({
      url,
      method: "GET",
      success: function (data) {
        const articles = data.articles;
        const newsSection = $("#news-section");

        const categoryBlock = $(`
          <div class="category-block">
            <h2>${category.toUpperCase()}</h2>
            <div class="category-news"></div>
          </div>
        `);

        newsSection.append(categoryBlock);

        articles.forEach((article) => {
          const card = $(`
            <div class="news-card">
              <img src="${article.image}" alt="News Image">
              <h3>${article.title}</h3>
              <p>${article.description || "No Description Available"}</p>
              <a href="${article.url}" target="_blank">Read more</a>
            </div>
          `);
          categoryBlock.find(".category-news").append(card);
        });
      },
      complete: function () {
        setTimeout(() => fetchCategory(index + 1), 1000);
      },
      error: function (xhr, status, error) {
        console.error(`Error: ${status} ${error}`);
      },
    });
  }

  fetchCategory(0);

  // Using dummy data for now

  // const dummyData = {
  //   articles: [
  //     {
  //       title: "Dummy News Title 1",
  //       description: "This is a placeholder description for dummy news 1.",
  //       url: "https://example.com/news1",
  //       image: "https://via.placeholder.com/150",
  //     },
  //     {
  //       title: "Dummy News Title 2",
  //       description: "This is a placeholder description for dummy news 2.",
  //       url: "https://example.com/news2",
  //       image: "https://via.placeholder.com/150",
  //     },
  //     {
  //       title: "Dummy News Title 3",
  //       description: "This is a placeholder description for dummy news 3.",
  //       url: "https://example.com/news3",
  //       image: "https://via.placeholder.com/150",
  //     },
  //   ],
  // };

  //   const data = dummyData;

  //   const articles = data.articles;
  //   const newsSection = $("#news-section");

  //   const categoryBlock = $(`
  //     <div class="category-block">
  //       <h2>${category.toUpperCase()}</h2>
  //       <div class="category-news"></div>
  //     </div>
  //   `);

  //   newsSection.append(categoryBlock);

  //   articles.forEach((article) => {
  //     const card = $(`
  //       <div class="news-card">
  //         <img src="${article.image}" alt="News Image">
  //         <h3>${article.title}</h3>
  //         <p>${article.description || "No Description Available"}</p>
  //         <a href="${article.url}" target="_blank">Read more</a>
  //       </div>
  //     `);
  //     categoryBlock.find(".category-news").append(card);
  //   });
}
