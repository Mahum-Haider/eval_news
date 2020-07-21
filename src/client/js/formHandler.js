function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    if (Client.urlValidator(formText)) { //if URL is valid, then fetch from the API and update the UI with the response
    //create an object to be used in the fetch
        let requestBody = {
            url: formText
        };

    Client.checkForName(formText)
    console.log("::: Form Submitted :::")
    
    fetch('http://localhost:8081/api', {
        method: "POST",
        credentials: "same-origin",
        headers: { 
            "Content-Type": "application/json" 
        },
         body: JSON.stringify(requestBody)
    })
    .then(res=> res.json())
    .then(function (res) {
        document.getElementById('polarity').innerHTML = res.polarity
        document.getElementById('subjectivity').innerHTML = res.subjectivity
        document.getElementById('text').innerHTML = res.text
    });
};

export { handleSubmit }






