'use client';
import { useAuthContext, VIEWS } from '#/lib/context/authContext';
import Button from '#/ui/global/buttons/Button/Button';
import Card from '#/ui/global/Card/Card';
import SignInForm from '#/ui/global/forms/SignInForm/SignInForm';
import styles from './SignIn.module.scss';

const SignIn = () => {
  const { setView } = useAuthContext();

  return (
    <Card className={styles.SignIn}>
      <h2 className="w-full text-center">Sign In</h2>
      <SignInForm />
      <Button
        text="Forgot your password?"
        type="link"
        onClick={() => setView(VIEWS.FORGOTTEN_PASSWORD)}
      />
      <Button
        text="Don't have an account? Sign Up."
        type="link"
        onClick={() => setView(VIEWS.SIGN_UP)}
      />
    </Card>
  );
};

export default SignIn;
