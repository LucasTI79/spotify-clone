import { PlayIcon } from 'lucide-react';
import Image from 'next/image';

export default function CardRow(){
	return (
		<a href="#" className='bg-white/5 rounded-md group overflow-hidden flex items-center gap-4 hover:bg-white/10 transition-colors'>
			<Image 
				src="/album.jpeg" 
				width={80} 
				height={80} 
				alt='Capa do albúm da banda full fighters'
			/>
			<strong>Wasting Light</strong>

			<button className='w-14 h-14 flex items-center justify-center pl-1 rounded-full bg-green-500 text-black ml-auto m-2 invisible group-hover:visible transition-all'>
				<PlayIcon fill='#000'/>
			</button>
		</a>
	);
}