'use client';

import SongContextMenu from '@/@shared/SongContextMenu';
import Card from '@/components/Card';
import CardRow from '@/components/CardRow';
import { Playlist, usePlayer } from '@/contexts/player.context';
import { processGreeting } from '@/utils/date.utils';
import { PlayIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';

function processSongText(playlist: Playlist){
	const SONG_TEXTS = {
		'0': '0 Songs',
		'1': '1 song',
		DEFAULT: `${playlist.songs.length} songs` 
	};

	return SONG_TEXTS[(String(playlist.songs.length) as keyof typeof SONG_TEXTS)] ?? SONG_TEXTS['DEFAULT'];
}

export default function Home() {
	const {
		recentPlayedPlaylist, 
		currentPlaylist, 
		currentSong, 
		playerRef,
		playlists,
		selectPlaylist,
		changeSong
	} = usePlayer();
		
	const firstRender = useRef<boolean>(true);
  
	useEffect(() => {
		if(currentPlaylist){
			if(!firstRender.current){
				playerRef.current?.play();
			}			
			firstRender.current = false;
		}
	}, [currentSong, currentPlaylist, firstRender.current]);


	return (
		<main className="flex-1 px-8 pb-36 h-screen overflow-y-scroll">
			<h1 className='font-semibold text-3xl mt-6'>Good {processGreeting()}</h1>

			<div className='grid grid-cols-3 gap-5 mt-6'>
				{[1,2,3,4,5].map((item) => <CardRow key={item} />)}
			</div>

			<div className='flex items-center justify-between mt-10'>
				<h2 className='font-semibold text-2xl'>Made for Lucas Alves</h2>
				<a href="#" className='font-semibold text-sm text-zinc-400 hover:text-zinc-200 transition-colors'>Show all</a>
			</div>

			<div className='grid grid-cols-4 gap-6 mt-4'>
				{playlists.map((playlist) => (
					<SongContextMenu key={playlist.id}>
						<Card.Root>
							<div>
								<Card.CoverContainer>
									<div className='group'>
										<Card.CoverImage path={playlist.songs[0]?.coverPath} alt='album' />
										<button
											onClick={() => selectPlaylist(playlist)} 
											className='invisible group-hover:visible absolute bottom-0 left-0 hover:-translate-y-1 w-14 h-14 flex items-center justify-center pl-1 rounded-full bg-green-500 text-black m-2 transition-all hover:shadow-lg shadow-white'>
											<PlayIcon fill='#000'/>
										</button>
									</div>
								</Card.CoverContainer>
								<Card.Content>
									<div className='flex flex-col'>
										<strong className='font-semibold'>{playlist.name}</strong>
										<span className='text-sm text-zinc-400'>{processSongText(playlist)}</span>
									</div>
								</Card.Content>
							</div>
						</Card.Root>
					</SongContextMenu>
				))}
			</div>

			<div className='flex items-center justify-between mt-10'>
				<h2 className='font-semibold text-2xl'>Recently Played</h2>
				<a href="#" className='font-semibold text-sm text-zinc-400 hover:text-zinc-200 transition-colors'>Show all</a>
			</div>

			<div className='grid grid-cols-4 gap-6 mt-4'>
				{recentPlayedPlaylist?.songs.map(song => (
					<Card.Root key={song.id}>
						<div>
							<Card.CoverContainer>
								<div className='group'>
									<Card.CoverImage path={song.coverPath} alt='album' />
									<button
										onClick={() => {
											selectPlaylist(recentPlayedPlaylist);
											changeSong(song);
										}} 
										className='invisible group-hover:visible absolute bottom-0 left-0 hover:-translate-y-1 w-14 h-14 flex items-center justify-center pl-1 rounded-full bg-green-500 text-black m-2 transition-all hover:shadow-lg shadow-white'>
										<PlayIcon fill='#000'/>
									</button>
								</div>
							</Card.CoverContainer>
							<Card.Content>
								<div className='flex flex-col'>
									<strong className='font-semibold'>{song.name}</strong>
									<span className='text-sm text-zinc-400'>{song.artist}</span>
								</div>
							</Card.Content>
						</div>
					</Card.Root>
				))}
			</div>
		</main>
	);
}
