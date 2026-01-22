import { db, auth } from '../config/firebase-config.js';
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Load existing profile or allow creation
export async function loadTeacherProfile() {
    const user = auth.currentUser;
    if (!user) return;

    const docRef = doc(db, "teacherProfiles", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return null; // Force user to fill profile
    }
}

export async function updateTeacherProfile(profileData) {
    const user = auth.currentUser;
    await setDoc(doc(db, "teacherProfiles", user.uid), {
        ...profileData,
        updatedAt: new Date()
    });
}