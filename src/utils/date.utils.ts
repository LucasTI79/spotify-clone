export function secondsToMinutes(seconds: number): string {
	const secondsParsed = Number(seconds);
	const hoursFloored = Math.floor(secondsParsed / 3600);
	const minutesFloored = Math.floor(secondsParsed % 3600 / 60);
	const secondsFloored = Math.floor(secondsParsed % 3600 % 60);
	return `${hoursFloored ? hoursFloored +':':''}${minutesFloored ? minutesFloored +':':'0:'}${String(secondsFloored).padStart(2,'0')}`; 
}

export function processGreeting(){
	const hour = new Date().getHours();
	if(hour > 18) return 'evening';
	if(hour < 12) return 'morning';
	return 'afternoon';
}