function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value;
    let isString = Client.checkForName(formText);
    if (isString == false){
        errorMessage();
    }
    else{
        //Client.checkForName(formText)
        let data={text:formText}
        console.log("::: Form Submitted :::")
        //postData function takes in the server call for data
        //from the API
        postData("http://localhost:8081/urlData",data)
        handleSubmit();
    }
}
const postData = async(url='', data={})=>{
    //basic JSON boiler plate code 
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),         
    })
    //apiData contains the info from the API which was obtained from the server
    let apiData = {};
    try{
        apiData = await response.json();
        console.log(apiData);
        console.log(apiData.confidence);
        //html that shows up once the user submits their string
        //contains the score, confidence, irony and subjectivity
        document.getElementById('results').innerHTML = `<h4>Score Tag Legend</h4>
                                                        <p>-------------------------------------</p>
                                                        <ul>P+: strong positive</ul>
                                                        <ul>P: positive</ul>
                                                        <ul>NEU: neutral</ul>
                                                        <ul>N: negative</ul>
                                                        <ul>N+: strong negative</ul>
                                                        <ul>NONE: without sentiment (cannot determine)</ul>
                                                        <p>-------------------------------------</p>

                                                        <ul>Score Tag: ${apiData.score_tag}</ul>
                                                        <ul>Confidence Score: ${apiData.confidence}</ul>
                                                        <ul>Irony: ${apiData.irony}</ul>
                                                        <ul>Subjectivity: ${apiData.subjectivity}</ul>`;
    }
    catch(error){
        console.log(`Error: ${error}`)
    }
    
};

function errorMessage(){
    document.getElementById('results').innerHTML = `<h2 style = "color: red; font-weight: bold;">ERROR: PLEASE ENTER A SENTENCE WITH NO NUMERICAL NUMBERS
    OR SPECIAL CHARS.`
}
export { handleSubmit } 