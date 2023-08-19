export function areBallsInContact(coords1: number[], coords2: number[], radiusAdded: number) {
    return (Math.pow(coords1[0] - coords2[0], 2) + Math.pow(coords1[1] - coords2[1], 2) <= Math.pow(radiusAdded, 2));
}
