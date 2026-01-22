import { auth } from './config/firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Security Check
onAuthStateChanged(auth, (user) => {
    const path = window.location.pathname;
    
    // If not logged in and not on login/register pages
    if (!user && !path.includes('index.html') && !path.includes('register.html') && path !== '/') {
        window.location.href = '../index.html';
    }
});

// Global Logout Function
window.logout = async () => {
    await signOut(auth);
    window.location.href = '../index.html';
};