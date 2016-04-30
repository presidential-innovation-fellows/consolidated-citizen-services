<?php
$cookie_name = "user";
$cookie_value = "John Doe";
setcookie($cookie_name, $cookie_value, time() + (86400 * 30), "/");

function submit_form($url)
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

//curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);    

$data = curl_exec($ch);
var_dump(implode('', file($jar)));
    
$content = explode('value="', stristr($data, 'id="__VIEWSTATE"'));
$viewstate = substr($content[1], 0, strpos($content[1], '"'));
var_dump($viewstate);
    
$content = explode('value="', stristr($data, 'id="__VIEWSTATEGENERATOR"'));
$viewstategenerator = substr($content[1], 0, strpos($content[1], '"'));
var_dump($viewstategenerator);
    
$content = explode('value="', stristr($data, 'id="__EVENTTARGET"'));
$eventtarget = substr($content[1], 0, strpos($content[1], '"'));
var_dump($eventtarget);

$content = explode('value="', stristr($data, 'id="__EVENTARGUMENT"'));
$eventargument = substr($content[1], 0, strpos($content[1], '"'));
var_dump($eventargument);
    
$content = explode('value="', stristr($data, 'id="__VIEWSTATEENCRYPTED"'));
$viewstateencrypted = substr($content[1], 0, strpos($content[1], '"'));
var_dump($viewstateencrypted);
    
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
    
    "ctl00%24MainContent%24txtSearchFirstName" => "Olivier",
    "ctl00%24MainContent%24txtSearchLastName" => "Kamanda",
    "ctl00%24MainContent%24txtDOBMonth" => "07",
    "ctl00%24MainContent%24txtDOBDay" => "19",
    "ctl00%24MainContent%24txtDOBYear" => "1981",
    "ctl00%24MainContent%24txtSearchZipCode" => "20815",
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
submit_form("https://voterservices.elections.state.md.us/VoterSearch");
?>