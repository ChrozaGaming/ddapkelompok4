function updateTotalBerat() {
    var beratPanganInputs = document.querySelectorAll('input[name="berat_pangan[]"]');
    var totalBerat = 0;
    for (var i = 0; i < beratPanganInputs.length; i++) {
        totalBerat += Number(beratPanganInputs[i].value);
    }
    document.getElementById('berat').value = totalBerat;
}

document.getElementById('berat_pangan1').addEventListener('input', updateTotalBerat);

var penghitung = 2;

document.getElementById('tambahInput').addEventListener('click', function () {
    var inputTable = document.getElementById('inputTable');
    var newFormGroup = document.createElement('div');
    newFormGroup.className = 'form-group';

    var newLabel = document.createElement('label');
    newLabel.textContent = 'Jenis Pangan ' + penghitung + ':';
    var newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.className = 'form-control';
    newInput.name = 'jenis_pangan[]';
    newFormGroup.appendChild(newLabel);
    newFormGroup.appendChild(newInput);

    var newLabelBerat = document.createElement('label');
    var newInputBerat = document.createElement('input');
    newInputBerat.type = 'number';
    newInputBerat.className = 'form-control';
    newInputBerat.name = 'berat_pangan[]';
    newInputBerat.placeholder = 'Berat per (TON)';
    newInputBerat.addEventListener('keypress', function (e) {
        var char = String.fromCharCode(e.which);
        if (!(/[0-9,]/.test(char))) {
            e.preventDefault();
        }
    });
    newInputBerat.addEventListener('input', updateTotalBerat);

    newFormGroup.appendChild(newLabelBerat);
    newFormGroup.appendChild(newInputBerat);

    inputTable.appendChild(newFormGroup);
    penghitung++;
});

document.getElementById('undoInput').addEventListener('click', function () {
    var inputTable = document.getElementById('inputTable');
    if (inputTable.children.length > 1) {
        inputTable.removeChild(inputTable.lastChild);
        penghitung--;
    }
});

document.getElementById('resetInput').addEventListener('click', function () {
    var confirmation = confirm("Apakah anda yakin untuk mereset row yang sudah anda buat?");
    if (confirmation) {
        var inputTable = document.getElementById('inputTable');
        while (inputTable.children.length > 1) {
            inputTable.removeChild(inputTable.lastChild);
        }
        penghitung = 2;

        // Mengambil semua elemen input
        var inputs = document.querySelectorAll('input');

        // Mengatur ulang nilai input
        for (var i = 0; i < inputs.length; i++) {
            if (!inputs[i].classList.contains('no-reset')) {
                inputs[i].value = '';
            }
        }
    }
});



var inputs = document.querySelectorAll('input');
var submitBtn = document.getElementById('submitBtn');

function checkInputs() {
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].value === '') {
            return false;
        }
    }
    return true;
}

for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('input', function () {
        if (checkInputs()) {
            submitBtn.style.display = 'inline-block';
        } else {
            submitBtn.style.display = 'none';
        }
    });
}

document.getElementById('formPendataan').addEventListener('submit', function (event) {
    if (!checkInputs()) {
        event.preventDefault();
        alert('Harap isi semua kolom input sebelum mengirim.');
    }
});
