// Object containing all possible character types for password
const charTypes = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+{}[]<>?/|~-"
};

// Update the character length display when user moves the range slider
document.querySelector(".range").addEventListener("input", () => {
    document.querySelector(".number-of-letters").textContent = document.querySelector(".range").value;
});


// Set default checkboxes (Lowercase and Numbers checked by default)
document.querySelector(".Lowercase").checked = true;
document.querySelector(".Numbers").checked = true;

// Function to generate password
function GeneratePassword() {
    const numberOfLetters = Number(document.querySelector(".range").value); // Get desired password length
    const Lowercase = document.querySelector(".Lowercase").checked;
    const Uppercase = document.querySelector(".Uppercase").checked;
    const Numbers = document.querySelector(".Numbers").checked;
    const Symbols = document.querySelector(".Symbols").checked;

    let finalChars = ""; 

    
    if (Lowercase) finalChars += charTypes.lowercase;
    if (Uppercase) finalChars += charTypes.uppercase;
    if (Numbers) finalChars += charTypes.numbers;
    if (Symbols) finalChars += charTypes.symbols;

    
    if (!Lowercase && !Uppercase && !Numbers && !Symbols) return;

    
    let password = "";
    for (let i = 0; i < numberOfLetters; i++) {
        password += finalChars[Math.floor(Math.random() * finalChars.length)];
    }

    
    const passwordContainer = document.querySelector(".the-password");
    passwordContainer.textContent = password;
    passwordContainer.classList.remove("header-font");
    passwordContainer.classList.add("pig-font");

    // Update password strength
    getPasswordStrength(password, { uppercase: Uppercase, lowercase: Lowercase, numbers: Numbers, symbols: Symbols });
}

// Function to calculate password strength and update UI
function getPasswordStrength(password, settings) {
    const passwordStrength = document.querySelector(".Password-Strength");
    let score = 0;

    
    if (password.length < 5) score = 0; 
    else {
        if (password.length >= 5) score++;
        if (password.length >= 10) score++;
        if (password.length >= 15) score++;
        
        if (settings.uppercase) score += 0.5;
        if (settings.lowercase) score += 0.5;
        if (settings.numbers) score += 0.5;
        if (settings.symbols) score += 0.5;
    }

    
    const degrees = [".d1", ".d2", ".d3", ".d4"];
    degrees.forEach(d => {
        const el = document.querySelector(d);
        el.classList.remove("Strong", "Medium", "Weak", "tooWeak");
    });

    // Update password strength text and degree colors based on score
    if (score >= 4) {
        passwordStrength.textContent = "STRONG";
        degrees.forEach(d => document.querySelector(d).classList.add("Strong"));
    } 
    
    else if (score >= 3) {
        passwordStrength.textContent = "MEDIUM";
        [".d1", ".d2", ".d3"].forEach(d => document.querySelector(d).classList.add("Medium"));
    } 
    
    else if (score >= 2) {
        passwordStrength.textContent = "WEAK";
        [".d1", ".d2"].forEach(d => document.querySelector(d).classList.add("Weak"));
    } 
    
    else {
        passwordStrength.textContent = "TOO WEAK !";
        document.querySelector(".d1").classList.add("tooWeak");
    }
}

// Add event listener to generate button
document.querySelector(".generat").addEventListener("click", GeneratePassword);


const iconContainer = document.querySelector(".copy-container");

iconContainer.addEventListener("click", () => {
    const password = document.querySelector(".the-password");

    // If password is not generated yet, do nothing
    if (!password.classList.contains("pig-font")) return;

    // Copy password to clipboard
    navigator.clipboard.writeText(password.textContent);

    // Show "COPIED" message
    iconContainer.classList.add("done-copy");
    iconContainer.classList.remove("hide");

    // Hide message after 3 seconds
    setTimeout(() => {
        iconContainer.classList.add("hide");
    }, 3000);

    // Remove classes after 3.5 seconds so it can be triggered again
    setTimeout(() => {
        iconContainer.classList.remove("done-copy", "hide");
    }, 3500);
});




