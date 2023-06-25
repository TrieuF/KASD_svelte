const load = async ({ params }) => {
  const success = params.id;
  return {
    placemarkid: success
  };
};
export {
  load
};
