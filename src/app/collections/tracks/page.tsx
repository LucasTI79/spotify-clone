'use client';
import FavoriteHeartIcon from '@/components/FavoriteHeartIcon';
import Footer from '@/components/Footer';
import { usePlayer } from '@/contexts/player.context';
import { secondsToMinutes } from '@/utils/date.utils';
import { Clock, Music3, PlayIcon } from 'lucide-react';
import Image from 'next/image';

type ChildrenProps = {
	children: React.ReactNode
}

function TableHeaderItem({ children, ...props }: ChildrenProps & React.ThHTMLAttributes<HTMLTableCellElement>){
	return <th scope="col" className="px-4 py-1" {...props}>{children}</th>;
}

export default function LikedSongs(){
	const { likedPlaylist , handleToggleLikeSong, selectPlaylist } = usePlayer();

	return (
		<main className='flex-1 p-6 pb-36 h-screen w-full overflow-auto'>
			{likedPlaylist.songs.length > 0 ? (
				<>
					<button
						onClick={() => selectPlaylist(likedPlaylist)} 
						className='w-14 h-14 flex items-center justify-center pl-1 rounded-full bg-green-500 text-black m-2 transition-all hover:shadow-lg shadow-white'>
						<PlayIcon fill='#000'/>
					</button>
					<div className="flex flex-col py-8 px-2">
						<div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
							<div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
								<div className="overflow-hidden">
									<table className="min-w-full text-left text-xs font-light text-zinc-400">
										<thead className="border-b font-medium dark:border-zinc-700">
											<tr>
												<TableHeaderItem className='text-center'>#</TableHeaderItem>
												<TableHeaderItem>Title</TableHeaderItem>
												<TableHeaderItem>Album</TableHeaderItem>
												<TableHeaderItem>Date Added</TableHeaderItem>
												<TableHeaderItem><Clock size={20}/></TableHeaderItem>
											</tr>
										</thead>
										<tbody>
											{likedPlaylist.songs.map(song => (
												<tr key={song.id} className='transition duration-300 ease-in-out hover:bg-neutral-100 dark:hover:bg-neutral-600 rounded-md overflow-hidden align-middle group'>
													<td className='whitespace-nowrap px-4 py-1 font-medium'>
														<div className='relative flex justify-center items-center'>
															<span className='absolute visible group-hover:invisible'>{song.id}</span>
															<PlayIcon size={16} strokeWidth={0} fill='#fff' className='absolute invisible group-hover:visible'/>
														</div>
													</td>
													<td className='whitespace-nowrap px-4 py-1 font-medium flex items-center'>
														<div className='aspect-square w-10 h-10 relative'>
															<Image 
																src={song?.coverPath ?? ''}
																fill
																className='object-cover'
																alt='Capa do albúm da banda full fighters'
															/>
														</div>
														<div className='px-4 py-2 flex flex-col gap-1'>
															<strong className='font-semibold text-sm text-zinc-200 capitalize'>{song?.name}</strong>
															<span className='text-xs'>{song?.artist}</span>
														</div>
													</td>
													<td className='whitespace-nowrap px-4 py-1 text-sm'>{song.artist}</td>
													<td className='whitespace-nowrap px-4 py-1 text-sm'>
														{new Intl.DateTimeFormat('pt-BR', {
															month: 'long',
															year: 'numeric',
														}).format(new Date())}
													</td>
													<td className='whitespace-nowrap px-4 py-1'>
														<div className='flex gap-6 text-sm'>
															<button onClick={() => handleToggleLikeSong(song)}>
																<FavoriteHeartIcon
																	favorite={song.favorite} 
																	size={20}
																/>
															</button>
															<span className=''>
																{secondsToMinutes(song.duration)}
															</span>
														</div>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</>
			): (
				<div className='flex flex-col justify-center items-center gap-4 h-full'>
					<div className='flex flex-col justify-center items-center gap-8'>
						<Music3 size={48} />
						<h1 className='font-bold text-3xl'>Songs you like will appear here</h1>
						<h2>Save songs by tapping the heart icon.</h2>
					</div>
					<button className='bg-white py-3 px-8 rounded-3xl text-black font-bold'>
						Find songs
					</button>
				</div>
			)}
			<Footer />
		</main>
	);
}