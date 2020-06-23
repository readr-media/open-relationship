const userIsAdmin = ({ authentication: { item: user } }) => Boolean(user && user.role == 'admin');
const userIsSales = ({ authentication: { item: user } }) => Boolean(user && (user.role == 'sales' || user.role == 'admin'));
const userIsExecutor = ({ authentication: { item: user } }) => Boolean(user && (user.role == 'executor' || user.role == 'sales' || user.role == 'admin' ));
const userIsPlanner = ({ authentication: { item: user } }) => Boolean(user && (user.role == 'planner' || user.role == 'executor' || user.role == 'sales' || user.role == 'admin' ));
const everyone = ({ authentication: { item: user } }) => Boolean(user);
const access = { userIsAdmin, everyone, userIsSales, userIsExecutor, userIsPlanner };

module.exports = { "access": access }
