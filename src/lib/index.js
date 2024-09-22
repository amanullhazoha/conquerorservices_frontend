export const generateSubmissionId = (birthDate) => {
    const birthYear = birthDate.slice(0, 4);
  
    if (birthYear.length !== 4 || isNaN(birthYear)) {
      throw new Error("Invalid birth date. Please provide a valid format (YYYY-MM-DD).");
    }
  
    const randomEightDigits = Math.floor(10000000 + Math.random() * 90000000);

   const submissionId = `${birthYear}-${randomEightDigits}`;
  
    return submissionId;
  }
  