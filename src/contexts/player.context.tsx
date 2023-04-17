import { Dispatch, MutableRefObject, SetStateAction, createContext, useContext, useRef, useState, createRef, useEffect, useMemo } from 'react';

export type Song = {
  id: number
  name: string
  artist: string
  path: string,
  duration: number
  coverPath: string,
  favorite: boolean,
}

export type Playlist = {
	id: number,
  name: string,
  createdAt: Date,
  author: string,
  songs: Song[]
}

type PlayerControlsType = {
  currentTime: number,
  volume: number,
  muted: boolean,
  paused: boolean,
  hasNextSong: boolean,
  hasPreviousSong: boolean,
  random: boolean,
	repeat: boolean
}

interface PlayerContextType {
  currentSong: Song | null,
  changeSong: (song: Song) => void,

	playlists: Playlist[],
  currentPlaylist: Playlist | null,
  setPlaylists: Dispatch<SetStateAction<Playlist[]>>,
  selectPlaylist: Dispatch<SetStateAction<Playlist>>,

	queuePlaylist: Playlist,
  recentPlayedPlaylist: Playlist,
  likedPlaylist: Playlist,
  handleQueueSong(song: Song): void,
	songIsQueued: (song: Song) => boolean,
  handleToggleLikeSong(song: Song): void,
  songIsLiked: (song: Song) => boolean,
  
  playerRef: MutableRefObject<HTMLAudioElement | null>,
  playerControls: PlayerControlsType,
  setPlayerControls: Dispatch<SetStateAction<PlayerControlsType>>,
  handleTogglePlay(): void,
  nextSong(): void,
  previousSong(): void,
  handleRepeat(): void,
  handleRandom(): void,
  
}

const initialData: PlayerContextType = {
	currentSong: null,
	changeSong: () => { return void 0;},

	playlists: [],
	currentPlaylist: null,
	setPlaylists: () => { return void 0;},
	selectPlaylist: () => { return void 0;},

	recentPlayedPlaylist: {
		id: 1,
		name: 'Recently Played',
		author: 'Lucas Alves',
		createdAt: new Date(),
		songs: []
	},
	likedPlaylist: {
		id: 1,
		name: 'Liked Songs',
		author: 'Lucas Alves',
		createdAt: new Date(),
		songs: []
	},
	queuePlaylist: {
		id: 1,
		name: 'Queue playlist',
		author: 'Lucas Alves',
		createdAt: new Date(),
		songs: []
	},
	handleQueueSong: () => { return void 0; },
	songIsQueued: () => { return false; },
	handleToggleLikeSong: () => { return void 0;},
	songIsLiked: ()  => { return false;},

	playerControls: {
		muted: false,
		volume: 0.75,
		paused: true,
		hasNextSong: false,
		hasPreviousSong: false,
		random: false,
		repeat: false,
		currentTime: 0
	},
	setPlayerControls: () => { return void 0; },
	playerRef: createRef<HTMLAudioElement | null>(),
	handleTogglePlay: () => { return void 0;},
	nextSong: () => { return void 0;},
	previousSong: () => { return void 0;},
	handleRepeat: () => { return void 0;},
	handleRandom: () => { return void 0;},
	
};

const PlayerContext = createContext<PlayerContextType>(initialData);

type PlayerContextProps = {
  children: React.ReactNode
}

