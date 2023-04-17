import { FacebookIcon, Instagram, Twitter } from 'lucide-react';

export default function Footer(){
	return(
		<footer className="flex flex-col text-zinc-400">
			<div className="grid grid-cols-4 text-sm">
				<div className="flex flex-col gap-4">
					<h3 className="text-white font-bold">Company</h3>
					<nav className="flex flex-col gap-4">
						<a 
							href="#"
							className='hover:text-zinc-200' 
						>
              About
						</a>
						<a 
							href="#"
							className='hover:text-zinc-200' 
						>
              Jobs
						</a>
						<a 
							href="#"
							className='hover:text-zinc-200' 
						>
              For the Record
						</a>
					</nav>
				</div>
				<div className="flex flex-col gap-4">
					<h3 className="text-white font-bold">Communities</h3>
					<nav className="flex flex-col gap-4">
						<a 
							href="#"
							className='hover:text-zinc-200' 
						>
             For the Record
						</a>
						<a 
							href="#"
							className='hover:text-zinc-200' 
						>
             Developers
						</a>
						<a 
							href="#"
							className='hover:text-zinc-200' 
						>
             Investors
						</a>
						<a 
							href="#"
							className='hover:text-zinc-200' 
						>
             Investors
						</a>
						<a 
							href="#"
							className='hover:text-zinc-200' 
						>
             Vendors
						</a>
					</nav>
				</div>
				<div className="flex flex-col gap-4">
					<h3 className="text-white font-bold">Useful links</h3>
					<nav className="flex flex-col gap-4">
						<a 
							href="#"
							className='hover:text-zinc-200' 
						>
             Support
						</a>
						<a 
							href="#"
							className='hover:text-zinc-200' 
						>
             Free Mobile App
						</a>
					</nav>
				</div>
				<div className="flex gap-4 justify-end">
					<a href='https://www.instagram.com/spotify/' target='_blank' className="flex justify-center items-center w-10 h-10 rounded-full text-white bg-zinc-800 hover:bg-zinc-400" rel="noreferrer">
						<Instagram strokeWidth={2} size={16} />
					</a>
					<a href='https://twitter.com/spotify/' target='_blank' className="flex justify-center items-center w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-400" rel="noreferrer">
						<Twitter fill='#fff' strokeWidth={0} size={16} />
					</a>
					<a href='https://www.facebook.com/Spotify/' target='_blank' className="flex justify-center items-center w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-400" rel="noreferrer">
						<FacebookIcon fill='#fff' strokeWidth={0} size={20} />
					</a>
				</div>
			</div>
			<div className="grid grid-cols-4 text-sm border-t border-zinc-800 pt-8 mt-8 pb-10">
				<nav className="col-span-3 flex gap-4">
					<a className='hover:text-zinc-200' href="https://www.spotify.com/br-en/legal">
            Legal
					</a>
					<a className='hover:text-zinc-200' href="https://www.spotify.com/br-en/privacy">
            Privacy Center
					</a>
					<a className='hover:text-zinc-200' href="https://www.spotify.com/br-en/legal/privacy-policy">
            Privacy Policy
					</a>
					<a className='hover:text-zinc-200' href="https://www.spotify.com/br-en/legal/cookies-policy">
            Cookies
					</a>
					<a className='hover:text-zinc-200' href="https://www.spotify.com/br-en/legal/privacy-policy#s3">
            About Ads
					</a>
				</nav>
				<div className="col-span-1 text-right">
					<span>
            &copy; {new Date().getFullYear()} Spotify AB
					</span>
				</div>
			</div>
		</footer>
	);
}