async function registerUser() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert("As senhas não coincidem!");
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (response.ok) {
            alert(data.message);
            window.location.href = 'login.html'; // Redireciona para a página de login
        } else {
            alert(data.message || "Erro ao registrar usuário");
        }
    } catch (error) {
        console.error("Erro:", error);
        alert("Erro ao registrar usuário");
    }
}

function redirectToLogin() {
    window.location.href = 'login.html';
}
