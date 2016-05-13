<?php
/* This script uses curl to pass arguments to ASPX form pages */
/* Currently only works for Maryland Voter Registration Check */

$md_voterreg_url = "https://voterservices.elections.state.md.us/VoterSearch";

/*$firstname="firstname";
$lastname="lastname";
$birthmonth="01";
$birthday="01";
$birthyear="1901";
$zipcode="20815";*/

$firstname=$_POST["first-name"];
$lastname=$_POST["last-name"];
$birthmonth=$_POST["dob-month"];
$birthday=$_POST["dob-day"];
$birthyear=$_POST["dob-year"];
$zipcode=$_POST["zip"];

echo "Hi ".$firstname." ".$lastname.".";

$cookie_name = "user";
$cookie_value = "John Doe";
setcookie($cookie_name, $cookie_value, time() + (86400 * 30), "/");

function submit_md_form($url,$firstname,$lastname,$birthmonth,$birthyear,$zipcode)
{
    
$ch = curl_init();
$jar = 'my_cookies.txt';
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/4.0 (compatible; Mozilla/5.0 ; Linux i686)' ) ;
curl_setopt($ch, CURLOPT_COOKIEJAR, $jar);
curl_setopt($ch, CURLOPT_COOKIEFILE, $jar);

 

$data = curl_exec($ch);
var_dump(implode('', file($jar)));
    
//each of the fields below is from the MD voter registration form ASPX page

    
//grab the Viewstate value
$content = explode('value="', stristr($data, 'id="__VIEWSTATE"'));
$viewstate = substr($content[1], 0, strpos($content[1], '"'));
var_dump($viewstate);

//grab the Viewstategenerator value
$content = explode('value="', stristr($data, 'id="__VIEWSTATEGENERATOR"'));
$viewstategenerator = substr($content[1], 0, strpos($content[1], '"'));
var_dump($viewstategenerator);
    
//grab the eventtarget value    
$content = explode('value="', stristr($data, 'id="__EVENTTARGET"'));
$eventtarget = substr($content[1], 0, strpos($content[1], '"'));
var_dump($eventtarget);
    
    
//grab the eventargument value
$content = explode('value="', stristr($data, 'id="__EVENTARGUMENT"'));
$eventargument = substr($content[1], 0, strpos($content[1], '"'));
var_dump($eventargument);
    
//grab the viewstateencrypted value    
$content = explode('value="', stristr($data, 'id="__VIEWSTATEENCRYPTED"'));
$viewstateencrypted = substr($content[1], 0, strpos($content[1], '"'));
var_dump($viewstateencrypted);

//grab the eventvalidation value    
$content = explode('value="', stristr($data, 'id="__EVENTVALIDATION"'));
$validation = substr($content[1], 0, strpos($content[1], '"'));
var_dump($validation);
    
$postfields = array(
    "__VIEWSTATE" => rawurlencode($viewstate),
    "__VIEWSTATEGENERATOR" => rawurlencode($viewstategenerator),
    "__EVENTTARGET" => rawurlencode($eventtarget),
    "__EVENTARGUMENT" => rawurlencode($eventargument),
    "__VIEWSTATEENCRYPTED" => rawurlencode($viewstateencrypted),
    "__EVENTVALIDATION" => rawurlencode($validation),
    
    "ctl00%24MainContent%24txtSearchFirstName" => rawurlencode($firstname),
    "ctl00%24MainContent%24txtSearchLastName" => rawurlencode($lastname),
    "ctl00%24MainContent%24txtDOBMonth" => rawurlencode($birthmonth),
    "ctl00%24MainContent%24txtDOBDay" => rawurlencode($birthday),
    "ctl00%24MainContent%24txtDOBYear" => rawurlencode($birthyear),
    "ctl00%24MainContent%24txtSearchZipCode" =>rawurlencode($zipcode),
    "ctl00%24MainContent%24btnSearch" => "Search",
    
   
);
var_dump($postfields);
    
    $p = "";
foreach($postfields as $k=>$v) {
    $p .= $k.'='.$v.'&';
}

    //do the new post
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $p);
$ret = curl_exec($ch);//Get result after login page.

    //this contains 'You have entered an invalid password' so it works as expected.
var_dump($ret);
    
curl_close($ch);

return $data;
}

submit_md_form($md_voterreg_url,$firstname,$lastname,$birthmonth,$birthyear,$zipcode);

?>