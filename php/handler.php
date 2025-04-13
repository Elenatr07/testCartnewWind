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
$subject = 'Заказ от '.date('d.m.Y').'г.';
// ваш Email
$admin_mail = 'energotr07@yandex.ru';
// Email заказчика (как fallback - ваш же Email)
$to = !empty($userdata['email_client']) ? $userdata['email_client'] : $admin_mail;




// Тело письма
$body = '
<html>
<head>
  <title>'.$subject.'</title>
</head>
<body>
  <p>Информация о заказчике:</p>
	<ul>
		<li><b>Client:</b> '.$userdata['full_name_client'].'</li>
		<li><b>Tel.:</b> '.$userdata['phone_client'].'</li>
		<li><b>Email:</b> '.$userdata['email_client'].'</li>
		<li><b>Pick-up location:</b> '.$userdata['pick_up_location_one_way'].'</li>
		<li><b>Drop-off location:</b> '.$userdata['drop_off_location_one_way'].'</li>
		<li><b>Cost:</b> '.$userdata['total_sum'].' IDR</li>
		<li><b>Message:</b> '.$userdata['message_ditails'].'</li>
		<li><b>Date:</b> '.$item_data['date'].'</li>

	</ul>
	<p>Информация о заказае:</p>

	<p>Письмо создано автоматически. Пожалуйста, не отвечайте на него, т.к. все ушли на пляж!</p>
</body>
</html>';

// Заголовки
$headers   = []; // или $headers = array() для версии ниже 5.4
$headers[] = 'MIME-Version: 1.0'; // Обязательный заголовок
$headers[] = 'Content-type: text/html; charset=utf-8'; // Обязательный заголовок. Кодировку изменить при необходимости
$headers[] = 'From: Best Shop <noreply@best-shop.piva.net>'; // От кого
$headers[] = 'Bcc: Admin <'.$admin_mail.'>'; // скрытая копия админу сайта, т.е. вам
$headers[] = 'X-Mailer: PHP/'.phpversion();
// Отправка
$send_ok = mail($to, $subject, $body, implode("\r\n", $headers));

// Ответ на запрос
$response = [
	'errors' => !$send_ok,
	'message' => $send_ok ? 'Заказ принят в обработку!' : 'Хьюстон! У нас проблемы!'
];
// ! Для версий PHP < 5.4 использовать традиционный синтаксис инициализации массивов:
/*
$response = array (
	'errors' => !$send_ok,
	'message' => $send_ok ? 'Заказ принят в обработку!' : 'Хьюстон! У нас проблемы!'
);
*/
exit( json_encode($response) );