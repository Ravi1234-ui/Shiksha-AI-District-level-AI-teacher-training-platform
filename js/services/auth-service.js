// import { auth, db } from '../config/firebase-config.js';
// import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
// import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// window.loginUser = async () => {
//     const email = document.getElementById('email').value;
//     const pass = document.getElementById('password').value;
//     const errorDisp = document.getElementById('error');

//     try {
//         const userCredential = await signInWithEmailAndPassword(auth, email, pass);
//         const user = userCredential.user;

//         // Fetch user role from Firestore
//         const userDoc = await getDoc(doc(db, "users", user.uid));
        
//         if (userDoc.exists()) {
//             const userData = userDoc.data();
//             // Redirect based on the role stored in DB
//             if (userData.role === 'teacher') {
//                 window.location.href = 'teacher/dashboard.html';
//             } else if (userData.role === 'diet') {
//                 window.location.href = 'diet/dashboard.html';
//             }
//         } else {
//             errorDisp.innerText = "User role not defined in system.";
//         }
//     } catch (error) {
//         errorDisp.innerText = "Invalid Login: " + error.message;
//     }
// };

import { auth, db } from './config/firebase-config.js';
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ================= REGISTER LOGIC =================
window.register = async () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('regEmail').value;
    const district = document.getElementById('district').value;
    const password = document.getElementById('regPassword').value;

    if (!name || !email || !password) {
        alert("Please fill all required fields.");
        return;
    }

    try {
        // 1. Create Auth User
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // 2. Save Profile to Firestore
        // Default role is 'teacher'. DIET accounts are usually created by admins.
        await setDoc(doc(db, "users", user.uid), {
            name: name,
            email: email,
            district: district,
            role: "teacher", 
            isVerified: false, // Verification required by DIET
            createdAt: new Date()
        });

        alert("Registration successful! Please login.");
        location.reload(); // Refresh to show login tab
    } catch (error) {
        console.error("Registration Error:", error);
        alert(error.message);
    }
};

// ================= LOGIN LOGIC =================
window.login = async () => {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Fetch user role from Firestore to redirect correctly
        const userDoc = await getDoc(doc(db, "users", user.uid));
        
        if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.role === 'teacher') {
                window.location.href = 'teacher/dashboard.html';
            } else if (userData.role === 'diet') {
                window.location.href = 'diet/dashboard.html';
            }
        } else {
            alert("User profile not found in database.");
        }
    } catch (error) {
        alert("Login Failed: " + error.message);
    }
};