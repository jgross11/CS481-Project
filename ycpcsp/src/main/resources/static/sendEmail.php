<?php
if(!isset($message)) {
	require_once("DBController.php");
	$db_handle = new DBController();
	$query = "SELECT * FROM Users where email = '" . $_POST["userEmail"] . "'";
	$count = $db_handle->numRows($query);

	if($count==0) {
		$query = "INSERT INTO Users (user_name, first_name, last_name, password, email, gender) VALUES
		('" . $_POST["userName"] . "', '" . $_POST["firstName"] . "', '" . $_POST["lastName"] . "', '" . md5($_POST["password"]) . "', '" . $_POST["userEmail"] . "', '" . $_POST["gender"] . "')";
		$current_id = $db_handle->insertQuery($query);
		if(!empty($current_id)) {
			$actual_link = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]"."activate.php?id=" . $current_id;
			$toEmail = $_POST["userEmail"];
			$subject = "User Registration Activation Email";
			$content = "Click this link to activate your account. <a href='" . $actual_link . "'>" . $actual_link . "</a>";
			$mailHeaders = "From: Admin\r\n";
			if(mail($toEmail, $subject, $content, $mailHeaders)) {
				$message = "You have registered and the activation mail is sent to your email. Click the activation link to activate you account.";
				$type = "success";
			}
			unset($_POST);
		} else {
			$message = "Problem in registration. Try Again!";
		}
	} else {
		$message = "User Email is already in use.";
		$type = "error";
	}
}
?>