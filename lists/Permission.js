const userIsAdmin = ({ authentication: { item: user } }) => Boolean(user && user.role == 'admin');
const everyone = ({ authentication: { item: user } }) => Boolean(user);
const access = { userIsAdmin, everyone };

module.exports = { "access": access }
