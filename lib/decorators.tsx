import { AuthContext } from '#/lib/context/authContext';
import { LOGGED_IN_USER } from '#/lib/fixtures/auth-fixtures';
import { clientSideSupabase } from '#/lib/supabase-client';
import { Decorator } from '@storybook/react';

export const LoggedInDecorator: Decorator<any> = (Story) => (
  <AuthContext.Provider
    value={{
      initial: false,
      session: null,
      user: LOGGED_IN_USER,
      view: null,
      isLoading: false,
      subscription: null,
      supabase: clientSideSupabase,
      setView: () => {},
      signOut: () => Promise.resolve({ error: null }),
    }}
  >
    <Story initialArgs={null} />
  </AuthContext.Provider>
);
