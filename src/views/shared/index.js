
export function reduceClassNames (opts) {
	return Object.keys(opts).filter((cls) => !!opts[cls]).join(' ');
}
