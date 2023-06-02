import Image from 'next/image'
import { useSession, signIn, signOut } from "next-auth/react"
import { Inter } from 'next/font/google'
import Nav from '@/components/nav';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data: session } = useSession();
  console.log(session);
  if (!session) {
    return (
      <div className="bg-blue-900 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button onClick={() => signIn('google')} className="bg-white p-2 px-4 rounded-lg text-black">Login with Google</button>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-blue-900 min-h-screen '>
      <Nav/>
      <div> Signed in as {session.user.email} </div>
    </div>
  );
}
