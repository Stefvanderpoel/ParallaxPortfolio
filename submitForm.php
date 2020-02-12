<?php
    $to = 'info@stefvanderpoel.nl';
    $from = 'form@stefvanderpoel.nl'; 
    $subject = 'webForm notification';

    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    
    $human = $_POST['human'];

    $content = 'From: ' . $email . "\r\n" . 'Name: ' . $name . "\r\n" . 'Message: ' . $message;

    $body = 'From: ' . $from . "\r\n";
?>

<?php
    if ($_POST['submit'] && $human == '4') {				 
        if (mail($to, $subject, $content, $body)) { 
	    echo '<p>Your message has been sent!</p>';
        } 
        else { 
	    echo '<p>Something went wrong, go back and try again!</p>'; 
	    } 
    } 
    else if ($_POST['submit'] && $human != '4') {
	echo '<p>You answered the anti-spam question incorrectly!</p>';
    }
?>