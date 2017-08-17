var activities = document.querySelector(".activities"); //assigning the class from "fieldset" html element to a variable
var totalAmount = 0; //will need this variable to calculate the running total of activities


$(document).ready(function() {
    $('form:first *:input[type!=hidden]:first').focus(); //first input element in form not hidden is in focus
}); //jquery function that makes it so the first text field is in focus.

$(document).ready(function() {
    $('#title').change(function() { //use the id of the "select" html element and use change event listener
        $(this).val() == "other" ? $('#other-title').show() : $('#other-title').hide();
    });
});
/*jquery function that uses a ternary conditional. When the value selected is "other", the input element
is inserted into the html that creates the text box..when not selected the function runs the code on the
other side of the colon and hides the text box when other options are selected.*/

$(document).ready(function() {
    $('#design').change(function() { //"change" event listener for tshirt design
        $("#color").val($("#color option:first").val()); //always show first value in the color dropdown
        $("#color").children().hide(); //hide the children elements of the color selection element
        $(this).val() == "js puns" ? $('.jspuns1').show() : $('.heartjs1').show();
    }) //if the selected tshirt design is "jspuns",show the colors assigned the class of .jspuns1. If other, show the colors assigned .heartjs1 class
});

/*add an event listener to the activities with fieldset of classname "".activities. Assign the IDs of the activities to variables.
Assign second IDs to checkboxs that do have conflicting times with other activities (second group) and assign those to variables*/

activities.addEventListener("change", function() {
    totalAmount = 0;
    var main = document.getElementById("all");
    var framework = document.getElementById("framework");
    var libs = document.getElementById("libs");
    var express = document.getElementById("express");
    var node = document.getElementById("node");
    var build = document.getElementById("build");
    var npm = document.getElementById("npm");

    var frameworklabel = document.getElementById("frameworkLabel");
    var libslabel = document.getElementById("libsLabel");
    var expresslabel = document.getElementById("expressLabel");
    var nodelabel = document.getElementById("nodeLabel");

    /* If the user selects a workshop, don't allow selection of a workshop at the same date and time.
    Use totalAmount variable to add the to the running total depending on selection*/

    if (main.checked == true) {
        totalAmount += 200;
    }

    if (build.checked == true) {
        totalAmount += 100;
    }

    if (npm.checked == true) {
        totalAmount += 100;
    }

    if (framework.checked == true) {
        express.disabled = true;
        expresslabel.style.color = "firebrick";
        totalAmount += 100;
    }
    if (express.checked == true) {
        framework.disabled = true;
        frameworklabel.style.color = "firebrick";
        totalAmount += 100;
    }
    if (libs.checked == true) {
        node.disabled = true;
        nodelabel.style.color = "firebrick";
        totalAmount += 100;
    }
    if (node.checked == true) {
        libs.disabled = true;
        libslabel.style.color = "firebrick";
        totalAmount += 100;
    }

    if (framework.checked == false) {
        express.disabled = false;
        expresslabel.style.color = "black";
    }
    if (express.checked == false) {
        framework.disabled = false;
        frameworklabel.style.color = "black";
    }
    if (libs.checked == false) {
        node.disabled = false;
        nodelabel.style.color = "black";
    }
    if (node.checked == false) {
        libs.disabled = false;
        libslabel.style.color = "black";
    }
    var x = "Total: $" + totalAmount;
    document.getElementById("runningtotal").innerHTML = x; //add running total to the innerHTML of the p element
});


payment.options[1].selected = 'selected'; //makes it so Credit Card option is selected by default
$("option[value='select_method']").hide();
$("p:contains('the PayPal option')").hide();
$("p:contains('the Bitcoin option')").hide();


$('#payment').change(function() { //a "change" event listener for the payment options
    let value = $(this).val();
    if (value === 'paypal') {
        $("p:contains('the PayPal option')").show();
        $("p:contains('the Bitcoin option')").hide();
        $("button:contains('Register')").prop({
            disabled: false
        });
        $('#cc-num').prop({
            disabled: true
        });
        $('#credit-card').hide();
    } else if (value === 'bitcoin') {
        $("p:contains('the Bitcoin option')").show();
        $("p:contains('the PayPal option')").hide();
        $('#cc-num').prop({
            disabled: true
        });
        $("button:contains('Register')").prop({
            disabled: false
        });
        $('#credit-card').hide();
    } else {
        $("p:contains('the PayPal option')").hide();
        $("p:contains('the Bitcoin option')").hide();
        $("button:contains('Register')").prop({
            disabled: true
        });
    }
    if (value === 'credit card') {
        $('#cc-num').prop({
            disabled: false
        });
        $('#credit-card').show();
    }
});

//Validates the form and checks to make sure string length is appropriate for credit card, zip, and cvv

document.getElementById("registration_form").onsubmit = function() {

    var nameinput = document.forms["registration_form"]["name"].value;
    var emailinput = document.forms["registration_form"]["mail"].value;
    var ccinput = document.forms["registration_form"]["cc-num"].value;
    var zipinput=document.forms["registration_form"]["zip"].value;
    var cvvinput=document.forms["registration_form"]["cvv"].value;
    var submit = true;

    if (nameinput == null || nameinput == "") {
        nameError = "Please enter your name";
        document.getElementById("name_error").innerHTML = nameError;
        submit = false;
    }

    if (emailinput == null || emailinput == "") {
        emailError = "Please enter your email";
        document.getElementById("email_error").innerHTML = emailError;
        submit = false;
    }

    if (ccinput == null || ccinput == "" || ccinput.length <= 13 || ccinput.length >= 16) {
        ccError = "Please enter a valid credit card number";
        document.getElementById("cc_error").innerHTML = ccError;
        submit = false;
    }
    if (zipinput == null || zipinput == "" || zipinput.length != 5) {
        zipError = "Enter 5 digits";
        document.getElementById("zip_error").innerHTML = zipError;
        submit = false;
    }
    if (cvvinput == null || cvvinput == "" || cvvinput.length !=3) {
        cvvError = "Enter 3 digits";
        document.getElementById("cvv_error").innerHTML = cvvError;
        submit = false;
    }

    return submit;
}

function removeWarning() {
    document.getElementById(this.id + "_error").innerHTML = "";
}

document.getElementById("name").onkeyup = removeWarning;
document.getElementById("mail").onkeyup = removeWarning;

//below function makes it so you must click at least one checkbox to register

$(document).ready(function () {
    $('#checkBtn').click(function() {
      checked = $("input[type=checkbox]:checked").length;

      if(!checked) {
        alert("You must check at least one activity.");
        checkboxError="Please select at least one activity";
        document.getElementById("checkbox_err").innerHTML = checkboxError;
        return false;
      }

    });
});

//below makes it so only numbers can be entered into the credit card,zip code,and cvv fields.

jQuery('.numbersOnly').keyup(function () {
    this.value = this.value.replace(/[^0-9\.]/g,'');
});
