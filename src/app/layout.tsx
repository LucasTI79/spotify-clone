'use client';
import { PlayerProvider } from '@/contexts/player.context';
import './globals.css';
import { SideBar } from '@/components/Sidebar';
import PlayerControl from '@/components/PlayerControl';
import Header from '@/components/Header';

// export const metadata = {
// 	title: 'Spotify',
// 	description: 'Listen to music',
// };

export default function RootLayout({
	children,
}: {
  children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className='bg-zinc-900 text-zinc-50'>
				<PlayerProvider>
					<div className="flex flex-col overflow-hidden">
						<div className="flex flex-1">
							<SideBar />
							<div className='flex flex-col w-full h-screen'>
								<Header />
								{children}
							</div>
							<PlayerControl />
						</div>
					</div>
				</PlayerProvider>
			</body>
		</html>
	);
}
