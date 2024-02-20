var isProfileOpen = false

document.addEventListener("click", (event) => {
    const profileButton = document.getElementById("profileButton");
    const profileDropdown = document.getElementById("profileDropdown");
    // const link = document.querySelector('.fuckerprofile a');
    if (profileButton.contains(event.target)) {
        isProfileOpen = !isProfileOpen
        profileDropdown.style.visibility = isProfileOpen ? 'visible': 'hidden'
    }
    else if (isProfileOpen && !profileDropdown.contains(event.target)) {
        isProfileOpen = false
        profileDropdown.style.visibility = 'hidden'
    }
});