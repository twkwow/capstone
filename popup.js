
  // Get the elements by their ID
  var popupLink = document.getElementById("popup_tos");
  var popupWindow = document.getElementById("popupwindow_tos");
  var closeButton = document.getElementById("close_button");
  // Show the pop-up window when the link is clicked
  popupLink.addEventListener("click", function(event) {
    event.preventDefault();
    popupWindow.style.display = "block";
  });
  // Hide the pop-up window when the close button is clicked
  closeButton.addEventListener("click", function() {
    popupWindow.style.display = "none";
  });