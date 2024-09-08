<?php

// Capture the action from the POST request
$act = $_POST['act'];

// Check if the action is to validate the postal code
if ($act == "postal_code_val") {

    // Get the postal code from the POST request
    $txt_PostCode = $_POST['txt_PostCode'];

    // Prepare the SQL query to check if the postal code exists in the users table
    $query = "SELECT `USR_ZIP_CODE` 
    FROM users 
    WHERE `USR_ZIP_CODE` = $txt_PostCode";

    // Execute the query to search for the postal code in the database
    $execute = executeQuery($query);

    // If the query returns a result, the postal code exists
    if (!empty($execute)) {
        // Send a JSON response indicating that the postal code already exists
        die(json_encode(['result' => '404', 'message' => 'کد پستی موجود است']));
    } else {
        // If no result is returned, the postal code does not exist
        // Send a JSON response indicating that the postal code is not found
        die(json_encode(['result' => '200', 'message' => 'کد پستی موجود نیست']));
    }
}
