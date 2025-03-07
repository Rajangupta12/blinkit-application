document.getElementById("forgotPasswordForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;

    const response = await fetch("http://localhost:8080/api/v1/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
    });

    if (response.ok) {
        alert("A temporary password has been sent to your email.");
        window.location.href = "reset-password.html";
    } else {
        alert("Failed to reset password. Please check your email.");
    }
});
