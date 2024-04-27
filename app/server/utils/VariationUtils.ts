import lodash from "lodash";
const { isArray } = lodash;
const getArray = (variationOptions, field) => {
  return variationOptions.map((variation) => {
    return variation.options.map((value) => value[field]);
  });
};

const getPermutation = (array, prefix) => {
  prefix = prefix || "";
  if (!array.length) {
    return prefix;
  }

  const result = array[0].reduce((result, value) => {
    return result.concat(
      getPermutation(
        array.slice(1),
        prefix?.length > 0 ? prefix + "-" + value : value,
      ),
    );
  }, []);

  return result;
};
const getArrayWithKeys = (variationOptions) => {
  return variationOptions.map((variation) => {
    return variation.options.map((value) => ({ [variation.id]: value.id }));
  });
};

const getPermutationObjects = (array, prefix) => {
  prefix = prefix || {};
  if (!array.length) {
    return prefix;
  }

  const result = array[0].reduce((result, value) => {
    const getPermute = getPermutationObjects(array.slice(1), {
      ...prefix,
      ...value,
    });
    if (isArray(getPermute)) {
      return [...result, ...getPermute];
    } else {
      return [...result, getPermute];
    }
  }, []);

  return result;
};

export { getPermutation, getPermutationObjects, getArrayWithKeys, getArray };
