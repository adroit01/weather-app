console.log("Client side JavaScript Loaded");

const weatherForm = document.querySelector('form');
const searchInput  = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const hitCount = document.querySelector('#hitCount');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = searchInput.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    hitCount.textContent = '';
    console.log(hitCount.textContent);
    if(!location) {
        messageOne.textContent = "Please enter a valid location";
        return;
    }
    const url = "/weather?location="+location;
    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error){
                console.log(data.error);
                messageOne.textContent = data.error;
            }
            else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.weatherDetail;
                hitCount.textContent = data.hitCount;
            }
        });
    });
});