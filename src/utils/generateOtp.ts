export function generateOtp(length= 6): string{
    const digits: string = "1234567890";
    let otp: string = "";
    for(let i = 0; i < length; i++){
        otp = otp + digits[Math.floor(Math.random() * digits.length )];
    }
    return otp;
}