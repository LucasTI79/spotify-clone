'use client';
import { ChevronDown, ChevronLeftIcon, ChevronRightIcon, SlidersHorizontal } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import * as Tooltip from '@radix-ui/react-tooltip';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useState } from 'react';
import { ChevronUp } from 'lucide-react';

type HeaderProps = {
  children?: React.ReactNode
}

export default function Header({ children }: HeaderProps){
	const router = useRouter();

	const [tooltipShow, setTooltipShow] = useState(false);
	const [menuShow, setMenuShow] = useState(false);

	function handleMenuShow(open: boolean): void {
		setMenuShow(open);
	}

	function handleTooltipShow(open: boolean){
		if(menuShow){
			setTooltipShow(false);
		}
		setTooltipShow(open);
	}

	return (
		<div className='transition-all flex items-center justify-between sticky top-0 scroll: w-full px-8 py-4 z-10'>
			<div className='flex items-center gap-4'>
				<button className='rounded-full bg-black/40 p-1'>
					<ChevronLeftIcon onClick={() => router.back()} />
				</button>
				<button className='rounded-full bg-black/40 p-1'>
					<ChevronRightIcon onClick={() => router.forward()}/>
				</button>
			</div>

			{children}
	
			<div className={`flex items-center gap-4 rounded-full h-8 ${menuShow ? 'bg-zinc-800' : 'bg-zinc-950'} hover:bg-zinc-800 pr-2 transition-all`}>
				<div className='relative w-8 h-8 rounded-full overflow-hidden'>
					<Image
						src={'https://github.com/lucasti79.png'}
						alt='profile image'
						className='object-cover'
						fill
					/>
				</div>

				<Tooltip.Provider>
					<Tooltip.Root open={tooltipShow} onOpenChange={handleTooltipShow}>
						<Tooltip.Trigger asChild>
							<span className='flex items-center gap-4'>
								<strong className='text-sm'>Lucas Alves</strong>
							</span>
						</Tooltip.Trigger>
						<DropdownMenu.Root open={menuShow} onOpenChange={handleMenuShow}>
							<DropdownMenu.Trigger asChild className='transition-all'>
								{menuShow ? <ChevronUp fill='#fff' strokeWidth={0} /> : <ChevronDown fill='#fff' strokeWidth={0} />}
							</DropdownMenu.Trigger>
							<DropdownMenu.Portal>
								<DropdownMenu.Content className='w-56' side='bottom' sideOffset={16}>
									<nav className='flex flex-col gap-3 bg-zinc-800 w-48 rounded-md px-1 pt-2 text-sm font-normal'>
										<a href="#" className='flex justify-between items-start w-full px-2 py-1'>
											<span>Account</span>
											<SlidersHorizontal className='mt-1' size={16}/>
										</a>
										<a href="#" className='flex justify-start items-start w-full px-2 py-1'>Profile</a>
										<a href="#" className='flex justify-start items-start w-full px-2 py-1'>Settings</a>
										<a href="#" className='flex justify-start items-start w-full px-2 py-3 border-t border-zinc-600'>Log out</a>
									</nav>
								</DropdownMenu.Content>
							</DropdownMenu.Portal>
						</DropdownMenu.Root>
							
			
						<Tooltip.Portal>
							<Tooltip.Content className="shadow-lg text-sm bg-zinc-800 py-1 px-4 rounded" side='bottom' sideOffset={10}>
                Lucas Alves
							</Tooltip.Content>
						</Tooltip.Portal>
					</Tooltip.Root>
				</Tooltip.Provider>					
			</div>

		</div>
	);
}