/** @type {import('./$types').PageLoad} */
export const load = async ({ params }) => {
    const success = params.categoryname
    return {
        category : success
    }
};