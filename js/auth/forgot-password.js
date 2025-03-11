document.getElementById("forgotPasswordForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();

    if (!email) {
        alert("Please enter your email address!");
        return;
    }

    try {
        const response = await fetch(`http://localhost:8081/api/v1/auth/forgot-password?email=${encodeURIComponent(email)}`, {
            method: "POST"
        });

        const data = await response.text();

        if (response.ok) {
            alert("Password reset email has been sent successfully!");
        } else {
            alert(data || "Failed to send password reset email. Please try again.");
        }
    } catch (error) {
        console.error("Error during password reset:", error);
        alert("Something went wrong. Please try again later.");
    }
});
