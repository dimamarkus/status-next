import { supabaseServerComponent } from "#/lib/databases/supabase/supabase-server-component";
import BaseButton from "#/ui/_base/BaseButton/BaseButton";
import BaseLink from "#/ui/_base/BaseLink/BaseLink";
import Duo from "#/ui/_base/Duo/Duo";
import SignOutButton from "#/ui/atoms/buttons/SignOutButton/SignOutButton";
import Card from "#/ui/atoms/containers/Card/Card";
import LandingLayout from "#/ui/atoms/layouts/LandingLayout/LandingLayout";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const supabase = supabaseServerComponent();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  return (
    <LandingLayout>
      <Card title="Your Account">
        {!!user.email && (
          <Duo>
            <strong>User Email:</strong>
            <code>{user.email}</code>
          </Duo>
        )}
        {!!user.last_sign_in_at && (
          <Duo>
            <strong>Last Signed In:</strong>
            <code>{new Date(user.last_sign_in_at).toUTCString()}</code>
          </Duo>
        )}
        <br />
        <BaseLink href="/" text="Go Home" />
        <BaseButton flavor="textOnly" href="/auth/update-password" text="Update Password" />
        <SignOutButton flavor="textOnly" />
      </Card>
    </LandingLayout>
  );
}
