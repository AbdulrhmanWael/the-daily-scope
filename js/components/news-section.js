    $(function () {
    const apiKey = '58cd4b9cb7ceb6221c3ce463740d3157';
    const categories = ['sports', 'technology', 'health', 'general', 'business', 'entertainment'];

    categories.forEach(category => {
        const url = `https://gnews.io/api/v4/top-headlines?category=${category}&apikey=${apiKey}&lang=en&max=10`;
        
        $.ajax({
            url: url,
            method: 'GET',
            success: function (data) {
                console.log(data);
                const articles = data.articles;
                const newsSection = $('#news-section');

                const categoryBlock = $(`
                    <div div class = 'category-block' >
                        <h2>${category.toUpperCase()}</h2>
                        <div class = 'category-news'></div>
                        </div>)
                    `);

                newsSection.append(categoryBlock);
                
                articles.forEach(article => {
                    const card = $(`
                    <div class = "news-card">
                    <img src = "${article.image}" alt = "News Image">
                    <h3>${article.title}</h3>
                    <p>${article.description || "No Description Available"}</p>
                    <a href = "${article.url}" target = '_blank'>Read more</a>
                    </div>
                    `);
                    categoryBlock.find('.category-news').append(card);
                })
            },
            error: function (xhr, status, error) {
                console.error(`Error: ${status} ${error}`);
            }
        });
    });
});