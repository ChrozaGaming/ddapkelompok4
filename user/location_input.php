<!DOCTYPE html>
<html>
<head>
    <title>Location Input</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBcqpq8QdjwYc2tnglKoyvpvdZAmEjSxKM&libraries=places"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy" crossorigin="anonymous"></script>
</head>
<body>
<div class="container">
    <div class="row">
        <div class="col-md-6 offset-md-3">
            <h2 class="text-center">Input Lokasi</h2>
            <p class="text-center" style="color: red;">Silakan masukkan lokasi desa Anda dengan akurat. Pastikan bahwa informasi yang diberikan dapat dipertanggungjawabkan.</p>            <div id="map" class="mb-3" style="width: 100%; height: 500px;"></div>

            <label for="neighborhood">Lurah/Desa: </label>
            <span style="user-select: none;">Masukkan nama balai desa saja<br> &ensp;Tidak Perlu menuliskan  <b>Balai Desa</b> lagi!</span>
            <input type="text" class="form-control" id="neighborhood" name="neighborhood" placeholder="Masukkan nama desa">

            <button id="confirmButton" class="btn btn-success mb-3" style="display: none;" onclick="confirmLocation()">Konfirmasi Lokasi</button>
        </div>
    </div>
</div>

<script>
    var map;
    var marker;

    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: -2.548926, lng: 118.0148634},
            zoom: 4
        });

        var input = document.getElementById('neighborhood'); // Changed from 'lurah_desa' to 'neighborhood'
        var autocomplete = new google.maps.places.Autocomplete(input);

        var previousValue = input.value;

        input.addEventListener('focus', function () {
            if (!this.value.startsWith('Balai Desa ')) {
                this.value = 'Balai Desa ' + this.value;
            }
            previousValue = this.value;
        });

        input.addEventListener('input', function () {
            if (!this.value.startsWith('Balai Desa ')) {
                this.value = 'Balai Desa ' + this.value;
            } else if (this.value.startsWith('Balai Desa Balai Desa ')) {
                this.value = this.value.replace('Balai Desa Balai Desa ', 'Balai Desa ');
            }
        });

        input.addEventListener('keydown', function (e) {
            var selectionStart = this.selectionStart;
            if (selectionStart < 'Balai Desa '.length) {
                e.preventDefault();
            }
        });

        autocomplete.addListener('place_changed', function () {
            var place = autocomplete.getPlace();
            if (!place.geometry) {
                window.alert("No details available for input: '" + place.name + "'");
                return;
            }

            // Cek apakah hasil adalah desa
            if (place.types.includes('sublocality_level_1')) {
                console.log("Balai Desa " + place.name);
            } else {
            }

            // Add a marker to the map at the selected place
            if (marker) {
                marker.setPosition(place.geometry.location);
            } else {
                marker = new google.maps.Marker({
                    position: place.geometry.location,
                    map: map
                });
            }

            // Center the map at the selected place
            map.setCenter(place.geometry.location);

            // Show the confirm button
            document.getElementById('confirmButton').style.display = 'block';
        });
    }

    function confirmLocation() {
        if (marker) {
            var latlon = marker.getPosition();
            var balaiDesa = document.getElementById('neighborhood').value; // Changed from 'lurah_desa' to 'neighborhood'

            var xhr = new XMLHttpRequest();
            xhr.open("POST", "update_location.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onload = function () {
                console.log("AJAX request completed with status: " + xhr.status);

                if (xhr.status === 200) {
                    window.location.href = "userdashboard.php";
                } else {
                    console.error("An error occurred: " + xhr.status);
                }
            };
            xhr.send("gps=" + encodeURIComponent(latlon.lat() + ',' + latlon.lng()) + "&balai_desa=" + encodeURIComponent(balaiDesa));
        } else {
            alert('Please search for a location first.');
        }
    }

    window.onload = initMap;
</script>

<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
</body>
</html>