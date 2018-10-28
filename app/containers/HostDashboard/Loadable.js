/**
 *
 * Asynchronously loads the component for HostDashboard
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
