document.addEventListener("DOMContentLoaded", function () {
    // Pre-fill form with demo data
    document.getElementById("name").value = "kartik";
    document.getElementById("email").value = "kartik@gmail.com";
    document.getElementById("phone").value = "8595664069";
    document.getElementById("password").value = "kartik@1234";
});

document.getElementById("signupForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:8080/api/v1/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password, role: "USER" })
    });

    if (response.ok) {
        alert("Signup successful! Please login.");
        window.location.href = "login.html";
    } else {
        alert("Signup failed. Try again.");
    }
});
