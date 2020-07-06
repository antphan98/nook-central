import FirebaseAuth from '../components/FirebaseAuth/FirebaseAuth';

const Auth = () => {
  return (
    <div>
      <div>
        <FirebaseAuth />
      </div>
      <style jsx global>{`
        body {
          background-image: url(images/signin.png);
          background-size: cover;
          background-repeat: no-repeat;
          background-attachment: fixed;
        }
      `}</style>
    </div>
  );
};

Auth.propTypes = {};

export default Auth;
