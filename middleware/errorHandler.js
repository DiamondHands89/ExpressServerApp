const authenticate = (req, res, next) => {
    const authenticated = true; // Placeholder for actual authentication logic
    if (authenticated) {
      console.log('User authenticated');
      next();
    } else {
      res.status(403).send('Forbidden');
    }
};
  
module.exports = authenticate;
