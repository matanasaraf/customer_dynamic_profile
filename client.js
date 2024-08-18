document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // מונע את ברירת המחדל של שליחת הטופס

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();

        if (result.success) {
            window.location.href = 'main.html'; // מפנה למסך הראשי אם ההתחברות הצליחה
        } else {
            document.getElementById('error-message').innerText = 'Invalid username or password.';
        }
    } catch (error) {
        console.error('Error:', error);
    }
});  