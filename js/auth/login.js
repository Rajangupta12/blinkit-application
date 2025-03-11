document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email")?.value.trim();
    const password = document.getElementById("password")?.value;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Enter a valid email address!");
        return;
    }

    // Password validation
    if (!password || password.length < 6) {
        alert("Password must be at least 6 characters!");
        return;
    }

    try {
        const response = await fetch("http://localhost:8081/api/v1/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const contentType = response.headers.get("content-type");

        // Handle JSON or plain text error
        const data = contentType && contentType.includes("application/json")
            ? await response.json()
            : await response.text();

        if (response.ok) {
            alert("Login successful!");
            console.log("Token:", data.token);
            localStorage.setItem("authToken", data.token);
            window.location.href = "/index.html"; // Redirect to desired page
        } else {
            alert("Login failed: " + (data.error || data || "Invalid credentials"));
        }
    } catch (error) {
        console.error("Error during login:", error);
        alert("Something went wrong. Please try again later.");
    }
});
