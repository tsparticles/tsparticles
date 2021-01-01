export function searchJSON(searchTerm, url) {
  const resultsContainer = document.getElementById("search-results");
  const expression = new RegExp(searchTerm, "i");

  resultsContainer.innerHTML = "";
  resultsContainer.classList.add("is-active");

  if (searchTerm.length > 0) {
    

    fetch(url)
      .then((resp) => resp.json())
      .then(function (data) {
        console.log(data);
        if (data.length > 0) {
          data.forEach(function (value, index) {
            if ( value.title.search(expression) != -1 || value.content.search(expression) != -1 ) {
              let template = `
                        <a class="search-result">
                            <img class="${
                              value.type === "question" ? "avatar" : "article"
                            }" src="${value.photoUrl}" alt="">
                            <div class="meta">
                                <span>${value.title}</span>
                                <span>${value.content}</span>
                            </div>
                        </a>
                    `;
              console.log(template);
              resultsContainer.innerHTML += template;
            }
          });
          const results = resultsContainer.querySelectorAll(".search-result");
          if (results.length === 0) {
            let placeholder = `
                      <div class="placeholder-wrap">
                          <div class="placeholder-content has-text-centered">
                              <img src="/img/illustrations/no-results.svg" alt="">
                              <h3>No Matching Results</h3>
                              <p>Sorry, we couldn't find any matching records. Please try different search terms.</p>
                          </div>
                      </div>
                  `;

            resultsContainer.innerHTML += placeholder;
          }
        }
      })
      .catch(function (error) {});
  } else {
    resultsContainer.classList.remove("is-active");
  }
}
