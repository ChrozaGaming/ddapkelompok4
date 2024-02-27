<?php
require_once __DIR__ . '/vendor/dompdf/dompdf/autoload.inc.php';
use Dompdf\Dompdf;

$email = $_GET['email'];

// Retrieve the HTML
ob_start();
include 'licensekey.php';
$html = ob_get_clean();

// Convert the HTML to PDF
$dompdf = new Dompdf();
$dompdf->loadHtml($html);
$dompdf->render();

// Output the PDF for download
$dompdf->stream($email . '.pdf');
?>