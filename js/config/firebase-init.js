import { initializeApp } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import { getFirestore } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { getAuth } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 🔁 CHANGE THIS IMPORT BASED ON ENVIRONMENT
import { firebaseConfig } from "./firebase-config.local.js";
// import { firebaseConfig } from "./firebase-config.js"; // for GitHub users

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
