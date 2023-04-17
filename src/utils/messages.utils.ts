export function processGreeting(){
	const hour = new Date().getHours();
	if(hour > 18) return 'evening';
	if(hour < 12) return 'morning';
	return 'afternoon';
}