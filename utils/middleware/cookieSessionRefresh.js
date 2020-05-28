export default function cookieSessionRefresh(handler) {
  return (req, res) => {
    if (req.session) {
      req.session.nowInMinutes = Math.floor(Date.now() / 60e3);
    }
    handler(req, res);
  };
}
