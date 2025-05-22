<?php
parse_str($_POST['userdata'], $userdata);
parse_str($_POST['orderlist'], $orderlist);
foreach($orderlist as $id => $item_data) {
	
$body = '
    Order list:
--------------------------------

Date: '.$item_data['date'].'
Time departure: '.$item_data['timedeparture'].' 
Passangers: '.$item_data['pass'].' 
Duration:'.$item_data['hours'].' hour(s) 
Cost: '.$userdata['total_sum'].' IDR
Type auto: '.$userdata['type_auto'].'
Pick-up location: '.$userdata['pick_up_location_one_way'].'
Drop-off location: '.$userdata['drop_off_location_one_way'].'
Message: '.$userdata['message_ditails'].'

  Customer Information:
----------------------------------

Client: '.$userdata['full_name_client'].'
Tel.: '.$userdata['phone_client'].'
Email: '.$userdata['email_client'].'
		
';


}


   $email_client = $userdata['email_client'];

	$to = "info@amanahtransbali.com, goatmandiri@gmail.com"; 
	$date = date ("d.m.Y"); 
	$time = date ("h:i");
	$from = $email_client;
	$subject = 'Order from "Amanah trans website" from  '.$email_client.' ' .date('d.m.Y');
    
    

	$msg="
    $body"; 	
	mail($to, $subject, $msg,"From: $from ");

    
 
    exit( json_encode($response) );
       
?>