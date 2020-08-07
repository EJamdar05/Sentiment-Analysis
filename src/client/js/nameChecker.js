function checkForName(inputText) {
    console.log("::: Running checkForName :::", inputText);
    if (!/^[a-zA-Z]+$/.test(inputText)){
        console.log("User input not good");
        return false;
    }
    else{
        console.log("User input is fine");
        return true;
    }
}

export { checkForName }
