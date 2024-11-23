import {ErrorMessageArrayToString} from '@helpers/ErrorFormatter';
import {danger_config, info_config, success_config, warn_config} from '@utils';
import {StatusBar} from 'react-native';
import {showMessage} from 'react-native-flash-message';

const flash: any = {
  success: ({description}) => {
    return showMessage({
      ...success_config,
      description,
      statusBarHeight: StatusBar.currentHeight,
    });
  },
  info: ({description}) => {
    return showMessage({
      ...info_config,
      description,
      statusBarHeight: StatusBar.currentHeight,
    });
  },
  warning: ({description}) => {
    return showMessage({
      ...warn_config,
      description,
      statusBarHeight: StatusBar.currentHeight,
    });
  },
  danger: ({description}) => {
    if (typeof description === 'string') {
      return showMessage({
        ...danger_config,
        description,
        statusBarHeight: StatusBar.currentHeight,
      });
    }

    if (Array.isArray(description)) {
      return showMessage({
        ...danger_config,
        description: ErrorMessageArrayToString({message: description}),
      });
    }
  },
};

export {flash};
