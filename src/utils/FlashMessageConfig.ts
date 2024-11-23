import {MessageOptions} from 'react-native-flash-message';

const success_config: MessageOptions = {
  animated: true,
  type: 'success',
  floating: true,
  hideOnPress: true,
  icon: 'auto',
  description: '',
  message: 'Success',
};
const danger_config: MessageOptions = {
  ...success_config,
  type: 'danger',
  message: 'Error',
};
const info_config: MessageOptions = {
  ...success_config,
  type: 'info',
  message: 'Info',
};
const warn_config: MessageOptions = {
  ...success_config,
  type: 'warning',
  message: 'Info',
};

export {danger_config, info_config, success_config, warn_config};
