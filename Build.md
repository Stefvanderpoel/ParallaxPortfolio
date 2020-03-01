# Creating a HTML5 - JS - PHP contact form with Spam protection

I want to build a contact form from scratch and without the help of a framework in order to learn the basics of front to backend interactions.

I found this nice tutorial online. I think it is a bit dated but the guy is showing me how it can be done:
http://tangledindesign.com/how-to-create-a-contact-form-using-html5-css3-and-php/

---

## Let the form be able to mail

The PHP mail() function sends enables simple smpt mail sending in PHP scripts. As a result the server on which the php script is hosted is sending the smtp mail. But the webserver is not listed in SPF records let alone setup for dkim and dmarc.

I would like to use a more sofisticated way of sending mail than the php mail() function. But I am making use of a webservice so I will not be able to install frameworks or extensions.

According to my webhosting service provider it is possible to send mail from the webserver coming the same website domain as the mailadres (the mail adres of the domain).

Followed instructions on how to use the mail function correctly and setup a test
https://www.php.net/manual/en/function.mail.php
This works. Important is the layout of the data that is used in the mail() function. The way this was setup in the tanlgedindesign link was not correct.

It should be as follows:

````
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
````

So this works, but it will probably not work everywhere. I am sending an email directly from the webserver which has no SPF or DKIM/DMARC records. When sending mail to another domain than my own, it will most probably be catched by the spamfilter. 

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
The above code comes from a stackoverflow discussion below:
https://stackoverflow.com/questions/18169933/submit-form-without-reloading-page#18169995

There is not much info online about how to acquire this goal without the use of jQuery. Since I want to keep my website as basic as possible, I do not want to use jQuery. The Following link provides info on how to do this as well:
https://stackoverflow.com/questions/21884963/how-to-submit-this-form-using-ajax-without-jquery-but-pure-javascript

After some experimentation I found that none of the above worked. So I had to figure it myself and produced the following Javascript, HTML and PHP code.

HTML:
````
<form class="text-white-75 font-weight-light w-75 m-auto" id="contact" name="contact" method="post" onsubmit="return submitFormAjax(this)" action="/">
            
    <label>Name</label>
    <input class="inputForm" name="name" id="name" placeholder="Type Here">
            
    <label>Email</label>
    <input class="inputForm" name="email" id="email" type="email" placeholder="Type Here">
            
    <label>Message</label>
    <textarea class="inputFormMessage" name="message" id="message" placeholder="Type Here"></textarea>

    <label>*What is 2+2? (Anti-spam)</label>
    <input class="inputForm" name="human" id="human" placeholder="Type Here">
    
    <br/>

    <button class="formSubmitWrapper divButton text-center mt-4 Clickable" name="submit" id="submit" type="submit">
        <i class="fas fa-envelope fa-3x text-primary"></i>
        <p class="text-white-75 font-weight-light">Submit</p>
    </button>

</form>

````

Javascript:
````
function submitFormAjax(contact) {

    // create XMLHttpRequest
    let xmlhttp = new XMLHttpRequest();
    
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert(this.responseText); // Here is the response
        }
    }

    // get input data from form
    let name = contact.name.value;
    let email = contact.email.value;
    let message = contact.message.value;
    let human = contact.human.value;

    xmlhttp.open('POST','submitForm.php',true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send("name=" + name + "&email=" + "&email=" + email + "&message=" + message + "&human=" + human);
}
````

There are 2 problems
1. The page reloads after the form is submmitted. This means my smooth scrolling setup makes the page scroll down to the contact form again (or to whatever #internallink you landed on last)
2. When the mail is send, the reply that the mail is sent is not shown. The responseText arrives too late (sending the mail and receiveing the status by PHP script takes some time). Since AJAX is by defuault asynchronous (javascript continues without an answer from the server) the javascript functions finishes and reloads the page thus not showing the alert anymore. I can fix this by changing JS code for the xmlhttp.open to act synchroniously (to wait for the serverside to answer) but than the page hangs for a little while until the mail is sent. The JS code for this:
````
xmlhttp.open('POST','submitForm.php',false);
````
"People" do not recommend this. The asycnronous nature of AJAX is what makes it so nice. 

Tackling problem 1 might also solve problem 2. So I started looking into this. I found that reloading the page is the default behaviour after a form is submitted. I might be able to prevent this default form submission handling in JS. After some searching and experimentation I found that this is possible. You can "break" the JS function right at the end, after the httprequest is sent to the server. Very simple. The JS code:
````
xmlhttp.open('POST','submitForm.php',true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send("name=" + name + "&email=" + "&email=" + email + "&message=" + message + "&human=" + human);

return false; // makes the page not reload after the form submission
```` 

So now I have a form that mails me and informs the user what's up.


---

## SEO search engine optimization


### SEO optimization

I have added some simple optimizations, but I do not think this is enought. There are wordpress plugins available that do this for you.
https://wordpress.org/plugins/all-in-one-seo-pack/

Todo:Check out what they do and implement.
I did de research and followed steps. Basically telling the search engine to start looking for my website. For this you need accounts for:
- Google: https://search.google.com/search-console
- Yandex: https://webmaster.yandex.com/
- Bingsearch: https://www.bing.com/webmaster
These tools also have diagnistic tools which can help correcting little errors. Keep in mind that it can take some time for the page to be indexed (days). All the corrections (changes) that are made will take some time to be picked up by the search indexing bots.

### Meta tag enhancement

After optimizing the SEO, google showed a search result on my name on the first page. I also saw that the little text snippet shown in the search result was not what I wanted. It returned my very short <meta name="description" content=""> tag and added the name of my background image as well.. I did some research and found out that you can optimize your meta description. There are rules about the length and I tried to follow them:
https://moz.com/learn/seo/meta-description






## Cross Browser testing

I created a free subscription at https://www.lambdatest.com/. I can now, limited by time and test occurences, check the website appearance on several systems. My main concern is the Safari browser on IOS. I do not own a newer version iPhone or Ipad. On a new IOS device of a friend I saw that the Parallax effect was not functioning. The background was moving in the same speed as the foreground layers. 

### IOS Safari

The HTML5 smooth scroll function is not working on all tested versions

#### 12.4

- Looks good










