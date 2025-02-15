import AcmeLogo from '@/components/ui/kriar-logo';
import SignUpForm from '@/components/ui/signUp-form';
 
export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen mt-8">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-26">
          <div className="w-32 text-white md:w-36">
            <AcmeLogo />
          </div>
        </div>
        <SignUpForm />
      </div>
    </main>
  );
}