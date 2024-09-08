<?php

// Check if the variable `txt_NationalCode` is null
if (@@txt_NationalCode == null) {

    // Create a new user with the `txt_LNationalCode`, `txt_LPhoneNumber`, and `txt_LNameUser` values
    // PMFCreateUser function is used to create a user, and it returns 1 if successful
    $createLUser = PMFCreateUser(
        @@txt_LNationalCode,
        @@txt_LPhoneNumber,
        @@txt_LNameUser,
        @@txt_LNameUser,
        'jsmith@company.com',
        'PROCESSMAKER_OPERATOR'
    );

    // If the user is successfully created
    if ($createLUser == 1) {
        // Set the username to the national code (`txt_LNationalCode`)
        $username = @@txt_LNationalCode;

        // Get the postal code from the variable `txt_PostCode`
        $postalCode = @@txt_PostCode;

        // Update the `USR_ZIP_CODE` in the `users` table for the newly created user
        $updateQuery = executeQuery("UPDATE `users` SET `USR_ZIP_CODE` = '$postalCode' WHERE `USR_USERNAME`='$username'");
    }

    // If `txt_LNationalCode` is null, it means we are dealing with the original `txt_NationalCode`
} else if (@@txt_LNationalCode == null) {

    // Create a new user with `txt_NationalCode`, `txt_PhoneNumber`, and `txt_NameUser` values
    // PMFCreateUser function is used to create a user, and it returns 1 if successful
    $createUser = PMFCreateUser(
        @@txt_NationalCode,
        @@txt_PhoneNumber,
        @@txt_NameUser,
        @@txt_NameUser,
        'jsmith@company.com',
        'PROCESSMAKER_OPERATOR'
    );

    // If the user is successfully created
    if ($createUser == 1) {
        // Set the username to the national code (`txt_NationalCode`)
        $username = @@txt_NationalCode;

        // Get the postal code from the variable `txt_PostCode`
        $postalCode = @@txt_PostCode;

        // Update the `USR_ZIP_CODE` in the `users` table for the newly created user
        $updateQuery = executeQuery("UPDATE `users` SET `USR_ZIP_CODE` = '$postalCode' WHERE `USR_USERNAME`='$username'");
    }
}
