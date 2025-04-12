
export default function AuthLayout({ children }: { children: React.ReactNode }) {
    
    return (
        <main className='h-[calc(100vh-80px)] overflow-hidden p-5 relative flex items-center'>
            <div 
                className="absolute inset-0 bg-center bg-cover bg-no-repeat -z-10 before:content-[''] before:absolute before:inset-0 before:backdrop-blur-xs"
                style={{backgroundImage: "url('/backgrounds/Background.png')"}}
            >
            </div>
            
            {children}

        </main>
    );
}

