<?php

if(!$_POST['go']) die("0");
$page = $_POST['go'];
if(file_exists('page/'.$page.'.html')){
	echo "REGULATED";
    echo file_get_contents('page/'.$page.'.html');
}else{
    echo 'There is no such page!';
}
?>
