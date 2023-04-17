'use client';
import * as ContextMenu from '@radix-ui/react-context-menu';
import { ChevronRightIcon } from 'lucide-react';

type SongContextMenuProps = {
  children: React.ReactNode,
}

export default function SongContextMenu({ children }: SongContextMenuProps){
	return (
		<ContextMenu.Root>
			<ContextMenu.Trigger>
				{children}
			</ContextMenu.Trigger>
			<ContextMenu.Portal>
				<ContextMenu.Content className="flex flex-col bg-zinc-800 w-48 rounded-md px-1 pt-2 text-sm font-normal" sideOffset={5} align="end">
					<ContextMenu.Item asChild className="hover:bg-zinc-600 flex justify-start items-start w-full px-2 py-2">
            Add to queue
					</ContextMenu.Item>

					<ContextMenu.Item asChild className="flex justify-start items-start w-full px-2 py-2 hover:bg-zinc-600">
						<a href="#" className='hover:bg-zinc-600'>
              Go to playlist radio
						</a> 
						{/* Aqui deve direcionar para /station/playlist/:playlist_id */}
					</ContextMenu.Item>

					<ContextMenu.Item asChild className="flex justify-between items-start w-full px-2 py-1 hover:bg-zinc-600">
						<a 
							target='_blank'
							className='hover:bg-zinc-600 flex justify-start items-start w-full px-2 py-1'
							href="https://support.spotify.com/br-en/content-policy-reporting" rel="noreferrer"
						>
                Report
							{/* <ChevronRightIcon /> */}
						</a>
					</ContextMenu.Item>

					<ContextMenu.Item asChild className=" flex justify-start items-start w-full px-2 py-1 hover:bg-zinc-600">
						<a 
							className='hover:bg-zinc-600 flex justify-start items-start w-full px-2 py-2'
							href="https://support.spotify.com/br-en/content-policy-reporting"
						>
             Add to yout library
						</a> 
					</ContextMenu.Item>

					{/* <ContextMenu.Separator className="bg-zinc-600 text-clip w-full h-px"></ContextMenu.Separator> */}

					<ContextMenu.Sub>
						<ContextMenu.SubTrigger asChild className="ContextMenuSubTrigger">
							<a className='hover:bg-zinc-600 flex justify-between items-start w-full px-2 py-1'>
                Share
								<ChevronRightIcon />
							</a>
						</ContextMenu.SubTrigger>
						<ContextMenu.Portal>
							<ContextMenu.SubContent
								className='flex flex-col bg-zinc-800 w-48 rounded-md px-1 py-2 text-sm font-normal'
								sideOffset={2}
								alignOffset={-5}
							>
								<ContextMenu.Item className="ContextMenuItem">
									<a href="#" className='flex justify-start items-start w-full px-2 py-2 hover:bg-zinc-600'>
                    Copy Link to playlist
									</a> 
								</ContextMenu.Item>
								<ContextMenu.Item className="ContextMenuItem">
									<a href="#" className=' flex justify-start items-start w-full px-2 py-2 hover:bg-zinc-600'> 
                    Embed playlist
									</a> 
								</ContextMenu.Item>
							</ContextMenu.SubContent>
						</ContextMenu.Portal>
					</ContextMenu.Sub>

					{/* <ContextMenu.Separator className="bg-zinc-600 text-clip w-full h-px"></ContextMenu.Separator> */}

					<ContextMenu.Item asChild  className="flex justify-start items-start w-full px-2 py-1">
						<a 
							href='#'
							className='hover:bg-zinc-600'
						>
             About recommendations
							{/* Abri modal */}
						</a> 
					</ContextMenu.Item>

					{/* <ContextMenu.Separator className="bg-zinc-600 text-clip w-full h-px"></ContextMenu.Separator> */}

					<ContextMenu.Item asChild  className="flex justify-start items-start w-full px-2 py-1">
						<a 
							className='hover:bg-zinc-600 flex justify-start items-start w-full px-2 py-2'
							href="https://support.spotify.com/br-en/content-policy-reporting"
						>
             Open in Desktop app
						</a> 
					</ContextMenu.Item>
				</ContextMenu.Content>
			</ContextMenu.Portal>
		</ContextMenu.Root>
	);
}