/**
 *
 * Asynchronously loads the component for SuperAdmin
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
