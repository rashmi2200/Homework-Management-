function saveChanges() {
  // Get values from input fields
  var fullName = document.getElementById("full-name").value;
  var phoneNumber = document.getElementById("phone-number").value;
  var location = document.getElementById("location").value;

  // Check if all fields are filled
  if (fullName && phoneNumber && location) {
    // Show success popup
    alert("Changes saved successfully!");
  } else {
    // Show error message if any field is empty
    alert("Please fill in all fields.");
  }
}
