document.getElementById("signupForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission

    // Clear previous error messages
    clearErrors();

    // Get form values and trim spaces
    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const role = document.getElementById("role").value;
    const terms = document.getElementById("terms").checked;

    // Validate fields
    let isValid = true;

    if (!fullname) {
        showError("fullname-error", "Full name is required.");
        isValid = false;
    }

    if (!email) {
        showError("email-error", "Email is required.");
        isValid = false;
    } else if (!validateEmail(email)) {
        showError("email-error", "Invalid email format.");
        isValid = false;
    }

    if (!phone) {
        showError("phone-error", "Phone number is required.");
        isValid = false;
    } else if (!validatePhone(phone)) {
        showError("phone-error", "Invalid phone number. It must be a 10-digit number starting with 6-9.");
        isValid = false;
    }

    if (!password) {
        showError("password-error", "Password is required.");
        isValid = false;
    } else if (password.length < 6) {
        showError("password-error", "Password must be at least 6 characters.");
        isValid = false;
    }

    if (!confirmPassword) {
        showError("confirm-password-error", "Please confirm your password.");
        isValid = false;
    } else if (password !== confirmPassword) {
        showError("confirm-password-error", "Passwords do not match.");
        isValid = false;
    }

    if (!role) {
        showError("role-error", "Please select a role.");
        isValid = false;
    }

    if (!terms) {
        showError("terms-error", "You must agree to the terms and conditions.");
        isValid = false;
    }

    if (!isValid) {
        return; // Stop submission if validation fails
    }

    // Prepare data to send
    const data = {
        name: fullname,
        email: email,
        phone: phone,
        password: password,
        role: role,
    };

    const submitButton = document.querySelector(".auth-btn");
    submitButton.disabled = true; // Disable button to prevent multiple clicks

    try {
        const response = await fetch("http://localhost:8081/api/v1/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Add authentication headers if required
                // "Authorization": "Bearer YOUR_TOKEN_HERE",
            },
            body: JSON.stringify(data),
        });

        console.log("Response Status:", response.status); // Debugging

        // Handle 403 Forbidden error
        if (response.status === 403) {
            alert("Access denied. Please check your permissions or contact support.");
            return;
        }

        // Parse response
        const responseText = await response.text();
        let responseData;

        if (responseText) {
            try {
                responseData = JSON.parse(responseText);
            } catch (error) {
                console.error("Failed to parse JSON response:", error);
                responseData = { message: "Invalid server response" };
            }
        } else {
            responseData = { message: "No response from server" };
        }

        // Handle success or failure
        if (response.ok) {
            alert("Signup successful! Redirecting to login page...");
            // Redirect to login page after a short delay
            setTimeout(() => {
                // Ensure the path to login.html is correct
                window.location.href = "/pages/auth/login.html"; // Update this path if needed
            }, 2000); // 2-second delay before redirect
        } else {
            alert(`Signup failed: ${responseData.message || "Please try again."}`);
        }
    } catch (error) {
        console.error("Error during signup:", error);
        alert("An error occurred. Please check your internet connection and try again.");
    } finally {
        submitButton.disabled = false; // Re-enable button
    }
});

// Helper Functions
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.classList.add("visible"); // Show the error message
}

function clearErrors() {
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach((error) => {
        error.textContent = "";
        error.classList.remove("visible"); // Hide the error message
    });
}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function validatePhone(phone) {
    const phonePattern = /^[6-9]\d{9}$/;
    return phonePattern.test(phone);
}