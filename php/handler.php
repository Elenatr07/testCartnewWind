<?php
parse_str($_POST['orderlist'], $orderlist);
parse_str($_POST['userdata'], $userdata);
/*
$orderlist - массив со списком заказа
$userdata - данные заказчика
*/

// При желании, можно посмотреть полученные данные, записав их в файл:
// file_put_contents('cart_data_log.txt', var_export($orderlist, 1) . "\r\n");
// file_put_contents('cart_data_log.txt', var_export($userdata, 1), FILE_APPEND);


// Заголовок письма
$subject = 'Order from "Amanah trans website" from  <'.$userdata['email_client'].'> ' .date('d.m.Y');
// ваш Email
$admin_mail = 'energotr07@yandex.ru';
$user_mail = $_POST['email_client'];
// Email заказчика (как fallback - ваш же Email)
$to = !empty($userdata['email_client']) ? $userdata['email_client'] : $admin_mail;
foreach($orderlist as $id => $item_data) {
	
	$div = '<div>
		<ul>
			<li><b>Date:</b> '.$item_data['date'].'</li>
			<li><b>Time departure:</b> '.$item_data['timedeparture'].'</li>
			<li><b>Passangers:</b> '.$item_data['pass'].'</li>
			<li><b>Duration:</b> '.$item_data['hours'].' hours</li>
			<li><b>Cost:</b> '.$userdata['total_sum'].' IDR</li>
			<li><b>Type auto:</b> '.$userdata['type_auto'].'</li>
			<li><b>Pick-up location:</b> '.$userdata['pick_up_location_one_way'].'</li>
			<li><b>Drop-off location:</b> '.$userdata['drop_off_location_one_way'].'</li>
			<li><b>Message:</b> '.$userdata['message_ditails'].'</li>

		</ul>
		</div>
		';
}



// Тело письма
$body = '
<html>
<head>
  <title>'.$subject.'</title>
</head>
<body>
  <p>Customer Information:</p>
	<ul>
		<li><b>Client:</b> '.$userdata['full_name_client'].'</li>
		<li><b>Tel.:</b> '.$userdata['phone_client'].'</li>
		<li><b>Email:</b> '.$userdata['email_client'].'</li>
		
		
		
		

	</ul>
	<p>Order information:</p>
	'.$div.'
	
</body>
</html>';

// Заголовки
$headers   = []; // или $headers = array() для версии ниже 5.4
$headers[] = 'MIME-Version: 1.0'; // Обязательный заголовок
$headers[] = 'Content-type: text/html; charset=utf-8'; // Обязательный заголовок. Кодировку изменить при необходимости
$headers[] = 'From: order cars'; // От кого
$headers[] = 'Bcc: Admin <'.$admin_mail.'>'; // скрытая копия админу сайта, т.е. вам
$headers[] = 'X-Mailer: PHP/'.phpversion();
// Отправка
$send_ok = mail($to, $subject, $body, implode("\r\n", $headers));

// Ответ на запрос
/*$response = [
	'errors' => !$send_ok,
	'message' => $send_ok ? 'Заказ принят в обработку!' : 'Хьюстон! У нас проблемы!'
];*/
// ! Для версий PHP < 5.4 использовать традиционный синтаксис инициализации массивов:

$response = array (
	'errors' => !$send_ok,
	'message' => $send_ok ? 'Заказ принят в обработку!' : 'Хьюстон! У нас проблемы!'
);

exit( json_encode($response) );