const load = async ({ params }) => {
  const success = params.categoryname;
  return {
    category: success
  };
};
export {
  load
};
