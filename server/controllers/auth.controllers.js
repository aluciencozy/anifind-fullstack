const signUp= (req, res) => {
  res.send('User signed up successfully');
};

const signIn= (req, res) => {
  res.send('User signed in successfully');
};

const signOut= (req, res) => {
  res.send('User signed out successfully');
};

export { signUp, signIn, signOut };