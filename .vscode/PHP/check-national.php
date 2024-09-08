<?php

// Capture the action from the POST request
$act = $_POST['act'];

// Check if the action is to validate the national code
if ($act == "national_code_val") {

    // Get the national code from the POST request
    $national_code = $_POST['txt_NationalCode'];

    // Prepare the SQL query to check if the national code (stored as username) exists in the users table
    $query = "SELECT `USR_USERNAME` FROM users WHERE `USR_USERNAME` = $national_code";

    // Execute the query to search for the national code in the database
    $execute = executeQuery($query);

    // If the query returns a result, the user is already registered
    if (!empty($execute)) {
        // Send a JSON response indicating that the user is already registered
        die(json_encode(['result' => '404', 'message' => 'کاربر قبلا ثبت نام کرده است']));
    } else {
        // If no result is returned, the user does not exist in the database
// Send a JSON response indicating that the user is not registered
        die(json_encode(['result' => '200', 'message' => 'کاربر موجود نیست']));
    }
}