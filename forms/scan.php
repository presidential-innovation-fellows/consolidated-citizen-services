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
    
       //get RDFs 
    $rdfs= $doc->getElementsByTagName('rdf');
    
    for ($i = 0; $i < $rdfs->length; $i++)
    {
        $rdf = $rdfs->item($i);
        echo "Found RDF! ";
        
        if ($rdf->getAttribute('ID')) {echo "ID = (".$rdf->getAttribute('ID')."): ";}
        if ($rdf->getAttribute('id')) {echo "id = (".$rdf->getAttribute('id')."): ";}
        if ($rdf->getAttribute('Id')) {echo "Id = (".$rdf->getAttribute('Id')."): ";}
        
    
    }
    
           //get XMLS 
    $xmls= $doc->getElementsByTagName('item');
    
    for ($i = 0; $i < $xmls->length; $i++)
    {
        $xml = $xmls->item($i);
        echo "Found xml schema! ";
        
        if ($xml->getAttribute('name')) {echo "XML Name = (".$xml->getAttribute('name')."): ";}
        
    
    }
//get metas    
    $metas= $doc->getElementsByTagName('meta');
    
    //get metas
    for ($i = 0; $i < $metas->length; $i++)
    {
        $meta = $metas->item($i);

        
        if ( strpos($meta->getAttribute('property'),'og:')!==false ) {echo "RDF Found: (".$meta->getAttribute('content')."): ";}
        if ($meta->getAttribute('property')) {echo "Property (".$meta->getAttribute('property')."): ";}
        if ($meta->getAttribute('name')) {echo "Name (".$meta->getAttribute('name')."): ";}
        echo "Content: ".$meta->getAttribute('content')."\n";

    }
    //get divs 
    $divs= $doc->getElementsByTagName('div');
    
    for ($i = 0; $i < $divs->length; $i++)
    {
        $div = $divs->item($i);

        
        if ($div->getAttribute('id') == "google_translate_element") {echo "Google Translate code<div> (".$div->getAttribute('id')."): ";}
        
    
    }
    
        //get spans 
    $spans= $doc->getElementsByTagName('span');
    
    for ($i = 0; $i < $spans->length; $i++)
    {
        $span = $spans->item($i);

        
        if ($span->getAttribute('id') == "google_translate_element") {echo "Google Translate code<span> (".$span->getAttribute('id')."): ";}
        
    
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