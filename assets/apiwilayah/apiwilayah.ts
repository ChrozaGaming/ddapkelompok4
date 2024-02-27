let urlProvinsi: string = "https://ibnux.github.io/data-indonesia/provinsi.json";
let urlKabupaten: string = "https://ibnux.github.io/data-indonesia/kabupaten/";
let urlKecamatan: string = "https://ibnux.github.io/data-indonesia/kecamatan/";
let urlKelurahan: string = "https://ibnux.github.io/data-indonesia/kelurahan/";

function clearOptions(id: string) {
    console.log("on clearOptions :" + id);

    $('#' + id).empty().trigger('change');
}

console.log('Load Provinsi...');
$.getJSON(urlProvinsi, function (res: any) {

    res = $.map(res, function (obj: any) {
        obj.text = obj.nama
        return obj;
    });

    let data = [{
        id: "",
        nama: "- Pilih Provinsi -",
        text: "- Pilih Provinsi -"
    }].concat(res);

    $("#select2-provinsi").select2({
        dropdownAutoWidth: true,
        width: '100%',
        data: data
    })
});

let selectProv = $('#select2-provinsi');
$(selectProv).change(function () {
    let value = $(selectProv).val();
    clearOptions('select2-kabupaten');

    if (value) {
        console.log("on change selectProv");

        let text = $('#select2-provinsi :selected').text();
        console.log("value = " + value + " / " + "text = " + text);

        console.log('Load Kabupaten di ' + text + '...')
        $.getJSON(urlKabupaten + value + ".json", function (res: any) {

            res = $.map(res, function (obj: any) {
                obj.text = obj.nama
                return obj;
            });

            let data = [{
                id: "",
                nama: "- Pilih Kabupaten -",
                text: "- Pilih Kabupaten -"
            }].concat(res);

            $("#select2-kabupaten").select2({
                dropdownAutoWidth: true,
                width: '100%',
                data: data
            });

        })
    }
});

let selectKab = $('#select2-kabupaten');
$(selectKab).change(function () {
    let value = $(selectKab).val();
    clearOptions('select2-kecamatan');

    if (value) {
        console.log("on change selectKab");

        let text = $('#select2-kabupaten :selected').text();
        console.log("value = " + value + " / " + "text = " + text);

        console.log('Load Kecamatan di ' + text + '...')
        $.getJSON(urlKecamatan + value + ".json", function (res: any) {

            res = $.map(res, function (obj: any) {
                obj.text = obj.nama
                return obj;
            });

            let data = [{
                id: "",
                nama: "- Pilih Kecamatan -",
                text: "- Pilih Kecamatan -"
            }].concat(res);

            $("#select2-kecamatan").select2({
                dropdownAutoWidth: true,
                width: '100%',
                data: data
            });
        })
    }
});

let selectKec = $('#select2-kecamatan');
$(selectKec).change(function () {
    let value = $(selectKec).val();
    clearOptions('select2-kelurahan');

    if (value) {
        console.log("on change selectKec");

        let text = $('#select2-kecamatan :selected').text();
        console.log("value = " + value + " / " + "text = " + text);

        console.log('Load Kelurahan di ' + text + '...')
        $.getJSON(urlKelurahan + value + ".json", function (res: any) {

            res = $.map(res, function (obj: any) {
                obj.text = obj.nama
                return obj;
            });

            let data = [{
                id: "",
                nama: "- Pilih Kelurahan -",
                text: "- Pilih Kelurahan -"
            }].concat(res);

            $("#select2-kelurahan").select2({
                dropdownAutoWidth: true,
                width: '100%',
                data: data
            });
        })
    }
});

let selectKel = $('#select2-kelurahan');
$(selectKel).change(function () {
    let value = $(selectKel).val();

    if (value) {
        console.log("on change selectKel");

        let text = $('#select2-kelurahan :selected').text();
        console.log("value = " + value + " / " + "text = " + text);
    }
});