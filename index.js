import reddit from "./redditApi";

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

//form event listener
searchForm.addEventListener("submit", (e) => {
  //get search input value
  const searchTerm = searchInput.value;
  //get const
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;
  //get limit
  const searchLimit = document.getElementById("limit").value;

  //check input
  if (searchTerm === "") {
    //show message
    showMessage("Please add a search term", "alert-danger");
  }
  //clear input
  searchInput.value = "";

  //search reddit
  reddit.search(searchTerm, searchLimit, sortBy).then((results) => {
    console.log(results);
    let output = '<div class="card-columns">';
    //loop through posts
    results.forEach((post) => {
      //check for images
      const image = post.preview
        ? post.preview.images[0].source.url
        : "https://wearesocial-net.s3.amazonaws.com/us/wp-content/uploads/sites/7/2015/07/2A326ECA00000578-3148329-California_based_Reddit_logo_shown_has_fired_an_employee_called_-a-6_1435919411902.jpg";
      output += `
        <div class="card">
            <img src="${image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${post.title}</h5>
                <p class="card-text">${truncateText(post.selftext, 100)}</p>
                <a href="${
                  post.url
                }" target="_blank" class="btn btn-primary">Read More</a>
                <hr>
                <span class="badge badge-secondary">Subreddit: ${
                  post.subreddit
                } </span>
                <span class="badge badge-dark">Score: ${post.score} </span>
            </div>
        </div>
        `;
    });
    output += "</div>";
    document.getElementById("results").innerHTML = output;
  });

  e.preventDefault();
});

//show message
function showMessage(message, className) {
  //create div
  const div = document.createElement("div");
  //add class
  div.className = `alert ${className}`;
  //add text
  div.appendChild(document.createTextNode(message));
  //get parent
  const searchContainer = document.getElementById("search-container");
  //get search
  const search = document.getElementById("search");

  //insert message div
  searchContainer.insertBefore(div, search);

  //time out alert
  setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

//truncate text
function truncateText(text, limit) {
  const shortened = text.indexOf("", limit);
  if (shortened == -1) return text;
  return text.substring(0, shortened);
}
