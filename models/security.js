const bcrypt = require('bcrypt');

// Generate a salt and hash the password
const generateHash = async (password) => {
  const saltRounds = 10; // Number of salt rounds
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } 
  catch (error) {
    console.error('Error generating hash:', error);
  }
};

// Verify a password against a hash
const verifyPassword = async (password, hash) => {
  try {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  } 
  catch (error) {
    console.error('Error verifying password:', error);
  }
};

module.exports = { generateHash, verifyPassword };
