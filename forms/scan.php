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
    
    $metas= $doc->getElementsByTagName('meta');
    
    for ($i = 0; $i < $metas->length; $i++)
    {
        $meta = $metas->item($i);

        
        if ($meta->getAttribute('property')) {echo "Property (".$meta->getAttribute('property')."): ";}
        if ($meta->getAttribute('name')) {echo "Name (".$meta->getAttribute('name')."): ";}
        echo "Content: ".$meta->getAttribute('content')."\n";

    }
}

$row = 1;
if (($handle = fopen("stateurls.csv", "r")) !== FALSE) {
    while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
        $num = count($data);
        $row++;
        for ($c=0; $c < $num; $c++) {
            echo $data[$c] . "\n";
            getdata($data[$c]);
            echo "--\n\n";
        }
    }
    fclose($handle);
}
//getdata("http://www.dc.gov");

?>