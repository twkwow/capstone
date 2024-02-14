document.addEventListener("click", function(event) {
    var fuckerclickprofile = document.getElementById("fuckerclickprofile");
    var fuckerlink = document.querySelector('.fuckerprofile a');
    if (!fuckerclickprofile.contains(event.target) && event.target !== fuckerlink) {
        window.location.hash = "";
    }
});