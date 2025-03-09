document.getElementById("resetPasswordForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const tempPassword = document.getElementById("tempPassword").value;
    const newPassword = document.getElementById("newPassword").value;

    const response = await fetch("http://localhost:8081/api/v1/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, tempPassword, newPassword })
    });

    // if (response.ok) {
    //     alert("Password changed successfully. Please login.");
    //     window.location.href = "login.html";
    // } else {
    //     alert("Failed to reset password. Please check your details.");
    // }
});
