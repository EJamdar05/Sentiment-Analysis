function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value;
    //Client.checkForName(formText)

    console.log("::: Form Submitted :::")

    const postData = async(url= "http://localhost:8001/urlData", data={})=>{
        const response = await fetch(url, {
            method: 'POST', 
            credentials: 'same-origin', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({text:formText}),        
        })
        let apiData = {};
        try{
            apiData = await response.json();
            console.log(apiData);
        }
        catch(error){
            console.log(`Error: ${error}`)
        }
        
    };
    handleSubmit();
}

export { handleSubmit }
