import UserSideNavButtonGroup from '@/components/UserSideNavButtonGroup';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

export default async function UserLayout({ children }: { children: React.ReactNode }) {
    
    const authUser = (await cookies()).get('auth_user')?.value;

    if (!authUser) return notFound();

    return (
        <main className='h-[calc(100vh-80px)] overflow-hidden p-5 relative'>
            <div 
                className="absolute inset-0 bg-right bg-no-repeat -z-10 before:content-[''] before:fixed before:inset-0"
                style={{backgroundImage: "url('/backgrounds/ProfileBackground.png')"}}
            ></div>

            <div className='flex gap-5 justify-between'>
                {children}
                <UserSideNavButtonGroup/>
            </div>
        </main>
    );
}

