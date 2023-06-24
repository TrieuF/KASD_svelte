/** @type {import('./$types').LayoutLoad} */
export const load = async ({ params }) => {
    const success = params.id
    return {
        placemarkid : success
    }
}