// Hide the form with the given ID
var formSettingId = '89851234066ae024175f192093089868';
$('#' + formSettingId).hide();

// Ajax to send national code and postal code
function check_data(txt_NationalCode, txt_PostCode) {
    $.ajax({
        type: "POST",
        url: window.location,
        dataType: "json",
        async: true,
        data: {
            // Send action for national code validation
            act: 'national_code_val',
            txt_NationalCode: txt_NationalCode,
        },
        success: function (data, textStatus, jqXHR) {
            if (data.result == '404') {
                alert("کاربر قبلا ثبت شده"); // User is already registered
            } else if (data.result == '200') {
                $.ajax({
                    type: "POST",
                    url: window.location,
                    dataType: "json",
                    async: true,
                    data: {
                        // Send action for postal code validation
                        act: 'postal_code_val',
                        txt_PostCode: txt_PostCode,
                    },
                    success: function (data, textStatus, jqXHR) {
                        if (data.result == '404') {
                            alert("کد پستی قبلا ثبت شده"); // Postal code already registered
                        } else if (data.result == '200') {
                            $('form').saveForm(); // Save form data
                            $('form').submitForm(); // Submit the form
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        alert('خطا در لود اطلاعات رخ داده است.'); // Error in loading data
                    },
                });
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('خطا در لود اطلاعات رخ داده است.'); // Error in loading data
        },
    });
}

// When option of radio choose one of them show/enable and other hide/disable
$('#rad_PersonCondition').setOnchange(function () {
    if ($('#rad_PersonCondition').getValue() == "1") {
        // Show or hide relevant panels based on person condition
        $('#75894771766a4b3c00598d6017643007').show();
        $('#68485577966a4b499ea6cd1022255899').hide();
        $('#pnl_LPersonCondition').hide();
        $('#pnl_RealCondition').show();

        // Disable validations for legal person and enable for real person
        $('#txt_LNationalCode').disableValidation();
        $('#txt_LPhoneNumber').disableValidation();
        $('#txt_LNameUser').disableValidation();
        $('#txt_NationalCode').enableValidation();
        $('#txt_PhoneNumber').enableValidation();
        $('#txt_NameUser').enableValidation();
    } else if ($('#rad_PersonCondition').getValue() == "2") {
        // Show or hide relevant panels based on legal person condition
        $('#75894771766a4b3c00598d6017643007').hide();
        $('#68485577966a4b499ea6cd1022255899').show();
        $('#pnl_RealCondition').hide();
        $('#pnl_LPersonCondition').show();

        // Disable validations for real person and enable for legal person
        $('#txt_NationalCode').disableValidation();
        $('#txt_PhoneNumber').disableValidation();
        $('#txt_NameUser').disableValidation();
        $('#txt_LNationalCode').enableValidation();
        $('#txt_LPhoneNumber').enableValidation();
        $('#txt_LNameUser').enableValidation();
    }
});

// Toggle real person panel visibility
$('#pnl_RealCondition').click(function () {
    var $panelContent = $('#75894771766a4b3c00598d6017643007');
    $panelContent.slideToggle();
});

// Toggle legal person panel visibility
$('#pnl_LPersonCondition').click(function () {
    var $panelContent = $('#68485577966a4b499ea6cd1022255899');
    $panelContent.slideToggle();
});

// Toggle place info panel visibility
$('#pnl_PlaceInfo').click(function () {
    var $panelContent = $('#53714194166a4d0334e26c8039153069');
    $panelContent.slideToggle();
});

// Check national code all options
function checkMelliCode(meli_code) {
    if (meli_code.length == 10) {
        // Check for invalid national code
        if (['1111111111', '0000000000', '2222222222', '3333333333',
            '4444444444', '5555555555', '6666666666',
            '7777777777', '8888888888', '9999999999'].includes(meli_code)) {
            alert("کد ملی صحیح نمی باشد"); // Invalid national code
            objcode.focus();
            return false;
        }

        // Perform national code checksum validation
        c = parseInt(meli_code.charAt(9));
        n = parseInt(meli_code.charAt(0)) * 10 +
            parseInt(meli_code.charAt(1)) * 9 +
            parseInt(meli_code.charAt(2)) * 8 +
            parseInt(meli_code.charAt(3)) * 7 +
            parseInt(meli_code.charAt(4)) * 6 +
            parseInt(meli_code.charAt(5)) * 5 +
            parseInt(meli_code.charAt(6)) * 4 +
            parseInt(meli_code.charAt(7)) * 3 +
            parseInt(meli_code.charAt(8)) * 2;
        r = n - parseInt(n / 11) * 11;
        if ((r == 0 && r == c) || (r == 1 && c == 1) || (r > 1 && c == 11 - r)) {
            return true; // Valid national code
        } else {
            return false; // Invalid national code
        }
    } else {
        return false; // National code length not valid
    }
}

// Validate phone number
function validatePhoneNumber(phone_num) {
    var regex = new RegExp('(0|98|0098|98)?([ ]|-|[()]){0,2}9[0-9]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}');
    var result = regex.test(phone_num);
    // Return true if phone number is valid
    return result;
}

// Validate home number
function validateHomeNumber(phone_num) {
    var regex = new RegExp('^0\d*');
    var result = regex.test(phone_num);
    // Return true if home number is valid
    return result;
}

// Validate postal code
function validatePostCode(post_num) {
    var regex = new RegExp('^.{10}$');
    var result = regex.test(post_num);
    // Return true if postal code is valid (10 digits)
    return result;
}

//validate home/phone numbers, postal code
$('#btn_Send button').on('click', function () {
    // Get values and validate home/phone numbers, postal code
    var LHomeNumber = $('#txt_LHomeNumber').getValue();
    var HomeNumber = $('#txt_HomeNumber').getValue();
    var isValidLHomeNumber = validateHomeNumber(LHomeNumber);
    var isValidHomeNumber = validateHomeNumber(HomeNumber);
    const nationalCode = $('#txt_NationalCode').getValue();
    var phoneNumber = $('#txt_PhoneNumber').getValue();
    var LphoneNumber = $('#txt_LPhoneNumber').getValue();
    const LnationalCode = $("#txt_LNationalCode").getValue();
    const isValidPhoneNumber = validatePhoneNumber(phoneNumber);
    const isValidLPhoneNumber = validatePhoneNumber(LphoneNumber);
    var PostCode = $('#txt_PostCode').getValue();
    var isValidPostCode = validatePostCode(PostCode);
    // Debugging log for postal code validation
    console.log(isValidPostCode);

    if (isValidPostCode) {
        // Postal code is valid
    } else {
        alert("کد پستی شما صحیح نیست."); // Invalid postal code
    }

    // Real person condition
    if ($('#rad_PersonCondition').getValue() == "1") {
        if (checkMelliCode(nationalCode)) {
            if (isValidPhoneNumber) {
                if (isValidHomeNumber) {
                    check_data(nationalCode, PostCode); // Proceed with data check
                } else {
                    alert("شماره تلفن خانه شما صحیح نیست"); // Invalid home phone number
                }
            } else {
                alert("شماره تلفن شما صحیح نیست"); // Invalid phone number
            }
        } else {
            alert("کد ملی حقیقی اشتباه است"); // Invalid national code
        }
    } // Legal person condition
    else if ($('#rad_PersonCondition').getValue() == "2") {
        if (checkMelliCode(LnationalCode)) {
            if (isValidLPhoneNumber) {
                if (isValidLHomeNumber) {
                    if (send_national_code(LnationalCode)) {
                        $('form').submitForm(); // Save and submit the form
                        $('form').saveForm();
                    } else {
                        alert('کاربر قبلا ثبت نام کرده است!'); // User already registered
                    }
                } else {
                    alert("شماره تلفن خانه شما صحیح نیست"); // Invalid home phone number
                }
            } else {
                alert("شماره تلفن شما صحیح نیست"); // Invalid phone number
            }
        } else {
            alert("کد ملی حقوقی اشتباه است"); // Invalid legal national code
        }
    }
}).addClass("btn-success"); // Add 'success' class to the button