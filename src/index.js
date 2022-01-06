import Notiflix from 'notiflix';

const form = document.querySelector(".search-form");
const input = document.querySelector(".search-input");
const imagesList = document.querySelector(".gallery");
const loadmoreBTN = document.querySelector(".load-more");
let page = 1;


form.addEventListener("submit", evt => {
    evt.preventDefault();
    
    try{
        imagesList.innerHTML = "";
        page = 1;
        loadmoreBTN.hidden = true;

        imageFetcher(input.value);
    } catch (error){
        console.log(error);
    }
})

loadmoreBTN.addEventListener("click", evt => {
    evt.preventDefault();
    
    try{
        imageFetcher(input.value);
    } catch (error){
        console.log(error);
    }
})


async function imageFetcher(value){

    const response = await fetch(`https://pixabay.com/api/?key=24802256-ad66129038acba5a8b956a80c&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`);
    const images = await response.json();

    if(images.totalHits === 0){
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        loadmoreBTN.hidden = true;
        return;
    }

    imageRender(images.hits);
    page += 1;

    if(images.totalHits > 40){
        loadmoreBTN.hidden = false;
    }

    if(images.hits.length < 40){
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
        loadmoreBTN.hidden = true;
    } 
    
}

function imageRender(imagesArray){

    imagesArray.map(image => {
        imagesList.insertAdjacentHTML("beforeend", 
        `<div class="photo-card">
            <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" width=100% height=230 />
            <div class="info">
                <p class="info-item">
                <b>Likes<br /> ${image.likes}</b>
                </p>
                <p class="info-item">
                <b>Views<br /> ${image.views}</b>
                </p>
                <p class="info-item">
                <b>Comments<br /> ${image.comments}</b>
                </p>
                <p class="info-item">
                <b>Downloads <br /> ${image.downloads}</b>
                </p>
            </div>
        </div>`);
    });

}

