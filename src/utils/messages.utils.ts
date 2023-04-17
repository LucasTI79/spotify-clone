import { Playlist } from '@/contexts/player.context';

export function processGreeting(){
	const hour = new Date().getHours();
	if(hour > 18) return 'evening';
	if(hour < 12) return 'morning';
	return 'afternoon';
}

export function processSongText(playlist: Playlist){
	const SONG_TEXTS = {
		'0': '0 Songs',
		'1': '1 song',
		DEFAULT: `${playlist.songs.length} songs` 
	};

	return SONG_TEXTS[(String(playlist.songs.length) as keyof typeof SONG_TEXTS)] ?? SONG_TEXTS['DEFAULT'];
}