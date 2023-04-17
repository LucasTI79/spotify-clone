import { Music } from 'lucide-react';
import Image from 'next/image';

type ChildrenProps = {
  children: JSX.Element
} 

type DivProps = React.AllHTMLAttributes<HTMLDivElement>

export function Root({ children, ...props }: ChildrenProps & DivProps){
	return (
		<div {...props}>
			<a 
				href='#' 
				className='bg-white/5 p-3 rounded-md flex flex-col gap-3 hover:bg-white/10 group'
			>
				{children}
			</a>
		</div>
	);
}

type CardImageProps = {
  path: string,
  alt: string
}

export function CoverContainer({ children, ...props }: ChildrenProps & DivProps){
	return (
		<div className='relative w-full h-full' {...props}>
			<div className='aspect-square'>
				{children}
			</div>
		</div>
	);
}

export function CoverImage({ path, alt }: CardImageProps & DivProps){
	if(!path){
		return (
			<div className='bg-zinc-800 w-full h-full flex justify-center items-center'>
				<Music size={48} />
			</div>
		);
	}

	return (
		<Image 
			src={path}
			className='w-full'
			fill
			alt={alt}
		/>
	);
}

export function Content({ children }: ChildrenProps){
	return children;
}

export default {
	Root,
	CoverContainer,
	CoverImage,
	Content,
};
