import { addStyles } from '@utils';

import styles from './styles.css';

/**
 * Initialize the module.
 */
const init = () => {
  addStyles(styles, 'larger-codices');
};

export default {
  id: 'larger-codices',
  name: 'Larger Codices',
  type: 'feature',
  default: true,
  description: 'Shows larger images for codices in the trap selector.',
  load: init,
};
