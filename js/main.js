document.addEventListener("DOMContentLoaded", function () {
    const profileIcon = document.getElementById("profileIcon");
    const profileDropdown = document.getElementById("profileDropdown");
    const logoutBtn = document.getElementById("logoutBtn");

    // Toggle Profile Dropdown
    profileIcon.addEventListener("click", () => {
        profileDropdown.style.display = 
            profileDropdown.style.display === "none" || profileDropdown.style.display === ""
            ? "block"
            : "none";
    });

    // Logout Logic
    logoutBtn.addEventListener("click", (event) => {
        event.preventDefault();

        // Clear Auth Token (or Session)
        localStorage.removeItem("authToken");

        // Redirect to Login Page
        alert("You have been logged out successfully.");
        window.location.href = "/pages/auth/login.html";
    });

    // Close dropdown when clicking outside
    window.addEventListener("click", (event) => {
        if (!profileIcon.contains(event.target) && !profileDropdown.contains(event.target)) {
            profileDropdown.style.display = "none";
        }
    });
});
