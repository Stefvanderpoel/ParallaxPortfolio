# Creating a HTML5 - JS - PHP contact form with Spam protection

I want to build a contact form from scratch and without the help of a framework in order to learn the basics of front to backend interactions.

I found this nice tutorial online. I think it is a bit dated but the guy is showing me how it can be done:
http://tangledindesign.com/how-to-create-a-contact-form-using-html5-css3-and-php/

---

## make the form able to mail

The PHP mail() function sends mail in the most simple smpt way possible. As a result the webserver is sending smtp mail and this its IP is not listed in SPF let alone dkim records.

I will probably need a more sofisticated way of sending mail than the php mail() function. Since I am making use of a webservice I willnot be able to install frameworks or extensions.

According to my webhosting service provider it is possible to send mail from the webserver coming the same website domain as the mailadres (the mail adres of the domain).

Followed instructions on how to use the mail function correctly and setup a test
https://www.php.net/manual/en/function.mail.php
This works. Important is the layout of the data that is used in the mail() function. The way this was setup in the tanlgedindesign link was not correct.

```
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
```
---

## Submit form but stay on the same page

When a form is submitted the page is redirected to the action=%phpscript.php% page. It would be nice if the page is not redirected and the user gets feedback on the message delivery on the same site. I will probably have to use AJAX or something similar: https://en.wikipedia.org/wiki/Ajax_%28programming%29

Javascript code option
```
function submitForm() {
    var http = new XMLHttpRequest();
    http.open("POST", "<<whereverTheFormIsGoing>>", true);
    http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    var params = "search=" + <<get search value>>; // probably use document.getElementById(...).value
    http.send(params);
    http.onload = function() {
        alert(http.responseText);
    }
}
```
https://stackoverflow.com/questions/18169933/submit-form-without-reloading-page#18169995





