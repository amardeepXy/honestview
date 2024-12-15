
export function validateUserInput(
    username: string,
    email: string,
    password: string
  ): { isValid: boolean; message: string } {
    // Validate Username
    if (!username || username.trim().length === 0) {
      return { isValid: false, message: "Username is required." };
    }
    if (username.length < 3 || username.length > 20) {
      return {
        isValid: false,
        message: "Username must be between 3 and 20 characters.",
      };
    }
    if (!/^[a-zA-Z0-9_.-]+$/.test(username)) {
      return {
        isValid: false,
        message:
          "Username can only contain letters, numbers, underscores, dots, and dashes.",
      };
    }
  
    // Validate Email
    if (!email || email.trim().length === 0) {
      return { isValid: false, message: "Email is required." };
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { isValid: false, message: "Email format is invalid." };
    }
  
    // Validate Password
    if (!password || password.trim().length === 0) {
      return { isValid: false, message: "Password is required." };
    }
    if (password.length < 8) {
      return {
        isValid: false,
        message: "Password must be at least 8 characters long.",
      };
    }
    if (!/[A-Z]/.test(password)) {
      return {
        isValid: false,
        message: "Password must contain at least one uppercase letter.",
      };
    }
    if (!/[a-z]/.test(password)) {
      return {
        isValid: false,
        message: "Password must contain at least one lowercase letter.",
      };
    }
    if (!/[0-9]/.test(password)) {
      return {
        isValid: false,
        message: "Password must contain at least one number.",
      };
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return {
        isValid: false,
        message: "Password must contain at least one special character.",
      };
    }
  
    // If all validations pass
    return { isValid: true, message: "Validation successful!" };
  }
  






// interface ValidationResult {
//     isValid: boolean;
//     errors: {
//       username: string | null;
//       email: string | null;
//       password: string | null;
//     };
//   }

//  export function validateUserSignUpDetails(email: string, username: string, password: string): ValidationResult{
//         const errors: ValidationResult["errors"] = {
//             username: null,
//             email: null,
//             password: null,
//         };
    
//         // Validate Username
//         if (!username || username.trim().length === 0) {
//             errors.username = "Username is required.";
//         } else if (username.length < 3 || username.length > 20) {
//             errors.username = "Username must be between 3 and 20 characters.";
//         } else if (!/^[a-zA-Z0-9_.-]+$/.test(username)) {
//             errors.username = "Username can only contain letters, numbers, underscores, dots, and dashes.";
//         }
    
//         // Validate Email
//         if (!email || email.trim().length === 0) {
//             errors.email = "Email is required.";
//         } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//             errors.email = "Email format is invalid.";
//         }
    
//         // Validate Password
//         if (!password || password.trim().length === 0) {
//             errors.password = "Password is required.";
//         } else if (password.length < 8) {
//             errors.password = "Password must be at least 8 characters long.";
//         } else if (!/[A-Z]/.test(password)) {
//             errors.password = "Password must contain at least one uppercase letter.";
//         } else if (!/[a-z]/.test(password)) {
//             errors.password = "Password must contain at least one lowercase letter.";
//         } else if (!/[0-9]/.test(password)) {
//             errors.password = "Password must contain at least one number.";
//         } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
//             errors.password = "Password must contain at least one special character.";
//         }
    
//         // Check if all validations passed
//         const hasErrors = Object.values(errors).some((error) => error !== null);
    
//         return {
//             isValid: !hasErrors,
//             errors,
//         };
    

// }