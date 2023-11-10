const container = document.getElementById('chart');
async function getData() {
    try {
        return fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
            .then(async (response) => await response.json())
    } catch(e) {
        return e;
    }
}
(async function(){
    let dataset = await getData();
    
})();