<?php
function file_get_contents_curl($url)
{
$ch = curl_init();

curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);

$data = curl_exec($ch);
curl_close($ch);

return $data;
}

function getdata($url)
{
    $doc = new DOMDocument();
    $html = file_get_contents_curl($url);
    @$doc->loadHTML($html);
    
    $articles= $doc->getElementsByTagName('article');
    
    $listelementlist= $articles->getElementsByTagName('ul');
    
foreach ($listelementlist->item(0)->getElementsByTagName('li') as $listelement) {
        echo $listelement->nodeValue.'<br />';                    
    }


}

$row = 1;
if (($handle = fopen("statelist_b.csv", "r")) !== FALSE) {
    while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
        $num = count($data);
        $row++;
        for ($c=0; $c < $num; $c++) {
            echo $data[$c+1] . "\n";
            getdata("https://www.usa.gov/state-consumer/".$data[$c]);
            echo "--\n\n";
        }
    }
    fclose($handle);
}
//getdata("https://www.usa.gov/state-government/");

?>