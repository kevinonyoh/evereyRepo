

export const  generate6DigitPin = () => {
    const digits = "0123456789";
    let pin = "";
  
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * digits.length);
      pin += digits[randomIndex];
    }
  
    return pin;
}
  
