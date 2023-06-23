const API = "4745b70131fb4690961e2a296544717f";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load' , () => fetchdata("GLOBAL"));

async function fetchdata(query){
    const res = await fetch(`${url}${query}&apiKey=${API}`);
    const data = await res.json();
    console.log(data);
    binddata(data.articles);
}

function binddata(articles){
    const container  = document.getElementById("card_container");
    const newsCard = document.getElementById("news-card");

    card_container.innerHTML = " ";

    articles.forEach(article => {
        if(!article.urlToImage) return;
        else{
            //clonecard
            const cardclone = newsCard.content.cloneNode(true);
            filldata(cardclone,article);
            container.appendChild(cardclone)
        }
    });
    
    function filldata(cardclone,article){
        const image = cardclone.querySelector('#news-image');
    const title = cardclone.querySelector('#news-heading');
    const channel_name = cardclone.querySelector('#channel-name');
    const news_desc = cardclone.querySelector('#news-desc');

    image.src = article.urlToImage;
    title.innerHTML = article.title;
    channel_name.innerHTML = article.source.name + " " + new Date(article.publishedAt).toLocaleString("en-US" , { timeZone: "Asia/Jakarta"});
    news_desc.innerHTML  = article.description;
    cardclone.firstElementChild.addEventListener('click', () =>{
        window.open(article.url, '_blank');
    });
    }
}
let active_item=null;
let previous_active=null;
function navitem_search(search_item){
    active_item=search_item;
    fetchdata(search_item);
    document.getElementById(active_item).classList.add('active');
    if(previous_active != null)
    document.getElementById(previous_active).classList.remove('active');
    previous_active=active_item;
    }
let findx = document.getElementById('find');
let buttonx= document.getElementById("searchpart");
 console.log(buttonx);
 console.log(findx);
 
 buttonx.addEventListener("click", () => {
    const item = findx.value;
    console.log(item);
    if(item == null) return;
    fetchdata(item);
    document.getElementById(previous_active).classList.remove('active');
    
 })
 findx.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      buttonx.click(); // Trigger the button click event
    }
  });
 function reload(){
    window.location.reload();
 }