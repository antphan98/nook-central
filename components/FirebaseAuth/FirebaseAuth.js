import { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import 'firebase/auth';
import initFirebase from '../../utils/auth/initFirebase';

// Init the Firebase app.
initFirebase();

const firebaseAuthConfig = {
  signInFlow: 'popup',
  // Auth providers
  // https://github.com/firebase/firebaseui-web#configure-oauth-providers
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false,
    },
  ],
  signInSuccessUrl: '/',
  credentialHelper: 'none',
};

const FirebaseAuth = () => {
  // Do not SSR FirebaseUI, because it is not supported.
  // https://github.com/firebase/firebaseui-web/issues/213
  const [renderAuth, setRenderAuth] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRenderAuth(true);
    }
  }, []);
  return (
    <div>
      {renderAuth ? (
        <StyledFirebaseAuth
          uiConfig={firebaseAuthConfig}
          firebaseAuth={firebase.auth()}
        />
      ) : null}
      <style jsx global>
        {`
          @font-face {
            font-family: FinkHeavy;
            src: url(fonts/FinkHeavy.otf) format('opentype');
          }
          @font-face {
            font-family: Humming;
            src: url('fonts/Humming.otf') format('opentype');
          }
          h1.firebaseui-title {
            font-family: FinkHeavy;
            text-align: center;
          }
          #firebaseui_container {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
          }
          * {
            font-family: Humming;
          }
          input.firebaseui-input,
          input.firebaseui-input-invalid {
            font-family: Humming !important;
            line-height: 2px;
          }

          .mdl-textfield__label {
            position: none;
          }
          .mdl-button--raised.mdl-button--colored {
            border-radius: 25px;
            border-color: brown;
            border-style: solid;
            border-width: 0 3px 3px 0;
            box-shadow: 1px 5px #888888;
            font-size: 1.5rem;
            color: white;
            font-family: FinkHeavy;
            margin: 20px;
          }
          .mdl-button--raised.mdl-button--colored:hover,
          .mdl-button--primary.mdl-button--primary:hover {
            transform: scale(0.95) !important;
            box-shadow: 1px 5px rgba(0, 0, 0, 0.24) !important;
            z-index: 999;
          }

          .mdl-button--primary.mdl-button--primary {
            border-radius: 25px;
            border-color: brown;
            border-style: solid;
            border-width: 0 3px 3px 0;
            box-shadow: 1px 5px #888888;
            font-size: 1.5rem;
            color: #3f51b5;
            font-family: FinkHeavy;
          }
        `}
      </style>
    </div>
  );
};

export default FirebaseAuth;
