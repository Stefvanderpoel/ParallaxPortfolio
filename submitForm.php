<?php
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    $human = $_POST['human'];

    $to = 'info@stefvanderpoel.nl';
    $from = 'form@stefvanderpoel.nl';
    $subject = 'webform message from ' . $name; 

    $content = 'From: ' . $email . "\r\n" . 'Name: ' . $name . "\r\n" . "\r\n" . 'Message: ' . "\r\n" .$message;

    $body = 'From: ' . $from . "\r\n" . 'Reply-To: ' . $email . "\r\n";
?>

<?php
if ($name != '' && $email != '') {
    if ($human == '4') {				 
        if (mail($to, $subject, $content, $body)) { 
            echo 'Your message has been sent!';
        } 
        else { 
            echo 'Something went wrong, go back and try again'; 
        } 
    } 
    else if ($human != '4') {
        echo 'You answered the anti-spam question incorrectly';
    }
}
else {
    echo 'You need to fill in all required fields';
}

?>