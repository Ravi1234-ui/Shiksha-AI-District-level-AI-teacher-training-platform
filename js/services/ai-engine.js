/**
 * Shiksha AI – Explainable Rule Engine (XAI)
 * Purpose:
 * 1. Decide training category
 * 2. Explain WHY decision was taken
 * 3. Provide confidence score for governance transparency
 */

export function getAIRecommendation(metrics) {

    // Default Recommendation
    let recommendation = {
        category: "General Pedagogy",
        reasons: [],
        priority: "Low",
        confidence: 40
    };

    let score = 0; // Used to calculate confidence

    // ---------- RULE 1: Language Barrier ----------
    if (metrics.problems && metrics.problems.includes("language_barrier")) {
        recommendation.category = "Linguistic Support";
        recommendation.priority = "High";

        recommendation.reasons.push(
            "Teacher reported language barrier in classroom"
        );

        score += 45;
    }

    // ---------- RULE 2: Attendance / Absenteeism ----------
    if (metrics.attendance !== undefined && metrics.attendance < 70) {
        recommendation.category = "Community Engagement";
        recommendation.priority = "Critical";

        recommendation.reasons.push(
            `Attendance dropped below 70% (Current: ${metrics.attendance}%)`
        );

        score += 35;
    }

    if (metrics.problems && metrics.problems.includes("absenteeism")) {
        recommendation.category = "Community Engagement";
        recommendation.priority = "Critical";

        recommendation.reasons.push(
            "Frequent absenteeism reported by teacher"
        );

        score += 25;
    }

    // ---------- RULE 3: Academic Performance ----------
    if (metrics.marks !== undefined && metrics.marks < 45) {
        recommendation.category = "Remedial Teaching";
        recommendation.priority = "Medium";

        recommendation.reasons.push(
            `Class average marks below expected level (${metrics.marks}%)`
        );

        score += 30;
    }

    // ---------- FALLBACK LOGIC ----------
    if (recommendation.reasons.length === 0) {
        recommendation.reasons.push(
            "No critical classroom issues detected. Continue with standard pedagogy."
        );
    }

    // ---------- CONFIDENCE CALCULATION ----------
    recommendation.confidence = Math.min(score, 100);

    // ---------- FINAL SAFETY CHECK ----------
        if (recommendation.confidence < 40) {
            recommendation.confidence = 40;
        }
        if (metrics.engagement === "low") {
            reasons.push("Low student engagement reported");
            score += 20;
        }

        if (metrics.confidence === "low") {
            reasons.push("Teacher reported low confidence in teaching");
            score += 20;
        }

        if (metrics.resources === "poor") {
            reasons.push("Severely limited classroom resources");
            score += 25;
        }

        if (metrics.digital === "not_comfortable") {
            reasons.push("Teacher not comfortable with digital tools");
            score += 15;
        }

    return recommendation;
}