// eslint-disable-next-line react/prop-types
export const PlayerProvider: React.FC<PlayerContextProps> = ({ children }) => {
	const playerRef = useRef<HTMLAudioElement | null>(null);

	const [playlists, setPlaylists] = useState<Playlist[]>([
		{
			id: 1,
			name: 'Playlist#1',
			createdAt: new Date('2023-04-15T03:00:000Z'),
			author: 'Lucas Alves',
			songs: [
				{
					id: 2,
					name: 'in a black out',
					artist: 'Hamilton Leihauser',
					path: '/inABlackOut-HamiltonLeihauser',
					duration: 197.137415,
					coverPath: '/inABlackOut-HamiltonLeihauser-Album.jpeg',
					favorite: false,
				},
				{
					id: 1,
					name: 'Tu és Soberano',
					artist: 'Paulo César Baruk',
					path: '/TuEsSoberano-Baruk.mp3',
					duration: 166.974694,
					coverPath: '/TuEsSoberano-Baruk-Album.jpeg',
					favorite: true,
				}, 
				{
					id: 3,
					name: 'Ele vem',
					artist: 'Gabriel Guedes feat Gabriela Rocha',
					path: '/Ele Vem Ao Vivo - Gabriel Guedes feat Gabriela Rocha.mp3',
					duration: 197.137415,
					coverPath: '/Ele Vem Ao Vivo - Gabriel Guedes feat Gabriela Rocha - Album.jpeg',
					favorite: false,
				}]
		},
	]);

	const [currentPlaylist, setCurrentPlaylist] = useState<Playlist>(playlists[0]);
	const currentPlaylistMemorized = useMemo(() => {
		return currentPlaylist;
	},[currentPlaylist]);

	const [currentSong, setCurrentSong] = useState<Song>(playlists[0]?.songs[0]);
	
	const [likedPlaylist, setLikedPlaylist] = useState<Playlist>({
		id: 1,
		name: 'Liked Songs',
		author: 'Lucas Alves',
		createdAt: new Date(),
		songs: []
	});

	const [recentPlayedPlaylist, setRecentPlayedPlaylist] = useState<Playlist>({
		id: 1,
		name: 'Recently Played',
		author: 'Lucas Alves',
		createdAt: new Date(),
		songs: []
	});

	const [queuePlaylist, setQueuePlaylist] = useState<Playlist>({
		id: 1,
		name: 'Queue Playlist',
		author: 'Lucas Alves',
		createdAt: new Date(),
		songs: []
	});

	const [playerControls, setPlayerControls] = useState({
		muted: false,
		volume: 0.75,
		paused: true,
		hasNextSong: true,
		hasPreviousSong: false,
		random: false,
		repeat: false,
		currentTime: 0
	});

	const playerControlsMemorized = useMemo(() => {
		return playerControls;
	},[playerControls]);

	function changeSong(song: Song){
		setCurrentSong(song); 
	}

	function handleTogglePlay() {
		return !playerRef?.current?.paused ? stopMusic(): playMusic();
	}

	function playMusic(){
		if(playerRef.current){
			playerRef.current.play();
		}
	}

	function stopMusic(){
		if(playerRef.current){
			playerRef.current.pause();
		}
	}

	function handleRepeat(){
		setPlayerControls((prev) => ({ ...prev, repeat: !prev.repeat }));
	}

	function handleRandom(){
		setPlayerControls((prev) => ({ ...prev, random: !prev.random }));
	}

	function getSongIndex(playlist: Playlist, currentSong: Song){
		return playlist.songs.findIndex(song => song.id === currentSong?.id);
	}

	function nextSong(){
		const playlistLength = currentPlaylist.songs.length;
		const currentSongIndex = getSongIndex(currentPlaylist, currentSong);
		const hasNextSong = playlistLength > (currentSongIndex + 1);
		if(hasNextSong) setCurrentSong(currentPlaylist.songs[currentSongIndex + 1]);
		if(playlistLength === currentSongIndex + 2) {
			setPlayerControls((prev) => ({ ...prev, hasNextSong: false, hasPreviousSong: true, currentTime: 0 }));
		}else {
			setPlayerControls((prev) => ({ ...prev, hasPreviousSong: true, currentTime: 0 }));
		}
	}

	function previousSong(){
		const currentSongIndex = getSongIndex(currentPlaylist, currentSong);
		const hasPreviousSong = currentSongIndex > 0;
		if(hasPreviousSong) setCurrentSong(currentPlaylist.songs[currentSongIndex - 1]);
		if(currentSongIndex === 1) {
			setPlayerControls((prev) => ({ ...prev, hasNextSong: true, hasPreviousSong: false, currentTime: 0 }));
		}else {
			setPlayerControls((prev) => ({ ...prev, hasNextSong: true, currentTime: 0 }));
		}
	}

	function likeSong(song: Song){
		setLikedPlaylist(likedPlaylist => ({
			...likedPlaylist, 
			songs: [...likedPlaylist.songs, { ...song, favorite: true }] 
		}));
	}

	function deslikeSong(song: Song){
		setLikedPlaylist(likedPlaylist => ({
			...likedPlaylist, 
			songs: [...likedPlaylist.songs.filter(likedSong => likedSong.id !== song.id)] 
		}));
	}

	function handleToggleLikeSong(song: Song){
		const songAlreadyLiked = songIsLiked(song);
		if(songAlreadyLiked){
			deslikeSong(song);
		}else{
			likeSong(song);
		}
	}

	function handleQueueSong(song: Song){
		const songAlreadyQueued = songIsQueued(song);
		if(songAlreadyQueued){
			dequeueSong(song);
		}else{
			queueSong(song);
		}
	}

	function queueSong(song: Song){
		setQueuePlaylist(queuedSongs => ({ ...queuedSongs, songs: [...queuedSongs.songs, song] }));
	}

	function dequeueSong(song: Song){
		setQueuePlaylist(queuedSongs => ({ ...queuedSongs, songs: [...queuedSongs.songs.filter(queuedSong => queuedSong.id !== song.id)] }));
	}

	function songIsQueued(song: Song){
		return !!queuePlaylist.songs.find(queuedSong => queuedSong.id === song.id);
	}

	function songIsLiked(song: Song){
		return !!likedPlaylist.songs.find(likedSong => likedSong.id === song.id);
	}

	useEffect(() => {
		if(playerRef.current){
			playerRef.current.volume = playerControls.volume;
			playerRef.current.muted = playerControls.muted;
		}

		const audioElement = playerRef.current;

		const handleTimeUpdate = () => {
			if(audioElement?.currentTime) setPlayerControls((prev) => ({ ...prev, currentTime: audioElement.currentTime }));
		};

		const handleSongFinish = () => {
			if(audioElement){
				if(playerControlsMemorized.repeat){
					audioElement.currentTime = 0; 
					return;
				}
				if(playerControlsMemorized.hasNextSong){
					nextSong();
					return;
				}
			}
		};

		audioElement?.addEventListener('timeupdate', handleTimeUpdate);
		audioElement?.addEventListener('ended', handleSongFinish);

		return () => {
			audioElement?.removeEventListener('timeupdate', handleTimeUpdate);
			audioElement?.removeEventListener('ended', handleSongFinish);
		};
	}, [playerRef, playerControlsMemorized]);

	useEffect(() => {
		if(recentPlayedPlaylist.songs.includes(currentSong)){
			setRecentPlayedPlaylist(recentPlayedSongs => ({ 
				...recentPlayedSongs,
				songs: [currentSong, ...recentPlayedSongs.songs.filter(song => song !== currentSong)].slice(0,20)
			}));
		}else{
			setRecentPlayedPlaylist(recentPlayedSongs => ({ 
				...recentPlayedSongs,
				songs: [currentSong, ...recentPlayedSongs.songs].slice(0,20)
			}));
		}
	},[currentSong?.name]);

	return (
		<PlayerContext.Provider value={{
			currentSong,
			changeSong,
      
			playlists,
			currentPlaylist: currentPlaylistMemorized,
			selectPlaylist: setCurrentPlaylist,
			setPlaylists,

			queuePlaylist,
			recentPlayedPlaylist,
			likedPlaylist,
			handleQueueSong,
			songIsQueued,
			handleToggleLikeSong,
			songIsLiked,      

			playerControls: playerControlsMemorized,
			setPlayerControls,
			playerRef,
			handleTogglePlay,
			nextSong,
			previousSong,
			handleRepeat,
			handleRandom,
		}}>
			{children}
		</PlayerContext.Provider>
	);
};

export const usePlayer = () => {
	const ctx = useContext(PlayerContext);
	return ctx;
};