import commonMiddleware from '../../utils/middleware/commonMiddleware';

const handler = (req, res) => {
  // Destroy the session.
  // https://github.com/expressjs/cookie-session#destroying-a-session
  console.log(req.session.ctx);
  res.status(200).json({ status: true });
};

export default commonMiddleware(handler);
