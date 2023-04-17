import { Heart, LucideProps } from 'lucide-react';

type FavoriteHeartIconProps = LucideProps & {
  favorite?: boolean
}

export default function FavoriteHeartIcon({ favorite, ...props }: FavoriteHeartIconProps){
	return (
		<Heart 
			stroke={favorite ? 'rgb(34 197 94)': '#c4c4c4'}
			fill={favorite ? 'rgb(34 197 94)': 'transparent'}
			{...props}
		/>
	);
}