const userIsAdmin = ({ authentication: { item: user } }) => Boolean(user && user.role == 'admin');
const everyone = ({ authentication: { item: user } }) => Boolean(user);
const access = { userIsAdmin, everyone, userIsSales, userIsExecutor, userIsPlanner };

module.exports = { "access": access }
