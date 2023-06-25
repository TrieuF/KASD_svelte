// @ts-ignore
/** @type {import('./$types').PageLoad} */
export const load = async ({ params }) => {
    const success = params.searchname
    return {
        search : success
    }
};