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

// Mengecek email itu valid atau tidak pada form Register

let form = document.querySelector('form') as HTMLFormElement;
form.addEventListener('submit', function(event: Event) {
    let emailInput = document.querySelector('#email') as HTMLInputElement;
    if (!emailInput.validity.valid) {
        emailInput.classList.add('is-invalid');
        event.preventDefault();
    } else {
        emailInput.classList.remove('is-invalid');
    }
});