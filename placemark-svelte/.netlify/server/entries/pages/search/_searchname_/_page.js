const load = async ({ params }) => {
  const success = params.searchname;
  return {
    search: success
  };
};
export {
  load
};
