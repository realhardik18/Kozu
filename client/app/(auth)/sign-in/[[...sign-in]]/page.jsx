import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function SignInPage() {
  return (
    <div className="h-screen flex items-center justify-center bg-[#2a0a3d]">
      <SignIn appearance={{ baseTheme: dark }} />
    </div>
  );
}
