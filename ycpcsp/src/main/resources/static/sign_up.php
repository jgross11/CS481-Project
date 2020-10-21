<?php
if (count($_POST) > 0) {
    /* Form Required Field Validation */
    foreach ($_POST as $key => $value) {
        if (empty($_POST[$key])) {
            $message = ucwords($key) . " field is required";
            $type = "error";
            break;
        }
    }
    /* Password Matching Validation */
    if ($_POST['password'] != $_POST['confirm_password']) {
        $message = 'Passwords should be same<br>';
        $type = "error";
    }

    /* Email Validation */
    if (! isset($message)) {
        if (! filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
            $message = "Invalid UserEmail";
            $type = "error";
        }
    }
}
?>