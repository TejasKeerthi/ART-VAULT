document.addEventListener('DOMContentLoaded', () => {

    // --- PASTE YOUR FIREBASE CONFIG OBJECT HERE ---
    const firebaseConfig = {
    apiKey: "AIzaSyBp0WZ3oXBAXBV2cuCs75mBS3mpuMq6JSM",
    authDomain: "art-vault-a2426.firebaseapp.com",
    projectId: "art-vault-a2426",
    storageBucket: "art-vault-a2426.firebasestorage.app",
    messagingSenderId: "723439133209",
    appId: "1:723439133209:web:d13517961c82690cd84088",
    measurementId: "G-BP36J0KZZX"
  };


    // --- Initialize Firebase ---
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    
    // --- Form elements ---
    const loginForm = document.getElementById('login-form');
    const nameFieldContainer = document.getElementById('name-field-container');
    const roleFieldContainer = document.getElementById('role-field-container');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const nameInput = document.getElementById('name');
    const roleInput = document.getElementById('role');
    const submitBtn = document.getElementById('submit-btn');
    const errorMessage = document.getElementById('error-message');
    
    // Toggling elements
    const toggleModeBtn = document.getElementById('toggle-mode-btn');
    const togglePrompt = document.getElementById('toggle-prompt');
    const formSubtitle = document.getElementById('form-subtitle');

    // OAuth buttons
    const googleLoginBtn = document.getElementById('google-login-btn');

    // Function to show errors
    function showError(message) {
        errorMessage.textContent = message;
    }

    // Function to handle successful login
    function handleLoginSuccess(user) {
        console.log("Logged in successfully:", user.email);
        // We will store the user's *email* instead of a random address
        // Note: We use user.uid for security, but email is more readable for this demo.
        localStorage.setItem('walletAddress', user.email); 
        
        // Redirect to the main page
        window.location.href = 'index.html';
    }

    // --- Toggle between login and sign-up ---
    function toggleMode() {
        const currentMode = loginForm.dataset.mode;
        errorMessage.textContent = ''; // Clear errors
        
        if (currentMode === 'login') {
            loginForm.dataset.mode = 'signup';
            formSubtitle.textContent = 'Create your account';
            submitBtn.textContent = 'Sign Up';
            togglePrompt.textContent = 'Already have an account?';
            toggleModeBtn.textContent = 'Sign In';
            nameFieldContainer.style.display = 'block';
            roleFieldContainer.style.display = 'block';
        } else {
            loginForm.dataset.mode = 'login';
            formSubtitle.textContent = 'Sign in to your account';
            submitBtn.textContent = 'Sign In';
            togglePrompt.textContent = "Don't have an account?";
            toggleModeBtn.textContent = 'Sign Up';
            nameFieldContainer.style.display = 'none';
            roleFieldContainer.style.display = 'none';
        }
    }
    toggleModeBtn.addEventListener('click', toggleMode);

    // --- Handle Email/Password Form ---
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const mode = loginForm.dataset.mode;
        const email = emailInput.value;
        const password = passwordInput.value;
        const role = roleInput.value;
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Working...';
        errorMessage.textContent = '';

        if (mode === 'signup') {
            // --- Sign Up with Email ---
            auth.createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Set the user's role in localStorage *before* redirecting
                    localStorage.setItem('userRole', role);
                    handleLoginSuccess(userCredential.user);
                })
                .catch((error) => {
                    showError(error.message);
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Sign Up';
                });
        } else {
            // --- Sign In with Email ---
            auth.signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // NOTE: This login path doesn't know the user's role.
                    // The main index.html page will handle this.
                    handleLoginSuccess(userCredential.user);
                })
                .catch((error) => {
                    showError(error.message);
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Sign In';
                });
        }
    });

    // --- Handle Google Login ---
    googleLoginBtn.addEventListener('click', () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)
            .then((result) => {
                // When logging in with Google, we don't know their role.
                // We'll clear any old role and let index.html default them to "consumer".
                localStorage.removeItem('userRole');
                handleLoginSuccess(result.user);
            })
            .catch((error) => {
                showError(error.message);
            });
    });

    // --- Handle Microsoft Login ---
    
});