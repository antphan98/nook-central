import commonMiddleware from '../../utils/middleware/commonMiddleware';
import { db } from '../../utils/auth/firebaseAdmin';

const handler = async (req, res) => {
  // Destroy the session.
  // https://github.com/expressjs/cookie-session#destroying-a-session
  console.log(req.session.decodedToken);
  if (req.method === 'GET') {
    let docRef = db
      .collection('userProgress')
      .doc(req.session.decodedToken.user_id);
    const result = await docRef
      .get()
      .then((doc) => {
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          const data = doc.data();
          console.log('Document data:', data);
          return data;
        }
      })
      .catch((err) => {
        console.log('Error getting document', err);
      });
    res.status(200).json({ data: result });
  }

  if (req.method === 'POST') {
    console.log(req.body);
    let docRef = db
      .collection('userProgress')
      .doc(req.session.decodedToken.user_id);

    docRef.set(JSON.parse(req.body));
    res.status(200).json({ status: true });
  }
};

export default commonMiddleware(handler);
