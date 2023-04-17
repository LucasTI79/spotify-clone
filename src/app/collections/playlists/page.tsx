'use client';

import SongContextMenu from '@/@shared/SongContextMenu';
import Card from '@/components/Card';
import { usePlayer } from '@/contexts/player.context';
import { PlayIcon } from 'lucide-react';

export default function Playlists(){
	const { likedPlaylist, recentPlayedPlaylist, playlists, selectPlaylist } = usePlayer();
	return (
		<main className="flex-1 px-8 pb-36 h-screen overflow-y-scroll">
			<h1 className='font-semibold text-3xl mt-6'>Playlists</h1>
			<div className='grid grid-cols-4 gap-3 mt-6'>
				{[likedPlaylist, recentPlayedPlaylist, ...playlists].map(playlist => (
					<SongContextMenu key={playlist.id}>
						<Card.Root>
							<div>
								<Card.CoverContainer>
									<div className='group h-full w-full'>
										<Card.CoverImage path={playlist.songs[0]?.coverPath} alt='album' />
										{playlist.songs.length > 0 ? (
											<button
												onClick={() => selectPlaylist(playlist)} 
												className='invisible group-hover:visible absolute bottom-0 left-0 hover:-translate-y-1 w-14 h-14 flex items-center justify-center pl-1 rounded-full bg-green-500 text-black m-2 transition-all hover:shadow-lg shadow-white'>
												<PlayIcon fill='#000'/>
											</button>
										): null}
									</div>
								</Card.CoverContainer>
								<Card.Content>
									<div className='flex flex-col'>
										<strong className='font-semibold'>{playlist.name}</strong>
										<span className='text-sm text-zinc-400'>By {playlist.author}</span>
									</div>
								</Card.Content>
							</div>
						</Card.Root>
					</SongContextMenu>
				))}
			</div>
		</main>
	);
}