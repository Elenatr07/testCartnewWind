<?php
$discount = 0;
$validPromo = [
	'AAAAA' => 5,
	'BBBBB' => 10,
	'CCCCC' => 15,
];
$promo_code = filter_input(INPUT_POST, 'promo_code', FILTER_SANITIZE_STRING);
$percent = isset($validPromo[$promo_code]) ? $validPromo[$promo_code] : 0;
exit( json_encode($percent) );