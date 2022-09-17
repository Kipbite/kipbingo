<div class="container">
    <div>
        <form id="password-form" class="submit-form">
            <input type="password" id="password" placeholder="what's da password">
            <button id="submit"><img src="https://kipbite-assets.fra1.digitaloceanspaces.com/pog.png" class="pog"></button>
        </form>
    </div>
</div>

<script>
    const passwordForm = document.getElementById('password-form');
    const passwordInput = document.getElementById('password');
    passwordForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let password = passwordInput.value;
        fetch(`/password-check.php?password=${password}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        })
            .then((response) => response.text())
            .then((response) => {
                if (response == 'success') {
                    document.cookie = `logged_in=${password}; path=/;`;
                    window.location = "";
                } else {
                    passwordInput.value = "";
                    passwordInput.placeholder = "dat's not da password";
                }
            })
    })
</script>