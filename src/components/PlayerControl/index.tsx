'use client';
import { usePlayer } from '@/contexts/player.context';
import { secondsToMinutes } from '@/utils/date.utils';
import { 
	Laptop2Icon, 
	LayoutListIcon, 
	Maximize2Icon, 
	Mic2Icon, 
	PauseIcon, 
	PlayIcon, 
	RepeatIcon, 
	ShuffleIcon, 
	SkipBackIcon, 
	SkipForwardIcon,
	VolumeX as VolumeMuteIcon,
	VolumeX as VolumeLessIcon,
	Volume1 as VolumeMinIcon,
	Volume2 as VolumeMaxIcon,
	LucideProps, 
	PictureInPicture2} from 'lucide-react';
import Image from 'next/image';
import { ReactElement, useMemo } from 'react';
import FavoriteHeartIcon from '../FavoriteHeartIcon';

export default function PlayerControl(){
	const { 
		currentSong, 
		handleRandom, 
		playerControls, 
		setPlayerControls,
		previousSong, 
		handleTogglePlay, 
		handleRepeat,
		nextSong,
		playerRef,
		handleToggleLikeSong,
		songIsLiked,
		handleQueueSong,
		songIsQueued
	} = usePlayer();

	const VolumeIcon = useMemo<ReactElement<LucideProps>>(() => {
		if (playerControls.volume === 0) {
			return <VolumeLessIcon size={20} className='cursor-pointer' onClick={() => setPlayerControls(prev => ({ ...prev, muted: !prev.muted }))} />;
		} else if (playerControls.volume < 0.5) {
			return <VolumeMinIcon size={20} className='cursor-pointer' onClick={() => setPlayerControls(prev => ({ ...prev, muted: !prev.muted }))}/>;
		} else {
			return <VolumeMaxIcon size={20} className='cursor-pointer' onClick={() => setPlayerControls(prev => ({ ...prev, muted: !prev.muted }))}/>;
		}
	}, [playerControls.volume]);

	return (
		<footer className="bg-zinc-900 border-t h-24 border-zinc-700 px-6 py-4 fixed bottom-0 w-screen grid grid-cols-4">
			<div className='flex items-center justify-between col-span-1'>
				<div className='flex items-center gap-3 w-full'>
					<div className='aspect-square w-14 h-14 relative'>
						<Image 
							src={currentSong?.coverPath ?? ''}
							fill
							className='object-cover'
							alt='Capa do albúm da banda full fighters'
						/>
					</div>
					<div className='flex flex-col w-full'>
						<strong className='font-normal'>{currentSong?.name}</strong>
						<span className='text-xs text-zinc-400 w-5/6 truncate'>{currentSong?.artist}</span>
					</div>
				</div>
				<div className='flex items-center gap-4'>
					<button>
						<PictureInPicture2
							size={16}
						/>
					</button>
					<button onClick={() => currentSong ? handleToggleLikeSong(currentSong) : {}}>
						<FavoriteHeartIcon
							favorite={currentSong ? songIsLiked(currentSong) : false} 
							size={16}
						/>
					</button>
				</div>
			</div>
			<div className='flex flex-col items-center gap-2 justify-center col-span-2'>
				<div className='flex items-center gap-6'>
					<ShuffleIcon onClick={handleRandom} size={20} className={`cursor-pointer ${playerControls.random ? 'text-green-500 ' : 'text-zinc-200 '}`} />
					<SkipBackIcon 
						onClick={previousSong} 
						size={20} 
						className={playerControls.hasPreviousSong ? 'cursor-pointer text-zinc-200' : 'text-zinc-600'}
						fill={playerControls.hasPreviousSong ? 'white' : 'transparent'}
					/>
					<button 
						className={`w-8 h-8 flex items-center justify-center ${!playerRef.current?.paused ? '' : 'pl-1'} rounded-full bg-white text-black`} 
						onClick={(e) => {
							e.stopPropagation();
							handleTogglePlay();
						}}
					>
						{!playerRef.current?.paused ? (
							<PauseIcon size={24} strokeWidth={0} fill='#000' />
						) : (
							<PlayIcon size={18} fill='#000' />
						)}
					</button>

					<SkipForwardIcon 
						onClick={nextSong} 
						size={20} 
						className={playerControls.hasNextSong ? 'cursor-pointer text-zinc-200' : 'text-zinc-600'}
						fill={playerControls.hasNextSong ? 'white' : 'transparent'}
					/>
					<RepeatIcon onClick={handleRepeat} size={20} className={`cursor-pointer ${playerControls.repeat ? 'text-green-500 ' : 'text-zinc-200 '}`}/>
				</div>
				<audio hidden muted={playerControls.muted} src={currentSong?.path} ref={playerRef} controls>
					{/* <source s /> */}
				</audio>
				<div className='flex items-center gap-2'>
					<span className='text-sm text-zinc-400'>{secondsToMinutes(playerControls.currentTime)}</span>
					<input
						className='rounded-lg overflow-hidden bg-zinc-400 h-1 w-96 accent-zinc-200'
						type="range" 
						max={currentSong?.duration}
						onChange={(e) => {
							const selectTime = Number(e.target.value);
							if(playerRef?.current){
								playerRef.current.currentTime = selectTime;
							}
						}}
						value={playerRef?.current?.currentTime ?? 0} 
						min={0} 
						step={1}
					/>
					<span className='text-sm text-zinc-400'>{secondsToMinutes(currentSong?.duration ?? 0)}</span>
				</div>
			</div>
			<div className='flex items-center gap-4 justify-end col-span-1'>
				<Mic2Icon className='cursor-pointer' size={16} />
				<LayoutListIcon 
					onClick={() => currentSong ? handleQueueSong(currentSong) : {}} 
					className='cursor-pointer' 
					size={16} 
					color={currentSong ? songIsQueued(currentSong) ? 'rgb(34 197 94)' : '#c4c4c4' : '#c4c4c4'}
				/>
				<Laptop2Icon className='cursor-pointer' size={16} />
				<div className='flex items-center gap-2'>
					{playerControls.muted ? (
						<VolumeMuteIcon className='cursor-pointer' size={16} onClick={() => setPlayerControls(prev => ({ ...prev, muted: !prev.muted }))} />
					): (
						VolumeIcon
					)}
					<input
						className='rounded-lg overflow-hidden bg-zinc-400 h-1 w-24 accent-zinc-200 trac'
						type="range" 
						max={1} 
						min={0} 
						step={0.05}
						onChange={(e) => setPlayerControls(prev => ({ ...prev, volume: Number(e.target.value) }))} 
						value={playerControls.volume}
					/>
					{/* <div className='h-1 rounded-full w-24 bg-zinc-600'>
          <div className='bg-zinc-200 w-12 h-1 rounded-full'></div>
        </div> */}
				</div>
				<Maximize2Icon className='cursor-pointer' size={16} />
			</div>
		</footer>
	);
}