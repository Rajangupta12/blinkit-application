document.addEventListener("DOMContentLoaded", function () {
    // Pre-fill form with demo data
    document.getElementById("name").value = "John Doe";
    document.getElementById("email").value = "johndoe@example.com";
    document.getElementById("password").value = "Test@1234";
});

document.getElementById("registerForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const password = document.getElementById("password")?.value;

    // Email validation (basic regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Enter a valid email address!");
        return;
    }

    // Password validation (minimum 6 characters)
    if (password.length < 6) {
        alert("Password must be at least 6 characters!");
        return;
    }

    try {
        const response = await fetch("http://localhost:8081/api/v1/user/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });

        if (response.ok) {
            alert("User registered successfully!");
            window.location.href = "login.html";
        } else {
            const errorData = await response.json();
            alert("Registration failed: " + (errorData.message || "Unknown error"));
        }
    } catch (error) {
        console.error("Error during registration:", error);
        alert("Something went wrong. Please try again later.");
    }
});
