function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value

    Client.checkForName(formText)
    console.log("::: Form Submitted :::")
    
    fetch('http://localhost:8081/api', {
        method: "POST",
        credentials: "same-origin",
        headers: { 
            "Content-Type": "application/json" 
        },
         body: JSON.stringify({input:formUrl})
    })
    .then(res=> res.json())
    .then(function (res) {
        document.getElementById('polarity').innerHTML = res.polarity
        document.getElementById('subjectivity').innerHTML = res.subjectivity
        document.getElementById('text').innerHTML = res.text
    });

export { handleSubmit }






