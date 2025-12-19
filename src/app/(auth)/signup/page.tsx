import { Link } from "lucide-react";
import SignUpForm from "@/components/auth/signup/SignUpForm";

export default function page() {
  return (
    <section className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <Link width={50} height={50} className="text-accent" />
        <p className="text-content-primary text-5xl font-bold">회원가입</p>
        <p className="text-content-secondary text-center text-lg">
          지금 가입하고 매치마이파티와 함께해요
        </p>
      </div>
      <SignUpForm />
    </section>
  );
}
