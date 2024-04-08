<!DOCTYPE html>
<html>
<head>
    <title>Peta Penyebaran Gizi</title>
    <style>
        #container {
            height: 500px;
            min-width: 310px;
            max-width: 800px;
            margin: 0 auto;
        }

        .loading {
            margin-top: 10em;
            text-align: center;
            color: gray;
        }

        .highcharts-coloraxis-labels text {
            overflow: visible !important;
            text-overflow: clip !important;
            white-space: nowrap !important;
        }
    </style>
</head>
<body>
<!DOCTYPE html>
<html>
<head>
    <title>Website</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
</head>
<body>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Website</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <a class="nav-link" href="#">Home</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Our Program</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">About Us</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Contact</a>
            </li>
        </ul>
        <a href="user/login" class="btn btn-outline-success my-2 my-sm-0">Masuk</a>
    </div>
</nav>
</body>
<div id="container"></div>

<script src="https://code.highcharts.com/maps/highmaps.js"></script>
<script src="https://code.highcharts.com/maps/modules/exporting.js"></script>
<script>
    (async () => {
        const topology = await fetch(
            'https://code.highcharts.com/mapdata/countries/id/id-all.geo.json'
        ).then(response => response.json());

        const data = [
            ['id-3700', 10], ['id-ac', 11], ['id-jt', 12], ['id-be', 13],
            ['id-bt', 14], ['id-kb', 15], ['id-bb', 16], ['id-ba', 17],
            ['id-ji', 0], ['id-ks', 19], ['id-nt', 20], ['id-se', 21],
            ['id-kr', 22], ['id-ib', 23], ['id-su', 24], ['id-ri', 25],
            ['id-sw', 26], ['id-ku', 27], ['id-la', 28], ['id-sb', 29],
            ['id-ma', 30], ['id-nb', 31], ['id-sg', 32], ['id-st', 33],
            ['id-pa', 34], ['id-jr', 35], ['id-ki', 66], ['id-1024', 37],
            ['id-jk', 38], ['id-go', 39], ['id-yo', 40], ['id-sl', 41],
            ['id-sr', 42], ['id-ja', 43], ['id-kt', 44]
        ];

        Highcharts.mapChart('container', {
            chart: {
                map: topology,
                marginBottom: 80,
                spacingBottom: 40,
                marginRight: 100,
            },

            title: {
                text: 'Peta Penyebaran Gizi di Indonesia'
            },

            subtitle: {
                text: 'Source map: <a href="http://code.highcharts.com/mapdata/countries/id/id-all.topo.json">Indonesia  | by <b>Google Maps</b></a>'
            },

            mapNavigation: {
                enabled: true,
                buttonOptions: {
                    verticalAlign: 'bottom'
                }
            },

            colorAxis: {
                min: 0,
                max: 100,
                maxPadding: 0.2,
                labels: {
                    formatter: function () {
                        return this.value + '%';
                    }
                }
            },

            tooltip: {
                formatter: function () {
                    return this.point.name + ' - ' + this.series.name + ': ' + this.point.value + '%';
                }
            },

            series: [{
                data: data,
                name: 'Gizi',
                states: {
                    hover: {
                        color: '#35e2cf'
                    }
                },
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }],

            credits: {
                enabled: false
            }
        });
    })();
</script>
</body>
</html>