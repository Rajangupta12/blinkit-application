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

            // Decode token and extract role
            const decodedToken = decodeToken(data.token);
            const userRole = decodedToken?.role;

            // Redirect based on role
            switch (userRole) {
                case "ADMIN":
                    window.location.href = "/pages/admin/dashboard.html";
                    break;
                case "USER":
                    window.location.href = "/pages/user/dashboard.html";
                    break;
                case "MERCHANT":
                    window.location.href = "/pages/merchant/dashboard.html";
                    break;
                default:
                    alert("Unknown role. Redirecting to homepage.");
                    window.location.href = "/index.html";
            }
        }
    } catch (error) {
        console.error("Error during login:", error);
        alert("Something went wrong. Please try again later.");
    }
});

// Function to decode JWT
function decodeToken(token) {
    try {
        const payload = JSON.parse(atob(token.split('.')[1])); 
        return payload;
    } catch (error) {
        console.error("Invalid token format:", error);
        return null;
    }
}
