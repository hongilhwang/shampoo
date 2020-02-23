import { actions as server } from 'reducers/server';
import { actions as indicesActions } from 'reducers/indices';
import { actions as dataView } from 'reducers/dataView';
import meta from './meta';
import indices from './indices';

export default { server, indices: { ...indicesActions, ...indices }, dataView, meta };
