
  var popupLink = document.getElementById("popup_tos");
  var popupWindow = document.getElementById("popupwindow_tos");
  
  popupLink.addEventListener("click", function(event) {
    event.preventDefault();
    popupWindow.style.display = "block";
  });

  document.addEventListener("click", function(event) {
    if (!popupWindow.contains(event.target) && event.target !== popupLink) {
      popupWindow.style.display = "none";
    }
  });
