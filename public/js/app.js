/* ==========================
LOGIN
========================== */

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const message = document.getElementById("message");

        message.innerHTML = "Logging in...";

        try {

            const response = await fetch("/login", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })

            });

            const data = await response.json();

            if (data.success) {

                message.innerHTML = "✅ Login successful";

                setTimeout(() => {

                    window.location.href = "dashboard.html";

                }, 1000);

            } else {

                message.innerHTML = "❌ " + data.message;

            }

        } catch (error) {

            message.innerHTML = "Unable to connect to server.";

        }

    });

}

/* ==========================
REGISTER
========================== */

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const message = document.getElementById("message");

        message.innerHTML = "Creating account...";

        try {

            const response = await fetch("/register", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    username,
                    email,
                    password

                })

            });

            const data = await response.json();

            if (data.success) {

                message.innerHTML = "✅ Account created successfully!";

                setTimeout(() => {

                    window.location.href = "login.html";

                }, 1500);

            } else {

                message.innerHTML = "❌ " + data.message;

            }

        } catch (error) {

            message.innerHTML = "Server unavailable.";

        }

    });

}
