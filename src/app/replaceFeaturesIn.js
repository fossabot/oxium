import { compose, curry, defaultTo, find, map, propEq } from 'ramda';
import { getFeatures, getId, setFeatures } from '../lens';
import { ID } from '../constants';

const featureIdEq = compose(propEq(ID), getId);

const findFeatureReplacement = curry((newFeatures, feature) =>
  compose(defaultTo(feature), find(featureIdEq(feature)))(newFeatures),
);

const replaceFeaturesIn = curry((app, features) => {
  const newFeatures = map(findFeatureReplacement(features), getFeatures(app));

  return setFeatures(newFeatures, app);
});

export default replaceFeaturesIn;
