<?php
    $to = 'info@myexampledomain.com';
    $from = 'form@myexampledomain.nl'; 
    $message = 'Blablabla';
    $subject = 'Hello';

    $body = 'From: ' . $from . "\r\n";
?>

<?php
mail($to, $subject, $message, $body);
?>