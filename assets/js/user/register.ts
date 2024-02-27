document.querySelector("form")!.addEventListener("submit", function(event: Event) {
    var inputs = this.querySelectorAll<HTMLInputElement | HTMLSelectElement>("input[type=text], input[type=password], select");
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].value.trim() === "") {
            alert("Mohon isi seluruh data yang tertera");
            event.preventDefault();
            return false;
        }
    }
});