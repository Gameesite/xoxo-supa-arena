
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Facebook, LogIn } from "lucide-react";

interface SocialLoginButtonsProps {
  isLoading: boolean;
}

const SocialLoginButtons = ({ isLoading }: SocialLoginButtonsProps) => {
  const { signInWithGoogle, signInWithFacebook } = useAuth();

  return (
    <div className="space-y-2">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          onClick={signInWithGoogle}
          disabled={isLoading}
          type="button"
          className="flex items-center justify-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M1 12c0-5 4-9 9-9s9 4 9 9-4 9-9 9h-9v-9Z" />
            <path d="M15 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
          </svg>
          Google
        </Button>
        <Button
          variant="outline"
          onClick={signInWithFacebook}
          disabled={isLoading}
          type="button"
          className="flex items-center justify-center gap-2"
        >
          <Facebook className="h-4 w-4" />
          Facebook
        </Button>
      </div>
    </div>
  );
};

export default SocialLoginButtons;
