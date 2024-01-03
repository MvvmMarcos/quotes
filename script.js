const URLAPI = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';

const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const newQuoteBtn = document.querySelector("#new-quote");
const loader = document.querySelector("#loader");

let apiQuotes = [];
//show loading
function loading(){
    loader.hidden = false
    quoteContainer.hidden = true;
}
//Hide loading
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}
//Show New Quote
function newQuote(){
    loading();
    //Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //check if Author field is blank and replace it with 'Unknown'
    if(!quote.author){
        authorText.textContent = "Unknown";
    }else{
        authorText.textContent = quote.author;
    }
    //check quote length to determine styling
    if(quote.text.length > 120){
        quoteText.classList.add('long-quote')
    }else{
        quoteText.classList.remove('long-quote')
    }
    //set quote, hide loader
    quoteText.textContent = quote.text;
    complete();
    // console.log(quote)
}
//Get quotes from API
async function getQuotes(){
    loading();
    // const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    
    const apiUrl = URLAPI;
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        // console.log(apiQuotes)
        newQuote();
    } catch (error) {
        //Catch Error Here
        console.log(error)
    }
}
//Tweet Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank')
}
//Event Listeners
twitterBtn.addEventListener("click", tweetQuote);
newQuoteBtn.addEventListener("click", newQuote);

// On load
getQuotes();


// newQuoteBtn.addEventListener("click",()=>{
//     quoteText.textContent = "";
//     authorText.textContent = "";
//     newQuote()
// })