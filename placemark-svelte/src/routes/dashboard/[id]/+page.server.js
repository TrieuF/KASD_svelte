/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params }) => {
    const success = params.id
    return {
        placemarkid : success
    }
}